import { createApp } from 'vue'
import App from './App.vue'
import clickOutSide from '/src/services/click-outside.js'

createApp(App).use(clickOutSide).mount('#app')
