import Vue from 'vue'
import Router from 'vue-router'
// import { resolve } from 'dns';
Vue.use(Router)

export default new Router({
  // mode: 'history',
  hashbang: true,
  routes: [
    {
      path: '/home',
      name: 'gameHome',
      component: resolve =>require(['@/components/game_home'],resolve)
    },
    {
      path: '/homeNext',
      name: 'gameHomeNext',
      component: resolve =>require(['@/components/game_homeNext'],resolve)
    },
    {
      path: '/game1',
      name: 'Game1',
      component: resolve =>require(['@/components/Game1'],resolve)
    },
    {
      path: '/game1English',
      name: 'Game1English',
      component: resolve =>require(['@/components/Game1English'],resolve)
    },
    {
      path: '/game2',
      name: 'Game2',
      component: resolve =>require(['@/components/Game2'],resolve)
    },
    {
      path: '/game2English',
      name: 'Game2English',
      component: resolve =>require(['@/components/Game2English'],resolve)
    },
    {
      path: '/Game3',
      name: 'Game3',
      component: resolve =>require(['@/components/Game3'],resolve)
    },
    {
      path: '/Game4',
      name: 'Game4',
      component: resolve =>require(['@/components/Game4'],resolve)
    },
    {
      path: '/divinationHome',
      name: 'divinationHome',
      component: resolve =>require(['@/components/divinationHome'],resolve)
    },
    {
      path: '/divinationHomedown',
      name: 'divinationHomedown',
      component: resolve =>require(['@/components/divinationHomeDown'],resolve)
    },
    {
      path: '/divination',
      name: 'divination',
      component: resolve =>require(['@/components/divination'],resolve)
    },
    {
      path: '/birthday',
      name: 'birthday',
      component: resolve =>require(['@/components/divinationBirthday'],resolve)
    },
    {
      path: '/divinationLover',
      name: 'divinationLover',
      component: resolve =>require(['@/components/divinationLover'],resolve)
    },
    {
      path: '/testDrink',
      name: 'testDrink',
      component: resolve =>require(['@/components/testDrink'],resolve)
    },
    {
      path: '/testPoor',
      name: 'testPoor',
      component: resolve =>require(['@/components/testPoor'],resolve)
    },
    {
      path: '/testCar',
      name: 'testCar',
      component: resolve =>require(['@/components/testCar'],resolve)
    },
  ]
})
