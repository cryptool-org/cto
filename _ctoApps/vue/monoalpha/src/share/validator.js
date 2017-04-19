var Validator = {
  methods: {
      validateKeypress(evt, type) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        // Catch backspace, delete. left arrow, right arrow, Ctrl+V, Ctrl+C, Ctrl+v, Ctrl+c
        if (charCode === 8 || charCode === 46|| charCode === 37 || charCode === 39 || (evt.ctrlKey && charCode === 86) || (evt.ctrlKey && charCode === 67) || (evt.ctrlKey && charCode === 99) || (evt.ctrlKey && charCode === 118)) {
            return true;
        }
        var charStr = String.fromCharCode(charCode);
        switch (type) {
            case 0: // A-Z
                return (/[A-Za-z]/i.test(charStr));
            case 1:
                return (/[0-9]/i.test(charStr));
            case 2:
                return (/[A-Za-z0-9]/i.test(charStr));
            case 3:
                return (/[A-Ja-j0-9]/i.test(charStr));
            case 4: // A-Z
                return (/[A-Za-z#]/i.test(charStr));
            case 5: // 0-9 comma space
                return (/[0-9,\s]/i.test(charStr));
        }
        return false;
      }
  }
};
export default Validator;
