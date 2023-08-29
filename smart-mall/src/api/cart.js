import request from '@/utils/request'

/**
 * @description 加入购物车请求
 * @param goodsId 商品ID
 * @param goodsSkuId 商品规格ID
 */
export const addItemToCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
/**
 * @description 获取购物车总数量
 */
export const getCartTotal = () => {
  return request.get('/cart/total')
}
/**
 * @description 获取购物车商品列表
 */
export const getCartItems = () => {
  return request.get('/cart/list')
}
/**
 * @description 更新购物车商品数量
 */
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId, goodsNum, goodsSkuId
  })
}
/**
 * @description 删除购物车商品所选列表
 */
export const delCartItems = (itemIds) => {
  return request.post('/cart/clear', {
    cartIds: itemIds
  })
}
