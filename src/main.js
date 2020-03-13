import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import moment from 'moment'
import './plugins/element.js'

//引入字体
import './assets/fonts/Birthland/Birthland-Ea4Ze-2.css'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.filter('changeTime',(time)=>{
  return moment(time).utc().format('YYYY-MM-DD HH:mm:ss');
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
