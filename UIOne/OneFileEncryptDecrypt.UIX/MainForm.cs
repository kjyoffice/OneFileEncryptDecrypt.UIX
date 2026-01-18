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

    // https://weblog.west-wind.com/posts/2021/Jan/14/Taking-the-new-Chromium-WebView2-Control-for-a-Spin-in-NET-Part-1
    // https://grantwinney.com/webview2-a-browser-for-winforms/
    public partial class MainForm : Form
    {
        public MainForm()
        {
            this.InitializeComponent();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            var mwb = this.MainWebBrowser;

            mwb.Source = new Uri("about:blank");
        }

        private void MainForm_Shown(object sender, EventArgs e)
        {
            var mwb = this.MainWebBrowser;
            var mainSiteURL = XValue.ProcessValue.MainSiteURL;
            var goPath = new Uri($"{mainSiteURL}/Index.html");

            mwb.Source = goPath;
        }

        private void MainWebBrowser_CoreWebView2InitializationCompleted(object sender, CoreWebView2InitializationCompletedEventArgs e)
        {
            var caption = this.Text;    

            if (e.IsSuccess == true)
            {
                var mwb = (sender as WebView2);

                if (mwb != null)
                {
                    var cwv = mwb.CoreWebView2;

                    if (cwv != null)
                    {
                        var virtualHostName = XValue.ProcessValue.WebView2VirtualHostName_Full;
                        var folderPath = @".\WebViewRoot";
                        var wvjshs = new XModel.WebViewJSHandShake();

                        cwv.Settings.IsGeneralAutofillEnabled = false;
                        cwv.Settings.IsPasswordAutosaveEnabled = false;
                        //cwv.Settings.AreDevToolsEnabled = false;
                        //cwv.Settings.AreDefaultContextMenusEnabled = false;

                        cwv.SetVirtualHostNameToFolderMapping(virtualHostName, folderPath, CoreWebView2HostResourceAccessKind.Allow);
                        cwv.AddHostObjectToScript("handShake", wvjshs);

                        Debug.WriteLine("MainWebBrowser_CoreWebView2InitializationCompleted");
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

            Debug.WriteLine("MainForm.TestXAction_Click");

            cwv.PostWebMessageAsString("Hello World");
            cwv.PostWebMessageAsJson(@"{ ""hello"" : ""World"" }");
        }
    }
}
