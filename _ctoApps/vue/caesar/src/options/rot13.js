import Vue from 'vue';
import EventBus from '../service/event.bus';

var Rot13 = Vue.component('rot13', {
    mixins: [EventBus],
    template: "<input class='btn' type='button' value='Rot-13' name='rot13' id='rot13' @click='toggleRot13()'/>",

    methods: {
      toggleRot13: function() {
        this.eventBus.$emit('setAlphabet', 7);
      }
    }
});
export default Rot13;
