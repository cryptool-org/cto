import Vue from 'vue';
import EventNames from "../share/event.names";
import RadioGroup from '../share/radio.group';

var RadioSubGroups = Vue.component('radioSubGroups', {
  mixins: [RadioGroup],

  created() {
    this.group1 = 'sub1';
    this.group2 = 'sub2';
    this.group3 = 'sub3';
    this.groupType = this.groupTypeSub;
    this.eventName = EventNames.GroupTypeSub;
  },

});
export default RadioSubGroups;
