namespace password_manage_server.Models
{
    public class PageParams
    {
        public int page { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public bool type { get; set; }

        public bool isFiltering { get; set; } = false;
    }
}
