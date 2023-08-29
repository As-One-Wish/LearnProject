import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

const Login = () => import('@/views/login')
const Myorder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')

const routes = [
  {
    path: '/', // 主页
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home }, // 首页
      { path: '/category', component: Category }, // 分类页
      { path: '/cart', component: Cart }, // 购物车
      { path: '/user', component: User }// 我的
    ]
  },
  { path: '/login', component: Login }, // 登录页
  { path: '/myorder', component: Myorder }, // 我的订单
  { path: '/pay', component: Pay }, // 支付页
  { path: '/prodetail/:id', component: Prodetail }, // 商品详情
  { path: '/search', component: Search }, // 搜索页
  { path: '/searchlist', component: SearchList }// 搜索列表
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 定义数组，存放需要权限访问的页面
const authUrl = ['/pay', '/myorder']

/** 全局前置导航守卫
 * to: 即将要进入的目标
 * from: 当前导航正要离开的路由
 * 返回值: false--取消当前的导航
 *        一个路由地址
 * */
router.beforeEach((to, from) => {
  // 判断要访问的路径是否是权限页面
  if (authUrl.includes(to.path)) {
    // 获取token
    if (store.getters.isLogined) return true
    return '/login'
  }
  return true
})

export default router
