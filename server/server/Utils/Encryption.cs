using server.Models;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;


namespace server.Utils
{
    public class Encryption
    {
        private readonly string key = "mysmallkey1234551298765134567890";
        private readonly byte[] iv = [0x5a, 0xa7, 0x3f, 0x86, 0x14, 0xe9, 0xd2, 0xc8, 0x4b, 0x0f, 0x7d, 0x9e, 0x23, 0x6c, 0x58, 0x01];
        /// <summary>
        /// 数据加密
        /// </summary>
        public string EncryptInfo(InfoItem info)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(key);
                aesAlg.IV = iv;
                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                byte[] encryptedBytes;

                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            // 将数据序列化为字符串，然后加密
                            string jsonData = JsonSerializer.Serialize(info);
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
                aesAlg.IV = iv;

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                byte[] encryptedData = Convert.FromBase64String(info_string);
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
