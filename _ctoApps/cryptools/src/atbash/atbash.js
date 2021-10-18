/*
    code source: https://github.com/Cryptools/ATBASHCipher
*/

const encrypt = (plaintext) => {

    let output = ""
    let alphabet = {}

    const chr = x => String.fromCharCode(x)

    for (let i = 0; i < 26; i++) {
        alphabet[chr(65 + i)] = chr(90 - i)
        alphabet[chr(97 + i)] = chr(122 - i)
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
        alphabet[chr(65 + i)] = chr(90 - i)
        alphabet[chr(97 + i)] = chr(122 - i)
    }

    for (let char of String(ciphertext)) {
        if (char in alphabet) output += alphabet[char]
        else output += char
    }

	return output

}

@@include("../common/base.js")
