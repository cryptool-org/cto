import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from '../config/app.data';
import Validator from '../share/validator';

var KeywordBox = Vue.component('keywordbox', {
    mixins: [AppData, EventBus, EventNames, Validator],

    created() {
      this.cType = this.cType.toString();
      this.eventBus.$on(EventNames.Keywords, value => {
          this.toggle = value;
      })
    },
    methods: {
        changeType: function() {
            this.show = this.cType == '4';
            this.eventBus.$emit(EventNames.KeywordType, this.cType);
        }
      /*typeChanged(frm) {
        initLower();

        var localString = "beginningFirstK" + cType;
          document.getElementById("first").innerHTML = getLocale(localString);
            setKeywordValue();
      },*/
    },
    watch: {
        firstKeyword: function() {
            this.eventBus.$emit(EventNames.KeywordFirst, this.firstKeyword);
        },
        secondKeyword: function() {
            this.eventBus.$emit(EventNames.KeywordSecond, this.secondKeyword);
        }
    }
});
export default KeywordBox;
