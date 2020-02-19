import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import AppConfig from "../config/app.config";
import InfoBox from "./infobox.vue";

var KeyBox = Vue.component('keybox', {
    mixins: [EventBus, EventNames, AppData, AppConfig],

    beforeMount() {
        this.selectOption = this.bitValue;
        switch(this.bitValue) {
            case '192': this.keyValue = this.keyValue192; break;
            case '256': this.keyValue = this.keyValue256; break;
            default: this.keyValue = this.keyValue128;
        }
    },
    data() {
        return {
            selectOption: '',
            clazz: '',
        }
    },
    methods: {
        checkKey: function(event) {
            if (event.ctrlKey || event.keyCode == 17) { return; }

            let keyLen = this.keyValue.length;
            this.keyValue = this.keyValue.toUpperCase();
            let digits = "*0123456789ABCDEF" + " ";
            for (let k = 0; k < keyLen; k++) {
                let idx = digits.indexOf(this.keyValue[k]);
                if (idx < 0) {
                    let sub = this.keyValue.substring(k, k+1);
                    this.keyValue = this.keyValue.replace(sub, 'F');
                }
            }
            this.clazz = '';
            this.warningLength = false;
            //this.eventBus.$emit(EventNames.WarningClash, false);
            let maxLen = this.selectOption/4;
            let input = this.keyValue.replace(/\s/g, '');
            if (input.length !== maxLen) {
                //this.keyValue = this.keyValue.substring(0, this.keyValue.length-1);
                //input = this.keyValue.replace(/\s/g, '');
                this.clazz = 'error';
                this.warningLength = true;
                //this.eventBus.$emit(EventNames.WarningClash, true);
            }
            this.eventBus.$emit(EventNames.KeyValue, this.keyValue);
        },
        addChars: function (changeString, fromString) {
            for (let k = changeString.length; k < fromString.length; k++) {
                changeString += fromString[k];
            }
            return changeString;
        },
        removeChars: function(changeString, fromString) {
            return changeString.substring(0, fromString.length);
        },
        help: function() {
            let input = this.keyValue.replace(/\s/g, '');
            let obj = {open: true, bit: this.selectOption, len: input.length};
            this.eventBus.$emit(EventNames.KeyInfoBox, obj);
        },
        close: function() {
            let obj = {open: false};
            this.eventBus.$emit(EventNames.KeyInfoBox, obj);
        }
    },
    watch: {
      selectOption: function () {
          this.clazz = '';
          this.warningLength = false;
          let keyLen = this.keyValue.length;
          if (this.selectOption == 128) {
              if (keyLen > this.keyValue128.length) {
                  this.keyValue = this.keyValue.substring(0, this.keyValue128.length);
              }
          } else
          if (this.selectOption == 192) {
              if (keyLen < this.keyValue192.length) {
                  this.keyValue = this.addChars(this.keyValue, this.keyValue192);
              } else if (keyLen > this.keyValue192.length) {
                  this.keyValue = this.keyValue.substring(0, this.keyValue192.length);
              }
          } else
          if (this.selectOption == 256) {
              if (keyLen < this.keyValue256.length) {
                  this.keyValue = this.addChars(this.keyValue, this.keyValue256);
              }
          }
          let obj = {bit: this.selectOption, keyValue: this.keyValue};
          this.eventBus.$emit(EventNames.BitSelected, obj);
      },
    },
    components: {
        InfoBox
    },
});
export default KeyBox;
