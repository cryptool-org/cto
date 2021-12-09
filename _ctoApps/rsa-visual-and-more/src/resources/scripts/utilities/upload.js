/**
 * 
 * @param {*} file 
 * @param {*} json 
 */
const read_file_content = (file, json = false) => {
    return new Promise(function (resolve, reject) {

        const reader = new FileReader();
        let res = null
        if (file == null) return "no file found"
        reader.readAsText(file);
        reader.onload = function () {

            try {
                if (json) {
                    res = JSON.parse(reader.result);
                }
                else {
                    res = (reader.result)
                }

            } catch (e) {
                reject(`${file.name} is invalid`)

            }

            resolve(res);
        }
        reader.onerror = function () {
            reject("Error")
        }



    })

}


export default read_file_content