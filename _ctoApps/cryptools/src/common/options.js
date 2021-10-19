// options.js

let alphabetChars = {
    upperAlphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerAlphabet: "abcdefghijklmnopqrstuvwxyz",
    blank: " ",
    digits: "0123456789",
    punctuation: ".,:;!?()",
    umlautsUpper: "ÄÖÜ",
    umlautsLower: "äöüß"
}

let alphabetElems = {
    alphabetInput: document.getElementById("alphabet-input"),
    upperCaseCheckbox: document.getElementById("uppercase-checkbox"),
    lowerCaseCheckbox: document.getElementById("lowercase-checkbox"),
    blanksCheckbox: document.getElementById("blanks-checkbox"),
    digitsCheckbox: document.getElementById("digits-checkbox"),
    punctuationCheckbox: document.getElementById("punctuation-checkbox"),
    umlautsCheckbox: document.getElementById("umlauts-checkbox"),
    useConstructedRadioBtn: document.getElementById("use-constructed-alphabet-radiobtn"),
    useCustomRadioBtn: document.getElementById("use-custom-alphabet-radiobtn")
}

const getAlphabet = () => {

    if(alphabetElems.useCustomRadioBtn.checked)
        return alphabetElems.alphabetInput.value

    let alphabet = ""

    if(alphabetElems.upperCaseCheckbox.checked)
        alphabet += alphabetChars.upperAlphabet

    if(alphabetElems.lowerCaseCheckbox.checked)
        alphabet += alphabetChars.lowerAlphabet

    if(alphabetElems.blanksCheckbox.checked)
        alphabet += alphabetChars.blank

    if(alphabetElems.digitsCheckbox.checked)
        alphabet += alphabetChars.digits

    if(alphabetElems.punctuationCheckbox.checked)
        alphabet += alphabetChars.punctuation

    if(alphabetElems.umlautsCheckbox.checked)
        alphabet += alphabetChars.umlautsUpper + alphabetChars.umlautsLower

    return alphabet

}

const updateAlphabet = () => {

    alphabetElems.alphabetInput.disabled = !alphabetElems.useCustomRadioBtn.checked

    if(alphabetElems.useCustomRadioBtn.checked) {
        document.getElementById("alphabet-templates").style.display = "none"
    } else {
        document.getElementById("alphabet-templates").style.display = ""
        alphabetElems.alphabetInput.value = getAlphabet()
    }

}

// register change listeners
Object.values(alphabetElems).forEach(elem => elem.addEventListener("change", updateAlphabet))

let optionsElems = {
    blocksOf5: document.getElementById("blocks-of-five-checkbox"),
    nonAlpChars: document.getElementById("keep-non-alp-checkbox")
}

const filterOutput = (output) => {

    let alphabet = getAlphabet()

    // remove non alphabet chars
    if(!optionsElems.nonAlpChars.checked)
        for(let i = 0; i < output.length; i++) {
            if(!alphabet.includes(output.charAt(i)))
                output = output.slice(0, i) + output.slice(i + 1)
        }

    // add space every 5 chars
    if(optionsElems.blocksOf5.checked)
        output = output.match(/.{1,5}/g).join(" ")

    return output

}

// register change listeners
Object.values(optionsElems).forEach(elem => elem.addEventListener("change", update))
