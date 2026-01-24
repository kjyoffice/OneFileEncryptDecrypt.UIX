using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneFileEncryptDecrypt.UIX.XModel
{
    public class WebViewPostMessageOrder
    {
        [Newtonsoft.Json.JsonProperty("orderID")]
        public string OrderID { get; private set; }

        [Newtonsoft.Json.JsonProperty("isSuccess")]
        public bool IsSuccess { get; private set; }

        [Newtonsoft.Json.JsonProperty("messageCode")]
        public string MessageCode { get; private set; }

        [Newtonsoft.Json.JsonProperty("supportData")]
        public object SupportData { get; private set; }

        [Newtonsoft.Json.JsonProperty("mainData")]
        public object MainData { get; private set; }

        // ------------------------------------------------------------

        public WebViewPostMessageOrder(string orderID)
        {
            this.OrderID = orderID.ToUpper();
            this.IsSuccess = false;
            this.MessageCode = string.Empty;
            this.SupportData = null;
            this.MainData = null;
        }

        public void SetSuccess()
        {
            this.IsSuccess = true;
            this.MessageCode = string.Empty;
        }

        public void SetMessageCode(string messageCode)
        {
            this.MessageCode = messageCode;
        }

        public void SetSupportData(object supportData)
        {
            this.SupportData = supportData;
        }

        public void SetMainData(object mainData)
        {
            this.MainData = mainData;
        }
    }
}
