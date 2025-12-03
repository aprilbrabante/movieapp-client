import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'notyf/notyf.min.css';

import { createPinia } from 'pinia';

import { createApp } from 'vue'
import router from './router';

import './assets/main.css'
import App from './App.vue'


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');