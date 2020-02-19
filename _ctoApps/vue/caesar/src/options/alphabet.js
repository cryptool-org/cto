import Vue from 'vue';
import EventBus from '../service/event.bus';

var Alphabet = Vue.component('alphabet', {
    mixins: [EventBus],

    created() {
      this.eventBus.$on('ownValue', value => {
        this.own = value;
      });
      this.eventBus.$on('plaintextabc', value => {
        this.plaintextabc = value;
      });
      this.eventBus.$on('ciphertextabc', value => {
        this.ciphertextabc = value;
      })
    },
    data() {
      return {
        plaintextabc: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        ciphertextabc: "BCDEFGHIJKLMNOPQRSTUVWXYZA",
        own: false
      }
    },
    methods: {
      setOwnAlphabet: function(bool) {
        let txtabc = this.plaintextabc;
        if (!bool) {
          txtabc = this.ciphertextabc;
        }
        let obj = {bool: bool, txtabc: txtabc};
        this.eventBus.$emit('ownAlphabet', obj);
      }
    }
});
export default Alphabet;
