import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router/index'
import clickOutSide from '@/directives/click-outside.js'
// import router from '@/router/router.js'

// createApp(App).use(clickOutSide).mount('#app')
const app = createApp(App)

app.use(router)
app.use(clickOutSide)
app.mount('#app')
