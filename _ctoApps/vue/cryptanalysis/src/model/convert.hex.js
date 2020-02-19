
export default new function ConvertHex() {

// This function takes an array of bytes (byteArray) and converts them
// to a hexadecimal string. Array element 0 is found at the beginning of
// the resulting string, high nibble first. Consecutive elements follow
// similarly, for example [16, 255] --> "10ff". The function returns a
// string.

    this.byteArrayToHex = byteArrayToHex;
    function byteArrayToHex(byteArray) {
        var result = "";
        if (!byteArray) { return; }

        for (let k = 0; k < byteArray.length; k++) {
            result += ((byteArray[k] < 16) ? "0" : "") + byteArray[k].toString(16);
        }

        return result;
    }

// This function converts a string containing hexadecimal digits to an
// array of bytes. The resulting byte array is filled in the order the
// values occur in the string, for example "10FF" --> [16, 255]. This
// function returns an array.

    this.hexToByteArray = hexToByteArray;
    function hexToByteArray(hexString) {
        // must have even length
        if (hexString.length % 2) { return; }
        if (hexString.indexOf("0x") == 0 || hexString.indexOf("0X") == 0) {
            hexString = hexString.substring(2);
        }

        let byteArray = [];
        for (let k = 0; k < hexString.length; k += 2) {
            byteArray.push(parseInt(hexString.slice(k, k + 2), 16));
        }
        return byteArray;
    }

};