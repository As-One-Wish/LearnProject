<template>
  <!-- 二级路由出口 -->
  <router-view></router-view>
  <!-- 底部导航栏--官方文档：可以将其设置为路由模式 -->
  <van-tabbar v-model="active" active-color="#ee0a24" route>
    <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style scoped></style>
