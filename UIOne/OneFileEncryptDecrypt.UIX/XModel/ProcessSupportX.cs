using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel
{
    public class ProcessSupportX
    {
        public string LanguageCode { get; private set; }
        public bool IsDebugMode { get; private set; }
        public string WebViewHostName { get; private set; }

        // ----------------------------------------------------------

        public ProcessSupportX(bool isDebugMode)
        {
            this.LanguageCode = CultureInfo.CurrentUICulture.Name.ToUpper();
            this.IsDebugMode = isDebugMode;
            this.WebViewHostName = (XAppConfig.AppSettings.WebView2VirtualHostName + ".localapp");
        }
    }
}
