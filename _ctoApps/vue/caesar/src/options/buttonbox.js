import Vue from 'vue';
import EventBus from '../service/event.bus';

var ButtonBox = Vue.component('buttonbox', {
    mixins: [EventBus],

    created() {
      this.eventBus.$on('ownValue', value => {
        this.own = value;
      })
    },
    data() {
      return {
        toggle: false,
        own: false
      }
    },
    watch: {
      toggle: function() {
        this.eventBus.$emit('toggle', this.toggle);
      }
    },
    methods: {
      ownOption: function() {
        this.eventBus.$emit('ownOption');
      }
    }
});
export default ButtonBox;
