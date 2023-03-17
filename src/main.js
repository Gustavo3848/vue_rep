import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import VueMask from '@devindex/vue-mask'; // <-- ADD THIS LINE
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(VueMask)

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"