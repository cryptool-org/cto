/*
    code source: https://github.com/CrypTools/VernamCipher/tree/master/js
*/

const encrypt = (plaintext, alphabet, key = null) => {

    if (plaintext.length != key.length) {
		throw "${{ vernam.KEYLENGTH_MESSAGE }}$"
		return 0;
	}

	alphabet = alphabet.split("")

	let nText = []
	let kText = []
	for (let i of String(plaintext)) {
		nText.push(alphabet.indexOf(i.toLowerCase()))
	}
	for (let i of key) {
		kText.push(alphabet.indexOf(i.toLowerCase()))
	}
	let out = ""
	for (let i in nText) {
		out += alphabet[(nText[i] + kText[i]) % 26]
	}
	return out;

}

const decrypt = (ciphertext, alphabet, key = null) => {

    if (ciphertext.length != key.length) {
		throw "${{ vernam.KEYLENGTH_MESSAGE }}$"
		return 0;
	}

	alphabet = alphabet.split("")

	let nText = []
	let kText = []
	for (let i of String(ciphertext)) {
		nText.push(alphabet.indexOf(i.toLowerCase()))
	}
	for (let i of key) {
		kText.push(alphabet.indexOf(i.toLowerCase()))
	}
	let out = ""
	for (let i in nText) {
		out += alphabet[(nText[i] - kText[i]) < 0 ? 26 + (nText[i] - kText[i]) : (nText[i] - kText[i]) % 26]
	}
	return out;

}

@@include("../common/base.js")
