using server.Models;

namespace server.Utils
{
    public class Constant
    {
        /* 操作类型枚举 */
        public enum Type { add, delete, update, get, added, deleted, updated, got, export, exported }
        public string Storage_Path { set; get; } = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        /// <summary>
        /// 返回待保存文件路径
        /// </summary>
        public string savePath()
        {
            // 创建一个保存文件的路径
            string filePath = Path.Combine(Storage_Path, ".pwm");
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
            string msg = "";
            switch (type)
            {
                case Type.added:
                    msg = "信息添加成功！";
                    break;
                case Type.deleted:
                    msg = "信息删除成功！";
                    break;
                case Type.updated:
                    msg = "信息更新成功！";
                    break;
                case Type.got:
                    msg = "信息获取成功！";
                    break;
                case Type.exported:
                    msg = "信息到处成功！";
                    break;
            }
            return msg;
        }
        /// <summary>
        /// 操作失败返回信息
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public string FAILED_INFO(Type type)
        {
            string msg = "";
            switch (type)
            {
                case Type.add:
                    msg = "信息添加失败！";
                    break;
                case Type.delete:
                    msg = "信息删除失败！";
                    break;
                case Type.update:
                    msg = "信息更新失败！";
                    break;
                case Type.get:
                    msg = "信息获取失败！";
                    break;
                case Type.export:
                    msg = "信息导出失败！";
                    break;
            }
            return msg;
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
        /// <summary>
        /// 判断信息中是否包含指定字符串
        /// </summary>
        /// <param name="info"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public bool isContainContent(InfoItem info, string content)
        {
            if (info.name.Contains(content) || info.content.Contains(content) ||
                info.account != null && info.account.Contains(content) || info.comment != null && info.comment.Contains(content))
                return true;
            return false;
        }
    }
}
