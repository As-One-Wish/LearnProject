<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model:active="activeName" sticky>
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待支付" name="payment"></van-tab>
      <van-tab title="待发货" name="delivery"></van-tab>
      <van-tab title="待收货" name="received"></van-tab>
      <van-tab title="待评价" name="comment"></van-tab>
    </van-tabs>
    <OrderListItem v-for="item in orderList" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'
export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      activeName: this.$route.query.dataType || 'all',
      page: 1,
      orderList: []
    }
  },
  methods: {
    /**
     *@description 获取我的订单列表(基于active)
     *@author HWJ
     *@date 2023-08-18 10:34:38
    */
    async getOrderList () {
      const { data: { list } } = await getMyOrderList(this.activeName, this.page)
      list.data.forEach(element => {
        element.total_num = 0
        element.goods.forEach(item => {
          element.total_num += item.total_num
        })
      })
      this.orderList = list.data
    }
  },
  watch: {
    activeName: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}

.van-tabs {
  position: sticky;
  top: 0;
}
</style>
