import Vue from 'vue'
import App from './App'
import uniSteps from '@/components/wangxiaohua--steps/index.vue'

Vue.component('uniSteps', uniSteps)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
