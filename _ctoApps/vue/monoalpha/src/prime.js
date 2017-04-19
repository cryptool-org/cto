import Vue from 'vue';
import Plaintext from "./plain/plaintext.vue";
import Ciphertext from "./cipher/ciphertext.vue";
import KeyBox from "./options/keybox.vue";
import KeywordBox from "./options/keywordbox.vue";
import Warning from "./options/warning.vue";
import ButtonBox from "./options/buttonbox.vue";
import Accordion from "./componentDOM/accordion.vue";
import Tabs from "./componentDOM/tabs.vue";
import AlphabetOptions from "./options/alphabet.options.vue";
import Alphabet from "./options/alphabet.vue"
import ModelMixin from "./model/model.mixin";
import EventNames from "./share/event.names";
import AppData from "./config/app.data";
import ComponentConfig from "./config/app.config";
import ToggleMixin from "./share/toggle.mixin";

var Prime = Vue.extend({
    mixins: [AppData, ComponentConfig, ModelMixin, EventNames, ToggleMixin],

    beforeCreate () {
      this._eventBus = new Vue();
      this._eventBus.$on(EventNames.ToggleDisplayOptions, exp => {
        this.toggleDisplayOptions(exp);
        this.crypt(false);
      });
      this._eventBus.$on(EventNames.Crypt, obj => {
        this.crypt(obj.type, obj.txt);
      });
      this._eventBus.$on(EventNames.KeyCheck, value => {
        this.keyValue = value;
        this.checkKey();
      });
      this._eventBus.$on(EventNames.KeyIncrease, value => {
        this.increaseKey();
      });
      this._eventBus.$on(EventNames.KeyDecrease, value => {
        this.decreaseKey();
      });
      this._eventBus.$on(EventNames.SetAlphabet, value => {
        this.setAlphabet(value);
      });
      this._eventBus.$on(EventNames.OwnOption, value => {
        this.ownOption();
      });
      this._eventBus.$on(EventNames.OwnAlphabet, obj => {
        this.setOwnAlphabet(obj.bool, obj.txtabc);
      });
      this._eventBus.$on(EventNames.KeywordType, value => {
        this.cType = value;
        this.setKeywordValue();
      });
      this._eventBus.$on(EventNames.KeywordFirst, value => {
        this.firstKeyword = value;
        this.setKeywordValue();
      });
      this._eventBus.$on(EventNames.KeywordSecond, value => {
        this.secondKeyword = value;
        this.setKeywordValue();
      });
      this._eventBus.$on(EventNames.Atbash, () => {
        this.eventAtbash();
      })
    },
    created() {
      if (typeof window.CTO_Globals !== 'undefined' && typeof window.CTO_Globals.lang !== 'undefined') {
        this.switchLang(window.CTO_Globals.lang);
      } else {
        this.switchLang(document.documentElement.lang);
      }
      this.crypt(false);
    },
    components: {
        Accordion,
        Tabs,
        Plaintext,
        Ciphertext,
        KeyBox,
        Warning,
        ButtonBox,
        AlphabetOptions,
        Alphabet,
        KeywordBox
    },
    watch: {
      code: function(newVal, oldVal) {
        this._eventBus.$emit(EventNames.Code, newVal);
      },
      keyValue: function(newVal, oldVal)  {
        this._eventBus.$emit(EventNames.KeyValue, newVal);
      },
      orgtxt: function() {
        this._eventBus.$emit(EventNames.Plaintxt, this.orgtxt);
      },
      codtxt: function() {
        this._eventBus.$emit(EventNames.Ciphertxt, this.codtxt);
      },
      warningClash: function() {
        this._eventBus.$emit(EventNames.WarningClash, {bool: this.warningClash, values: this.clashes});
      },
      warningLength: function() {
        this._eventBus.$emit(EventNames.WarningLength, this.warningLength);
      },
      own: function() {
        this._eventBus.$emit(EventNames.OwnValue, this.own);
      },
      global_plaintextabc: function(newVal, oldVal) {
          console.log(newVal);
          console.log(oldVal);
        this._eventBus.$emit(EventNames.PlaintextAlphabet, this.global_plaintextabc);
      },
      global_ciphertextabc: function() {
        this._eventBus.$emit(EventNames.CiphertextAlphabet, this.global_ciphertextabc);
      },
    },
    methods: {
      switchLang: function(lang) {
        Vue.config.lang = lang;
      }
    }
});
export default Prime;
