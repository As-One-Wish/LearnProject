using System.Text.Json.Serialization;

namespace password_manage_server.Models
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
        public required string id { get; set; }
        /// <summary>
        /// 信息标签，不为空
        /// </summary>
        public required string name { get; set; }
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
            return $"{{ {id}, {name}, {(isPassword ? "密码" : "普通")}， {content}, {(isPassword ? account : "---")}, {comment} }}";
        }

    }
}
