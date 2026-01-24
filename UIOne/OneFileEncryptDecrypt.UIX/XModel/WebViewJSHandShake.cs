using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel
{
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2.addhostobjecttoscript?view=webview2-dotnet-1.0.3595.46
    [ClassInterface(ClassInterfaceType.None)]
    [ComVisible(true)]
    public class WebViewJSHandShake
    {
        private ProcessSupportX PSX { get; set; }
        private Func<string> GetLatestCryptoFileListAction { get; set; }
        private Func<string, string> DeleteLatestCryptoFileAction { get; set; }
        private Func<string, bool, string[]> CryptoLatestFileAction { get; set; }

        // -----------------------------------------------------------------

        public WebViewJSHandShake(ProcessSupportX psx, Func<string> getLatestCryptoFileListAction, Func<string, string> deleteLatestCryptoFileAction, Func<string, bool, string[]> cryptoLatestFileAction)
        {
            this.PSX = psx;
            this.GetLatestCryptoFileListAction = getLatestCryptoFileListAction;
            this.DeleteLatestCryptoFileAction = deleteLatestCryptoFileAction;
            this.CryptoLatestFileAction = cryptoLatestFileAction;
        }

        public string HelloMessage(string name)
        {
            var result = $"Hello~ {name}!";

            //Debug.WriteLine(("WebViewJSHandShake.HelloMessage >>> " + result));

            return result;
        }

        public string GetLatestCryptoFileList()
        {
            return this.GetLatestCryptoFileListAction();
        }

        public string DeleteLatestCryptoFile(string fileID)
        {
            return this.DeleteLatestCryptoFileAction(fileID);
        }

        public string[] CryptoLatestFile(string fileID, bool isEncrypt)
        {
            return this.CryptoLatestFileAction(fileID, isEncrypt);
        }
    }
}
