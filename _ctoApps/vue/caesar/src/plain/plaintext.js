import Vue from 'vue';
import EventBus from '../service/event.bus';
import AppConfig from '../config/app.config';

var Plaintext = Vue.component('plain', {
    mixins: [AppConfig, EventBus],

    created() {
      this.eventBus.$on('orgtxt', msg => {
        this.orgtxt = msg;
      });
      this.eventBus.$on('code', msg => {
        this.code = msg;
      })
    },
    data() {
      return {
        orgtxt: "The quick brown fox jumps over the lazy dog",
        code: 'encode',
        down: AppConfig.data().appPath + "dist/image/arrow-down-a.png",
        up: AppConfig.data().appPath + "dist/image/arrow-up-a.png",
      }
    },
    methods: {
      keyPress: function(key, type) {
        let keyObj = { key: key, type: type };
        this.eventBus.$emit('keyPress', keyObj);
      },
      crypt: function(type) {
        let obj = { type: type, txt: this.orgtxt };
        this.eventBus.$emit('crypt', obj);
      }
    }

});
export default Plaintext;
