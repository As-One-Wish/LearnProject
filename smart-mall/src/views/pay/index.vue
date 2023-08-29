<template>
  <div class="pay">
    <van-nav-bar fixed title="订单结算台" left-arrow @click-left="$router.go(-1)" />

    <!-- 地址相关 -->
    <div class="address">

      <div class="left-icon">
        <van-icon name="logistics" />
      </div>

      <div class="info" v-if="preAddr">
        <div class="info-content">
          <span class="name">{{ preAddr.name }}</span>
          <span class="mobile">{{ preAddr.phone }}</span>
        </div>
        <div class="info-address">
          {{ longAddress }}
        </div>
      </div>

      <div class="info" v-else>
        请选择配送地址
      </div>

      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 订单明细 -->
    <div class="pay-list">
      <div class="list" v-for="item in order.goodsList" :key="item">
        <div class="goods-item">
          <div class="left">
            <img :src="item.goods_image" alt="" />
          </div>
          <div class="right">
            <p class="tit text-ellipsis-2">
              {{ item.goods_name }}
            </p>
            <p class="info">
              <span class="count">x{{ item.total_num }}</span>
              <span class="price">¥{{ item.goods_price_min }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="flow-num-box">
        <span>共 {{ order.orderTotalNum }} 件商品，合计：</span>
        <span class="money">￥{{ order.orderTotalPrice }}</span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">￥{{ order.orderTotalPrice }}</span>
        </div>

        <div class="pay-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>

        <div class="pay-cell">
          <span>配送费用：</span>
          <span v-if="!preAddr">请先选择配送地址</span>
          <span v-else class="red">+￥0.00</span>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="pay-way">
        <span class="tit">支付方式</span>
        <div class="pay-cell">
          <span><van-icon name="balance-o" />余额支付（可用 ¥ {{ personal.balance }} 元）</span>
          <!-- <span>请先选择配送地址</span> -->
          <span class="red"><van-icon name="passed" /></span>
        </div>
      </div>

      <!-- 买家留言 -->
      <div class="buytips">
        <textarea v-model="remark" placeholder="选填:买家留言(50字内)" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span>￥{{ order.orderPrice }}</span></div>
      <div class="tipsbtn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/address'
import { orderSettle, orderSubmit } from '@/api/order'
export default {
  name: 'PayIndex',
  data () {
    return {
      addressList: [],
      order: {},
      personal: {},
      remark: ''
    }
  },
  computed: {
    // 暂时选取地址列表的第一个地址
    preAddr () {
      return this.addressList[0] || {}
    },
    // 拼接详细地址
    longAddress () {
      const region = this.preAddr.region
      if (region && region.province) {
        return region.province + ' ' + region.city + ' ' + region.region
      } else {
        return ''
      }
    },
    // 购买模式
    mode () {
      return this.$route.query.mode
    },
    // 结算订单提供信息
    orderInfo () {
      return this.$route.query.cartIds ||
      {
        goodsId: this.$route.query.goodsId,
        goodsNum: this.$route.query.goodsNum,
        goodsSkuId: this.$route.query.goodsSkuId
      }
    }

  },
  methods: {
    /**
     * @description 获取地址列表-pay.index.vue
     */
    async getAddrList () {
      const { data: { list } } = await getAddressList()
      this.addressList = list
    },
    /**
     * @description 获取订单列表
     */
    async getOrderList () {
      const { data } = await orderSettle(this.mode,
        typeof this.orderInfo === 'string' ? { cartIds: this.orderInfo } : this.orderInfo
      )
      this.order = data.order
      this.personal = data.personal
    },
    /**
     *@description 支付订单
     *@author HWJ
     *@date 2023-08-18 10:09:54
    */
    async submitOrder () {
      let preInfo = {}
      if (typeof this.orderInfo === 'string') {
        preInfo.cartIds = this.orderInfo
        preInfo.remark = this.remark
      } else {
        preInfo = this.orderInfo
        preInfo.remark = this.remark
      }
      await orderSubmit(this.mode, preInfo)
      this.$router.push('/myorder')
    }
    /**
     * @description 添加收货地址
     */
    /* async addAddrList () {
      const name = '张三'
      const phone = '18822259221'
      const regions = [
        { value: 782, label: '上海' },
        { value: 783, label: '上海市' },
        { value: 785, label: '徐汇区' }]
      const detail = '北京路1号楼8888室'
      await addAddressList(name, phone, regions, detail)
    } */
  },
  created () {
    this.getAddrList()
    this.getOrderList()
  }
}
</script>

<style lang="less" scoped>
.pay {
  padding-top: 46px;
  padding-bottom: 46px;

  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}

.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  background-size: 60px auto;

  .left-icon {
    margin-right: 20px;
  }

  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }
}

.goods-item {
  height: 100px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;

  .left {
    width: 100px;

    img {
      display: block;
      width: 80px;
      margin: 10px auto;
    }
  }

  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333;

    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;

      .price {
        color: #fa2209;
      }
    }
  }
}

.flow-num-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;

  .money {
    color: #fa2209;
  }
}

.pay-cell {
  font-size: 14px;
  padding: 10px 12px;
  color: #333;
  display: flex;
  justify-content: space-between;

  .red {
    color: #fa2209;
  }
}

.pay-detail {
  border-bottom: 1px solid #efefef;
}

.pay-way {
  font-size: 14px;
  padding: 10px 12px;
  border-bottom: 1px solid #efefef;
  color: #333;

  .tit {
    line-height: 30px;
  }

  .pay-cell {
    padding: 10px 0;
  }

  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}

.buytips {
  display: block;

  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}

.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  display: flex;

  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;

    span {
      color: #fa2209;
    }
  }

  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg, #f9211c, #ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>
