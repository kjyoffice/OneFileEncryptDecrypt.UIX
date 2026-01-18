namespace OneFileEncryptDecrypt.UIX
{
    partial class MainForm
    {
        /// <summary>
        /// 필수 디자이너 변수입니다.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 사용 중인 모든 리소스를 정리합니다.
        /// </summary>
        /// <param name="disposing">관리되는 리소스를 삭제해야 하면 true이고, 그렇지 않으면 false입니다.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 디자이너에서 생성한 코드

        /// <summary>
        /// 디자이너 지원에 필요한 메서드입니다. 
        /// 이 메서드의 내용을 코드 편집기로 수정하지 마세요.
        /// </summary>
        private void InitializeComponent()
        {
            this.MainStatusBar = new System.Windows.Forms.StatusStrip();
            this.MainWebBrowser = new Microsoft.Web.WebView2.WinForms.WebView2();
            this.TestXAction = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.MainWebBrowser)).BeginInit();
            this.SuspendLayout();
            // 
            // MainStatusBar
            // 
            this.MainStatusBar.Location = new System.Drawing.Point(0, 539);
            this.MainStatusBar.Name = "MainStatusBar";
            this.MainStatusBar.Size = new System.Drawing.Size(784, 22);
            this.MainStatusBar.TabIndex = 0;
            this.MainStatusBar.Text = "MainStatusBar";
            // 
            // MainWebBrowser
            // 
            this.MainWebBrowser.AllowExternalDrop = true;
            this.MainWebBrowser.CreationProperties = null;
            this.MainWebBrowser.DefaultBackgroundColor = System.Drawing.Color.White;
            this.MainWebBrowser.Location = new System.Drawing.Point(80, 97);
            this.MainWebBrowser.Name = "MainWebBrowser";
            this.MainWebBrowser.Size = new System.Drawing.Size(561, 367);
            this.MainWebBrowser.TabIndex = 1;
            this.MainWebBrowser.ZoomFactor = 1D;
            this.MainWebBrowser.CoreWebView2InitializationCompleted += new System.EventHandler<Microsoft.Web.WebView2.Core.CoreWebView2InitializationCompletedEventArgs>(this.MainWebBrowser_CoreWebView2InitializationCompleted);
            // 
            // TestXAction
            // 
            this.TestXAction.Location = new System.Drawing.Point(12, 12);
            this.TestXAction.Name = "TestXAction";
            this.TestXAction.Size = new System.Drawing.Size(309, 43);
            this.TestXAction.TabIndex = 2;
            this.TestXAction.Text = "Test X";
            this.TestXAction.UseVisualStyleBackColor = true;
            this.TestXAction.Click += new System.EventHandler(this.TestXAction_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Window;
            this.ClientSize = new System.Drawing.Size(784, 561);
            this.Controls.Add(this.MainWebBrowser);
            this.Controls.Add(this.TestXAction);
            this.Controls.Add(this.MainStatusBar);
            this.MinimumSize = new System.Drawing.Size(800, 600);
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "OneFileEncryptDecrypt.UIX";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.Shown += new System.EventHandler(this.MainForm_Shown);
            ((System.ComponentModel.ISupportInitialize)(this.MainWebBrowser)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.StatusStrip MainStatusBar;
        private Microsoft.Web.WebView2.WinForms.WebView2 MainWebBrowser;
        private System.Windows.Forms.Button TestXAction;
    }
}

