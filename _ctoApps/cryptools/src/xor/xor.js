/*
    todo: implement encrypt and decrypt
*/

const encrypt = (plaintext,alphabet,key=null) => {

    if (typeof key == 'number') key = [key]

    let output = '';
    for (var i = 0; i < plaintext.length; i++) {
        const c = plaintext.charCodeAt(i)
        const k = key[i % key.length]
        output += String.fromCharCode(c ^ k);
    }

    return output

}

const decrypt = (ciphertext,alphabet,key=null) => {

    if (typeof key == 'number') key = [key]

    let output = '';
    for (var i = 0; i < ciphertext.length; i++) {
        const c = ciphertext.charCodeAt(i)
        const k = key[i % key.length]
        output += String.fromCharCode(c ^ k);
    }

    return output

}

@@include("../common/base.js")
