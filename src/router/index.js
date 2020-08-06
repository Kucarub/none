import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import one from '../components/world1/one.vue'
import eroshi from "../components/eroshi/eroshi.vue"
import meigon from "../components/meigon/meigon.vue"
import snake from "../components/snake/snake.vue"
import online from "../components/online"

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/online'
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/online',
      name: 'online',
      component: online
    },
    {
      path: '/one',
      name: 'one',
      component: one
    },
    {
      path: '/eroshi',
      name: 'eroshi',
      component: eroshi
    },
    {
      path: '/meigon',
      name: 'meigon',
      component: meigon
    },
    {
      path: '/snake',
      name: 'snake',
      component: snake
    }
  ]
})
