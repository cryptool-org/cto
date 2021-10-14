/*
    code source: https://github.com/Cryptools/ROT13Cipher/blob/master/README.md
*/

const encrypt = (plaintext) => {

    let output = ""
    let alphabet = {}

    const chr = x => String.fromCharCode(x)

    for (let i = 0; i < 26; i++) {
        alphabet[chr(65 + i)] = chr(65 + (i + 13) % 26)
        alphabet[chr(97 + i)] = chr(97 + (i + 13) % 26)
    }

    for (let char of String(plaintext)) {
        if (char in alphabet) output += alphabet[char]
        else output += char
    }

    return output

}

const decrypt = (ciphertext) => {

    let output = ""
    let alphabet = {}

    const chr = x => String.fromCharCode(x)

    for (let i = 0; i < 26; i++) {
        alphabet[chr(65 + i)] = chr(65 + (i + 13) % 26)
        alphabet[chr(97 + i)] = chr(97 + (i + 13) % 26)
    }

    for (let char of String(ciphertext)) {
        if (char in alphabet) output += alphabet[char]
        else output += char
    }

    return output

}

@@include("../common/base.js")
