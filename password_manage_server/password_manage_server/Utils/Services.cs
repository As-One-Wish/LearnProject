namespace password_manage_server.Utils
{
    public class Services
    {
        /* 创建服务容器 */
        private static ServiceProvider serviceProvider = new ServiceCollection()
                .AddTransient<Encryption>()
                .AddTransient<FileOperator>()
                .AddTransient<Constant>()
                .BuildServiceProvider();
        /* 获取 Service 实例 */
        public static Encryption encrytService = serviceProvider.GetRequiredService<Encryption>();
        public static FileOperator fileService = serviceProvider.GetRequiredService<FileOperator>();
        public static Constant constantService = serviceProvider.GetRequiredService<Constant>();
    }
}
