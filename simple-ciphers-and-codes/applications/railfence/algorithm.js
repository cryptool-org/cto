
class RailfenceAlgorithm {

    static encrypt({ value, alphabet, key }) {
        
        // remove all characters that are not alphabet
        let regex = new RegExp("[^" + alphabet + "]", "g")
        value = value.replace(regex, "")

        // define variables we're gonna use
        let rails = parseInt(key.get("rails")?.value)
        let offset = parseInt(key.get("offset")?.value)
        let rows = [], direction

        // init rows array
        for(let i = 0; i < rails; i += 1) rows[i] = ""

        if(offset < rails) {
            if(offset === (rails - 1)) direction = -1
            else direction = 1
        }
        
        else {
            offset = (rails * 2) - 2 - offset
            direction = -1
        }

        for(let i = 0; i < value.length; i += 1) {
            for(let j = 0; j < rails; j += 1) {
                if(j === offset) rows[offset] += value.substr(i, 1)
                else rows[j] += " "
            }
            offset += direction
            if(offset < 0) {
                offset = 1
                direction = 1
            } 
            else if(offset === rails) {
                offset = rails - 2
                direction = -1
            }
        }

        return {
            value: rows.join("").replace(/\s+/g, ""), // default ciphertext
            railfenceRows: rows
        }
    }

    static decrypt({ value, alphabet, key }) {
        
        // remove all characters that are not alphabet
        let regex = new RegExp("[^" + alphabet + "]", "g")
        value = value.replace(regex, "")

        // define variables we're gonna use
        let rails = parseInt(key.get("rails")?.value)
        let offset = parseInt(key.get("offset")?.value)
        let result = "", oneTurn = rails*2-2, n = Math.floor(value.length / oneTurn)

        offset = offset % oneTurn
        if(offset < 0) offset = offset + oneTurn

        let k = value.length + offset
        let off = []; off[0] = Math.ceil(offset / oneTurn)

        for(let i = 1; i < oneTurn/2; i += 1)
            off[i] = Math.ceil((offset - i) / oneTurn) + Math.floor((offset + i - 1) / oneTurn)
        off[oneTurn/2] = Math.ceil((offset - oneTurn/2) / oneTurn)

        let xs = []
        for (let i = 0; i <= oneTurn/2; i += 1) {
            if(off[i] == 0) xs[i] = ""
            if(off[i] == 1) xs[i] = " "
            if(off[i] == 2) xs[i] = "  "
        }

        let blocklen, a = []
        value = xs[0] + value
        a[0] = value.slice(0, Math.ceil(k/oneTurn)).split("")
        value = xs[1] + value.slice(Math.ceil(k/oneTurn)) // slices to end
        for(let i = 1; i < oneTurn/2; i += 1) {
            blocklen = Math.ceil((k - i) / oneTurn) + Math.floor((k + i - 1) / oneTurn)
            a[i] = value.slice(0, blocklen).split("")
            value = xs[i+1] + value.slice(blocklen)
        }
        a[oneTurn/2] = value.split("")

        let j = 0, increment
        while(a[j].length > 0) {
            result = result + a[j].shift()
            if(j == 0) increment = 1
            if(j == oneTurn/2) increment = -1
            j = j + increment
        }

        value = result.substr(offset)
        return { value, railfenceRows: RailfenceAlgorithm.encrypt({ value, alphabet, key }).railfenceRows }
    }

}

export default RailfenceAlgorithm
