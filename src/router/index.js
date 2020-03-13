import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Article from "../components/article"
import Index from "../components/index"
import AboutMe from "../components/aboutme";
import Search from "../components/search"
import Login from "../views/login";
import Register from "../views/register";
import ForgetPassword from "../views/forgetpassword";


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/register',
      component:Register
    },
    {
      path: '/login',
      component:Login
    },
    {
      path: '/forget',
      component:ForgetPassword
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path: '',
          component: Index
        }
        ,{
          path:'/home/article',
          name:'getArticle',
          component:Article
        },
        {
          path:'/home/AboutMe',
          component:AboutMe
        },
        {
          path:'/home/search',
          name:'searchArticle',
          component:Search
        }
      ]
    }
  ]
});

export default router
