import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { vant } from '@/utils/vant-ui'
import '@/styles/common.less'

const app = createApp(App)
app.use(store).use(router)
app.use(vant)

app.mount('#app')
