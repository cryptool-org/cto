import Vue from 'vue';
import Plaintext from "./plain/plaintext.vue";
import Ciphertext from "./cipher/ciphertext.vue";
import KeyBox from "./options/keybox.vue";
import Rot13 from "./options/rot13";
import WarningClash from "./options/warning.clash.vue";
import ButtonBox from "./options/buttonbox.vue";
import AlphabetOptions from "./options/alphabet.options.vue";
import Alphabet from "./options/alphabet.vue";
import Tab from "./componentDOM/tab.vue";
import CaesarMixin from "./service/caesar.mixin";
import AppConfig from "./config/app.config";

var Prime = Vue.extend({
    mixins: [AppConfig, CaesarMixin],

    components: { Tab, Plaintext, Ciphertext, KeyBox, Rot13, WarningClash, ButtonBox, AlphabetOptions, Alphabet },
    beforeCreate () {
      this._eventBus = new Vue();
      this._eventBus.$on('toggleOptions', exp => {
        this.toggleOptions(exp);
      });
      this._eventBus.$on('keyPress', obj => {
        this.keyPress(obj.key, obj.type);
      });
      this._eventBus.$on('crypt', obj => {
        this.caesarCrypt(obj.type, obj.txt);
      });
      this._eventBus.$on('checkKey', value => {
        this.keyValue = value;
        this.checkKey();
      });
      this._eventBus.$on('increaseKey', value => {
        this.increaseKey();
      });
      this._eventBus.$on('decreaseKey', value => {
        this.decreaseKey();
      });
      this._eventBus.$on('setAlphabet', value => {
        this.setAlphabet(value);
      });
      this._eventBus.$on('ownOption', value => {
        this.ownOption();
      });
      this._eventBus.$on('ownAlphabet', obj => {
        this.setOwnAlphabet(obj.bool, obj.txtabc);
      })
    },
    created() {
      if (typeof window.CTO_Globals !== 'undefined' && typeof window.CTO_Globals.lang !== 'undefined') {
        this.switchLang(window.CTO_Globals.lang);
      } else {
        this.switchLang(document.documentElement.lang);
      }
      this.setAlphabet(0);
    },
    watch: {
      code: function(newVal, oldVal) {
        this._eventBus.$emit('code', newVal);
      },
      keyValue: function(newVal, oldVal)  {
        this._eventBus.$emit('keyValue', newVal);
      },
      orgtxt: function() {
        this._eventBus.$emit('orgtxt', this.orgtxt);
      },
      codtxt: function() {
        this._eventBus.$emit('codtxt', this.codtxt);
      },
      warnClash: function() {
        this._eventBus.$emit('warnClash', {bool: this.warnClash, values: this.clashes});
      },
      own: function() {
        this._eventBus.$emit('ownValue', this.own);
      },
      global_plaintextabc: function() {
        this._eventBus.$emit('plaintextabc', this.global_plaintextabc);
      },
      global_ciphertextabc: function() {
        this._eventBus.$emit('ciphertextabc', this.global_ciphertextabc);
      },
    },
    methods: {
      switchLang: function(lang) {
        Vue.config.lang = lang;
      }
    }
});
export default Prime;
