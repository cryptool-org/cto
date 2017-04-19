import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import WarningPopup from "./warning.popup.vue";
import CipherOptions from "./cipher.options.vue";
import AppData from "../config/app.data";
import AppConfig from "../config/app.config";

var Alphabet = Vue.component('alphabet', {
    mixins: [AppData, AppConfig, EventBus, EventNames],

    created() {
      this.eventBus.$on(EventNames.OwnValue, value => {
        this.own = value;
      });
      this.eventBus.$on(EventNames.PlaintextAlphabet, value => {
        this.plaintextabc = value;
      });
      this.eventBus.$on(EventNames.CiphertextAlphabet, value => {
        this.ciphertextabc = value;
      });
    },
    components: {
        WarningPopup,
        CipherOptions
    },
    methods: {
      setOwnAlphabet: function(bool) {
        let txtabc = this.plaintextabc;
        if (!bool) {
          txtabc = this.ciphertextabc;
        }
        let obj = {bool: bool, txtabc: txtabc};
        this.eventBus.$emit(EventNames.OwnAlphabet, obj);
      }
    }
});
export default Alphabet;
