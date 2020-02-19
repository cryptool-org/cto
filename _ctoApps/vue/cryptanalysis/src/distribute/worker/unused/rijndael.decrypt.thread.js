import Threads from 'threads';

export default function RijndaelDecryptThread() {
    const spawn = Threads.spawn;

    this.kill = function() {
        this.thread.kill();
    };

    this.thread = spawn(function (input, done) {
        let obj = input;
        //console.log(obj);

        //console.log('Hi, i am decrypt with key: ' + obj.key);
        //console.log('Hi, i am decrypt with ctxt: ' + obj.ctxt.length);

        var blockSizeInBits = obj.blockSizeInBits;
        var Rcon = obj.Rcon;
        var SBox = obj.SBox;
        var SBoxInverse = obj.SBoxInverse;
        var roundsArray = obj.roundsArray;
        var shiftOffsets = obj.shiftOffsets;

        var Nk = obj.keySizeInBits / 32;
        var Nb = blockSizeInBits / 32;
        var Nr = roundsArray[Nk][Nb];

        let txtLength = obj.ctxt.length;
        if (obj.maxComputeLen && obj.maxComputeLen < obj.ctxt.length) {
            txtLength = obj.maxComputeLen;
        }

        var arr = start(obj.ctxt, obj.key, obj.mode, txtLength);

        //console.log('Hi, i am decrypt with key (res): ' + arr);

        done({otxt: arr, key: obj.key});

        function start(ciphertext, key, mode, txtLength) {
            var bpb = blockSizeInBits / 8;  // bytes per block
            var pt = [];                            // plaintext array

            var expandedKey = keyExpansion(key);

            // work backwards to accomodate CBC mode
            for (let block = (txtLength / bpb)-1; block > 0; block--) {
                // a decrypted block
                let dBlock = decrypt(ciphertext.slice(block*bpb,(block+1)*bpb), expandedKey);
                if (mode == "CBC") {
                    for (var i = 0; i < bpb; i++) {
                        pt[(block - 1) * bpb + i] = dBlock[i] ^ ciphertext[(block - 1) * bpb + i];
                    }
                } else {
                    pt = dBlock.concat(pt);
                }
            }

            // do last block if ECB (skips the IV in CBC)
            if (mode == "ECB") {
                pt = decrypt(ciphertext.slice(0, bpb), expandedKey).concat(pt);
            }

            return pt;
        }

        function keyExpansion(key) {
            var expandedKey = [];
            var temp;

            // in case the key size or parameters were changed...
            var Nk = input.keySizeInBits / 32;
            var Nb = input.blockSizeInBits / 32;
            var Nr = input.roundsArray[Nk][Nb];

            for (var j=0; j < Nk; j++)     // Fill in input key first
                expandedKey[j] = (key[4*j]) | (key[4*j+1]<<8) | (key[4*j+2]<<16) | (key[4*j+3]<<24);

            // Now walk down the rest of the array filling in expanded key bytes as
            // per Rijndael's spec
            for (j = Nk; j < Nb * (Nr + 1); j++) {    // For each word of expanded key
                temp = expandedKey[j - 1];
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
        var bit, result = 0;

        for (bit = 1; bit < 256; bit *= 2, y = xtime(y)) {
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
        var S;
        if (direction == "encrypt")           // Point S to the SBox we're using
            S = SBox;
        else
            S = SBoxInverse;
        for (var i = 0; i < 4; i++)           // Substitute for every byte in state
            for (var j = 0; j < Nb; j++)
                state[i][j] = S[state[i][j]];
    }

// Performs the row shifting step of the cipher.

    function shiftRow(state, direction) {
        for (var i=1; i<4; i++)               // Row 0 never shifts
            if (direction == "encrypt")
                state[i] = cyclicShiftLeft(state[i], shiftOffsets[Nb][i]);
            else
                state[i] = cyclicShiftLeft(state[i], Nb - shiftOffsets[Nb][i]);

    }

// Performs the column mixing step of the cipher. Most of these steps can
// be combined into table lookups on 32bit values (at least for encryption)
// to greatly increase the speed.

    function mixColumn(state, direction) {
        var b = [];                            // Result of matrix multiplications
        for (var j = 0; j < Nb; j++) {         // Go through each column...
            for (var i = 0; i < 4; i++) {        // and for each row in the column...
                if (direction == "encrypt")
                    b[i] = mult_GF256(state[i][j], 2) ^          // perform mixing
                        mult_GF256(state[(i+1)%4][j], 3) ^
                        state[(i+2)%4][j] ^
                        state[(i+3)%4][j];
                else
                    b[i] = mult_GF256(state[i][j], 0xE) ^
                        mult_GF256(state[(i+1)%4][j], 0xB) ^
                        mult_GF256(state[(i+2)%4][j], 0xD) ^
                        mult_GF256(state[(i+3)%4][j], 9);
            }
            for (var i = 0; i < 4; i++)          // Place result back into column
                state[i][j] = b[i];
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
        if (!block) return;
        if (!expandedKey) return;

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
        var state = new Array();
        if (!octets || octets.length % 4)
            return;

        state[0] = new Array();  state[1] = new Array();
        state[2] = new Array();  state[3] = new Array();
        for (var j=0; j<octets.length; j+= 4) {
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