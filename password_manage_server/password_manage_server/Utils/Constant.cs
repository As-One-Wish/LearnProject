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
            // 获取当前用户的文档文件夹路径
            string userFolder = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            // 创建一个保存文件的路径
            string filePath = Path.Combine(userFolder, ".pwm");
            Console.WriteLine(filePath);
            if (!File.Exists(filePath))
                File.Create(filePath).Close();

            return filePath;
        }
        /// <summary>
        /// 操作成功返回信息
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public string SUCCESS_INFO(Type type)
        {
            return $"Information {type} successfully";
        }
        /// <summary>
        /// 操作失败返回信息
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public string FAILED_INFO(Type type)
        {
            return $"Server error, failed to {type} information";
        }

        /// <summary>
        /// 判断信息是否已存在
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool isExistInfo(string id)
        {
            /* 获取信息列表 */
            List<string>? infoList = Services.fileService.get_data_from_file();
            if (infoList == null)
                return false;
            /* 查找以所查找信息名字开头的数据 */
            string? res = infoList.Find(t => t.StartsWith(id + '-'));
            return res != null;
        }
    }
}
