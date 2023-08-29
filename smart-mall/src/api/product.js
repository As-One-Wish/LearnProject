import request from '@/utils/request'

/**
 * @description 获取搜索商品列表信息
 * @param {object} object
 */
export const getProductList = (object) => {
  const { categoryId, goodsName, page } = object
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
/**
 * @description 获取商品详情数据
 */
export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
/**
 * @description 获取商品评价
 */
export const getProductComment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId, limit
    }
  })
}
