using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XMessage
{
    public class WorkMessageSet
    {
        private bool IsHangul { get; set; }

        // ----------------------------------------------------

        public string NotExistOFEDApp
        {
            get
            {
                return (
                    (this.IsHangul == true) ? 
                    "OFED 프로그램이 없습니다." : 
                    "Not exist OFED application."
                );
            }
        }

        public string AppAlreadyRunning
        {
            get
            {
                return (
                    (this.IsHangul == true) ?
                    "프로그램이 이미 실행중입니다." : 
                    "Program is already running."
                );
            }
        }

        public string ExitAppQuestion
        {
            get
            {
                return (
                    (this.IsHangul == true) ?
                    "프로그램을 종료하겠습니까?" : 
                    "Do you want to exit the program?"
                );
            }
        }

        public string ExitTitle
        {
            get
            {
                return (
                    (this.IsHangul == true) ?
                    "종료" : 
                    "Exit"
                );
            }
        }

        public string WebViewInitializeFail
        {
            get
            {
                return (
                    (this.IsHangul == true) ?
                    "웹뷰 초기화에 실패했습니다." :
                    "Webview initialize fail."
                );
            }
        }

        public string WebViewInitializeFail_ConvertFail
        {
            get
            {
                return (
                    (this.IsHangul == true) ?
                    "웹뷰 초기화에 실패했습니다. - 변환 실패" :
                    "Webview initialize fail. - Convert fail"
                );
            }
        }

        public string WebViewInitializeFail_NotExistCore
        {
            get
            {
                return (
                    (this.IsHangul == true) ?
                    "웹뷰 초기화에 실패했습니다. - 코어 없음" :
                    "Webview initialize fail. - Not exist core"
                );
            }
        }

        // ----------------------------------------------------

        public WorkMessageSet(string languageCode)
        {
            this.IsHangul = (languageCode.ToUpper() == "KO-KR");
        }
    }
}
