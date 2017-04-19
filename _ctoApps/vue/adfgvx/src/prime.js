import Vue from 'vue';
import Plaintext from "./text/plaintext.vue";
import Ciphertext from "./text/ciphertext.vue";
import Substitutiontext from "./substitution/substitutiontext.vue";
import SubstitutionMatrix from "./substitution/substitution.matrix.vue";
import KeyBoxInput from "./options/keybox.input.vue";
import ButtonBox from "./options/buttonbox.vue";
import Accordion from "./componentDOM/accordion.vue";
import Tabs from "./componentDOM/tabs.vue";
import AlphabetOptions from "./options/alphabet.options.vue";
import Type from "./options/type.vue";
import ModelMixin from "./model/model.mixin";
import EventNames from "./share/event.names";
import AppData from "./config/app.data";
import AppConfig from "./config/app.config";
import ToggleMixin from "./share/toggle.mixin";

var Prime = Vue.extend({
    mixins: [AppData, AppConfig, ModelMixin, EventNames, ToggleMixin],

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
        this._eventBus.$emit(EventNames.KeyValue, this.keyValue);
      });
      this._eventBus.$on(EventNames.SetAlphabet, value => {
        this.setAlphabet(value);
      });
      this._eventBus.$on(EventNames.CipherType, value => {
        let bool = this.setType(parseInt(value));
        //this.genRandomKeysquare();
      });
      this._eventBus.$on(EventNames.GroupType, value => {
        let bool = this.setGroupType(parseInt(value));
      });
      this._eventBus.$on(EventNames.GroupTypeSub, value => {
        this.groupTypeSub = parseInt(value);
        this.crypt(false);
      });
      this._eventBus.$on(EventNames.KeywordFirst, value => {
        this.firstKeyword = value;
        this.setKeywordValue();
      });
      this._eventBus.$on(EventNames.KeySquareRandom, () => {
        this.genRandomKeysquare();
      });
      this._eventBus.$on(EventNames.KeySquareStandard, () => {
        this.genStandardKeysquare();
      });
      this._eventBus.$on(EventNames.KeySquareMy, value => {
        this.mymatrix = value;
        this.genMyKeysquare();
      });
      this._eventBus.$on(EventNames.OwnOption, value => {
        this.ownOption();
      });
    },
    created() {
        if (typeof window.CTO_Globals.lang !== 'undefined') {
            this.switchLang(window.CTO_Globals.lang);
        } else {
            this.switchLang(document.documentElement.lang);
        }
        this.setAlphabet(0);
    },
    components: {
        Accordion,
        Tabs,
        Type,
        Plaintext,
        Ciphertext,
        Substitutiontext,
        SubstitutionMatrix,
        KeyBoxInput,
        ButtonBox,
        AlphabetOptions,
    },
    watch: {
      code: function(newVal, oldVal) {
        this._eventBus.$emit(EventNames.Code, newVal);
      },
      columns: function(newVal, oldVal) {
        this._eventBus.$emit(EventNames.Column, newVal);
      },
      keyValue: function(newVal, oldVal)  {
        console.log('changeKey: ' + newVal);
        this._eventBus.$emit(EventNames.KeyValue, newVal);
      },
      orgtxt: function() {
        this._eventBus.$emit(EventNames.Plaintxt, this.orgtxt);
      },
      codtxt: function() {
        this._eventBus.$emit(EventNames.Ciphertxt, this.codtxt);
      },
      substitutiontxt: function() {
        this._eventBus.$emit(EventNames.Substitutiontxt, this.substitutiontxt);
      },
      genKeySquare: function(newVal, oldVal) {
        console.log('gen: ' + this.genKeySquare);
        this._eventBus.$emit(EventNames.KeySquareGen, this.genKeySquare);
      },
      warningLength: function() {
        this._eventBus.$emit(EventNames.WarningLength, this.warningLength);
      },
      matrix: function () {
        this._eventBus.$emit(EventNames.Matrix, this.matrix);
      },
      own: function() {
        this._eventBus.$emit(EventNames.OwnValue, this.own);
      },
      groupType: function(newVal, oldVal) {
        if (newVal !== 0) { return false; }
        this._eventBus.$emit(EventNames.GroupType, newVal);
      },
      ciphertextabc: function() {
        this._eventBus.$emit(EventNames.CiphertextAlphabet, this.ciphertextabc);
      },
    },
    methods: {
      switchLang: function(lang) {
        Vue.config.lang = lang;
      }
    }
});
export default Prime;
