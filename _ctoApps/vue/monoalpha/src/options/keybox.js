import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import AppConfig from "../config/app.config";
import Rot13 from "./rot13";

var KeyBox = Vue.component('keybox', {
    mixins: [EventBus, EventNames, AppData, AppConfig],

    created() {
      this.eventBus.$on(EventNames.KeyValue, value => {
        this.keyValue = value;
      })
    },
    data() {
        return {
            left: AppConfig.data().appPath + "dist/image/arrow-left-b.png",
            right: AppConfig.data().appPath + "dist/image/arrow-right-b.png",
        }
    },
    methods: {
      checkKey: function() {
          this.eventBus.$emit(EventNames.KeyCheck, this.keyValue);
      },
      increaseKey: function() {
          this.eventBus.$emit(EventNames.KeyIncrease);
      },
      decreaseKey: function() {
          this.eventBus.$emit(EventNames.KeyDecrease);
      }
    },
    components: {
        Rot13
    }
});
export default KeyBox;
