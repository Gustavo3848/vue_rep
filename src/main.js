import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.$filters = {
    sldFilter(value) {
        let  x = parseFloat(value)
        return x.toFixed(4)
    }
}
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"