/*
 @author D.Kuche
 @date 07.2017
 */
export default new function ArrayLib() {

    this.valueIn = function(array, value) {
        for (let obj of array) {
            for (let item in obj) {
                if (obj[item] === value) {
                    return true;
                }
            }
        }
        return false;
    };

}