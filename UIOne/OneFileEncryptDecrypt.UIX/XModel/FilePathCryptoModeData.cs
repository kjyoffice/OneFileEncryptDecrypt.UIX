using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel
{
    public class FilePathCryptoModeData
    {
        [Newtonsoft.Json.JsonProperty("filePath")]
        public string FilePath { get; private set; }

        [Newtonsoft.Json.JsonProperty("isEncrypt")]
        public bool IsEncrypt { get; private set; }

        // ----------------------------------------------------------------

        [Newtonsoft.Json.JsonIgnore]
        public bool IsAllow
        {
            get
            {
                var encryptedFileExt = XValue.ProcessValue.WorkFileExtension_DoneX;
                var filePath = this.FilePath;
                var isEncrypt = this.IsEncrypt;
                var fileExt = Path.GetExtension(filePath).ToLower();
                // 암호화 할 땐 OFEDX 파일이 아니어야 한다!
                // 복호화 할 땐 OFEDX 파일이어야 한다!
                var result = (
                    (File.Exists(filePath) == true) && 
                    (
                        ((isEncrypt == true) && (fileExt != encryptedFileExt)) ||
                        ((isEncrypt == false) && (fileExt == encryptedFileExt))
                    )
                );

                return result;
            }
        }

        // ----------------------------------------------------------------

        public FilePathCryptoModeData(string filePath, bool isEncrypt)
        {
            this.FilePath = filePath;
            this.IsEncrypt = isEncrypt;
        }
    }
}
