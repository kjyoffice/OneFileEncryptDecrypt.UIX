using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel
{
    public class RawLatestCryptoFileItem
    {
        [Newtonsoft.Json.JsonProperty("fileID")]
        public string FileID { get; set; }

        [Newtonsoft.Json.JsonProperty("filePath")]
        public string FilePath { get; set; }

        // -------------------------------------------------------

        public RawLatestCryptoFileItem(LatestCryptoFileItem lcfi)
        {
            this.FileID = lcfi.FileID;
            this.FilePath = lcfi.FilePath;
        }
    }
}
