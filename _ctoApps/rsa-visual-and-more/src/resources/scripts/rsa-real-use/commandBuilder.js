/**
 * Encrypt / Decrypt with OpenSSL
 * @param {*} pkeyutl 
 * @returns 
 */
const build_pkeyutl = (pkeyutl) => {
    const command = ['openssl', 'pkeyutl'];
    for (const key of Object.keys(pkeyutl)) {
        switch (key) {
            case 'text':
                if (pkeyutl.text) command.unshift(`echo ${pkeyutl.text.split('\n').join('\\n')} |`);
                break;
            case 'encrypt':
                if (pkeyutl.encrypt) {
                    command.push('-encrypt');
                    command.push('-pubin');
                }
                break;
            case 'decrypt':
                if (pkeyutl.decrypt) command.push('-decrypt');
                break;
            case 'in_key':
                if (pkeyutl.in_key) command.push(`-inkey ${pkeyutl.in_key}`);
                break;
            case 'in_file':
                if (pkeyutl.in_file) command.push(`-in ${pkeyutl.in_file}`);
                break;
            case 'out_file':
                if (pkeyutl.out_file) command.push(`-out ${pkeyutl.out_file}`);
                else {
                    if (pkeyutl.encrypt) command.push('-hexdump');
                }
                break;

            default:
                break;
        }
    }
    return command.join(' ');
}

/**
 * Generate private RSA-key
 * @param {*} genrsa 
 * @returns 
 */
const build_genrsa = (genrsa) => {
    const command = ['openssl', 'genrsa'];
    for (const key of Object.keys(genrsa)) {
        switch (key) {
            case 'out_file':
                command.push(`-out ${genrsa.out_file}`);
                break;
            case 'numbits':
                command.push(genrsa.numbits);
                break;
            default:
                break;
        }
    }
    return command.join(' ');
}

/**
 * Show RSA-key information or generate public key
 * @param {*} rsa 
 * @returns 
 */
const build_rsa = (rsa) => {
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
                if (rsa.out) command.push(`-out ${rsa.out}.pub`);
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

/**
 * Create certificate
 * @param {object} req 
 */
const build_req = (req) => {
    const command = ['openssl', 'req'];
    for (const key of Object.keys(req)) {
        switch (key) {
            case 'new':
                if (req.new) command.push('-new');
                break;
            case 'x509':
                if (req.x509) command.push(`-x509`);
                break;
            case 'in':
                if (req.in) command.push(`-in ${req.in}`);
            case 'key':
                if (req.key) command.push(`-key ${req.key}`);
                break;
            case 'out':
                if (req.out) command.push(`-out ${req.out}`);
                break;
            case 'config':
                if (req.config) command.push(`-config ${req.config}`);
                break;
            case 'noout':
                if (req.noout) command.push(`-noout`);
                break;
            case 'text':
                if (req.text) command.push(`-text`);
                break;
            default:
                break;
        }
    }
    return command.join(' ');
}

/**
 * Show certificate info
 * @param {object} x509 
 */
const build_x509 = (x509) => {
    const command = ['openssl', 'x509'];
    for (const key of Object.keys(x509)) {
        switch (key) {
            case 'in':
                if (x509.in) command.push(`-in ${x509.in}`);
                break;
            case 'noout':
                if (x509.noout) command.push(`-noout`);
                break;
            case 'text':
                if (x509.text) command.push(`-text`);
                break;
            default:
                break;
        }
    }
    return command.join(' ');
}


export { build_genrsa, build_rsa, build_req, build_x509, build_pkeyutl }