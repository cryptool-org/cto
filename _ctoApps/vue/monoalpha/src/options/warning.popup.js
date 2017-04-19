import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";

var WarningPopup = Vue.component('warningPopup', {
    mixins: [EventBus, EventNames],

    created() {
      this.eventBus.$on(EventNames.WarningLength, obj => {
       // this.warnClash = obj.bool;
       // this.clashes = obj.values;
          this.warningLength = obj;
          //this.toggle();
      })
    },
    data() {
      return {
          warningLength: false,
          elementId: 'warningLength',
      }
    },
    methods: {
        toggle: function() {
            document.getElementById(this.elementId).classList.toggle('show');
        }
    }
});
export default WarningPopup;
