import Vue from 'vue';
import EventNames from "../share/event.names";
import RadioGroup from '../share/radio.group';

var RadioCipherGroups = Vue.component('radioGroups', {
    mixins: [RadioGroup],

    created() {
      this.eventBus.$on(EventNames.GroupType, msg => {
        this.groupType = msg;
      })
    },
});
export default RadioCipherGroups;
