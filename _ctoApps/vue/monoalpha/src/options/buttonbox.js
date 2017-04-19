import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';

var ButtonBox = Vue.component('buttonbox', {
    mixins: [EventBus, EventNames, AppData],

    created() {
      this.eventBus.$on(EventNames.OwnValue, value => {
        this.own = value;
      })
    },
    watch: {
      toggle: function() {
        this.eventBus.$emit(EventNames.Toggle, this.toggle);
      }
    },
    methods: {
      ownOption: function() {
        this.eventBus.$emit(EventNames.OwnOption);
      }
    }
});
export default ButtonBox;
