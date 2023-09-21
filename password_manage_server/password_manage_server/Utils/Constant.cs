namespace password_manage_server.Utils
{
    public class Constant
    {
        /* 操作类型枚举 */
        public enum Type { add, delete, update, get, added, deleted, updated, got }
        /// <summary>
        /// 返回待保存文件路径
        /// </summary>
        public string savePath()
        {
            //// 获取当前用户的文档文件夹路径
            //string userFolder = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            //// 创建一个保存文件的路径
            //string filePath = Path.Combine(userFolder, "AppData\\Local\\PasswordManage");

            //return filePath;
            return "C:\\Users\\28968\\desktop";
        }
        public string SUCCESS_INFO(Type type)
        {
            return $"Information {type} successfully";
        }
        public string FAILED_INFO(Type type)
        {
            return $"Server error, failed to {type} information";
        }
    }
}
