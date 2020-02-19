import Vue from 'vue';
import EventNames from "../share/event.names";
import RadioGroup from '../share/radio.group.btn';

var RadioChooseGroup = Vue.component('radioGroups', {
    mixins: [RadioGroup],

    created() {
      this.eventBus.$on(EventNames.GroupType, msg => {
        this.groupType = msg;
      })
    },
    watch: {
        groupType: function(newVal, oldVal) {
            if (newVal == '1') {
                this.eventBus.$emit(EventNames.JobLocal, true);
            } else {
                this.eventBus.$emit(EventNames.JobLocal, false);
            }
            if (newVal == '2') {
                this.eventBus.$emit(EventNames.JobDefine, true);
            } else {
                this.eventBus.$emit(EventNames.JobDefine, false);
            }
            if (newVal == '3') {
                this.eventBus.$emit(EventNames.ResourceSpend, true);
            } else {
                this.eventBus.$emit(EventNames.ResourceSpend, false);
            }
        }
    }
});
export default RadioChooseGroup;
