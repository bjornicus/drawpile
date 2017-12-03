import Vue from 'vue'
import VueTouch from 'vue-touch'
import App from './App'
import router from './router'
import "vueify/lib/insert-css" // required for .vue file <style> tags

Vue.config.productionTip = false

Vue.use(VueTouch)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
