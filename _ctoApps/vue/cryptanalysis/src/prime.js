import Vue from 'vue';
import Ciphertext from "./text/ciphertext.vue";
import KeyBox from './options/keybox.vue';
import EventNames from "./share/event.names";
import AppData from "./config/app.data";
import AppConfig from "./config/app.config";
import SocketBox from "./distribute/socketbox.vue";
import RadioChooseGroup from './options/radio.choose.group';

var Prime = Vue.extend({
    mixins: [AppData, AppConfig, EventNames],

    beforeCreate () {
      this._eventBus = new Vue();
      this._eventBus.$on(EventNames.GroupType, msg => {
          this.define = msg != '3';
      })
    },
    created() {
        if (typeof window.CTO_Globals.lang !== 'undefined') {
            this.switchLang(window.CTO_Globals.lang);
        } else {
            this.switchLang(document.documentElement.lang);
        }
    },
    components: {
        Ciphertext,
        KeyBox,
        SocketBox,
        RadioChooseGroup
    },
    watch: {

    },
    methods: {
      switchLang: function(lang) {
        Vue.config.lang = lang;
      }
    }
});
export default Prime;
