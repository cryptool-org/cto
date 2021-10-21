/**
 * handles everything regarding the rijndael form
 * 
*/

import Rijndael from "./aes/rijndael-block.js"
import Utils from "./aes/utils.js"

import {intToHexStringArray} from "../utils/conversions"

const FORM_BTN_ID = "rijndael-form-button"
const OUTPUT_FIELD_ID = "rijndael-form-ouput"
const KEY_FIELD_ID = "rijndael-form-key-input"
const PLAINTEXT_FIELD_ID = "rijndael-form-plaintext-input"
const PLAINTEXT_HEXADECIMAL_FIELD_ID = "rijndael-form-plaintext-hexadecimal"
const FORM_ERROR_FIELD = "rijndael-form-error-field"

const PLAINTEXT_ROW_ID = "rijndael-plaintext-row"
const PLAINTEXT_HEX_ROW_ID = "rijndael-plaintext-hex-row"
const PLAINTEXT_HEX_LABEL_ID = "rijndael-plaintext-hex-label"

class RijndaelFormController{

    constructor(controller){
        this.controller = controller

        this.formButton = document.getElementById(FORM_BTN_ID)
        this.outputField = document.getElementById(OUTPUT_FIELD_ID)
        this.KeyField = document.getElementById(KEY_FIELD_ID)
        this.plaintextField = document.getElementById(PLAINTEXT_FIELD_ID)
        this.plaintextHexadecimalField = document.getElementById(PLAINTEXT_HEXADECIMAL_FIELD_ID)
        this.errorField = document.getElementById(FORM_ERROR_FIELD)
        this.plaintextRow = document.getElementById(PLAINTEXT_ROW_ID)
        this.plaintextHexRow = document.getElementById(PLAINTEXT_HEX_ROW_ID)
        this.plaintextHexLabel = document.getElementById(PLAINTEXT_HEX_LABEL_ID)
        this.radioSelects = document.getElementsByName("asciiorhex")
        this.errors = null;
        this.mode = "ascii"

        // add event listener
        this.formButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.onEcryptClick(true);
        })

        // prime store
        
        this.radioSelects.forEach((radio) => {
            radio.addEventListener("change", (e) => {
                if(e.target.value == "hex"){
                    // hide first field
                    this.plaintextRow.style.visibility = "hidden"
                    // move second field up 
                    this.plaintextHexRow.style.order = -1
                    this.plaintextRow.style.order = 1
                    //change label
                    this.plaintextHexLabel.innerHTML =  this.controller.locale.getLocaleText("plaintextHexadecimalLabelTwo")
                    // enable second field
                    this.mode = "hex"
                    this.plaintextHexadecimalField.disabled = false;
                }else{
                    // dont hide first field
                    this.plaintextRow.style.visibility = "visible"
                    // reorder second field
                    this.plaintextRow.style.order = 0
                    this.plaintextHexRow.style.order = 0
                    //change label
                    this.plaintextHexLabel.innerHTML =  this.controller.locale.getLocaleText("plaintextHexadecimalLabel")
                    // disabled second field
                    this.mode = "ascii"
                    this.plaintextHexadecimalField.disabled = true;
                }
             
            })
        })

        this.plaintextField.addEventListener("keyup", (e) => {
            const value = e.target.value;
            // convert to hex and insert into input (hex)
            const intArray = Utils.toArray(value)
            const convertedValue = Utils.intArrayToHexString(intArray)

            
            this.plaintextHexadecimalField.value = this.prepareHexOutputString(convertedValue);
        })

        this.plaintextHexadecimalField.addEventListener("keyup", (e) => {
            const value = e.target.value;
            // convert to ascii and insert into input (ascii)
            const intArray = Utils.hexStringToArray(value.replace(/\s/g, ''))
            const convertedValue = Utils.intArrayToAsciiString(intArray)

            this.plaintextField.value = convertedValue;
        })


        const intArray = Utils.toArray(this.plaintextField.value)
        const convertedValue = Utils.intArrayToHexString(intArray)
        this.plaintextHexadecimalField.value = this.prepareHexOutputString(convertedValue);
        this.onEcryptClick();
    }


    excuteRijndaelAES({plaintext, key}){
        const cipher = new Rijndael(key, 'ecb');
        const [ciphertext, info] = cipher.encrypt(plaintext, 128);
        return [ciphertext, info]
    }


    prepareRijndaelDataForDisplay(aesInfo){
        const {block0, keySize, mode, key} = aesInfo;

        let temp = {...block0};


  
        Object.keys(temp).forEach(key => {
            const val = temp[key].slice();

            switch(key){
                case "key-schedule":
                    for(let i = 0; i < val.length / 16; i++){
                        const slice = val.slice(i*16, i*16+16)
                        temp[`key-${i}`] = intToHexStringArray(this.toGridByRow(4,4, slice));
                    }
                    return;
                case "key-shedule-subbed-bytes":
                    temp[key] = val;
                    temp["key-schedule-sub-bytes-grid"] = intToHexStringArray(val.splice(0,16));
                    return;

                case "sbox":
                    temp[key] = intToHexStringArray(val)
           
                    return;
                default: 
                    temp[key] = intToHexStringArray(this.toGridByRow(4,4, val))
                    return;
            }

        })

  

        return {
            keySize, 
            mode, 
            key,
            ...temp,
            // custom rcon
           // rcon: [...new Array()]
        }
    }


    toGridByRow = (rows, cols, elements) => {
        let newArr = new Array(elements.length)
        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                newArr[j*rows+i] = elements[i*cols+j]
            }
        }
        return newArr;
    }


    gatherFormData(){

        const plaintext = this.mode == "hex" ? 
            Utils.hexStringToArray(this.plaintextHexadecimalField.value.replace(/\s/g, ''))
        : Utils.toArray(this.plaintextField.value);
        
        ;
        return {
            plaintext,
            key: this.KeyField.value,
        }
    }

    isHex(hexString){
        var re = /[0-9A-Fa-f]{6}/g;
        if(hexString.length == 32 && re.test(hexString)) return true
        return false;
    }

    validateFormData(data){
        this.errorField.innerHTML = ""
        let errorMessage = "";

        if(!this.isHex(data.key)){
            errorMessage = this.controller.locale.getLocaleText("formErrorMessage")
        }

        if(data.key.length == 0){
            errorMessage = this.controller.locale.getLocaleText("formErrorKeyNotEmpty")
        }

        if(data.plaintext.length == 0){
            errorMessage = this.controller.locale.getLocaleText("formErrorPlaintextNotEmpty")
        }

        this.errorField.innerHTML = errorMessage;
        return !errorMessage;
    }



    

    onEcryptClick(update=false){
        const formData = this.gatherFormData();

        if(this.validateFormData(formData)){
      
            const [ciphertext, info] = this.excuteRijndaelAES(formData);



            // update output field
            const preparedCipherText = this.prepareHexOutputString(ciphertext)
            this.outputField.value = preparedCipherText;

            // prepare data for animation
            const preparedInfo = this.prepareRijndaelDataForDisplay(info)

            // update plaintext hexadecimal
            const plaintextHexInput = intToHexStringArray(info["plaintext"]).join("")
            const plaintextHexInputPrepared = this.prepareHexOutputString(plaintextHexInput)
           // this.plaintextHexadecimalField.value = plaintextHexInputPrepared

            // call data controller to update
            this.controller.data.updateStoreByObject(preparedInfo)
            if(update)
                this.controller.timeline.saveAndRebuildTimeline();
        }
    }

    prepareHexOutputString = (hexString) => {
        let outputString = ""
        const blocks = hexString.match(/.{1,32}/g)

        blocks.forEach((block, i) => {
            const hexadecimals = block.match(/.{1,2}/g)
            if(i != 0) outputString += " "
            outputString += hexadecimals.join("")
          
        })
        return outputString
    }
}

export default RijndaelFormController