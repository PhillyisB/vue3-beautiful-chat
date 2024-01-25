import * as Vue from 'vue'
import App from '../demo/src/test.vue'
import Chat from './index.js'
import "bootstrap";

const app = Vue.createApp(App)

app.use(Chat)

app.mount('#app')
