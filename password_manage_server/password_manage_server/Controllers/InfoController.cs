using Microsoft.AspNetCore.Mvc;
using password_manage_server.Models;
using password_manage_server.Utils;

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
        public IActionResult GetInfos([FromQuery] PageParams pageParams)
        {
            try
            {
                List<string>? list = Services.fileService.get_data_from_file();
                List<InfoItem> infoList = new List<InfoItem>();

                // 对数据进行解密
                if (list != null)
                {
                    int len = (list.Count - (pageParams.page - 1) * pageParams.pageSize) < pageParams.pageSize ? list.Count - (pageParams.page - 1) * pageParams.pageSize : pageParams.pageSize;
                    list.GetRange((pageParams.page - 1) * pageParams.pageSize, len);
                    foreach (string item in list)
                    {
                        infoList.Add(Services.encrytService.DecryptInfo(item.Split('-')[1]));
                    }

                }


                return Ok(new RepObj
                {
                    msg = Services.constantService.SUCCESS_INFO(Constant.Type.got),
                    code = 1,
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
                return Ok(new RepObj { msg = ex.Message });
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
        [HttpDelete(template: "delete")]
        public IActionResult DeleteInfo(List<string> names)
        {
            try
            {
                if (Services.fileService.delete_data_from_file(names))
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
        [HttpPut(template: "update")]
        public IActionResult ChangeInfo(InfoItem info)
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
    }
}