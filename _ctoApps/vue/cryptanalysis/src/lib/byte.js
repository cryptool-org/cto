export default new function Byte() {

    this.objectToByte = function(obj) {
        var bytes = [];
        for (let key in obj) {
            for (let k = 0; k < key.length; k++) {
                bytes.push(key.charCodeAt(k));
            }
        }
        console.log(bytes);
        console.log(bytes.length);
        return bytes;
    };
}