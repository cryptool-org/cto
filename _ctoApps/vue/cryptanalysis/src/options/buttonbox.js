import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';

var ButtonBox = Vue.component('buttonbox', {
    mixins: [EventBus, EventNames, AppData],

    created() {
      this.eventBus.$on(EventNames.OwnValue, value => {
        this.own = value;
      });
      this.eventBus.$on(EventNames.ComputingRun, value => {
        this.run = value;
      });
      this.eventBus.$on(EventNames.WarningClash, value => {
        this.warning = value;
      });
      this.eventBus.$on(EventNames.RoomSelected, value => {
        this.isSelectedRoom = value;
      });
      this.eventBus.$on(EventNames.GroupType, msg => {
        this.groupType = msg;
      });
    },
    data() {
      return {
        groupType: '1',
        isSelectedRoom: false,
        warning: false
      }
    },
    methods: {
      computed: function() {
        console.log('fire compute');
        this.eventBus.$emit(EventNames.Compute);
      },
      distribute: function() {
        this.eventBus.$emit(EventNames.Distribute);
      }
    },
});
export default ButtonBox;
