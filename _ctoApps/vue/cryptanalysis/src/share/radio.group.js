import EventBus from './event.bus';
import EventNames from "./event.names";
import AppConfig from '../config/app.config';

var RadioGroup = {
    mixins: [AppConfig, EventBus, EventNames],

    template: "<div class='radioGroups'>" +
        "<input :id='group1' type='radio' value='1' v-model='groupType' @change='changeType()' />" +
        "<label :for='group1'>{{ $t('radioOne') }}</label>" +
        "<input :id='group2' type='radio' value='2' v-model='groupType' @change='changeType()' />" +
        "<label :for='group2'>{{ $t('radioTwo') }}</label>" +
        "<input :id='group3' type='radio' value='3' v-model='groupType' @change='changeType()' />" +
        "<label :for='group3'>{{ $t('radioThree') }}</label>" +
        "</div>",

    data() {
        return {
            eventName: EventNames.GroupType,
            group1: 'group1',
            group2: 'group2',
            group3: 'group3',
        }
    },
    methods: {
        changeType: function() {
            this.eventBus.$emit(this.eventName, this.groupType);
        }
    },
};
export default RadioGroup;
