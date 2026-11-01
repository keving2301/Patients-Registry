import Vue from 'vue'
import '@fontsource-variable/public-sans/wght.css'
import './styles/main.css'
import App from './App.vue'
import router from './router'
import { openSandbox } from './patients'

Vue.config.productionTip = false

// Start signing in while the first page renders; every data call waits on the same promise.
openSandbox().catch(() => {})

new Vue({ router, render: h => h(App) }).$mount('#app')
