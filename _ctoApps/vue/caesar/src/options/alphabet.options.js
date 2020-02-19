import Vue from 'vue';
import EventBus from '../service/event.bus';
import AppData from "../config/app.data";

var AlphabetOptions = Vue.component('alphabetOptions', {
    mixins: [EventBus, AppData],

    created() {
      this.eventBus.$on('toggle', value => {
        this.toggle = value;
      })
    },
    /*data() {
      return {
        toggle: false,

        uppercase: true,
        blanks: false,
        digits: false,
        punctuationmarks: false,
        lowercase: true,
        umlauts: false
      }
    },*/
    watch: {
      uppercase: function() {
        this.eventBus.$emit('setAlphabet', 1);
      },
      blanks: function() {
        this.eventBus.$emit('setAlphabet', 2);
      },
      digits: function() {
        this.eventBus.$emit('setAlphabet', 3);
      },
      punctuationmarks: function() {
        this.eventBus.$emit('setAlphabet', 4);
      },
      lowercase: function() {
        this.eventBus.$emit('setAlphabet', 5);
      },
      umlauts: function() {
        this.eventBus.$emit('setAlphabet', 6);
      }
    }
});
export default AlphabetOptions;
