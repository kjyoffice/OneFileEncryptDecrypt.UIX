using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel
{
    public class DeleteFileIDData
    {
        [Newtonsoft.Json.JsonProperty("deleteFileID")]
        public string DeleteFileID { get; private set; }

        // ----------------------------------------------

        public DeleteFileIDData(string deleteFileID)
        {
            this.DeleteFileID = deleteFileID;
        }
    }
}
