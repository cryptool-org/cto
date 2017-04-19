import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import AppConfig from "../config/app.config";

var KeyBoxInput = Vue.component('keybox', {
    mixins: [EventBus, EventNames, AppData, AppConfig],

    created() {
      this.eventBus.$on(EventNames.KeyValue, value => {
        this.keyValue = value;
      });
      this.eventBus.$on(EventNames.Column, value => {
        this.columns = value;
      });
    },
    methods: {
      checkKey: function() {
          this.eventBus.$emit(EventNames.KeyCheck, this.keyValue);
      },
    }
});
export default KeyBoxInput;
