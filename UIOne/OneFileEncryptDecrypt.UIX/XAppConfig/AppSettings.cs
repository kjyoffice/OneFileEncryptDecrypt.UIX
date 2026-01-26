using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.IO;

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

        public static string InStorageDirectoryPath
        {
            get
            {
                return Path.GetFullPath(ConfigurationManager.AppSettings["InStorageDirectoryPath"].ToString());
            }
        }

        public static string OFEDAppPath
        {
            get
            {
                return Path.GetFullPath(ConfigurationManager.AppSettings["OFEDAppPath"].ToString());
            }
        }
    }
}
