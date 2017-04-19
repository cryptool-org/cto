import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from "../config/app.data";

var CipherOptions = Vue.component('cipherOptions', {
    mixins: [EventBus, EventNames],

    data() {
      return {
        keywords: false
      }
    },
    methods: {
      atbash() {
        this.eventBus.$emit(EventNames.Atbash);
      }
    },
    watch: {
      keywords: function() {
        this.eventBus.$emit(EventNames.Keywords, this.keywords);
      }
    }
});
export default CipherOptions;
