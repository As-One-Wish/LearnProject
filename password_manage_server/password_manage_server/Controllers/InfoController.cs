using Microsoft.AspNetCore.Mvc;
using password_manage_server.Models;
using password_manage_server.Utils;
using System.Security.Cryptography;

namespace password_manage_server.Controllers
{
    /// <summary>
    /// 存储信息的增删查改
    /// </summary>
    [ApiController]
    [Route("api/")]
    public class InfoController : ControllerBase
    {

        /// <summary>
        /// 获取所存储的信息列表
        /// </summary>
        /// <returns>信息列表解密后的json字符串</returns>
        [HttpGet(template: "list")]
        public IActionResult GetInfos(PageParams? pageParams = null)
        {
            try
            {
                /* 如果没传参，则使用默认值 */
                if (pageParams == null) pageParams = new PageParams();

                List<string>? list = Services.fileService.get_data_from_file();
                List<InfoItem> infoList = new List<InfoItem>();

                // 对数据进行解密
                if (list != null)
                    foreach (string item in list)
                        infoList.Add(Services.encrytService.DecryptInfo(item.Split('-')[1]));

                return Ok(new
                {
                    msg = Services.constantService.SUCCESS_INFO(Constant.Type.got),
                    result = new
                    {
                        pages = Math.Ceiling((double)infoList.Count / pageParams.pageSize),
                        pageSize = pageParams.pageSize,
                        counts = infoList.Count,
                        page = pageParams.page,
                        infos = infoList.ToArray()
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        /// <summary>
        /// 添加新的信息
        /// </summary>
        /// <param name="info">新的信息体</param>
        [HttpPost(template: "add")]
        public IActionResult AddInfo(InfoItem info)
        {
            try
            {
                // 获取加密后的信息
                string info_entrypted = Services.encrytService.EncryptInfo(info);
                // 检测信息是否已存在
                if (!Services.constantService.isExistInfo(info.name))
                {
                    // 是否插成功
                    if (!Services.fileService.append_data_to_file(info.name, info_entrypted))
                        return Ok(new { msg = Services.constantService.FAILED_INFO(Constant.Type.add) });
                    return Ok(new { msg = Services.constantService.SUCCESS_INFO(Constant.Type.added) });
                }
                else
                {
                    return Ok(new { msg = "This information already exists" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { msg = ex.Message });
            }
        }

        /// <summary>
        /// 删除某ID对应信息
        /// </summary>
        /// <param name="id">信息ID</param>
        [HttpDelete(template: "delete")]
        public IActionResult DeleteInfo(List<string> names)
        {
            try
            {
                if (Services.fileService.delete_data_from_file(names))
                    return Ok(new { msg = Services.constantService.SUCCESS_INFO(Constant.Type.deleted) });
                return Ok(new { msg = Services.constantService.FAILED_INFO(Constant.Type.delete) });
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }
        /// <summary>
        /// 修改信息
        /// </summary>
        /// <param name="info">待修改信息</param>
        [HttpPut(template: "update")]
        public IActionResult ChangeInfo(InfoItem info)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}