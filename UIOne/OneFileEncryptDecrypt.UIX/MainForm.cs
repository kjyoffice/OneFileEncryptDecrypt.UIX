using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using Microsoft.Web.WebView2.WinForms;
using Microsoft.Web.WebView2.Core;

namespace OneFileEncryptDecrypt.UIX
{
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2.setvirtualhostnametofoldermapping?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.winforms.webview2?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2settings?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2.setvirtualhostnametofoldermapping?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2hostresourceaccesskind?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2.addhostobjecttoscript?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2.postwebmessageasjson?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2.postwebmessageasstring?view=webview2-dotnet-1.0.3595.46
    // https://learn.microsoft.com/en-us/microsoft-edge/webview2/get-started/winforms

    // https://weblog.west-wind.com/posts/2021/Jan/14/Taking-the-new-Chromium-WebView2-Control-for-a-Spin-in-NET-Part-1
    // https://grantwinney.com/webview2-a-browser-for-winforms/
    public partial class MainForm : Form
    {
        private XModel.ProcessSupportX PSX { get; set; }

        // -------------------------------------------------

        private string WebViewAction_GetLatestFileList()
        {
            var result = string.Empty;

            result = "GetLatestFileList!!!";

            return result;
        }

        // -------------------------------------------------

        public MainForm(XModel.ProcessSupportX psx)
        {
            this.PSX = psx;
            this.InitializeComponent();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            var mwb = this.MainWebBrowser;

            mwb.Source = new Uri("about:blank");
        }

        private void MainForm_Shown(object sender, EventArgs e)
        {
            var psx = this.PSX;
            var mwb = this.MainWebBrowser;
            var goPath = new Uri($"https://{psx.WebViewHostName}/Index_{psx.LanguageCode}.html");

            mwb.Source = goPath;
        }

        private void MainWebBrowser_CoreWebView2InitializationCompleted(object sender, CoreWebView2InitializationCompletedEventArgs e)
        {
            var psx = this.PSX;
            var caption = this.Text;    

            if (e.IsSuccess == true)
            {
                var mwb = (sender as WebView2);

                if (mwb != null)
                {
                    var cwv = mwb.CoreWebView2;

                    if (cwv != null)
                    {
                        var mappingDirPath = @".\WebViewRoot";
                        var wvjshs = new XModel.WebViewJSHandShake(this.WebViewAction_GetLatestFileList);

                        cwv.Settings.IsGeneralAutofillEnabled = false;
                        cwv.Settings.IsPasswordAutosaveEnabled = false;

                        if (psx.IsDebugMode == false)
                        {
                            cwv.Settings.AreDevToolsEnabled = false;
                            cwv.Settings.AreDefaultContextMenusEnabled = false;
                        }

                        cwv.SetVirtualHostNameToFolderMapping(psx.WebViewHostName, mappingDirPath, CoreWebView2HostResourceAccessKind.Allow);
                        // 여기 "wvHandShake"와 WebViewRoot_TS 파일의 WVHandShakeX Method 내 hostObjects의 "wvHandShake"가 같아야 한다
                        cwv.AddHostObjectToScript("wvHandShake", wvjshs);

                        //Debug.WriteLine("MainWebBrowser_CoreWebView2InitializationCompleted");
                    }
                    else
                    {
                        MessageBox.Show("웹뷰 초기화 처리에 실패했습니다. - 코어 없음", caption, MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
                else
                {
                    MessageBox.Show("웹뷰 초기화 처리에 실패했습니다. - 변환 실패", caption, MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("웹뷰 초기화에 실패했습니다.", caption, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void TestXAction_Click(object sender, EventArgs e)
        {
            var cwv = this.MainWebBrowser.CoreWebView2;

            //Debug.WriteLine("MainForm.TestXAction_Click");

            cwv.PostWebMessageAsString("Hello World");
            cwv.PostWebMessageAsJson(@"{ ""hello"" : ""World"" }");
        }
    }
}
