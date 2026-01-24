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
        private Func<string, bool, string> CryptoLatestFileAction { get; set; }
        private Action<bool> NewCryptoNowAction { get; set; }
        private Action<string, bool> NewCryptoStartProcessAction { get; set; }

        // -----------------------------------------------------------------

        public WebViewJSHandShake(
            ProcessSupportX psx, 
            Func<string> getLatestCryptoFileListAction, 
            Func<string, string> deleteLatestCryptoFileAction, 
            Func<string, bool, string> cryptoLatestFileAction, 
            Action<bool> newCryptoNowAction,
            Action<string, bool> newCryptoStartProcessAction
        )
        {
            this.PSX = psx;
            this.GetLatestCryptoFileListAction = getLatestCryptoFileListAction;
            this.DeleteLatestCryptoFileAction = deleteLatestCryptoFileAction;
            this.CryptoLatestFileAction = cryptoLatestFileAction;
            this.NewCryptoNowAction = newCryptoNowAction;
            this.NewCryptoStartProcessAction = newCryptoStartProcessAction;
        }

        public string HelloMessage(string name)
        {
            return $"Hello~ {name}!";
        }

        public string GetLatestCryptoFileList()
        {
            return this.GetLatestCryptoFileListAction();
        }

        public string DeleteLatestCryptoFile(string fileID)
        {
            return this.DeleteLatestCryptoFileAction(fileID);
        }

        public string CryptoLatestFile(string fileID, bool isEncrypt)
        {
            return this.CryptoLatestFileAction(fileID, isEncrypt);
        }

        public void NewCryptoNow(bool isEncrypt)
        {
            this.NewCryptoNowAction(isEncrypt);
        }

        public void NewCryptoStartProcess(string filePath, bool isEncrypt)
        {
            this.NewCryptoStartProcessAction(filePath, isEncrypt);
        }
    }
}
