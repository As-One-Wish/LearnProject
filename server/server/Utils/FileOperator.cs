﻿using server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace server.Utils
{
    public class FileOperator
    {
        private string path = Services.constantService.savePath();
        /// <summary>
        /// 将数据追加到文件，如果文件不存在则创建文件
        /// </summary>
        public bool append_data_to_file(string id, string data)
        {
            try
            {
                // 将数据保存到文件
                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(id + '-' + data);
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
            List<string> list = new List<string>();
            try
            {
                using (StreamReader reader = new StreamReader(path))
                {
                    string? line;
                    while ((line = reader.ReadLine()) != null)
                    {
                        list.Add(line);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("读取文件时出错：" + e.Message);
            }
            return list;
        }
        /// <summary>
        /// 删除信息
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool delete_data_from_file(List<string> ids)
        {
            Console.WriteLine(ids.Count);
            List<string>? infoList = get_data_from_file();
            if (infoList == null)
                return false;
            foreach (string id in ids)
            {
                string prefix = id + '-';
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
            int ind = infoList.FindIndex(t => t.StartsWith(info.id + '-'));
            infoList[ind] = info.id + "-" + encryptInfo;

            try
            {
                // 将数据保存到文件
                File.WriteAllLines(path, infoList);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("文件写入时发生错误: " + e.Message);
                return false;
            }
        }

        public bool export_data_to_excel(string distPath)
        {
            List<string>? infoList = get_data_from_file();
            if (infoList == null) return false;

            List<InfoItem> infos = new List<InfoItem>();
            foreach (string item in infoList)
                infos.Add(Services.encrytService.DecryptInfo(item.Split('-')[1]));
            return true;
        }
    }
}
