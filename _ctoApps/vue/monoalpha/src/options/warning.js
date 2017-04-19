import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';

var Warning = Vue.component('warning', {
    mixins: [EventBus, EventNames, AppData],

    created() {
      this.eventBus.$on(EventNames.WarningClash, obj => {
        this.warningClash = obj.bool;
        this.clashes = obj.values;
      })
    }
});
export default Warning;
