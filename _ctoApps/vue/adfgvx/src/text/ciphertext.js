import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import RadioCipherGroups from './radio.cipher.group';

var Ciphertext = Vue.component('cipher', {
    mixins: [EventBus, EventNames, AppData],

    created() {
      this.eventBus.$on(EventNames.Ciphertxt, msg => {
        console.log(msg);
        this.codtxt = msg;
      });
    },
    methods: {
      keyPress: function(key, type) {
        let keyObj = { key : key, type : type };
        this.eventBus.$emit(EventNames.KeyPress, keyObj);
      },
      crypt: function(type) {
        let obj = { type: type, txt: this.codtxt };
        this.eventBus.$emit(EventNames.Crypt, obj);
      },
    },
    components: {
      RadioCipherGroups
    }

});
export default Ciphertext;
