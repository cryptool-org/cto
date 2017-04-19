import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import AppConfig from "../config/app.config";

var Plaintext = Vue.component('plain', {
    mixins: [EventBus, EventNames, AppData, AppConfig],

    created() {
      this.eventBus.$on(EventNames.Plaintxt, msg => {
        this.orgtxt = msg;
      });
      this.eventBus.$on(EventNames.Code, msg => {
        this.code = msg;
      })
    },
    data() {
        return {
            down: AppConfig.data().appPath + "dist/image/arrow-down-a.png",
            up: AppConfig.data().appPath + "dist/image/arrow-up-a.png",
        }
    },
    methods: {
      keyPress: function(key, type) {
        let keyObj = { key: key, type: type };
        this.eventBus.$emit(EventNames.KeyPress, keyObj);
      },
      crypt: function(type) {
        let obj = { type: type, txt: this.orgtxt };
        this.eventBus.$emit(EventNames.Crypt, obj);
      }
    }

});
export default Plaintext;
