const buildEnc = (enc) => {
  const command = ['openssl', 'enc'];
  for (const key of Object.keys(enc)) {
    switch (key) {
      case 'text':
        if (enc.text) command.unshift(`echo ${enc.textVal.split('\n').join('\\n')} |`);
        break;
      case 'e':
        if (enc.e) command.push('-e');
        break;
      case 'd':
        if (enc.d) command.push('-d');
        break;
      case 'cipher':
        command.push(`-${enc.cipher}`);
        break;
      case 'inFile':
        if (enc.in) command.push(`-in ${enc.inFile}`);
        break;
      case 'outFile':
        if (enc.out) command.push(`-out ${enc.outFile}`);
        break;
      case 'k':
        if (enc.k) command.push('-k');
        break;
      case 'kVal':
        if (enc.k) command.push(enc.kVal);
        break;
      case 'kfile':
        if (enc.kfile) command.push('-kfile');
        break;
      case 'kValFile':
        if (enc.kfile) command.push(enc.kValFile);
        break;
      case 'pbkdf2':
        if (enc.pbkdf2) command.push('-pbkdf2');
        break;
      case 'nosalt':
        if (enc.nosalt) command.push('-nosalt');
        break;
      case 'iv':
        if (enc.iv) command.push('-iv');
        break;
      case 'ivVal':
        if (enc.iv) command.push(enc.ivVal);
        break;
      case 'a':
        if (!enc.out || enc.a) command.push('-a');
        break;
      default:
        break;
    }
  }
  return command.join(' ');
};

const buildGenrsa = (genrsa) => {
  const command = ['openssl', 'genrsa'];
  for (const key of Object.keys(genrsa)) {
    switch (key) {
      case 'outFile':
        command.push(`-out ${genrsa.outFile}`);
        break;
      case 'numbits':
        command.push(genrsa.numbits);
        break;
      default:
        break;
    }
  }
  return command.join(' ');
};

const buildRsa = (rsa) => {
  const command = ['openssl', 'rsa'];
  for (const key of Object.keys(rsa)) {
    switch (key) {
      case 'pubin':
        if (rsa.pubin) command.push('-pubin');
        break;
      case 'in':
        command.push(`-in ${rsa.in}`);
        break;
      case 'pubout':
        if (rsa.pubout) command.push('-pubout');
        break;
      case 'out':
        if (rsa.out) command.push('-out');
        break;
      case 'outFile':
        if (rsa.out) command.push(rsa.outFile);
        break;
      case 'text':
        if (rsa.text) command.push('-text');
        break;
      case 'noout':
        if (rsa.noout) command.push('-noout');
        break;
      default:
        break;
    }
  }
  return command.join(' ');
};

const buildDgst = (dgst) => {
  const command = ['openssl', 'dgst'];
  for (const key of Object.keys(dgst)) {
    switch (key) {
      case 'text':
        if (dgst.text) command.unshift(`echo ${dgst.textVal.split('\n').join('\\n')} |`);
        break;
      case 'algorithm':
        command.push(`-${dgst.algorithm}`);
        break;
      case 'out':
        if (dgst.out) command.push(`-out ${dgst.outFile}`);
        break;
      case 'file':
        if (dgst.file) command.push(dgst.fileVal);
        break;
      default:
        break;
    }
  }
  return command.join(' ');
};

export { buildEnc, buildGenrsa, buildRsa, buildDgst };
