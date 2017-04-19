import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppConfig from '../config/app.config';

var Type = Vue.component('type', {
    mixins: [AppConfig, EventBus, EventNames],

    methods: {
        changeType: function() {
            this.eventBus.$emit(EventNames.CipherType, this.cipherType);
        }
    },
});
export default Type;
