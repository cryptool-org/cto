
class AtbashAlgorithm {

    static encrypt(input) {
        let output = ""
        let alphabet = AtbashAlgorithm.buildAlphabet()
        for(let char of String(input)) {
            if(char in alphabet) output += alphabet[char]
            else output += char
        }
        return output
    }

    // encrypt and decrypt does the same
    static decrypt = AtbashAlgorithm.encrypt

    static buildAlphabet() {
        let alphabet = {}
        for(let i = 0; i < 26; i++) {
            alphabet[String.fromCharCode(65 + i)] = String.fromCharCode(90 - i)
            alphabet[String.fromCharCode(97 + i)] = String.fromCharCode(122 - i)
        }
        return alphabet
    }

}

export default AtbashAlgorithm
