var ToggleMixin = {
  methods: {
      toggleAlphabetOptions(value) {
        switch(value) {
          case 1:
            this.uppercase = !this.uppercase;
            break;
          case 2:
            this.blanks = !this.blanks;
            break;
          case 3:
            this.digits = !this.digits;
            break;
          case 4:
            this.punctuationmarks = !this.punctuationmarks;
            break;
          case 5:
            this.lowercase = !this.lowercase;
            break;
          case 6:
            this.umlauts = !this.umlauts;
            break;
          case 7:
            this.rot13 = !this.rot13;
        }
      },
      toggleDisplayOptions: function(expression) {
        switch (expression) {
          case 'casesensitive':
            this.casesensitive = !this.casesensitive;
            break;
          case 'signs':
            this.signs = !this.signs;
            break;
          case 'spaces':
            this.ignoreSpaces = !this.ignoreSpaces;
            break;
          case 'clean':
            this.clean = !this.clean;
            this.showGroup = !this.showGroup;
            break;
          case 'substitutionGroup':
            this.substitutionGroup = !this.substitutionGroup;
        }
      }
  }
};
export default ToggleMixin;
