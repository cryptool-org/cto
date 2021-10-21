export const generateRandomBinaryString = (length=10) => {
    let binaryString = "";
    for(let i = 0; i < length; i++){
        binaryString += Math.round(Math.random())
    }
    return binaryString;
}

export const generatRandomBinaryStrings = (stringCount=1, length=10) => {
    let binaryStrings = []
    for(let i = 0; i < stringCount; i++){
        binaryStrings.push(generateRandomBinaryString(length))
    }
    return binaryStrings
}

export const degreeToRadians = (degrees) => {
    const pi = Math.PI;
    return degrees * (pi/180);
}

export const getRandomHexValueList = (count=1, length=2) => {
    const hexValueList = []
    for(let i = 0; i < count; i++){
        hexValueList.push(getRandomHexVal(length))
    }
    return hexValueList
}

export const getRandomHexVal = (length=2) => {
    let hex = "";
    for(let i = 0; i < length; i++){
        hex += toHex(Math.floor(Math.random() * 16))
    }
    return hex;
}

export function toHex(d) {
    const hexString =  (Number(d).toString(16)).slice(-2).toUpperCase()
    return hexString.length == 1 ? "0"+hexString : hexString;
}


export function toHexString(d) {
    return (Number(d).toString(16)).slice(-2).toUpperCase()
}


export function intToHexStringArray(intArray){
    return intArray.map(num => toHex(num))
}

export const hexStringToInt = (hex) => {
   if(!hex) return 0;
    return parseInt(hex.replace(/^#/, ''), 16);
}