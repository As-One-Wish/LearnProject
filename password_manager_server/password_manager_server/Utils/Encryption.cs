using password_manager_server.Models;
using System;
using System.Collections;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Text.Json;
using System.Xml.Linq;

namespace password_manager_server.Utils
{
    public class Encryption
    {
        private readonly string key = "mysmallkey1234551298765134567890";
        private readonly string iv = "lqBk2L4n2jy6xpy8E79dEg==";
        /// <summary>
        /// 数据加密
        /// </summary>
        public string EncryptInfo(InfoItem info)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(key);
                aesAlg.IV = Encoding.UTF8.GetBytes(iv); // 生成初始化向量（IV）

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                byte[] encryptedBytes;

                using (var msEncrypt = new System.IO.MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new System.IO.StreamWriter(csEncrypt))
                        {
                            // 将数据序列化为字符串，然后加密
                            string jsonData = JsonSerializer.Serialize(info);
                            Console.WriteLine(jsonData);
                            // 将原始数据加密并写入内存流
                            swEncrypt.Write(jsonData);
                        }
                    }
                    encryptedBytes = msEncrypt.ToArray();
                }
                // 加密后的数据
                string encryptedData = Convert.ToBase64String(encryptedBytes);
                return encryptedData;
            }
        }

        /// <summary>
        /// 数据解密
        /// </summary>
        public InfoItem DecryptInfo(string info_string)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(key);
                aesAlg.IV = Encoding.UTF8.GetBytes(iv);

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                byte[] encryptedData = Encoding.UTF8.GetBytes(info_string);
                using (MemoryStream msDecrypt = new MemoryStream(encryptedData))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {
                            string jsonData = srDecrypt.ReadToEnd();
                            // 将加密后的字符串解析为自定义数据类型
                            InfoItem decryptedData = JsonSerializer.Deserialize<InfoItem>(jsonData)!;
                            return decryptedData;
                        }
                    }
                }
            }
        }
    }
}
