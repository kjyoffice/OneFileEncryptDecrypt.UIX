using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel_Json
{
    public class LatestCryptoFileItem_Json
    {
        [Newtonsoft.Json.JsonProperty("fileID")]
        public string FileID { get; set; }
        [Newtonsoft.Json.JsonProperty("filePath")]
        public string FilePath { get; set; }
    }
}
