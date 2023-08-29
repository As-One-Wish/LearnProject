import { getCartItems, changeCount, delCartItems } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    /**
     * @description 设置购物车列表
     */
    setCartList (state, cartArray) {
      state.cartList = cartArray
    },
    // /**
    //  * @description 修改单个商品选中状态
    //  * @param itemId 商品ID
    //  */
    // changeItemSelected (state, { itemId, tag }) {
    //   const goods = state.cartList.find(it => it.goods_id === itemId)
    //   console.log(goods)
    //   console.log(goods.isChecked)
    //   console.log(!goods.isChecked)
    //   console.log(tag)
    //   goods.isChecked = tag
    // },
    /**
     * @description 全选反选
     */
    selectAll (state, tag) {
      state.cartList.forEach(item => {
        item.isChecked = !tag
      })
    },
    /**
     * @description 修改本地商品数量
     */
    changeItemCount (state, { goodsId, goodsNum, goodsSkuId }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId && item.goods_sku_id === goodsSkuId)
      goods.goods_num = goodsNum
    },
    /**
     * @description 删除本地商品
     */
    delItems (state, itemIds) {
      state.cartList = state.cartList.filter(item => !itemIds.includes(item.id))
    }
  },
  getters: {
    /**
     * @description 选中的商品列表
     */
    saleItems (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    /**
     * @description 勾选商品总数
     */
    saleCount (state, getters) {
      return getters.saleItems.reduce((sum, item) => sum + item.goods_num, 0)
    },
    /**
     * @description 勾选商品总价值
     */
    saleMoney (state, getters) {
      return getters.saleItems.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0)
    },
    /**
     * @description 购物车商品总数
     */
    totalCount (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    /**
     * @description 控制全选状态
     */
    selectedAll (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  actions: {
    /**
     * @description 获取购物车商品列表，同时对每项添加isChecked标识
     */
    async getCartItemsActions (context) {
      const { data: { list } } = await getCartItems()
      // 后台返回的数据中，不包含复选框的选中状态=>手动维护数据，每一项添加isChecked
      list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', list)
    },
    /**
     * @description 修改单个商品数量
     * @param object 包含商品ID，商品数量，商品规格ID
     */
    async changeCountActions (context, object) {
      const { goodsId, goodsNum, goodsSkuId } = object
      // 先修改本地
      context.commit('changeItemCount', object)
      // 再同步后台修改
      const res = await changeCount(goodsId, goodsNum, goodsSkuId)
      console.log(res)
    },
    /**
     * @description 删除所选商品
     * @param {*} itemIds 商品id(不是goods_id)
     */
    async delItemsActions (context, itemIds) {
      // 先修改本地
      context.commit('delItems', itemIds)
      // 同步后台修改
      const res = await delCartItems(itemIds)
      console.log(res)
    }
  }
}
