import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";
import AppData from "../config/app.data";

var AlphabetOptions = Vue.component('alphabetOptions', {
    mixins: [EventBus, EventNames, AppData],

    created() {
      this.eventBus.$on('toggle', value => {
        this.toggle = value;
      })
    },
    watch: {
      uppercase: function() {
        this.eventBus.$emit(EventNames.SetAlphabet, 1);
      },
      blanks: function() {
        this.eventBus.$emit(EventNames.SetAlphabet, 2);
      },
      digits: function() {
        this.eventBus.$emit(EventNames.SetAlphabet, 3);
      },
      punctuationmarks: function() {
        this.eventBus.$emit(EventNames.SetAlphabet, 4);
      },
      lowercase: function() {
        this.eventBus.$emit(EventNames.SetAlphabet, 5);
      },
      umlauts: function() {
        this.eventBus.$emit(EventNames.SetAlphabet, 6);
      }
    }
});
export default AlphabetOptions;
