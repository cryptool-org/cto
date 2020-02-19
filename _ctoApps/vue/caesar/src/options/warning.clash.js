import Vue from 'vue';
import EventBus from '../service/event.bus';
import EventNames from "../service/event.names";
import AppData from '../config/app.data';

var WarningClash = Vue.component('warning', {
    mixins: [EventBus, EventNames, AppData],

    created() {
        this.eventBus.$on(EventNames.WarningClash, obj => {
            this.warnClash = obj.bool;
            this.clashes = obj.values;
        })
    }
});
export default WarningClash;
