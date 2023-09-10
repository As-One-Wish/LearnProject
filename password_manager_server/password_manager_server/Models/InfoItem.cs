using System.Text.Json.Serialization;
using System;

namespace password_manager_server.Models
{
    /// <summary>
    /// 存储的信息格式
    /// </summary>
    [JsonSerializable(typeof(InfoItem))]
    public class InfoItem
    {
        /// <summary>
        /// 信息标识
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// 信息标签，不为空
        /// </summary>
        public required string tab { get; set; }
        /// <summary>
        /// 区别一般信息和密码信息
        /// </summary>
        public bool isPassword { get; set; } = true;
        /// <summary>
        /// 存储信息主要内容
        /// </summary>
        public required string content { get; set; }
        /// <summary>
        /// 如果是密码，可以记录账号
        /// </summary>
        public string? account { get; set; }
        /// <summary>
        /// 备注说明
        /// </summary>
        public string? comment { get; set; }

        public string toString()
        {
            return "{ " + this.tab + ": " + this.content + " }";
        }
        
    }
}
