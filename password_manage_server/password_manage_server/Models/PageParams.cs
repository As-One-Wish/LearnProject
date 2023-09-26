namespace password_manage_server.Models
{
    public class PageParams
    {
        public int page { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        /* 查询种类：0-普通，1-筛选，2-搜索 3-筛选并搜索 */
        public int kind { get; set; } = 0;
        /* 表示筛选种类 */
        public bool type { get; set; }
        /* 表示搜索内容 */
        public string content { get; set; } = "";
    }
}
