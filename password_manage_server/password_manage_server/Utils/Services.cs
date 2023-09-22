namespace password_manage_server.Utils
{
    public class Services
    {
        /* 创建服务容器 */
        private static ServiceProvider serviceProvider = new ServiceCollection()
                .AddSingleton<Encryption>()
                .AddSingleton<Constant>()
                .AddSingleton<FileOperator>()
                .BuildServiceProvider();
        /* 获取 Service 实例 */
        public static Encryption encrytService = serviceProvider.GetRequiredService<Encryption>();
        public static Constant constantService = serviceProvider.GetRequiredService<Constant>();
        public static FileOperator fileService = serviceProvider.GetRequiredService<FileOperator>();
    }
}
