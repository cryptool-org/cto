/*
    code source: https://github.com/Cryptools/BitShiftCipher/blob/master/README.md
*/

const encode = (text) => {
    let array = [];
    for (let i of String(text)) {
        array.push(i.charCodeAt(0))
    }
    return array
}

const encrypt = (plaintext, alphabet, key = null) => {

    const encoded = encode(plaintext);
    const keyEncoded = encode(key);

    let array = encoded.map(x => {
        x = parseInt(x)
        for (let i of keyEncoded) {
            x = x + 1 << i % 8
        }
        keyEncoded.reverse()
        return x;
    })

    if (typeof btoa === 'undefined') {
        global.btoa = str => new Buffer(str, 'binary').toString('base64');
    }

    return btoa(JSON.stringify(array))

}

const decrypt = (ciphertext, alphabet, key = null) => {

    const keyEncoded = encode(key)
	if (typeof atob === 'undefined') {
        global.atob = b64Encoded => new Buffer(b64Encoded, 'base64').toString();
    }

    let array = JSON.parse(
        atob(String(ciphertext).toString())
    )

    let decrypted = array.map(x => {
		keyEncoded.reverse()
        x = parseInt(x)
        for (let i of keyEncoded) {
            x = x - 1 >> i % 8
        }
        return x;
    })

    return String.fromCharCode(...decrypted)

}

@@include("../common/base.js")
