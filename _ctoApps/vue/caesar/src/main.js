import Vue from 'vue';
import App from './prime.vue';
import VueI18n from 'vue-i18n';

// ready translated locales
var locales = require('./locale/locale.json');

// install plugin
Vue.use(VueI18n);

// set lang
Vue.config.lang = 'en';
Vue.config.fallbackLang = 'de';

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
});


// tslint:disable-next-line:no-unused-new
var vm = new Vue({
	el: '#app',
	render: (h) => h(App),
});
