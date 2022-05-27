import RailfenceAlgorithm from "../railfence/algorithm"

class RedefenceAlgorithm {

    static encrypt({ value, alphabet, key }) {
        
        const rails = parseInt(key.get("rails")?.value)
        const order = key.get("order").value.trim().split(" ").map(elem => parseInt(elem))
        const rows  = RailfenceAlgorithm.encrypt({ value, alphabet, key }).railfenceRows

        let result = ""
        for(let i = 0; i < rails; i += 1) 
            result += rows[order[i]-1]?.replace(/\s+/g, "") || ""
        
        return { value: result, railfenceRows: rows }
    }

    static decrypt({ value, alphabet, key }) {

        // remove all characters that are not alphabet
        let regex = new RegExp("[^" + alphabet + "]", "g")
        value = value.replace(regex, "")

        const rails = parseInt(key.get("rails")?.value)
        const offset = parseInt(key.get("offset")?.value)
        const order = key.get("order").value.trim().split(" ").map(elem => parseInt(elem))

        const oneTurn = rails * 2 - 2, halfTurn = oneTurn/2
        let turns = [], len = value.length, resultArray = []

        for(let i = 0; i < rails; i += 1) {
            turns[i] = Math.floor(len / oneTurn) * 2
            resultArray[i] = ""
        }
        turns[0] = 0
        turns[rails-1] = 0

        if(offset > 0) {
            if(offset <= halfTurn+1) for(let i = 0; i < offset; i += 1) turns[i] = turns[i] - 1
            else {
                for(let i = 0; i < halfTurn; i += 1) turns[i] = turns[i] - 1
                for(let i = halfTurn; i > halfTurn - (offset % halfTurn); i -= 1) turns[i] = turns[i] - 1
            }
            if(len % oneTurn < (len + offset) % oneTurn) {
                if((len + offset) % oneTurn <= halfTurn + 1 && (len + offset) % oneTurn > 0)
                    for(let i = (len + offset) % oneTurn; i > len % oneTurn; i = (i - 1) % oneTurn)
                        turns[i - 1] = turns[i - 1] + 1
                else {
                    if(len % oneTurn < halfTurn + 1) {
                        for(let i = halfTurn + 1; i > len % oneTurn; i -= 1) turns[i - 1] = turns[i - 1] + 1
                        for(let i = halfTurn - ((len + offset) % halfTurn - 1); i < halfTurn; i += 1) turns[i] = turns[i] + 1
                    }
                    else {
                        if((len - 1) % halfTurn != 0) 
                            for(let i = halfTurn - ((len + offset - 1) % halfTurn); i <= len % halfTurn; i = (i + 1) % halfTurn)
                                turns[i] = turns[i] + 1
                        else for (var i = halfTurn-1; i >= halfTurn - (len + offset - 1) % halfTurn; i -= 1) turns[i] = turns[i] + 1
                    }
                }
            }
            else {
                if((len + offset) % oneTurn == 0) {
                    for(let i = 0; i < oneTurn; i += 1) 
                        if(i <= oneTurn/2) turns[i] = turns[i] + 1
                        else turns[oneTurn-i] = turns[oneTurn-i] + 1
                    for(let i = 0; i < len % oneTurn; i += 1)
                        if(i <= oneTurn/2) turns[i] = turns[i] - 1
                        else turns[oneTurn-i] = turns[oneTurn-i] - 1
                }
                else {
                    if(len % oneTurn != halfTurn + 1) {
                        if(len % oneTurn < halfTurn + 1) {
                            for(let i = halfTurn; i > (len - 1) % halfTurn; i -= 1) turns[i] = turns[i] + 1
                            for(let i = halfTurn - 1; i >= halfTurn - ((len - 1) % halfTurn); i -= 1) turns[i] = turns[i] + 1
                        }
                        if((len + offset) % oneTurn == 1) {
                            for(let i = halfTurn - (len - 1) % halfTurn; i > halfTurn - (len + offset - 2) % halfTurn; i -= 1)
                                turns[i - 1] = turns[i - 1] + 1
                            turns[0] = turns[0] + 1
                        }
                        else {
                            if((len + offset) % oneTurn <= halfTurn) {
                                for(let i = halfTurn - (len - 1) % halfTurn; i > 1; i -= 1)
                                    turns[i - 1] = turns[i - 1] + 1
                                turns[0] = turns[0] + 1
                                for(let i = 1; i <= (len + offset - 1) % halfTurn; i += 1)
                                    turns[i] = turns[i] + 1
                            }
                            else {
                                for(let i = halfTurn - (len - 1) % halfTurn; i > 1; i -= 1)
                                    turns[i - 1] = turns[i - 1] + 1
                                turns[0] = turns[0] + 1
                                for(let i = 1; i <= halfTurn; i++) turns[i] = turns[i] + 1
                                if((len + offset) % halfTurn != 1)
                                    for(let i = halfTurn - 1; i > (len + offset) % halfTurn; i -= 1)
                                        turns[i] = turns[i] + 1
                            }
                        }
                    }
                    else {
                        if((len + offset) % oneTurn == 1) {
                            for(let i = halfTurn - (len - 1) % halfTurn; i > halfTurn - (len + offset - 2) % halfTurn; i -= 1)
                                turns[i - 1] = turns[i - 1] + 1
                            turns[0] = turns[0] + 1
                        }
                        else {
                            if((len + offset) % oneTurn <= halfTurn) {
                                for(let i = halfTurn - (len - 1) % halfTurn; i > 1; i -= 1)
                                    turns[i - 1] = turns[i - 1] + 1
                                turns[0] = turns[0] + 1
                                for(let i = 1; i <= (len + offset - 1) % halfTurn; i += 1)
                                    turns[i] = turns[i] + 1
                            }
                            else {
                                for(let i = halfTurn - (len - 1) % halfTurn; i > 1; i -= 1)
                                    turns[i - 1] = turns[i - 1] + 1
                                turns[0] = turns[0] + 1
                                for(let i = 1; i <= halfTurn; i += 1) turns[i] = turns[i] + 1
                                if((len + offset) % halfTurn != 1)
                                    for(let i = halfTurn - 1; i > (len + offset) % halfTurn; i -= 1)
                                        turns[i] = turns[i] + 1
                            }
                        }
                    }
                }
            }
        }

        turns[0] += Math.floor(len / oneTurn)
        turns[rails-1] += Math.floor(len / oneTurn)

        for(let i = 0; i < (len % oneTurn); i += 1)
            if(i <= halfTurn) turns[i] = turns[i] + 1
            else turns[oneTurn-i] = turns[oneTurn-i] + 1
        
        for(let i = 0; i < rails; i += 1) {
            const m = order[i] - 1
            for(let j = 0; j < turns[m]; j += 1) {
                resultArray[m] += value.charAt(0)
                value = value.slice(1)
            }
        }

        value = resultArray.join("").replace(regex, "")
        value = RailfenceAlgorithm.decrypt({ value, alphabet, key }).value

        return { value, railfenceRows: RedefenceAlgorithm.encrypt({ value, alphabet, key }).railfenceRows }

    }

}

export default RedefenceAlgorithm
