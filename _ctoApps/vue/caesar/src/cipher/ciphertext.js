
import Vue from 'vue';
import EventBus from '../service/event.bus';

var Ciphertext = Vue.component('cipher', {
    mixins: [EventBus],

    created() {
      this.eventBus.$on('codtxt', msg => {
        this.codtxt = msg;
      })
      this.eventBus.$on('setAlphabet', value => {
        if (value === 1) {
          this.uppercase = !this.uppercase;
        }
        if (value === 5) {
          this.lowercase = !this.lowercase;
        }
      })
    },
    data() {
      return {
        codtxt: "The quick brown fox jumps over the lazy dog",

        uppercase: true,
        lowercase: true,

        casesensitive: false,
        signs: true,
        clean: false,
        ignoreSpaces: false
      }
    },
    methods: {
      keyPress: function(key, type) {
        let keyObj = { key : key, type : type };
        this.eventBus.$emit('keyPress', keyObj);
      },
      crypt: function(type) {
        let obj = { type: type, txt: this.codtxt };
        this.eventBus.$emit('crypt', obj);
      },
      toggleOptions: function(msg) {
        this.eventBus.$emit('toggleOptions', msg);
      },
    }

});
export default Ciphertext;
