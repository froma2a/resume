import Vue from 'vue'
import App from './App'
import echarts from './components/echarts/index';

Vue.config.productionTip = false
Vue.component("echarts", echarts);

App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()
