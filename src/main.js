import { createApp } from 'vue'
import App from './App.vue'
import clickOutSide from '/src/directives/click-outside.js'

createApp(App).use(clickOutSide).mount('#app')
