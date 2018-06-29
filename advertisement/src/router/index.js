import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Discount from '@/components/Discount'
import Game from '@/components/Game'
import Order from '@/components/Order'
import Game1 from '@/components/Game1'
import Game2 from '@/components/Game2'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  hashbang: true,
  routes: [
    {
      path: '/draw/:userId',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/discount/:disId',
      name: 'Discount',
      component: Discount
    },
    {
      path: '/game/:gameId',
      name: 'Game',
      component: Game
    },
    {
      path: '/order/:orderId',
      name: 'Order',
      component: Order
    },
    {
      path: '/game1',
      name: 'Game1',
      component: Game1
    },
    {
      path: '/game2',
      name: 'Game2',
      component: Game2
    }
  ]
})
