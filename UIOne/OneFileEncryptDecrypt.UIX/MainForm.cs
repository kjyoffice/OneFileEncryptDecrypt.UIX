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
using System.IO;
using System.Text.RegularExpressions;

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
        private List<XModel.LatestCryptoFileItem> LCFIList { get; set; }
        private string SavedCryptoPassword { get; set; }

        // -------------------------------------------------

        private void InitializeDebugTimeControl(XModel.ProcessSupportX psx)
        {
            if (psx.IsDebugMode == true)
            {
                this.TestXAction.Visible = true;
            }
        }

        private List<XModel.LatestCryptoFileItem> GetLatestCryptoFileList(XModel.ProcessSupportX psx)
        {
            var filePath = psx.LatestCryptoFilePath;
            var result = new List<XModel.LatestCryptoFileItem>();

            if (File.Exists(filePath) == true)
            {
                var jsonText = File.ReadAllText(filePath, Encoding.UTF8);
                var jsonData = Newtonsoft.Json.JsonConvert.DeserializeObject<XModel_Json.LatestCryptoFileItem_Json[]>(jsonText);
                var fileList = (jsonData?.Select(x => new XModel.LatestCryptoFileItem(x)) ?? new List<XModel.LatestCryptoFileItem>()).Where(x => (x.IsAllow == true)).ToList();

                result.AddRange(fileList);
            }

            return result;
        }

        private bool IsAllowXID(string source)
        {
            return ((source != string.Empty) && (Regex.IsMatch(source, "^[a-zA-Z0-9]+$", RegexOptions.IgnoreCase) == true));
        }

        private XModel.LatestCryptoFileItem GetUseLCFI(string fileID)
        {
            return this.LCFIList.Where(x => (x.IsMatchAllowFileID(fileID) == true)).FirstOrDefault();
        }

        private XModel.LatestCryptoFileItem NewLCFI(string filePath, bool isEncrypt)
        {
            var encryptedFileExt = XValue.ProcessValue.WorkFileExtension_DoneX;
            var lcfiList = this.LCFIList;
            var filePathUse = (
                (isEncrypt == true) ? 
                (filePath + encryptedFileExt) : 
                (Path.Combine(Path.GetDirectoryName(filePath), Path.GetFileNameWithoutExtension(filePath)))
            );
            var result = new XModel.LatestCryptoFileItem(filePathUse);

            lcfiList.Add(result);

            return result;
        }

        private void OFEDExecute(string appArgs)
        {
            using (var p = new Process())
            {
                p.StartInfo.FileName = XAppConfig.AppSettings.OFEDAppPath;
                p.StartInfo.Arguments = appArgs;
                p.Start();
                p.WaitForExit();
            }
        }

        private string OFEDExecute_EncryptArguments(string cryptoPassword, string filePath)
        {
            return $"encrypt --password \"{cryptoPassword}\" --file \"{filePath}\" --isuix true";
        }

        private string OFEDExecute_DecryptArguments(string cryptoPassword, string filePath)
        {
            return $"decrypt --password \"{cryptoPassword}\" --file \"{filePath}\" --isuix true";
        }

        // -------------------------------------------------

        private string WebViewAction_GetLatestCryptoFileList()
        {
            var lcfiList = this.LCFIList.Where(x => (x.IsAllow == true)).Reverse().Take(20).ToList();
            var result = Newtonsoft.Json.JsonConvert.SerializeObject(lcfiList);

            return result;
        }

        private string WebViewAction_DeleteLatestCryptoFile(string fileID)
        {
            var result = string.Empty;

            if (this.IsAllowXID(fileID) == true)
            {
                var icfi = this.GetUseLCFI(fileID);

                if (icfi != null)
                {
                    icfi.ChangeNotAllow();
                    result = "OK";
                }
                else
                {
                    result = "WF_NOT_EXIST_FILEITEM";
                }
            }
            else
            {
                result = "WF_EMPTY_OR_WRONG_FILEID";
            }

            return result;
        }

        private string WebViewAction_CryptoLatestFile(string fileID, bool isEncrypt, string cryptoPassword)
        {
            var result = string.Empty;

            if (this.IsAllowXID(fileID) == true)
            {
                var icfi = this.GetUseLCFI(fileID);

                if (icfi != null)
                {
                    // 여기 파라메터에 넘어오는 isEncrypt는 icfi.IsEncrypt와 반대다
                    // 웹뷰에서 리스트 뿌릴 때
                    // icfi.IsEncrypt가 true면 암호화 된 파일이니 복호화를 해야하고 
                    // icfi.IsEncrypt가 false면 복호화 된 파일이 암호화를 해야한다
                    // 그래서 웹뷰에서 선택은 icfi.IsEncrypt와 반대로 하게되는거고 여기까지 온게 파라메터의 isEncrypt다 

                    // 즉 이 메소드의 파라메터, isEncrypt대로 진행하면 된다!
                    var isAllow = (
                        ((icfi.IsEncrypt == true) && (isEncrypt == false)) ||
                        ((icfi.IsEncrypt == false) && (isEncrypt == true))
                    );

                    if (isAllow == true)
                    {
                        if (File.Exists(icfi.FilePath) == true)
                        {
                            // 여기까지 온거면 작업에서 성공이던 실패던 관계없이 일단 리스트에서는 뺀다
                            icfi.ChangeNotAllow();

                            this.WebViewAction_CryptoLatestFile_RunProcess(icfi, isEncrypt, cryptoPassword);

                            result = "OK";
                        }
                        else
                        {
                            result = "WF_NOT_EXIST_FILE";
                        }
                    }
                    else
                    {
                        result = "WF_UNDEFINED_PROCESS";
                    }
                }
                else
                {
                    result = "WF_NOT_EXIST_FILEITEM";
                }
            }
            else
            {
                result = "WF_EMPTY_OR_WRONG_FILEID";
            }

            return result;
        }

        private void WebViewAction_CryptoLatestFile_RunProcess(XModel.LatestCryptoFileItem icfi, bool isEncrypt, string cryptoPassword)
        {
            var timerX = new Timer();
            timerX.Interval = 200;
            timerX.Tick += (object sender, EventArgs e) =>
            {
                timerX.Stop();
                timerX.Dispose();

                var appExeArgs = (
                    (isEncrypt == true) ? 
                    this.OFEDExecute_EncryptArguments(cryptoPassword, icfi.FilePath) : 
                    this.OFEDExecute_DecryptArguments(cryptoPassword, icfi.FilePath)
                );
                
                this.OFEDExecute(appExeArgs);

                var newLCFI = this.NewLCFI(icfi.FilePath, isEncrypt);
                var wvpmo = new XModel.WebViewPostMessageOrder("LATESTFILE_CRYPTOFILERESULT");
                wvpmo.SetSupportData(new XModel.DeleteFileIDData(icfi.FileID));
                wvpmo.SetMainData(newLCFI);

                // 프로그램이 종료되면 파일 존재여부만 보고 성공여부 판단하자
                if (newLCFI.IsAllow == true)
                {
                    wvpmo.SetSuccess();
                }
                else
                {
                    wvpmo.SetMessageCode("WF_OFED_AFTER_EXECUTE_WRONG");
                }

                this.WebViewPostWebMessage(wvpmo);
            };
            timerX.Start();
        }

        private void WebViewAction_NewCryptoNow(bool isEncrypt)
        {
            var timerX = new Timer();
            timerX.Interval = 200;
            timerX.Tick += (object sender, EventArgs e) =>
            {
                timerX.Stop();
                timerX.Dispose();

                var encryptedFileExt = XValue.ProcessValue.WorkFileExtension_DoneX;
                var scfd = this.SelectCryptoFileDialog;
                // 복호화 할 파일을 선택하는거니 특정 확장자만 표시
                scfd.Filter = ((isEncrypt == true) ? string.Empty : $"Encrypted file (*{encryptedFileExt})|*{encryptedFileExt}");

                if (scfd.ShowDialog() == DialogResult.OK)
                {
                    // 파일 선택했으니 웹폼으로 데이터 던짐
                    var wvpmo = new XModel.WebViewPostMessageOrder("NEWCRYPTO_SELECTEDFILE");

                    if (File.Exists(scfd.FileName) == true)
                    {
                        var fpcmd = new XModel.FilePathCryptoModeData(scfd.FileName, isEncrypt);

                        if (fpcmd.IsAllow == true)
                        {
                            wvpmo.SetMainData(fpcmd);
                            wvpmo.SetSuccess();
                        }
                        else
                        {
                            wvpmo.SetMessageCode(((fpcmd.IsEncrypt == true) ? "WF_WRONG_ENCRYPT_FILE" : "WF_WRONG_DECRYPT_FILE"));
                        }
                    }
                    else
                    {
                        wvpmo.SetMessageCode("WF_NOT_EXIST_FILE");
                    }

                    this.WebViewPostWebMessage(wvpmo);
                }
                else
                {
                    // 파일 선택한거 없으니 블라인드 안함
                    var wvpmo = new XModel.WebViewPostMessageOrder("HIDEPAGEBLIND");
                    wvpmo.SetSuccess();

                    this.WebViewPostWebMessage(wvpmo);
                }
            };
            timerX.Start();
        }

        private void WebViewAction_NewCryptoStartProcess(string filePath, bool isEncrypt, string cryptoPassword)
        {
            var timerX = new Timer();
            timerX.Interval = 200;
            timerX.Tick += (object sender, EventArgs e) =>
            {
                timerX.Stop();
                timerX.Dispose();

                var wvpmo = new XModel.WebViewPostMessageOrder("NEWCRYPTO_STARTPROCESSRESULT");
                var fpcmd = new XModel.FilePathCryptoModeData(filePath, isEncrypt);

                if (fpcmd.IsAllow == true)
                {
                    var appExeArgs = (
                        (isEncrypt == true) ?
                        this.OFEDExecute_EncryptArguments(cryptoPassword, filePath) :
                        this.OFEDExecute_DecryptArguments(cryptoPassword, filePath)
                    );

                    this.OFEDExecute(appExeArgs);

                    var newLCFI = this.NewLCFI(filePath, isEncrypt);

                    // 프로그램이 종료되면 파일 존재여부만 보고 성공여부 판단하자
                    if (newLCFI.IsAllow == true)
                    {
                        wvpmo.SetMainData(newLCFI);
                        wvpmo.SetSuccess();
                    }
                    else
                    {
                        wvpmo.SetMessageCode("WF_OFED_AFTER_EXECUTE_WRONG");
                    }
                }
                else
                {
                    wvpmo.SetMessageCode("WF_UNDEFINED_PROCESS");
                }

                this.WebViewPostWebMessage(wvpmo);
            };
            timerX.Start();
        }

        private void WebViewPostWebMessage(XModel.WebViewPostMessageOrder wvpmo)
        {
            var cwv = this.MainWebBrowser.CoreWebView2;
            var jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(wvpmo);

            cwv.PostWebMessageAsJson(jsonText);
        }

        private string WebViewAction_GetSavedCryptoPassword()
        {
            return this.SavedCryptoPassword;
        }

        private void WebViewAction_SetSaveCryptoPassword(string cryptoPassword)
        {
            this.SavedCryptoPassword = cryptoPassword;
        }

        private string WebViewAction_OpenFileOrDirectory(string fileID, bool isOpenFile)
        {
            var result = string.Empty;

            if (this.IsAllowXID(fileID) == true)
            {
                var icfi = this.GetUseLCFI(fileID);

                if (icfi != null)
                {
                    this.WebViewAction_OpenFileOrDirectory_OpenNow(icfi, isOpenFile);

                    result = "OK";
                }
                else
                {
                    result = "WF_NOT_EXIST_FILEITEM";
                }
            }
            else
            {
                result = "WF_EMPTY_OR_WRONG_FILEID";
            }

            return result;
        }

        private void WebViewAction_OpenFileOrDirectory_OpenNow(XModel.LatestCryptoFileItem icfi, bool isOpenFile)
        {
            var timerX = new Timer();
            timerX.Interval = 100;
            timerX.Tick += (object sender, EventArgs e) =>
            {
                timerX.Stop();
                timerX.Dispose();

                if ((isOpenFile == true) && (File.Exists(icfi.FilePath) == true))
                {
                    var psi = new ProcessStartInfo("explorer.exe", $"/select,\"{icfi.FilePath}\"");
                    psi.UseShellExecute = true;

                    Process.Start(psi);
                }
                else if ((isOpenFile == false) && (Directory.Exists(icfi.DirectoryPath) == true))
                {
                    var psi = new ProcessStartInfo("explorer.exe", $"\"{icfi.DirectoryPath}\"");
                    psi.UseShellExecute = true;

                    Process.Start(psi);
                }
            };
            timerX.Start();
        }

        // -------------------------------------------------

        public MainForm(XModel.ProcessSupportX psx)
        {
            this.PSX = psx;
            this.InitializeComponent();
            this.Text = psx.AppName;
            this.Icon = XResource.DefaultResource.DefaultIcon;
            this.MainNotifyIcon.Icon = XResource.DefaultResource.DefaultIcon;
            this.MainNotifyIcon.Text = psx.AppName;
            // 종료
            this.MNICMS_Exit.Text = psx.WorkMessage.ExitTitle;
            this.InitializeDebugTimeControl(psx);
            this.LCFIList = this.GetLatestCryptoFileList(psx);
            this.SavedCryptoPassword = string.Empty;
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
            var goPath = new Uri($"https://{psx.WebViewHostName}/Index.html?languagecode={psx.LanguageCode}");

            mwb.Source = goPath;
        }

        private void MainForm_SizeChanged(object sender, EventArgs e)
        {
            if (this.WindowState == FormWindowState.Minimized)
            {
                this.Visible = false;
            }
        }

        private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            var psx = this.PSX;

            // 프로그램을 종료하겠습니까?
            if (MessageBox.Show(psx.WorkMessage.ExitAppQuestion, psx.AppName, MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.No)
            {
                e.Cancel = true;
            }
        }

        private void MainForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            var psx = this.PSX;
            var rlcfiList = this.LCFIList.Where(x => (x.IsAllow == true)).Select(x => new XModel.RawLatestCryptoFileItem(x)).ToList();
            var jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(rlcfiList);

            // 현재 리스트의 파일정보 기록
            File.WriteAllText(psx.LatestCryptoFilePath, jsonText, Encoding.UTF8);
        }

        private void MainNotifyIcon_DoubleClick(object sender, EventArgs e)
        {
            if (this.Visible == false)
            {
                this.Visible = true;
                this.WindowState = FormWindowState.Normal;
            }
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
                        var mappingDirPath = ((psx.IsDebugMode == true) ? @"..\..\WebViewRoot" : @".\WebViewRoot");
                        var wvjshs = new XModel.WebViewJSHandShake(
                            psx, 
                            this.WebViewAction_GetLatestCryptoFileList, 
                            this.WebViewAction_DeleteLatestCryptoFile, 
                            this.WebViewAction_CryptoLatestFile, 
                            this.WebViewAction_NewCryptoNow,
                            this.WebViewAction_NewCryptoStartProcess,
                            this.WebViewAction_GetSavedCryptoPassword,
                            this.WebViewAction_SetSaveCryptoPassword,
                            this.WebViewAction_OpenFileOrDirectory
                        );

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
                    }
                    else
                    {
                        // 웹뷰 초기화 처리에 실패했습니다. - 코어 없음
                        MessageBox.Show(psx.WorkMessage.WebViewInitializeFail_NotExistCore, caption, MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
                else
                {
                    // 웹뷰 초기화 처리에 실패했습니다. - 변환 실패
                    MessageBox.Show(psx.WorkMessage.WebViewInitializeFail_ConvertFail, caption, MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                // 웹뷰 초기화에 실패했습니다.
                MessageBox.Show(psx.WorkMessage.WebViewInitializeFail, caption, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void TestXAction_Click(object sender, EventArgs e)
        {
            //Process.Start(XAppConfig.AppSettings.OFEDAppPath, "OneFileEncryptDecrypt encrypt -p 0123456789 -f d:\\Download\\Dummy\\XYZ.JPG");
            //Process.Start(XAppConfig.AppSettings.OFEDAppPath, "OneFileEncryptDecrypt decrypt -p 0123456789 -f d:\\Download\\Dummy\\XYZ.JPG.ofedx");

            /*
            using (var p = new Process())
            {
                p.StartInfo.FileName = "E:\\ApplicationProject - My\\OneFileEncryptDecrypt\\OneFileEncryptDecrypt\\bin\\Debug\\net10.0\\OneFileEncryptDecrypt.exe";
                p.StartInfo.Arguments = "encrypt -p 0123456789 -f d:\\Download\\Dummy\\XYZ.JPG";
                p.StartInfo.CreateNoWindow = true;
                p.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
                p.StartInfo.UseShellExecute = false;
                p.StartInfo.RedirectStandardOutput = true;
                p.StartInfo.RedirectStandardError = true;
                p.OutputDataReceived += (object senderX, DataReceivedEventArgs eX) =>
                {
                    Console.Out.WriteLine(("[Data] " + eX.Data));
                };
                p.ErrorDataReceived += (object senderX, DataReceivedEventArgs eX) =>
                {
                    Console.Out.WriteLine(("[Error] " + eX.Data));
                };
                p.Start();
                p.BeginOutputReadLine();
                p.BeginErrorReadLine();
                p.WaitForExit();
            }
            */
            /*
            using (var p = new Process())
            {
                p.StartInfo.FileName = "E:\\ApplicationProject - My\\OneFileEncryptDecrypt\\OneFileEncryptDecrypt\\bin\\Debug\\net10.0\\OneFileEncryptDecrypt.exe";
                //p.StartInfo.Arguments = "encrypt -p 0123456789 -f d:\\Download\\Dummy\\XYZ.JPG";
                p.StartInfo.Arguments = "decrypt -p 0123456789 -f d:\\Download\\Dummy\\XYZ.JPG.ofedx";
                p.Start();
                p.WaitForExit();
            }
            */

            // Empty
        }

        private void MNICMS_Exit_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
