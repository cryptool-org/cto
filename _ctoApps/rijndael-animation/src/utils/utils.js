




export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export const dashedStringToCammelCase = ( str )  => {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

export const generateRandomBinaryString = (length=10) => {
    let binaryString = "";
    for(let i = 0; i < length; i++){
        binaryString += Math.round(Math.random())
    }
    return binaryString;
}

export const generateRandomBinaryStrings = (stringCount=1, length=10) => {
    let binaryStrings = []
    for(let i = 0; i < stringCount; i++){
        binaryStrings.push(generateRandomBinaryString(length))
    }
    return binaryStrings
}






export const shiftArray = (array, places) =>{
    const arrayCopy = [...array];
    return arrayCopy.concat(arrayCopy.splice(0, places)) 
}
