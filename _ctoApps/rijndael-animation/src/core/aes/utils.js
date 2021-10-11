/*
The MIT License (MIT)

Copyright (c) 2016 Snack (Jaemin Noh)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const root = (
    (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global) ||
    this
  );
  
  const has = type => typeof root[type] !== 'undefined';
  const is = (value, type) => has(type) && value instanceof root[type];


const hexStringToArray = (string) => {
  let intArray = [];
  for(let i = 0; i < string.length; i+=2){
    const hexStringNum = string.substring(i, i+2);
    intArray.push(hexToInt(hexStringNum))
  }
  return intArray;
}

const hexToInt = (hex) => {
  if(!hex) return 0;
   return parseInt(hex.replace(/^#/, ''), 16);
}

const intToHex = (int) => {
  const hexString =  (Number(int).toString(16)).slice(-2).toUpperCase()
  return hexString.length == 1 ? "0"+hexString : hexString;
}


  
const toArray = data => {
    // if Buffer exists in global context, use Buffer
    if (has('Buffer')) {
      const buf = root.Buffer.from(data);
      return [...buf];
    }
  
    // TypedArray
    if (is(data, 'TypedArray')) {
      const u8 = new Uint8Array(data.buffer);
      return [...u8];
    }
  
    // string
    if (typeof data === 'string') {
      const bytestring = unescape(encodeURIComponent(data));
      return [...bytestring].map(c => c.charCodeAt(0));
    }
  
    // other array-like objects
    const arr = Array.from(data);
  
    for (let i = 0; i < arr.length; i++) {
      const b = arr[i];
  
      if (!Number.isInteger(b) || b < 0x00 || 0xff < b)
        throw new Error(`Given data is not a byte array (data[${i}] = ${b}))`);
    }
  
    return arr;
  };


const intArrayToHex = (intArray) => {
  const hexArray = [];
  for(let i = 0; i < intArray.length; i++){
    hexArray.push(intToHex(intArray[i]));
  } 
  return hexArray
} 

const intArrayToHexString = (intArray) => {
  return intArrayToHex(intArray).join("")
}

const intArrayToAsciiString = (arr) => {
  return String.fromCharCode(...arr)
}

export default {toArray, intArrayToAsciiString, hexStringToArray, intArrayToHexString}