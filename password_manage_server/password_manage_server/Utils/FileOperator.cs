namespace password_manage_server.Utils
{
    public class FileOperator
    {
        /// <summary>
        /// 将数据追加到文件，如果文件不存在则创建文件
        /// </summary>
        public bool append_data_to_file(string name, string data, string path)
        {
            try
            {
                // 创建目录（如果不存在）
                if (!File.Exists(path))
                {
                    File.Create(path).Close();
                }
                // 将数据保存到文件
                File.AppendAllText(path, name + "-" + data + Environment.NewLine);

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
        public List<string>? get_data_from_file(string path)
        {
            if (Path.Exists(path))
                return File.ReadAllText(path).Split(Environment.NewLine).ToList();
            return null;
        }
    }
}
