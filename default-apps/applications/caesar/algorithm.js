class CaesarAlgorithm {

    static encrypt({ value, alphabet, key }) {
        
        // start with empty ciphertext
        let ciphertext = ""

        // iterate trough each character in value
        for(let old_character of value) {
            let new_character = ""

            // if character is in alphabet -> append to ciphertext
            if(alphabet.includes(old_character)) {
                const index = alphabet.indexOf(old_character)
                const new_index = ((index + key) % alphabet.length) % alphabet.length
                new_character = alphabet[new_index]
            }

            // if it's not in the alphabet -> keep old character
            else new_character = old_character

            // add new character to ciphertext
            ciphertext = ciphertext + new_character
        }

        // return ciphertext to calling function
        return ciphertext
    }

    static decrypt({ value, alphabet, key }) {
        
        // decrypting is like encrypting but with negative key
        const cleartext = CaesarAlgorithm.encrypt({ value, alphabet, key: 0 - key })

        // return cleartext to calling function
        return cleartext
    }

}

export default CaesarAlgorithm
