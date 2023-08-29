import request from '@/utils/request'

/**
 *@description 获取文章分类接口
 *@author HWJ
 *@date 2023-08-21 16:32:02
 */
export const articleGetChannelsService = () => request.get('/my/cate/list')
/**
 *@description 新增文章分类接口
 *@author HWJ
 *@date 2023-08-22 09:56:02
 */
export const articleAddChannelService = ({ cate_name, cate_alias }) =>
  request.post('/my/cate/add', { cate_name, cate_alias })
/**
 *@description 编辑文章分类接口
 *@author HWJ
 *@date 2023-08-22 10:05:43
 */
export const articleEditChannelService = ({ id, cate_name, cate_alias }) =>
  request.put('/my/cate/info', { id, cate_name, cate_alias })
/**
 *@description 删除文章分类接口
 *@author HWJ
 *@date 2023-08-22 10:07:17
 */
export const articleDelChannelService = ({ id }) =>
  request.delete('/my/cate/del', { params: { id } })
/**************************************************************************************************** */
/**
 *@description 获取文章列表接口
 *@author HWJ
 *@date 2023-08-22 10:56:59
 */
export const articleGetArticlesService = (params) => request.get('/my/article/list', { params })
/**
 *@description 编辑文章详情
 *@author HWJ
 *@date 2023-08-22 10:59:44
 */
export const articleEditArticlesService = (object) => request.put('/my/article/info', object)
/**
 *@description 删除文章接口
 *@author HWJ
 *@date 2023-08-22 11:00:24
 */
export const articleDelArticlesService = (id) =>
  request.delete('/my/article/info', { params: { id } })
/**
 *@description 新增文章接口
 *@author HWJ
 *@date 2023-08-22 15:27:13
 */
export const articleAddArticleService = (object) => request.post('/my/article/add', object)
/**
 *@description 获取文章详情
 *@author HWJ
 *@date 2023-08-22 15:34:17
 */
export const articleGetDetailService = (id) => request.get('/my/article/info', { params: { id } })
