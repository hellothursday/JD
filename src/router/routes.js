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
  },
  {
    path: '/buy',
    name: 'Buy',
    component: () => import('../views/buy')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register')
  }
]

export default routes
