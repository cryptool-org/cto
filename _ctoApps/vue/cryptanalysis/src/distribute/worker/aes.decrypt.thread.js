import Threads from 'threads';

export default function AESDecryptThread() {
    const spawn = Threads.spawn;

    this.kill = function() {
        this.thread.kill();
    };

    this.thread = spawn(function (input, done) {
        let obj = input;

        //console.log('Hi, i am decrypt with key: ' + obj.key);
        //console.log('Hi, i am decrypt with ctxt: ' + obj.ctxt.length);

        var blockSizeInBits = 128;//obj.blockSizeInBits;
        //var roundsArray = obj.roundsArray;
        // The number of bytes to shift by in shiftRow, indexed by [Nb][row]
        var shiftOffsets = [, , , , [, 1, 2, 3], , [, 1, 2, 3], , [, 1, 3, 4]];

        // The round constants used in subkey expansion
        var Rcon = [
            0x01, 0x02, 0x04, 0x08, 0x10, 0x20,
            0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8,
            0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc,
            0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4,
            0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

        // Precomputed lookup table for the SBox
        var SBox = [
            99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171,
            118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164,
            114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113,
            216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226,
            235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214,
            179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203,
            190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69,
            249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245,
            188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68,
            23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42,
            144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73,
            6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109,
            141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37,
            46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62,
            181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225,
            248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223,
            140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187,
            22];

        // Precomputed lookup table for the inverse SBox
        var SBoxInverse = [
            82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215,
            251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222,
            233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66,
            250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73,
            109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92,
            204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21,
            70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247,
            228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2,
            193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220,
            234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173,
            53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29,
            41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75,
            198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168,
            51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81,
            127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160,
            224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97,
            23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12,
            125];

        var Nk = obj.keySizeInBits / 32;
        var Nb = 4; //blockSizeInBits / 32;
        var Nr = Nk + 6; //roundsArray[Nk][Nb];

        let txtLength = obj.ctxt.length;
        if (obj.maxComputeLen && obj.maxComputeLen < obj.ctxt.length) {
            txtLength = obj.maxComputeLen;
        }

        var key = hexToByteArray(obj.obj.key);
        var expandedKey = keyExpansion(key);

        //console.log('Hi, i am decrypt with key (res): ' + obj.mode);

        //var arr = start(obj.ctxt, obj.key, obj.mode, txtLength);
        var arr = [];
        if (obj.mode === "CBC") {
            arr = startCBC(obj.ctxt, expandedKey, txtLength);
        } else {
            arr = startECB(obj.ctxt, expandedKey, txtLength);
        }
        //console.log('Hi, i am decrypt with key (res): ' + arr);

        done({otxt: arr, key: obj.key, obj: obj.obj});

        function hexToByteArray(hexString) {
            //if (hexString.length % 2) { return; }

            let byteArray = [];
            for (let k = 0; k < hexString.length; k += 2) {
                byteArray.push(parseInt(hexString.slice(k, k + 2), 16));
            }
            return byteArray;
        }

        function startCBC(ciphertext, expandedKey, txtLength) {
            let bpb = blockSizeInBits / 8;  // bytes per block
            let pt = [];                            // plaintext array

            //var expandedKey = keyExpansion(key);

            // work backwards to accomodate CBC mode
            for (let block = (txtLength / bpb)-1; block > 0; block--) {
                // a decrypted block
                let dBlock = decrypt(ciphertext.slice(block*bpb,(block+1)*bpb), expandedKey);
                if (dBlock[0] > 127) {
                    return dBlock;
                }
                for (var i = 0; i < bpb; i++) {
                   pt[(block - 1) * bpb + i] = dBlock[i] ^ ciphertext[(block - 1) * bpb + i];
                }
            }

            return pt;
        }

        function startECB(ciphertext, expandedKey, txtLength) {
            let bpb = blockSizeInBits / 8;  // bytes per block
            let pt = [];                    // plaintext array
            //var expandedKey = keyExpansion(key);

            // work backwards to accomodate CBC mode
            for (let block = (txtLength / bpb)-1; block > 0; block--) {
                // a decrypted block
                let dBlock = decrypt(ciphertext.slice(block*bpb,(block+1)*bpb), expandedKey);
                if (dBlock[0] > 127) {
                    return dBlock;
                }
                pt = dBlock.concat(pt);
            }
            // do last block
            pt = decrypt(ciphertext.slice(0, bpb), expandedKey).concat(pt);

            return pt;
        }

        function keyExpansion(key) {
            var expandedKey = [];

            for (var j=0; j < Nk; j++) {    // Fill in input key first
                expandedKey[j] = (key[4 * j]) | (key[4 * j + 1] << 8) | (key[4 * j + 2] << 16) | (key[4 * j + 3] << 24);
            }

            // Now walk down the rest of the array filling in expanded key bytes as
            // per Rijndael's spec
            for (j = Nk; j < Nb * (Nr + 1); j++) {    // For each word of expanded key
                let temp = expandedKey[j - 1];
                if (j % Nk == 0)
                    temp = ( (SBox[(temp>>8) & 0xFF]) |
                        (SBox[(temp>>16) & 0xFF]<<8) |
                        (SBox[(temp>>24) & 0xFF]<<16) |
                        (SBox[temp & 0xFF]<<24) ) ^ Rcon[Math.floor(j / Nk) - 1];
                else if (Nk > 6 && j % Nk == 4)
                    temp = (SBox[(temp>>24) & 0xFF]<<24) |
                        (SBox[(temp>>16) & 0xFF]<<16) |
                        (SBox[(temp>>8) & 0xFF]<<8) |
                        (SBox[temp & 0xFF]);
                expandedKey[j] = expandedKey[j-Nk] ^ temp;
            }
            return expandedKey;
        }

// This method circularly shifts the array left by the number of elements
// given in its parameter. It returns the resulting array and is used for
// the ShiftRow step. Note that shift() and push() could be used for a more
// elegant solution, but they require IE5.5+, so I chose to do it manually.

    function cyclicShiftLeft(theArray, positions) {
        var temp = theArray.slice(0, positions);
        theArray = theArray.slice(positions).concat(temp);
        return theArray;
    }

// Multiplies the element "poly" of GF(2^8) by x. See the Rijndael spec.

    function xtime(poly) {
        poly <<= 1;
        return ((poly & 0x100) ? (poly ^ 0x11B) : (poly));
    }

// Multiplies the two elements of GF(2^8) together and returns the result.
// See the Rijndael spec, but should be straightforward: for each power of
// the indeterminant that has a 1 coefficient in x, add y times that power
// to the result. x and y should be bytes representing elements of GF(2^8)

    function mult_GF256(x, y) {
        var result = 0;
        for (let bit = 1; bit < 256; bit *= 2, y = xtime(y)) {
            if (x & bit)
                result ^= y;
        }
        return result;
    }

// Performs the substitution step of the cipher.  State is the 2d array of
// state information (see spec) and direction is string indicating whether
// we are performing the forward substitution ("encrypt") or inverse
// substitution (anything else)

    function byteSub(state, direction) {
        for (var i = 0; i < 4; i++)           // Substitute for every byte in state
            for (var j = 0; j < Nb; j++)
                state[i][j] = SBoxInverse[state[i][j]];
    }

// Performs the row shifting step of the cipher.

    function shiftRow(state, direction) {
        for (var i=1; i<4; i++) {           // Row 0 never shifts
            state[i] = cyclicShiftLeft(state[i], Nb - shiftOffsets[Nb][i]);
        }
    }

// Performs the column mixing step of the cipher. Most of these steps can
// be combined into table lookups on 32bit values (at least for encryption)
// to greatly increase the speed.

    function mixColumn(state, direction) {
        var b = [];                            // Result of matrix multiplications
        for (var j = 0; j < Nb; j++) {         // Go through each column...
            for (var i = 0; i < 4; i++) {        // and for each row in the column...
                b[i] = mult_GF256(state[i][j], 0xE) ^
                        mult_GF256(state[(i+1)%4][j], 0xB) ^
                        mult_GF256(state[(i+2)%4][j], 0xD) ^
                        mult_GF256(state[(i+3)%4][j], 9);
            }
            for (let k = 0; k < 4; k++) {         // Place result back into column
                state[k][j] = b[k];
            }
        }
    }

// Adds the current round key to the state information. Straightforward.

    function addRoundKey(state, roundKey) {
        for (var j = 0; j < Nb; j++) {                 // Step through columns...
            state[0][j] ^= (roundKey[j] & 0xFF);         // and XOR
            state[1][j] ^= ((roundKey[j]>>8) & 0xFF);
            state[2][j] ^= ((roundKey[j]>>16) & 0xFF);
            state[3][j] ^= ((roundKey[j]>>24) & 0xFF);
        }
    }

// Rijndael's round functions...

    function InverseRound(state, roundKey) {
        addRoundKey(state, roundKey);
        mixColumn(state, "decrypt");
        shiftRow(state, "decrypt");
        byteSub(state, "decrypt");
    }

    function InverseFinalRound(state, roundKey){
        addRoundKey(state, roundKey);
        shiftRow(state, "decrypt");
        byteSub(state, "decrypt");
    }

    // decrypt is the basic decryption function. It takes parameters
// block, an array of bytes representing a ciphertext block, and expandedKey,
// an array of words representing the expanded key previously returned by
// keyExpansion(). The decrypted block is returned as an array of bytes.

    function decrypt(block, expandedKey) {
        //if (!block || block.length*8 != blockSizeInBits)
        //if (!block) return;
        //if (!expandedKey) return;

        block = packBytes(block);
        InverseFinalRound(block, expandedKey.slice(Nb*Nr));
        for (var i = Nr - 1; i > 0; i--) {
            InverseRound(block, expandedKey.slice(Nb*i, Nb*(i+1)));
        }
        addRoundKey(block, expandedKey);
        return unpackBytes(block);
    }

// This function packs an array of bytes into the four row form defined by
// Rijndael. It assumes the length of the array of bytes is divisible by
// four. Bytes are filled in according to the Rijndael spec (starting with
// column 0, row 0 to 3). This function returns a 2d array.

    function packBytes(octets) {
        if (!octets || octets.length % 4) {
            return;
        }

        var state = [];
        state[0] = [];  state[1] = [];
        state[2] = [];  state[3] = [];
        for (var j=0; j < octets.length; j+= 4) {
            state[0][j/4] = octets[j];
            state[1][j/4] = octets[j+1];
            state[2][j/4] = octets[j+2];
            state[3][j/4] = octets[j+3];
        }
        return state;
    }

// This function unpacks an array of bytes from the four row format preferred
// by Rijndael into a single 1d array of bytes. It assumes the input "packed"
// is a packed array. Bytes are filled in according to the Rijndael spec.
// This function returns a 1d array of bytes.

    function unpackBytes(packed) {
        var result = [];
        for (var j=0; j<packed[0].length; j++) {
            result[result.length] = packed[0][j];
            result[result.length] = packed[1][j];
            result[result.length] = packed[2][j];
            result[result.length] = packed[3][j];
        }
        return result;
    }
    });
}