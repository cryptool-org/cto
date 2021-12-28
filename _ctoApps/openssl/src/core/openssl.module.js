class OpenSSLModule {
  /**
   * @param {Promise<WebAssembly.Module>} wasmModule
   * @param {string} stdinInit
   */
  constructor(wasmModule, stdinInit) {
    this.wasmModule = wasmModule;
    this.stdinBuffer = stdinInit ? stdinInit.split('').map((char) => char.charCodeAt(0)) : [];
    this.stdoutBuffer = [];
    this.stderrBuffer = [];
    this.output = {
      stdout: '',
      stderr: '',
      file: null,
    };
  }

  get object() {
    const module = {
      thisProgamm: 'openssl',
      instantiateWasm: this.instantiateWasm,
      preInit: [
        () => {
          module.FS.init(this.stdin, this.stdout, this.stderr);
          module.TTY.register(module.FS.makedev(5, 0), this.customTTYOps);
        },
      ],
      customOutput: this.output,
    };

    return module;
  }

  instantiateWasm = (imports, successCallback) => {
    this.wasmModule.then((module) => {
      WebAssembly.instantiate(module, imports).then(successCallback);
    });
    return {};
  };

  stdin = () => {
    if (!this.stdinBuffer.length && (this.stderrBuffer.length || this.stdoutBuffer.length)) {
      const currentStdErr = this.stderrBuffer.map((code) => String.fromCharCode(code)).join('');
      const currentStdOut = this.stdoutBuffer.map((code) => String.fromCharCode(code)).join('');

      let result = window.prompt(currentStdErr ? currentStdErr : currentStdOut);
      this.stderrBuffer = [];
      this.stdoutBuffer = [];
      if (result !== null) {
        result += '\n';
      }
      if (!result) {
        return null;
      }
      this.stdinBuffer = result.split('').map((char) => char.charCodeAt(0));
    }
    const code = this.stdinBuffer.shift();
    return code ? code : null;
  };

  stdout = (code) => {
    if (code === null || code === 10) {
      this.output.stdout +=
        this.stdoutBuffer.map((charCode) => String.fromCharCode(charCode)).join('') + '\n';
      this.stdoutBuffer = [];
    } else {
      if (code !== 0) this.stdoutBuffer.push(code);
    }
  };

  stderr = (code) => {
    if (code === null || code === 10) {
      this.output.stderr +=
        this.stderrBuffer.map((charCode) => String.fromCharCode(charCode)).join('') + '\n';
      this.stderrBuffer = [];
    } else {
      if (code !== 0) this.stderrBuffer.push(code);
    }
  };

  customTTYOps = {
    get_char: (tty) => {
      if (!tty.input.length) {
        let result = window.prompt(tty.output.map((code) => String.fromCharCode(code)).join(''));
        if (result !== null) {
          result += '\n';
        }
        if (!result) {
          return null;
        }
        tty.input = result.split('').map((char) => char.charCodeAt(0));
        // return null at the end of stream to break read operation
        tty.input.push(null);
      }
      return tty.input.shift();
    },
    put_char: (tty, val) => {
      if (val === null || val === 10) {
        this.output.stdout += tty.output.map((code) => String.fromCharCode(code)).join('') + '\n';
        tty.output = [];
      } else {
        if (val !== 0) tty.output.push(val);
      }
    },
    flush: (tty) => {
      if (tty.output && tty.output.length > 0) {
        this.output.stdout += tty.output.map((code) => String.fromCharCode(code)).join('') + '\n';
        tty.output = [];
      }
    },
  };
}

export default OpenSSLModule;
