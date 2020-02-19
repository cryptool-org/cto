var AppData = {
    data() {
      return {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", //alphabet to start with
        allowedKeys: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",

        hexKeys: "0123456789ABCDEF",
        codtxt: "001a14e726f9bc23838852a0725e85d0693ecc51e70bba2b2f375624f35b" +
            "12edfb737de62b9713e7b3539b71569ef93618756a837da4727e448abfb0e84b" +
            "a9515aecac0796837509ce7098e4ca9c0c01ba9c758b7430053d5841271445f6" +
            "6bb671872c57ea5a4598d2be0d2aba35399d7683788d672be5c5043bf6c8bb54" +
            "37d355598c0d1f6b41ede25b4669d82fab9562fbb18a9e40b6cc3b3397338bb9" +
            "3ca1fa9eb0d774a7cfb2eb9195d47a506507a71a04d74c04b2fbd362191e7ee4" +
            "cd49ff5015f959cb25a41d01b5986e7ed8a8071a5a0f798fee80bbb2b179065c" +
            "14363ff9b71f6c87e34debbc8300026e293265fcaf67139f61f6bc65335229a7" +
            "f8182f984218a99afa44c854ee4e0e26bef05d6f5252dd914b9019581618f9ba" +
            "b9bf8694dcfc5604e1a3033d0f3d905d3e346e9fc0842b3e3856e32622ecf7d1" +
            "8369",
        code: 'encode',
        bitValue: '128',
        keyValue128: 'AA ** AA BB ** BB AA BB AA BB AA BB AA BB AA BB',
        keyValue192: 'AA BB AA BB AA BB AA BB AA BB AA BB AA BB AA BB AA BB AA BB AA BB AA BB',
        keyValue256: '11 ** ** AA AA AA AA AB AA AA AA AA AA AA AA AC 11 ** ** AA AA AA AA AB ** AA AA AA AA AA AA AC',
        keyValue: 'AA BB AA ** ** BB AA BB AA BB AA BB AA BB AA BB',
        mode: 'ECB',

        show: false,
        toggle: false,
        own: false,
        warningLength: false,
        run: false,
        start: false,
        finish: false,
        define: true,
      }
    }
  };
  export default AppData;
