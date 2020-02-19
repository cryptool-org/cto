import Vue from 'vue';
import EventBus from '../share/event.bus';
import EventNames from "../share/event.names";

var InfoBox = Vue.component('infobox', {
    mixins: [EventBus, EventNames],

    created() {
      this.eventBus.$on(EventNames.KeyInfoBox, obj => {
          this.open = obj.open;
          this.transmit(obj);
      })
    },
    data() {
      return {
          infoAlgorithm: '',
          currentLength: '',
          lang: '',
          open: false,
      }
    },
    methods: {
        transmit: function(obj) {
            this.lang = Vue.config.lang;

            this.infoAlgorithm = 'For a ' + obj.bit + ' bit AES key exactly ' + obj.bit/4 +
                ' hex characters are needed (including the asterisks for the unknown hex characters).';
            this.currentLength = 'Currently we have ' + obj.len + ' characters.';
            if (Vue.config.lang == 'de') {
                this.infoAlgorithm = 'Für einen '+ obj.bit +' Bit AES-Schlüssel werden genau '+ obj.bit / 4 +
                    'Hex-Zeichen benötigt (einschließlich der Sternchen für die unbekannten Hex-Zeichen).';
                this.currentLength = 'Derzeit haben wir ' + obj.len + ' Zeichen.';
            }
        }
    }
});
export default InfoBox;
