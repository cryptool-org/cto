import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import ToggleMixin from '../share/toggle.mixin';
import RadioSubGroups from './radio.sub.group';

var Substitutiontext = Vue.component('substitution', {
    mixins: [EventBus, EventNames, AppData, ToggleMixin],

    created() {
      this.eventBus.$on(EventNames.Substitutiontxt, msg => {
        this.substitutiontxt = msg;
      });
    },
    methods: {
      crypt: function(type) {
        let obj = { type: type, txt: false };
        this.eventBus.$emit(EventNames.Crypt, obj);
      },
      active: function () {
        this.toggle = !this.toggle;
      },
      /*toggleOptions: function(msg) {
        this.toggleDisplayOptions(msg);
        this.eventBus.$emit(EventNames.ToggleDisplayOptions, msg);
      },*/
    },
    components: {
      RadioSubGroups
    }
});
export default Substitutiontext;
