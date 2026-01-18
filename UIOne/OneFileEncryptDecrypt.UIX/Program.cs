using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace OneFileEncryptDecrypt.UIX
{
    public static class Program
    {
        private static string BuildType { get; set; }

        // -----------------------------------------------------------------------------------

        [Conditional("DEBUG")]
        private static void DebugBuildMode()
        {
            Program.BuildType = "DEBUG";
        }

        // -----------------------------------------------------------------------------------

        /// <summary>
        /// 해당 애플리케이션의 주 진입점입니다.
        /// </summary>
        [STAThread]
        public static void Main()
        {
            Program.BuildType = "RELEASE";
            Program.DebugBuildMode();

            var buildType = Program.BuildType;
            var asmName = Assembly.GetExecutingAssembly().GetName().Name;
            var mutexName = (asmName + "_" + buildType);

            using (var mt = new Mutex(false, mutexName))
            {
                if (mt.WaitOne(0, false) == true)
                {
                    Application.EnableVisualStyles();
                    Application.SetCompatibleTextRenderingDefault(false);
                    Application.Run(new MainForm());
                }
                else
                {
                    MessageBox.Show("프로그램이 이미 실행중입니다.", asmName, MessageBoxButtons.OK, MessageBoxIcon.Information);
                }

                mt.Close();
            }
        }
    }
}
