import Vue from 'vue';
import EventBus from '../service/event.bus';
import AppConfig from '../config/app.config';

var KeyBox = Vue.component('keybox', {
    mixins: [AppConfig, EventBus],

    created() {
      this.eventBus.$on('keyValue', value => {
        this.keyValue = value;
      })
    },
    data() {
      return {
        keyValue: 1,
        left: AppConfig.data().appPath + "dist/image/arrow-left-b.png",
        right: AppConfig.data().appPath + "dist/image/arrow-right-b.png",
      }
    },
    methods: {
      checkKey: function() {
          this.eventBus.$emit('checkKey', this.keyValue);
      },
      increaseKey: function() {
          this.eventBus.$emit('increaseKey');
      },
      decreaseKey: function() {
          this.eventBus.$emit('decreaseKey');
      }
    }

});
export default KeyBox;
