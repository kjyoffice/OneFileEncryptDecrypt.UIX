using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Globalization;
using System.IO;

namespace OneFileEncryptDecrypt.UIX
{
    public static class Program
    {
        private static bool IsDebugMode { get; set; }

        // -----------------------------------------------------------------------------------

        [Conditional("DEBUG")]
        private static void ChangeDebugMode()
        {
            Program.IsDebugMode = true;
        }

        // -----------------------------------------------------------------------------------

        /// <summary>
        /// 해당 애플리케이션의 주 진입점입니다.
        /// </summary>
        [STAThread]
        public static void Main()
        {
            Program.IsDebugMode = false;
            Program.ChangeDebugMode();

            var asmName = Assembly.GetExecutingAssembly().GetName().Name;
            var isDebugMode = Program.IsDebugMode;
            var ofedAppPath = XAppConfig.AppSettings.OFEDAppPath;
            var mutexName = (asmName.Replace(".", "_") + "_" + ((isDebugMode == true) ? "DEBUG" : "RELEASE"));
            var psx = new XModel.ProcessSupportX("OneFileEncryptDecrypt", isDebugMode);

            if ((ofedAppPath != string.Empty) && (File.Exists(ofedAppPath) == true))
            {
                using (var mt = new Mutex(false, mutexName))
                {
                    if (mt.WaitOne(0, false) == true)
                    {
                        Application.EnableVisualStyles();
                        Application.SetCompatibleTextRenderingDefault(false);
                        Application.Run(new MainForm(psx));
                    }
                    else
                    {
                        // 프로그램이 이미 실행중입니다.
                        MessageBox.Show(psx.WorkMessage.AppAlreadyRunning, psx.AppName, MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }

                    mt.Close();
                }
            }
            else
            {
                // OFED 프로그램이 없습니다.
                MessageBox.Show(psx.WorkMessage.NotExistOFEDApp, psx.AppName, MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
            }
        }
    }
}






