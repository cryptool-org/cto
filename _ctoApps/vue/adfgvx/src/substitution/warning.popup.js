import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";

var WarningPopup = Vue.component('warningPopup', {
    mixins: [EventBus, EventNames],

    created() {
      this.eventBus.$on(EventNames.WarningLength, obj => {
          this.warningLength = obj;
      })
    },
    data() {
      return {
          warningLength: false,
      }
    },
});
export default WarningPopup;
