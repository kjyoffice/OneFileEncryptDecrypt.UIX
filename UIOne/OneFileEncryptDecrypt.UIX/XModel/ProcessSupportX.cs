using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel
{
    public class ProcessSupportX
    {
        public string AppName { get; private set; }
        public string LanguageCode { get; private set; }
        public bool IsDebugMode { get; private set; }
        public string WebViewHostName { get; private set; }
        public string InStorageDirectoryPath { get; private set; }
        public string LatestCryptoFilePath { get; private set; }
        public XMessage.WorkMessageSet WorkMessage { get; private set; }

        // ----------------------------------------------------------

        public ProcessSupportX(string appName, bool isDebugMode)
        {
            var languageCode = CultureInfo.CurrentUICulture.Name.ToUpper();
            var inStorageDirPath = ((isDebugMode == true) ? @"..\..\InStorage" : XAppConfig.AppSettings.InStorageDirectoryPath);

            this.AppName = ((isDebugMode == true) ? $"{appName} (Debug)" : appName);
            this.LanguageCode = languageCode;
            this.IsDebugMode = isDebugMode;
            this.WebViewHostName = (XAppConfig.AppSettings.WebView2VirtualHostName + ".localapp");
            this.InStorageDirectoryPath = inStorageDirPath;
            this.LatestCryptoFilePath = Path.Combine(inStorageDirPath, "LatestCryptoFile.json");
            this.WorkMessage = new XMessage.WorkMessageSet(languageCode);
        }
    }
}
