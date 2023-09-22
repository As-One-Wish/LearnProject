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
        public IActionResult GetInfos()
        {
            using (Aes aesAlg = Aes.Create())
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
        /// <summary>
        /// 添加新的信息
        /// </summary>
        /// <param name="info">新的信息体</param>
        [HttpPost(template: "add")]
        public IActionResult AddInfo(InfoItem info)
        {
            // 文件保存路径
            string filePath = Services.constantService.savePath();
            try
            {
                // 获取加密后的信息
                string info_entrypted = Services.encrytService.EncryptInfo(info);
                // 检测信息是否已存在
                if (!Services.constantService.isExistInfo(info.name))
                {
                    // 是否插成功
                    if (!Services.fileService.append_data_to_file(info.name, info_entrypted, filePath))
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
        public IActionResult DeleteInfo(long id)
        {
            try
            {
                Console.WriteLine(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// 修改信息
        /// </summary>
        /// <param name="info">待修改信息</param>
        [HttpPut(template: "update")]
        public IActionResult ChangeInfo([FromBody] InfoItem info)
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