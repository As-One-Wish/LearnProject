namespace password_manager_server.Utils
{
    public class FileOperator
    {
        /// <summary>
        /// 将数据追加到文件，如果文件不存在则创建文件
        /// </summary>
        public bool append_data_to_file(string data, string path)
        {
            try
            {
                // 创建目录（如果不存在）
                Directory.CreateDirectory(path);

                // 将数据保存到文件
                File.AppendAllText(Path.Combine(path, "data.txt"), data + Environment.NewLine);

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}
