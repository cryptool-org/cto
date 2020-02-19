import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";

var Popup = Vue.component('popup', {
    mixins: [EventBus, EventNames],

    created() {
      this.eventBus.$on(EventNames.Toggle, obj => {
          this.warningLength = obj;
      })
    },
    data() {
      return {
          warningLength: false,
      }
    },
});
export default Popup;
