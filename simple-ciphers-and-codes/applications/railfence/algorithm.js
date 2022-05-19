
class RailfenceAlgorithm {

    static encrypt({ value, alphabet, key }) {
        
        // remove all characters that are not alphabet
        let regex = new RegExp("[^" + alphabet + "]", "g")
        value = value.replace(regex, "")

        console.log(value, alphabet, key)

        let rails = parseInt(key.get("rails")?.value) + 2
        let offset = parseInt(key.get("offset")?.value)
        let rows = [], direction

        if(offset < rails) {
            if(offset === (rails - 1)) direction = -1
            else direction = 1
        }
        
        else {
            offset = (rails * 2) - 2 - offset
            direction = -1
        }

        for(let i = 0; i < value.length; i += 1) {
            for(let j = 0; j < rails;  j += 1) {
                if(j === offset) rows[offset] = value.substr(i, 1)
                else rows[j] = " "
            }
            offset += direction
            if(offset < 0) {
                offset = 1
                direction = 1
            } else 
            if(offset === rails) {
                offset = rails - 2
                direction = -1
            }
        }

        console.log(rows)

        return rows.join("").replace(/\s+/g, "")
    }

    static decrypt({ value, alphabet, key }) {
        console.log("decrypt", value, alphabet, key)
        return value + alphabet + key + ""
    }

}

export default RailfenceAlgorithm
