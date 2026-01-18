using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace OneFileEncryptDecrypt.UIX.XAppConfig
{
    public class AppSettings
    {
        public static string WebView2VirtualHostName
        {
            get
            {
                return ConfigurationManager.AppSettings["WebView2VirtualHostName"].ToString();
            }
        }
    }
}
