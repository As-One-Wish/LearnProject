using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Utils;

namespace server.Controllers
{
    /// <summary>
    /// 存储信息的增删查改
    /// </summary>
    [ApiController]
    [Route("api/")]
    public class InfoController : ControllerBase
    {
        #region 信息操作
        /// <summary>
        /// 获取所存储的信息列表
        /// </summary>
        /// <returns>信息列表解密后的json字符串</returns>
        [HttpPost(template: "info/list")]
        public IActionResult GetInfos([FromBody] PageParams pageParams)
        {
            try
            {
                List<string>? list = Services.fileService.get_data_from_file(); // 总的信息集合
                List<InfoItem> infoList = new List<InfoItem>(); // 分页查询出的信息集合
                List<string> filterList = new List<string>();
                int totalCount = 0; // 信息总条数
                // 对数据进行解密
                if (list != null)
                {
                    switch (pageParams.kind)
                    {
                        case 0: /* 查询 */
                            totalCount = list.Count;

                            // 自分页处开始，剩下的信息数量
                            int preLen = totalCount - (pageParams.page - 1) * pageParams.pageSize;
                            int len = preLen <= pageParams.pageSize ? preLen : pageParams.pageSize; // 实际查询的数量
                            filterList = list.GetRange((pageParams.page - 1) * pageParams.pageSize, len);
                            foreach (string item in filterList)
                            {
                                // 解密
                                infoList.Add(Services.encrytService.DecryptInfo(item.Split('-')[1]));
                            };
                            break;
                        case 1: /* 筛选 */
                            foreach (string item in list)
                            {
                                InfoItem tmp = Services.encrytService.DecryptInfo(item.Split('-')[1]);
                                if (tmp.isPassword == pageParams.type)
                                {
                                    infoList.Add(tmp);
                                    totalCount++;
                                }
                            }
                            // 自分页处开始，剩下的信息数量
                            preLen = totalCount - (pageParams.page - 1) * pageParams.pageSize;
                            len = preLen <= pageParams.pageSize ? preLen : pageParams.pageSize; // 实际查询的数量
                            infoList = infoList.GetRange((pageParams.page - 1) * pageParams.pageSize, len);
                            break;
                        case 2: /* 搜索 */
                            foreach (string item in list)
                            {
                                InfoItem tmp = Services.encrytService.DecryptInfo(item.Split('-')[1]);
                                if (Services.constantService.isContainContent(tmp, pageParams.content))
                                {
                                    infoList.Add(tmp);
                                    totalCount++;
                                }
                            }
                            // 自分页处开始，剩下的信息数量
                            preLen = totalCount - (pageParams.page - 1) * pageParams.pageSize;
                            len = preLen <= pageParams.pageSize ? preLen : pageParams.pageSize; // 实际查询的数量
                            infoList = infoList.GetRange((pageParams.page - 1) * pageParams.pageSize, len);
                            break;
                        case 3:
                            foreach (string item in list)
                            {
                                InfoItem tmp = Services.encrytService.DecryptInfo(item.Split('-')[1]);
                                if (Services.constantService.isContainContent(tmp, pageParams.content) && tmp.isPassword == pageParams.type)
                                {
                                    infoList.Add(tmp);
                                    totalCount++;
                                }
                            }
                            // 自分页处开始，剩下的信息数量
                            preLen = totalCount - (pageParams.page - 1) * pageParams.pageSize;
                            len = preLen <= pageParams.pageSize ? preLen : pageParams.pageSize; // 实际查询的数量
                            infoList = infoList.GetRange((pageParams.page - 1) * pageParams.pageSize, len);
                            break;
                    }
                }
                return Ok(new RepObj
                {
                    msg = Services.constantService.SUCCESS_INFO(Constant.Type.got),
                    code = 1,
                    result = new
                    {
                        pages = Math.Ceiling((double)totalCount / pageParams.pageSize),
                        pageParams.pageSize,
                        counts = list == null ? 0 : totalCount,
                        pageParams.page,
                        infos = infoList.ToArray()
                    }
                });
            }
            catch (Exception ex)
            {
                return Ok(new RepObj { msg = ex.Message });
            }
        }
        /// <summary>
        /// 添加新的信息
        /// </summary>
        /// <param name="info">新的信息体</param>
        [HttpPost(template: "info/add")]
        public IActionResult AddInfo([FromBody] InfoItem info)
        {
            try
            {
                // 获取加密后的信息
                string info_entrypted = Services.encrytService.EncryptInfo(info);
                // 检测信息是否已存在
                if (!Services.constantService.isExistInfo(info.id))
                {
                    // 是否插成功
                    if (!Services.fileService.append_data_to_file(info.id, info_entrypted))
                        return Ok(new RepObj { msg = Services.constantService.FAILED_INFO(Constant.Type.add) });
                    return Ok(new RepObj { msg = Services.constantService.SUCCESS_INFO(Constant.Type.added), code = 1 });
                }
                else
                {
                    return Ok(new RepObj { msg = "This information already exists" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new RepObj { msg = ex.Message });
            }
        }

        /// <summary>
        /// 删除某ID对应信息
        /// </summary>
        /// <param name="id">信息ID</param>
        [HttpDelete(template: "info/delete")]
        public IActionResult DeleteInfo([FromBody] List<string> ids)
        {
            try
            {
                if (Services.fileService.delete_data_from_file(ids))
                    return Ok(new RepObj { msg = Services.constantService.SUCCESS_INFO(Constant.Type.deleted), code = 1 });
                return Ok(new RepObj { msg = Services.constantService.FAILED_INFO(Constant.Type.delete) });
            }
            catch (Exception ex)
            {
                return Ok(new RepObj { msg = ex.Message });
            }
        }
        /// <summary>
        /// 修改信息
        /// </summary>
        /// <param name="info">待修改信息</param>
        [HttpPut(template: "info/update")]
        public IActionResult UpdateInfo([FromBody] InfoItem info)
        {
            try
            {
                if (Services.fileService.update_data_to_file(info))
                    return Ok(new RepObj { msg = Services.constantService.SUCCESS_INFO(Constant.Type.updated), code = 1 });
                return Ok(new RepObj { msg = Services.constantService.FAILED_INFO(Constant.Type.update) });
            }
            catch (Exception ex)
            {
                return Ok(new RepObj { msg = ex.Message });
            }
        }

        /// <summary>
        /// 获取单条数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet(template: "info/single/{id}")]
        public IActionResult GetSingleInfo([FromRoute] string id)
        {
            try
            {
                List<string>? list = Services.fileService.get_data_from_file(); // 总的信息集合
                InfoItem? resInfo = null;
                if (list != null)
                {
                    string? res = list.Find(t => t.StartsWith(id + '-'));
                    if (res != null)
                    {
                        resInfo = Services.encrytService.DecryptInfo(res.Split('-')[1]);
                    }
                }
                return Ok(new RepObj
                {
                    msg = Services.constantService.SUCCESS_INFO(Constant.Type.got),
                    code = 1,
                    result = resInfo
                });
            }
            catch (Exception ex)
            {
                return Ok(new RepObj { msg = ex.Message });
            }
        }

        public IActionResult ExportInfo()
        {
            try
            {
                return Ok(new RepObj
                {
                    msg = Services.constantService.SUCCESS_INFO(Constant.Type.updated),
                    code = 1,
                });
            }
            catch (Exception ex)
            {
                return Ok(new RepObj { msg = ex.Message });
            }
        }

        #endregion

        #region 路径操作-未验证
        /// <summary>
        /// 获取信息存储路径
        /// </summary>
        /// <returns></returns>
        [HttpGet(template: "path/get")]
        public IActionResult GetStoragePath()
        {
            try
            {
                return Ok(new RepObj
                {
                    msg = Services.constantService.SUCCESS_INFO(Constant.Type.got),
                    code = 1,
                    result = new { paht = Services.constantService.savePath() }
                });
            }
            catch (Exception ex)
            {
                return Ok(new RepObj { msg = ex.Message });
            }

        }

        /// <summary>
        /// 修改存储路径
        /// </summary>
        /// <param name="new_path"></param>
        /// <returns></returns>
        [HttpPut(template: "/path/update")]
        public IActionResult UpdateStoragePath([FromBody] string new_path)
        {
            try
            {
                Services.constantService.Storage_Path = new_path;
                return Ok(new RepObj
                {
                    msg = Services.constantService.SUCCESS_INFO(Constant.Type.updated),
                    code = 1,
                });
            }
            catch (Exception ex)
            {
                return Ok(new RepObj { msg = ex.Message });
            }
        }
        #endregion
    }
}