function sha256(msg) {

    if(!msg.trim()) {
        return
    }


    const crSteps = true

    let steps = {
        "str_to_hash" : "",
        "init_constants" : [],
        "input_to_bit_translation" : [],
        "input_length_preprocessing" : [],
        "final_input_preprocessing" : [],
        "final_input_preprocessing_result" : [],
        "main_algorithm" : [],
        "hash_digest" : "",
    }

    let main_algorithm_structure = {
        chunk_number : undefined,
        chunk_preprocessed : undefined,
        loop1 : [],
        preConstants : undefined,
        loop2 : [],
        old_constants : undefined,
        new_constants : undefined
    }

    let loop1_struct = {
        lp1_sh1 : undefined,
        lp1_sh2 : undefined,
        lp1_add1 : undefined,
        lp1_add2 : undefined,
        lp1_s0 : undefined,
        lp1_s1 : undefined,
        lp1_y : undefined,
        lp1_w : undefined
    }

    let loop2_struct = {
        lp2_S1 : undefined,
        lp2_ch : undefined,
        lp2_temp1 : undefined,
        lp2_S0 : undefined,
        lp2_m : undefined,
        lp2_temp2 : undefined,
        loop2_constants : undefined,
    }


    var h = ["0x6a09e667", "0xbb67ae85", "0x3c6ef372", "0xa54ff53a", "0x510e527f", "0x9b05688c", "0x1f83d9ab", "0x5be0cd19"]

    var k = ["0x428a2f98", "0x71374491", "0xb5c0fbcf", "0xe9b5dba5", "0x3956c25b", "0x59f111f1", "0x923f82a4","0xab1c5ed5", "0xd807aa98",
            "0x12835b01", "0x243185be", "0x550c7dc3", "0x72be5d74","0x80deb1fe","0x9bdc06a7", "0xc19bf174", "0xe49b69c1", "0xefbe4786",
            "0x0fc19dc6", "0x240ca1cc", "0x2de92c6f","0x4a7484aa", "0x5cb0a9dc","0x76f988da", "0x983e5152", "0xa831c66d", "0xb00327c8",
            "0xbf597fc7","0xc6e00bf3", "0xd5a79147", "0x06ca6351", "0x14292967", "0x27b70a85","0x2e1b2138", "0x4d2c6dfc","0x53380d13",
            "0x650a7354", "0x766a0abb", "0x81c2c92e", "0x92722c85", "0xa2bfe8a1", "0xa81a664b","0xc24b8b70","0xc76c51a3", "0xd192e819",
            "0xd6990624", "0xf40e3585", "0x106aa070", "0x19a4c116","0x1e376c08", "0x2748774c", "0x34b0bcb5", "0x391c0cb3","0x4ed8aa4a",
            "0x5b9cca4f", "0x682e6ff3","0x748f82ee", "0x78a5636f", "0x84c87814", "0x8cc70208", "0x90befffa", "0xa4506ceb", "0xbef9a3f7",
            "0xc67178f2"]

    function isTrue(x) {
        return x == 1
    }

    function if_(i, y, z) {
        if(isTrue(i)){return y}else{return z}
    }

    function and_(i, j) {
        return if_(i, j, 0)
    }

    function AND(i, j) {
        let c_stop = Math.min(i.length, j.length)

        let result = Array()

        for(let c = 0; c<c_stop; c++) {
            result.push(and_(i.slice()[c], j.slice()[c]))
        }

        return result
    }


    function not_(i) {
        return if_(i, 0, 1)
    }

    function NOT(i) {
        let result = Array()

        for(let c = 0; c<i.length; c++) {
            result.push(not_(i.slice()[c]))
        }

        return result
    }

    function xor(i, j) {
        return if_(i, not_(j), j)
    }

    function XOR(i, j) {
        let c_stop = Math.min(i.length, j.length)
        let result = Array()

        for(let c = 0; c<c_stop; c++) {
            result.push(xor(i.slice()[c], j.slice()[c]))
        }

        return result
    }

    function xorxor(i, j, l) {
        return xor(i, xor(j, l))
    }

    function XORXOR(i, j, l) {

        let c_stop = Math.min(Math.min(i.length, j.length), l.length)

        let result = Array()

        for(let c = 0; c<c_stop; c++) {
            result.push(xorxor(i.slice()[c], j.slice()[c], l.slice()[c]))   
        }

        return result
    }

    function maj(i, j, k) {

        let arr = [i, j, k].slice()
        let count = {}

        for(const element of arr) {

            if(count[element]) {
                count[element] += 1;

            }else {
                count[element] = 1;
            }
        }

        let keys = Array()
        let values = Array()

        for(let c = 0; c<3; c++) {
            values.push(count[arr[c]])
            keys.push(arr[c])
        }

        let big = 0

        for(let c = 0; c<keys.length; c++) {
            if(values[c] > values[big]) {
                big = c
            }
        }

        return keys[big]
    }

    function translate(message) {

        let chars = [...message]
        let result = Array()
        
        let stepsInformation = []

        for(let c = 0; c <chars.length; c++) {

            let charcode = (((chars[c]).charCodeAt()).toString(2))

            if(crSteps) {
                stepsInformation.push(chars[c])
                stepsInformation.push(String(chars[c].charCodeAt()))
            }

            while(charcode.length != 8) {
                charcode = "0" + charcode
            }
            if(crSteps) {stepsInformation.push(charcode)}

            for(let g = 0; g<charcode.length; g++) {
                result.push(Number(charcode[g]))
            }

            if(crSteps) {
                steps.input_to_bit_translation.push(stepsInformation)
                stepsInformation = []
            }
        }

        return result
    }

    function fillZeros(bits, length=8, endian) {

        let bitLength = bits.length

        if (endian == "LE") {
            for(let c = bitLength; c<length; c++) {
                bits.push(0)
            }

        } else {

            let toAdd = Array()

            for(let c = bitLength; c<length; c++) {
                toAdd.push(0)
            }

            Array.prototype.unshift.apply(bits, toAdd)
        }

        return bits
    }

    function chunker(bits, chunk_length=8) {

        let chunked = Array()

        for (let i = 0; i < bits.length; i += chunk_length) {
            let chunk = bits.slice(i, i + chunk_length);
            chunked.push(chunk)
        }

        return chunked
    }

    function b2Tob16(b2) {

        let value = chunker(b2, 4)
        let result = ""

        for(let c = 0; c<value.length; c++) {

            let tempSTR = ""

            for(let _c = 0; _c<value[c].length; _c++) {
                tempSTR += value[c][_c]
            }

            result += [parseInt(Number(tempSTR), 2).toString(16)]
        }

        return result
    }

    function initializer(values) {

        let result = Array()
        let stepsInformation = []

        for(let c = 0; c<values.length; c++) {

            if(crSteps) {
                stepsInformation.push(values[c])
                stepsInformation.push(String(parseInt(values[c], 16)))
                let temp = parseInt(values[c].slice(), 16).toString(2)
                while(temp.length != 32) {
                    temp = "0" + temp
                }
                stepsInformation.push(temp)
            }

            let toPush = [...parseInt(values[c], 16).toString(2)].map(Number)

            while(toPush.length != 32) {
                toPush.unshift(0)
            }

            if(crSteps) {
                steps.init_constants.push(stepsInformation)
                stepsInformation = []
            }
            stepsInformation = []

            result.push(toPush)
        }
        return result
    }

    function preprocessMessage(message) {

        let bits = translate(message)
        let bits_length = bits.length

        let stepsInformation = []

        if(crSteps) {
            let temp = bits_length
            stepsInformation.push(String(temp))
            let temp2 = String(temp.toString(2))
            stepsInformation.push(temp2)
            temp = fillZeros([...temp.toString(2)].map(Number), 64, "BE")
            let strToPush = ""
            for(let c = 0; c<temp.length; c++) {
                strToPush = strToPush + String(temp[c])
            }
            stepsInformation.push(strToPush)
            steps.input_length_preprocessing.push(stepsInformation)
            stepsInformation = []
        }

        let bits_length_as_binary = fillZeros([...bits_length.toString(2)].map(Number), 64, "BE")


        if(bits_length < 448) {

            if(crSteps) {
                let copy = bits.slice()

                copy.push(Number(1))

                let toPush = ""

                for(let c = 0; c<copy.length; c++) {
                    toPush += copy[c]
                }
                stepsInformation.push(toPush)
                toPush = ""

                fillZeros(copy, 448, "LE")

                for(let c = 0; c<copy.length; c++) {
                    toPush += copy[c]
                }
                stepsInformation.push(toPush)
                toPush = ""

                copy.push.apply(copy, bits_length_as_binary.slice())

                for(let c = 0; c<copy.length; c++) {
                    toPush += copy[c]
                }
                stepsInformation.push(toPush)
                steps.final_input_preprocessing_result.push(toPush)
                toPush = ""

                steps.final_input_preprocessing.push(stepsInformation)
            }

            bits.push(Number(1))
            bits = fillZeros(bits, 448, "LE")
            bits.push.apply(bits, bits_length_as_binary)

            return [bits]

        }else if(448 <= bits_length && bits_length <= 512) {
            if(crSteps) {
                let copy = bits.slice()

                let toPush = ""

                copy.push(Number(1))

                for(let c = 0; c<copy.length; c++) {
                    toPush += String(copy[c])
                }
                stepsInformation.push(toPush)
                toPush = ""

                fillZeros(copy, 1024, "LE")

                for(let c = 0; c<copy.length; c++) {
                    toPush += String(copy[c])
                }
                stepsInformation.push(toPush)
                toPush = ""

                copy.splice(-64, 64)
                copy.push.apply(copy, bits_length_as_binary.slice())

                for(let c = 0; c<copy.length; c++) {
                    toPush += String(copy[c])
                }
                stepsInformation.push(toPush)
                toPush = ""

                steps.final_input_preprocessing.push(stepsInformation)

                copy = chunker(copy, 512)

                for(let c = 0; c<copy.length; c++) {
                    for(let c_ = 0; c_<copy[c].length; c_++) {
                        toPush += String(copy[c][c_])
                    }
                    steps.final_input_preprocessing_result.push(toPush)
                    toPush = ""
                }

            }

            bits.push(Number(1))
            bits = fillZeros(bits, 1024, "LE")
            bits.splice(-64, 64)
            bits.push.apply(bits, bits_length_as_binary)

            return chunker(bits, 512)

        }else {

            if(crSteps) {
                let copy = bits.slice()
                let toPush = ""

                copy.push(Number(1))

                for(let c = 0; c<copy.length; c++) {
                    toPush += String(copy[c])
                }
                stepsInformation.push(toPush)
                toPush = ""

                while(copy.length % 512 != 0) {
                    copy.push(Number(0))
                }

                for(let c = 0; c<copy.length; c++) {
                    toPush += String(copy[c])
                }
                stepsInformation.push(toPush)
                toPush = ""

                copy.splice(-64, 64)
                copy.push.apply(copy, bits_length_as_binary.slice())

                for(let c = 0; c<copy.length; c++) {
                    toPush += String(copy[c])
                }
                stepsInformation.push(toPush)
                toPush = ""

                steps.final_input_preprocessing.push(stepsInformation)

                copy = chunker(copy, 512)

                for(let c = 0; c<copy.length; c++) {
                    for(let c_ = 0; c_<copy[c].length; c_++) {
                        toPush += String(copy[c][c_])
                    }
                    steps.final_input_preprocessing_result.push(toPush)
                    toPush = ""
                }
            }

            bits.push(Number(1))
            while(bits.length % 512 != 0) {
                bits.push(Number(0))
            }
            bits.splice(-64, 64)
            bits.push.apply(bits, bits_length_as_binary)

            return chunker(bits, 512)

        }
    }

    function rotr(x, n) {

        for(let c = 0; c<n; c++) {
            x.unshift(x.pop());
        }

        return x
    }
        
    function shr(x, n) {

        for(let c = 0; c<n; c++) {
            x.pop()
            x.unshift(0)
        }

        return x
    }

    function add(i, j) {

        let length = i.length

        let sums = Array()

        for(let c = 0; c<length; c++) {
            sums.push(c)
        }

        let c = 0

        for(x = length-1; x != 0-1; x--) {
            sums[x] = xorxor(i[x], j[x], c)
            c = maj(i[x], j[x], c)
        }

        return sums
    }


    function getSHA256Digest(message) {
        if(crSteps) {steps.str_to_hash = message}

        k = initializer(k)

        hConstants = initializer(h)

        let h0 = hConstants[0]
        let h1 = hConstants[1]
        let h2 = hConstants[2]
        let h3 = hConstants[3]
        let h4 = hConstants[4]
        let h5 = hConstants[5]
        let h6 = hConstants[6]
        let h7 = hConstants[7]

        chunks = preprocessMessage(message)

        for(let x = 0; x<chunks.length; x++) {

            if(crSteps) {structCopy = Object.assign({}, main_algorithm_structure)}

            if(crSteps) {structCopy.chunk_number = x}

            let w = chunker(chunks[x], 32)

            for(let m = 0; m != 48; m++) {
                w.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            }

            if(crSteps) {
                let toPush = []
                for(let c = 0; c<w.length; c++) {
                    let temp = ""
                    for(let c_ = 0; c_<w[c].length; c_++) {
                        temp += String(w[c][c_])
                    }
                    toPush.push(temp)
                }
                structCopy.chunk_preprocessed = toPush.slice()
            }

            for(let y = 16; y<64; y++) {

                if(crSteps) {copy_loop1_struct = Object.assign({}, loop1_struct)}

                const sh1 = y-15
                const sh2 = y-2

                const add1 = y-16
                const add2 = y-7


                const s0 = XORXOR(rotr(w[sh1].slice(), 7), rotr(w[sh1].slice(), 18), shr(w[sh1].slice(), 3))

                const s1 = XORXOR(rotr(w[sh2].slice(), 17), rotr(w[sh2].slice(), 19), shr(w[sh2].slice(), 10))

                w[y] = add(add(add(w[add1].slice(), s0), w[add2].slice()), s1)

                if(crSteps) {
                    copy_loop1_struct.lp1_sh1 = sh1
                    copy_loop1_struct.lp1_sh2 = sh2

                    copy_loop1_struct.lp1_add1 = add1
                    copy_loop1_struct.lp1_add2 = add2

                    copy_loop1_struct.lp1_s0 = s0.slice()
                    copy_loop1_struct.lp1_s1 = s1.slice()
                    copy_loop1_struct.lp1_y = y

                    if(crSteps) {
                        let toPush= []
                        for(let c = 0; c<w.length; c++) {
                            let temp = ""
                            for(let c_ = 0; c_<w[c].length; c_++) {
                                temp += String(w[c][c_])
                            }
                            toPush.push(temp)
                        }
                        copy_loop1_struct.lp1_w = toPush.slice()
                    }

                    structCopy.loop1.push(copy_loop1_struct)

                }

            }

            let a = h0
            let b = h1
            let c = h2
            let d = h3
            let e = h4
            let f = h5
            let g = h6
            let h = h7

            if(crSteps) {
                let preConstantsTemp = [a.slice(), b.slice(), c.slice(), d.slice(), e.slice(), f.slice(), g.slice(), h.slice()]

                let toPush = []

                for(let c = 0; c<preConstantsTemp.length; c++) {
                    let temp = ''
                    for(let c_ = 0; c_<preConstantsTemp[c].length; c_++) {
                        temp += String(preConstantsTemp[c][c_])
                    }
                    toPush.push(temp)   
                }

                structCopy.preConstants = toPush
            }

            for(let z = 0; z<64; z++) {

                if(crSteps) {copy_loop2_struct = Object.assign({}, loop2_struct)}

                const S1 = XORXOR(rotr(e.slice(), 6), rotr(e.slice(), 11), rotr(e.slice(), 25))

                const ch = XOR(AND(e.slice(), f.slice()), AND(NOT(e.slice()), g.slice()))

                const temp1 = add(add(add(add(h.slice(), S1.slice()), ch.slice()), k[z].slice()), w[z].slice())

                const S0 = XORXOR(rotr(a.slice(), 2), rotr(a.slice(), 13), rotr(a.slice(), 22))

                const m = XORXOR(AND(a.slice(), b.slice()), AND(a.slice(), c.slice()), AND(b.slice(), c.slice()))

                const temp2 = add(S0.slice(), m.slice())

                if(crSteps) {
                    copy_loop2_struct.S1 = S1.slice()
                    copy_loop2_struct.ch = ch.slice()
                    copy_loop2_struct.temp1 = temp1.slice()
                    copy_loop2_struct.S0 = S0.slice()
                    copy_loop2_struct.m = m.slice()
                    copy_loop2_struct.temp2 = temp2.slice()
                }

                h = g
                g = f
                f = e

                e = add(d.slice(), temp1.slice())

                d = c
                c = b
                b = a

                a = add(temp1.slice(), temp2.slice())


                if(crSteps) {

                    let loop2_constants_temp = [a, b, c, d, e, f, g, h]

                    let toPushStruct = []
                    for(let c = 0; c<loop2_constants_temp.length; c++) {
                        let tempSTR = ""
                        for(let c_ = 0; c_<loop2_constants_temp[c].length; c_++) {
                            tempSTR += String(loop2_constants_temp[c][c_])
                        }
                        toPushStruct.push(tempSTR)
                    }

                    copy_loop2_struct.loop2_constants = toPushStruct
                    structCopy.loop2.push(copy_loop2_struct)
                }
            }

            if(crSteps) {
                let toPush = []
                let const_keys = [h0, h1, h2, h3, h4, h5, h6, h7]

                for(let c = 0; c<const_keys.length; c++) {
                    let temp = ""
                    for(let c_ = 0; c_<const_keys[c].length; c_++) {
                        temp += String(const_keys[c][c_])
                    }
                    toPush.push(temp)
                }

                structCopy.old_constants = toPush
            }

            h0 = add(h0.slice(), a.slice())
            h1 = add(h1.slice(), b.slice())
            h2 = add(h2.slice(), c.slice())
            h3 = add(h3.slice(), d.slice())
            h4 = add(h4.slice(), e.slice())
            h5 = add(h5.slice(), f.slice())
            h6 = add(h6.slice(), g.slice())
            h7 = add(h7.slice(), h.slice())

            if(crSteps) {
                let toPush = []
                let const_keys = [h0, h1, h2, h3, h4, h5, h6, h7]

                for(let c = 0; c<const_keys.length; c++) {
                    let temp = ""
                    for(let c_ = 0; c_<const_keys[c].length; c_++) {
                        temp += String(const_keys[c][c_])
                    }
                    toPush.push(temp)
                }

                structCopy.new_constants = toPush
            }

            if(crSteps) {steps.main_algorithm.push(structCopy)}

        }

        let resToHex = ""

        resToHex += b2Tob16(h0)
        resToHex += b2Tob16(h1)
        resToHex += b2Tob16(h2)
        resToHex += b2Tob16(h3)
        resToHex += b2Tob16(h4)
        resToHex += b2Tob16(h5)
        resToHex += b2Tob16(h6)
        resToHex += b2Tob16(h7)

        if(crSteps) {steps.hash_digest = resToHex}

    }

    getSHA256Digest(msg)

    if(crSteps) {
        return steps
    }

}