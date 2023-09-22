using password_manage_server.Models;

namespace password_manage_server.Utils
{
    public class FileOperator
    {
        private string path = Services.constantService.savePath();
        /// <summary>
        /// 将数据追加到文件，如果文件不存在则创建文件
        /// </summary>
        public bool append_data_to_file(string name, string data)
        {
            try
            {
                // 创建目录（如果不存在）
                if (!File.Exists(path))
                {
                    File.Create(path).Close();
                }
                // 将数据保存到文件
                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(name + '-' + data);
                }

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
        /// <summary>
        /// 返回文件内容
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public List<string>? get_data_from_file()
        {
            if (Path.Exists(path))
                return File.ReadAllText(path).Split(Environment.NewLine).ToList();
            return null;
        }
        /// <summary>
        /// 删除信息
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool delete_data_from_file(List<string> names)
        {
            List<string>? infoList = get_data_from_file();
            if (infoList == null)
                return false;
            foreach (string name in names)
            {
                string prefix = name + '-';
                infoList = infoList.Where(t => !t.StartsWith(prefix)).ToList();
            }
            try
            {
                File.WriteAllLines(path, infoList);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("文件写入时发生错误: " + e.Message);
                return false;
            }


        }
        /// <summary>
        /// 修改某条数据
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public bool update_data_to_file(InfoItem info)
        {
            string encryptInfo = Services.encrytService.EncryptInfo(info);

            List<string>? infoList = get_data_from_file();
            if (infoList == null)
                return false;

            string da = infoList.Find(t => t.StartsWith(info.name + '-'))!;
            da = info.name + "-" + encryptInfo;

            try
            {
                File.WriteAllLines(path, infoList);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("文件写入时发生错误: " + e.Message);
                return false;
            }
        }
    }
}
