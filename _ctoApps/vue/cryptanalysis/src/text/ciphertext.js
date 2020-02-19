import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';

var Ciphertext = Vue.component('cipher', {
    mixins: [EventBus, EventNames, AppData],

    data() {
      return {
          clazz: '',
          warning: false,
      }
    },
    methods: {
      keyPress: function(key, type) {
          let keyObj = { key : key, type : type };
          this.eventBus.$emit(EventNames.KeyPress, keyObj);
      },
      crypt: function(type) {
          this.validate();
          let obj = { type: type, txt: this.codtxt };
          this.eventBus.$emit(EventNames.Crypt, obj);
      },
      validate: function () {
          this.clazz = '';
          this.warning = false;
          this.warningLength = false;
          this.eventBus.$emit(EventNames.WarningClash, false);
          let ctxt = this.codtxt.toUpperCase().replace(/\s/g,'');
          for (let k = 0; k < ctxt.length; k++) {
              if (this.hexKeys.indexOf(ctxt[k]) == -1) {
                  this.clazz = 'error';
                  this.warning = true;
                  this.eventBus.$emit(EventNames.WarningClash, true);
              }
          }
          this.codtxt = this.codtxt.replace(/\s/g,'');
          if (this.codtxt.length % 32 != 0 || this.codtxt.length == 0) {
              this.clazz = 'error';
              this.warningLength = true;
              this.eventBus.$emit(EventNames.WarningClash, true);
          }
      }
    },

});
export default Ciphertext;
