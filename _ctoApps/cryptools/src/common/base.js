// base.js
// @@include("./options.js")

let direction = {
    status: "encrypt",
    arrow: document.getElementById("direction")
}

let plaintextElem = document.getElementById("plaintext")
let ciphertextElem = document.getElementById("ciphertext")
let keyInputElem = document.getElementById("key-input")

const updateEncrypt = () => {
    direction.status = "encrypt"
    direction.arrow.classList.remove("flip")
    direction.arrow.classList.add("flop")

    ciphertextElem.value = filterOutput(encrypt(plaintextElem.value.trim(), getAlphabet(), keyInputElem.value.trim()))
}

const updateDecrypt = () => {
    direction.status = "decrypt"
    direction.arrow.classList.remove("flop")
    direction.arrow.classList.add("flip")

    plaintextElem.value = filterOutput(decrypt(ciphertextElem.value.trim(), getAlphabet(), keyInputElem.value.trim()))
}

const update = () => {
    direction.status == "encrypt" ? updateEncrypt() : updateDecrypt()
}

// rotate arrow on click
direction.arrow.addEventListener("click", event => {
    direction.status == "encrypt" ? updateDecrypt() : updateEncrypt()
    event.preventDefault()
})

// register input listeners
plaintextElem.addEventListener("input", updateEncrypt)
ciphertextElem.addEventListener("input", updateDecrypt)
keyInputElem.addEventListener("input", update)

update() // update once on init
