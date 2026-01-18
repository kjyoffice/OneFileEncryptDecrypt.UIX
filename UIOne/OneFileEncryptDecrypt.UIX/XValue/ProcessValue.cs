using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XValue
{
    public class ProcessValue
    {
        public static string WebView2VirtualHostName_Full
        {
            get
            {
                return (XAppConfig.AppSettings.WebView2VirtualHostName + ".localapp");
            }
        }

        public static string MainSiteURL
        {
            get
            {
                return ("https://" + ProcessValue.WebView2VirtualHostName_Full);
            }
        }
    }
}
