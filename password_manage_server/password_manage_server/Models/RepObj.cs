namespace password_manage_server.Models
{
    public class RepObj
    {
        /// <summary>
        /// 提示语
        /// </summary>
        public required string msg { get; set; }
        /// <summary>
        /// 状态码
        /// <para>code=0:操作失败</para>
        /// <para>code=1:操成功</para>
        /// </summary>
        public int code { get; set; } = 0;
        /// <summary>
        /// 结果值
        /// </summary>
        public object? result { get; set; }
    }
}
