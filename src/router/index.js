import Vue from 'vue'
import Router from 'vue-router'
import one from '../components/world1/one.vue'
import eroshi from "../components/eroshi/eroshi.vue"
import meigon from "../components/meigon/meigon.vue"
import snake from "../components/snake/snake.vue"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/sokoban'
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      path: '/404',
      name: '404',
      component: resolve => require(['@/components/notFound/404.vue'], resolve)
    },
    {
      path: '/sokoban',
      name: 'sokoban',
      component: resolve => require(['@/components/sokoban/sokoban.vue'], resolve)
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
