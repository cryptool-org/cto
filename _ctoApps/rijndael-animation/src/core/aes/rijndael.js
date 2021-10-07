/*
The MIT License (MIT)

Copyright (c) 2016 Snack (Jaemin Noh)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Utils from "./utils.js"
import {SBOX, RCON, ROW_SHIFT, MUL2, MUL3, MUL9, MUL11, MUL14, MUL13} from "./rijndael-precalculated.js"

// Available sizes
const SIZES = [16, 24, 32];

// ROUNDS [blockSize] [keySize]
const ROUNDS = {
  '16': { '16': 10, '24': 12, '32': 14 },
  '24': { '16': 12, '24': 12, '32': 14 },
  '32': { '16': 14, '24': 14, '32': 14 },
};



//==============================================================================

class Rijndael {
  constructor(key) {
    const keySize = key.length;

    if (!SIZES.includes(keySize))
      throw new Error(`Unsupported key size: ${keySize * 8}bit`);

    this.key = Utils.toArray(key);
    this.keySize = keySize;
  }

  ExpandKey(blockSize) {
    const keySize = this.keySize;
    const roundCount = ROUNDS[blockSize][keySize];
    const keyCount = roundCount + 1;
    const expandedKey = new Array(keyCount * blockSize);

    // First key is original key
    for (let i = 0; i < keySize; i++) expandedKey[i] = this.key[i];

    let rconIndex = 0;

    let firstBytes = []

    for (let i = keySize; i < expandedKey.length; i += 4) {
      // Take previous word
      let temp = expandedKey.slice(i - 4, i);

      // First 4 bytes
      if (i % keySize === 0) {
        // Key Schedule Core
        // 1. Rotate 8 bit left
        // 2. Apply S-box on every byte
        // 3. First byte ^= RCON[rconIndex]

        

        temp = [
          SBOX[temp[1]],
          SBOX[temp[2]],
          SBOX[temp[3]],
          SBOX[temp[0]],
        ];
        firstBytes.push(...temp.slice())
        temp[0] = temp[0] ^ RCON[rconIndex]

        

        // Use next RCON
        rconIndex++;
      }

      // Fill three word
      if (i % keySize < 16) {
        for (let j = 0; j < 4; j++)
          expandedKey[i + j] = expandedKey[i - keySize + j] ^ temp[j];
      }

      // End of 128 bit key processing
      if (keySize === 16) continue;

      // For 256 bit key
      if (keySize === 32 && i % keySize === 16) {
        temp = [
          SBOX[temp[0]],
          SBOX[temp[1]],
          SBOX[temp[2]],
          SBOX[temp[3]],
        ];

        for (let j = 0; j < 4; j++)
          expandedKey[i + j] = expandedKey[i - keySize + j] ^ temp[j];
      }
      // For 192 bit and 256 bit key, fill left one/three blocks
      else {
        for (let j = 0; j < 4; j++)
          expandedKey[i + j] = expandedKey[i - keySize + j] ^ temp[j];
      }
    }

    return [expandedKey, firstBytes];
  }

  AddRoundKey(block, key, keyIndex) {
    const blockSize = block.length;

    for (let i = 0; i < blockSize; i++)
      block[i] ^= key[keyIndex * blockSize + i];
  }

  SubBytes(block) {
    for (let i = 0; i < block.length; i++)
      block[i] = SBOX[block[i]];
  }

  SubBytesReversed(block) {
    for (let i = 0; i < block.length; i++)
      block[i] = SBOX.indexOf(block[i]);
  }

  ShiftRows(block) {
    const output = [];

    for (let i = 0; i < block.length; i++)
      output[i] = block[ROW_SHIFT[block.length][i]];

    for (let i = 0; i < block.length; i++)
      block[i] = output[i];
  }

  ShiftRowsReversed(block) {
    const output = [];

    for (let i = 0; i < block.length; i++)
      output[i] = block[ROW_SHIFT[block.length].indexOf(i)];

    for (let i = 0; i < block.length; i++)
      block[i] = output[i];
  }

  MixColumns(block) {
    for (let i = 0; i < block.length; i += 4) {
      // b0 = 2a0 + 3a1 + 1a2 + 1a3
      // b1 = 1a0 + 2a1 + 3a2 + 1a3
      // b2 = 1a0 + 1a1 + 2a2 + 3a3
      // b3 = 3a0 + 1a1 + 1a2 + 2a3
      let a = block.slice(i, i + 4);
      let b = [
        MUL2[a[0]] ^ MUL3[a[1]] ^        a[2]  ^        a[3] ,
               a[0]  ^ MUL2[a[1]] ^ MUL3[a[2]] ^        a[3] ,
               a[0]  ^        a[1]  ^ MUL2[a[2]] ^ MUL3[a[3]],
        MUL3[a[0]] ^        a[1]  ^        a[2]  ^ MUL2[a[3]],
      ];

      block[i + 0] = b[0];
      block[i + 1] = b[1];
      block[i + 2] = b[2];
      block[i + 3] = b[3];
    }
  }

  MixColumnsReversed(block) {
    for (let i = 0; i < block.length; i += 4) {
      // a0 = 14b0 + 11b1 + 13b2 +  9b3
      // a1 =  9b0 + 14b1 + 11b2 + 13b3
      // a2 = 13b0 +  9b1 + 14b2 + 11b3
      // a3 = 11b0 + 13b1 +  9b2 + 14b3
      let b = block.slice(i, i + 4);
      let a = [
        MUL14[b[0]] ^ MUL11[b[1]] ^ MUL13[b[2]] ^ MUL9[b[3]],
        MUL9[b[0]] ^ MUL14[b[1]] ^ MUL11[b[2]] ^ MUL13[b[3]],
        MUL13[b[0]] ^ MUL9[b[1]] ^ MUL14[b[2]] ^ MUL11[b[3]],
        MUL11[b[0]] ^ MUL13[b[1]] ^ MUL9[b[2]] ^ MUL14[b[3]],
      ];

      block[i + 0] = a[0];
      block[i + 1] = a[1];
      block[i + 2] = a[2];
      block[i + 3] = a[3];
    }
  }

  encrypt(_block) {

   

    const block = Utils.toArray(_block);

    const blockSize = block.length;
    const keySize = this.keySize;
    const roundCount = ROUNDS[blockSize][keySize];

    if (!SIZES.includes(blockSize))
      throw new Error(`Unsupported block size: ${blockSize * 8}bit`);

    // Calculations are made to this state
    const state = block.slice();
  

    const info = {
      ["initial-state"]: state.slice(),
      sbox: SBOX,
    }
    

    // Key Expansion
    const [expandedKey, firstBytes] = this.ExpandKey(blockSize);
    info["key-shedule-subbed-bytes"] = firstBytes;
    info["key-schedule"] = expandedKey.slice();

    // Initial Round
    this.AddRoundKey(state, expandedKey, 0);
    info["after-initial-round"] = state.slice();

    // Rounds
    for (let round = 1; round < roundCount; round++) {
      info[`round-${round}-initial`] = state.slice();
      this.SubBytes(state);
      info[`after-sub-bytes-${round}`] = state.slice();

      this.ShiftRows(state);
      info[`after-shift-rows-${round}`] = state.slice();

      this.MixColumns(state);
      info[`after-mix-columns-${round}`] = state.slice();

      this.AddRoundKey(state, expandedKey, round);
      info[`after-add-round-key-${round}`] = state.slice();
    }
  
    info[`round-10-initial`] = state.slice();
    // Final Round
    this.SubBytes(state);
    info[`after-sub-bytes-10`] = state.slice();

    this.ShiftRows(state);
    info[`after-shift-rows-10`] = state.slice();

    this.AddRoundKey(state, expandedKey, roundCount);
    info[`after-add-round-key-10`] = state.slice();


   
    return [state,info];
  }
}

export default Rijndael