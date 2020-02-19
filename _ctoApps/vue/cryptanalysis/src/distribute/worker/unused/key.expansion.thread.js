import Threads from 'threads';

export default function KeyExpansionThread() {
    const spawn = Threads.spawn;

    this.thread = spawn(function (input, done) {
        console.log(input);
        console.log('Hi, i am key (exp): ' + input.key);

        var Rcon = input.Rcon;
        var SBox = input.SBox;

        var arrText = keyExpansion(input.key);

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

        console.log('Hi, i am key (exp): ' + arrText);

        done(arrText);
    });

    this.kill = function() {
        this.thread.kill();
    }
}
