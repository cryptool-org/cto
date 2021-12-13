import { Subject } from 'rxjs';
import { getFileAsByteArray } from '../utils/getFileAsByteArray';
import OpenSSL from './openssl';

let instance = null;
class Command {
  get resultAsObservable() {
    return this.resultSubject.asObservable();
  }

  constructor() {
    if (!instance) {
      instance = this;
    }

    this.wasmModule = this.fetchWasmBinary();
    this.resultSubject = new Subject();

    return instance;
  }

  fetchWasmBinary() {
    const baseUrl = window.CTO_Globals?.pluginRoot || window.location.href;

    return fetch(`${baseUrl}/openssl.wasm`)
      .then((response) => response.arrayBuffer())
      .then((bytes) => {
        return WebAssembly.compile(bytes);
      });
  }

  async getWasmInstance(customProps = {}) {
    const output = {
      stdout: '',
      stderr: '',
      file: null,
    };

    const instantiateWasm = (imports, successCallback) => {
      this.wasmModule.then((module) => {
        WebAssembly.instantiate(module, imports).then(successCallback);
      });
      return {};
    };
    const print = (line) => {
      output.stdout += line + '\n';
    };
    const printErr = (line) => {
      output.stderr += line + '\n';
    };

    const instance = await OpenSSL({
      thisProgamm: 'openssl',
      instantiateWasm: instantiateWasm,
      print: print,
      printErr: printErr,
      customOutput: output,
      ...customProps,
    });

    return instance;
  }

  /**
   * @param {string} args OpenSSL Command
   * @param {File[]} files Command files to process
   * @param {string} text Command text to process
   */
  async run(args, files = null, text = '') {
    const argsArray = this.convertArgsToArray(args);

    if (args && !(Object.prototype.toString.call(args) === '[object String]')) {
      return;
    }

    let inputText = false;
    if (text && Object.prototype.toString.call(text) === '[object String]') {
      inputText = true;
      text = !text.endsWith('\\n')
        ? text.split('\\n').join('\n').concat('\n')
        : text.split('\\n').join('\n');
    }

    let inputFiles = false;
    let writeFiles = [];
    if (files && files.length && Object.prototype.toString.call(files) === '[object Array]') {
      inputFiles = true;
      const filteredFiles = this.filterInputFiles(argsArray, files);
      for (const file of filteredFiles) {
        const byteArray = await getFileAsByteArray(file);
        writeFiles.push({ name: file.name, buffer: byteArray });
      }
    }

    let charIndex = 0;
    const customStdin = () => {
      if (charIndex < text.length) {
        let code = text.charCodeAt(charIndex);
        ++charIndex;
        return code;
      }
      return null;
    };

    const instance = await this.getWasmInstance(inputText ? { stdin: customStdin } : {});
    try {
      if (inputFiles) {
        writeFiles.forEach((file) => {
          instance?.FS?.writeFile(file.name, file.buffer);
        });
      }
      instance?.callMain(argsArray);
      if (this.getFileOutParameter(argsArray)) {
        const readFileBuffer = instance?.FS?.readFile(this.getFileOutParameter(argsArray), {
          encoding: 'binary',
        });
        instance.customOutput.file = new File(
          [readFileBuffer],
          this.getFileOutParameter(argsArray),
          {
            type: 'application/octet-stream',
          }
        );
      }
    } catch (error) {
      instance.customOutput.stdout = '';
      instance.customOutput.stderr = `${error.name}: ${error.message}`;
    } finally {
      this.resultSubject.next(instance?.customOutput);
    }
  }

  async getCiphers() {
    const instance = await this.getWasmInstance();
    instance.callMain(['enc', '-list']);
    const blacklist = [
      'des3-wrap',
      'aes128-wrap',
      'id-aes128-wrap',
      'aes192-wrap',
      'id-aes192-wrap',
      'aes256-wrap',
      'id-aes256-wrap',
      'id-smime-alg-CMS3DESwrap',
    ];

    return instance.customOutput.stdout
      .split('\n')
      .slice(1)
      .map((x) => x.split(' ').filter((y) => y))
      .reduce((a, b) => a.concat(b), [])
      .map((x) => x.substring(1))
      .filter((x) => !blacklist.includes(x));
  }

  async getDigests() {
    const instance = await this.getWasmInstance();
    instance.callMain(['dgst', '-list']);

    return instance.customOutput.stdout
      .split('\n')
      .slice(1)
      .map((x) => x.split(' ').filter((y) => y))
      .reduce((a, b) => a.concat(b), [])
      .map((x) => x.substring(1));
  }

  convertArgsToArray(args) {
    return args.split(/[\s]{1,}/g).filter(Boolean);
  }

  getFileInParameter(argsArray) {
    return argsArray[argsArray.indexOf('-in') + 1];
  }

  getFileOutParameter(argsArray) {
    if (argsArray[argsArray.indexOf('-out')]) {
      return argsArray[argsArray.indexOf('-out') + 1];
    } else {
      return null;
    }
  }

  filterInputFiles(argsArray, inputFiles) {
    const filtered = argsArray.map((value) => (value.includes('file:') ? value.slice(5) : value));
    const matches = inputFiles.filter((file) => filtered.includes(file.name, 1));
    return matches.length
      ? inputFiles.filter((file) => matches.map((file) => file.name).includes(file.name))
      : [];
  }
}

export default Command;
