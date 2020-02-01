const routes = [
  {
    path: '/',
    name: 'Main',
    params: {
      routerType: 'push'
    },
    component: () => import('../views/main')
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/goods')
  },
  {
    path: '/detail',
    name: 'GoodsDetail',
    component: () => import('../views/goods-detail')
  }
]

export default routes
