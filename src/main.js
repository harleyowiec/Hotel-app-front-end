import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faSave} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Vuelidate from 'vuelidate'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'

import './assets/scss/style.scss'

import './filters/filters';

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://vue-hotel-node-api.herokuapp.com/';
axios.defaults.headers.post['apiKey'] = 'kp4c8fPITT';
axios.defaults.headers.put['apiKey'] = 'kp4c8fPITT';
axios.defaults.headers.delete['apiKey'] = 'kp4c8fPITT';
axios.defaults.headers.get['apiKey'] = 'kp4c8fPITT';
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.put['X-Requested-With'] = 'XMLHttpRequest';

library.add(faPlus);
library.add(faEdit);
library.add(faTrashAlt);
library.add(faSave);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueAxios, axios);
Vue.use(Vuetify);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);

Vue.config.productionTip = false;


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});


