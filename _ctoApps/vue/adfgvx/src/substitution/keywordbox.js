import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import Validator from '../share/validator';

var KeywordBox = Vue.component('keywordbox', {
    mixins: [AppData, EventBus, EventNames, Validator],

    created() {
        this.eventBus.$on(EventNames.KeySquareRandom, () => {
            this.firstKeyword = '';
        });
        this.eventBus.$on(EventNames.KeySquareStandard, () => {
            this.firstKeyword = '';
        });
    },
    watch: {
        firstKeyword: function() {
            this.eventBus.$emit(EventNames.KeywordFirst, this.firstKeyword);
        },
    }
});
export default KeywordBox;
