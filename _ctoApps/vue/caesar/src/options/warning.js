import Vue from 'vue';
import EventBus from '../service/event.bus';

var Warning = Vue.component('warning', {
    mixins: [EventBus],

    created() {
      this.eventBus.$on('warnClash', obj => {
        this.warnClash = obj.bool;
        this.clashes = obj.values;
      })
    },
    data() {
      return {
        warnLength: false,
        warnChars: false,
        warnClash: false,
        clashes: ''
      }
    }
});
export default Warning;
