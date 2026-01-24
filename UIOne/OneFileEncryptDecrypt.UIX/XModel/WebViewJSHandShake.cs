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
        private Func<string> GetLatestCryptoFileListAction { get; set; }

        // -----------------------------------------------------------------

        public WebViewJSHandShake(Func<string> getLatestCryptoFileListAction)
        {
            this.GetLatestCryptoFileListAction = getLatestCryptoFileListAction;
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
    }
}
