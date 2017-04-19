import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";

var Rot13 = Vue.component('rot13', {
    mixins: [EventBus, EventNames],
    template: "<input value='Rot-13' name='rot13' type='button' id='rot13' @click='toggleRot13()'/>",

    methods: {
      toggleRot13: function() {
        this.eventBus.$emit(EventNames.SetAlphabet, 7);
      }
    }
});
export default Rot13;
