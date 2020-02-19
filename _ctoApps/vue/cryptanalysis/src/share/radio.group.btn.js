import EventBus from './event.bus';
import EventNames from "./event.names";
import AppConfig from '../config/app.config';

var RadioGroup = {
    mixins: [AppConfig, EventBus, EventNames],

    template: "<div class='radioGroups btn-group btn-group-justified'>" +
        "<input :id='group1' type='radio' value='1' v-model='groupType' @change='changeType()' />" +
        "<label class='btn btn-success' :class='{ active: isActive1 }' :for='group1'>{{ $t('radioOne') }}</label>" +
        "<input :id='group2' type='radio' value='2' v-model='groupType' @change='changeType()' />" +
        "<label class='btn btn-success' :class='{ active: isActive2 }' :for='group2'>{{ $t('radioTwo') }}</label>" +
        "<input :id='group3' type='radio' value='3' v-model='groupType' @change='changeType()' />" +
        "<label class='btn btn-success' :class='{ active: isActive3 }' :for='group3'>{{ $t('radioThree') }}</label>" +
        "</div>",

    data() {
        return {
            eventName: EventNames.GroupType,
            group1: 'group1',
            group2: 'group2',
            group3: 'group3',
            clazz: 'btn btn-success',
            clazzActive: 'btn btn-success active',
            isActive1: true,
            isActive2: false,
            isActive3: false
        }
    },
    methods: {
        changeType: function() {
            this.toggleAct();
            this.eventBus.$emit(this.eventName, this.groupType);
        },
        toggleAct: function() {
            this.isActive1 = false;
            this.isActive2 = false;
            this.isActive3 = false;
            console.log(this.groupType);
            if (this.groupType == '1') {
                this.isActive1 = true;
            }
            if (this.groupType == '2') {
                this.isActive2 = true;
            }
            if (this.groupType == '3') {
                this.isActive3 = true;
            }
        }
    },
};
export default RadioGroup;
