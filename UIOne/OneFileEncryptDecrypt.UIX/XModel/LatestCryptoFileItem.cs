using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel
{
    public class LatestCryptoFileItem
    {
        [Newtonsoft.Json.JsonIgnore]
        public bool IsAllow { get; private set; }

        [Newtonsoft.Json.JsonProperty("fileID")]
        public string FileID { get; private set; }

        [Newtonsoft.Json.JsonProperty("fileName")]
        public string FileName { get; private set; }

        [Newtonsoft.Json.JsonProperty("directoryPath")]
        public string DirectoryPath { get; private set; }

        [Newtonsoft.Json.JsonProperty("isEncrypt")]
        public bool IsEncrypt { get; private set; }

        // ---------------------------------------------------------

        public LatestCryptoFileItem(XModel_Json.LatestCryptoFileItem_Json jsonData)
        {
            var fileID = (jsonData?.FileID ?? string.Empty).ToLower();
            var filePath = (jsonData?.FilePath ?? string.Empty);
            var isAllow = ((fileID != string.Empty) && ((filePath != null) && (File.Exists(filePath) == true)));
            var encryptedFileExt = XValue.ProcessValue.WorkFileExtension_DoneX.ToUpper();

            this.IsAllow = isAllow;
            this.FileID = fileID;
            this.FileName = ((isAllow == true) ? Path.GetFileName(filePath) : string.Empty);
            this.DirectoryPath = ((isAllow == true) ? Path.GetDirectoryName(filePath) : string.Empty);
            this.IsEncrypt = ((isAllow == true) && (Path.GetExtension(filePath).ToUpper() == encryptedFileExt));
        }
    }
}
