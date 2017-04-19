import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import ToggleMixin from '../share/toggle.mixin';

var Ciphertext = Vue.component('cipher', {
    mixins: [EventBus, EventNames, AppData, ToggleMixin],

    created() {
      this.eventBus.$on(EventNames.Ciphertxt, msg => {
        console.log(msg);
        this.codtxt = msg;
      });
      this.eventBus.$on(EventNames.SetAlphabet, value => {
        //this.toggleAlphabetOptions(value);
        if (value === 1) {
          this.uppercase = !this.uppercase;
        }
        if (value === 5) {
          this.lowercase = !this.lowercase;
        }
      })
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
      toggleOptions: function(msg) {
        this.toggleDisplayOptions(msg);
        this.eventBus.$emit(EventNames.ToggleDisplayOptions, msg);
      },
    }

});
export default Ciphertext;
