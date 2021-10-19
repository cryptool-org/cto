// base.js
// @@include("./options.js")

let direction = {
    status: "encrypt",
    arrow: document.getElementById("direction")
}

let plaintextElem = document.getElementById("plaintext")
let ciphertextElem = document.getElementById("ciphertext")
let keyInputElem = document.getElementById("key-input")
let errorAlert = document.getElementById("error-alert")

const showErrorMessage = (message) => {
    errorAlert.innerHTML = message
    errorAlert.classList.remove("close")
    errorAlert.classList.add("show")
}

const hideErrorMessage = () => {
    errorAlert.classList.remove("show")
    errorAlert.classList.add("close")
}

const getKey = () => {
    let key = keyInputElem.value
    if(keyInputElem.type == "number") key = parseInt(key)
    if(keyInputElem.type == "text") key = key.trim()
    return key
}

const updateEncrypt = () => {
    direction.status = "encrypt"
    direction.arrow.classList.remove("flip")
    direction.arrow.classList.add("flop")

    hideErrorMessage()

    try { ciphertextElem.value = filterOutput(encrypt(plaintextElem.value.trim(), getAlphabet(), getKey())) }
    catch(e) { showErrorMessage("Error: " + e.toString()) }
}

const updateDecrypt = () => {
    direction.status = "decrypt"
    direction.arrow.classList.remove("flop")
    direction.arrow.classList.add("flip")

    hideErrorMessage()

    try { plaintextElem.value = filterOutput(decrypt(ciphertextElem.value.trim(), getAlphabet(), getKey())) }
    catch(e) { showErrorMessage("Error: " + e.toString()) }
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
