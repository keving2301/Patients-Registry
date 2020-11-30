import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueHtmlToPaper from 'vue-html-to-paper';

Vue.config.productionTip = false

Vue.use(VueHtmlToPaper, options);
// or using the defaults with no stylesheet
// Vue.use(VueHtmlToPaper);
const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
}

new Vue({el: '#app', router, render: h => h(App)})



