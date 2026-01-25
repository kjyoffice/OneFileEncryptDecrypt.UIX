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
            this.components = new System.ComponentModel.Container();
            this.MainWebBrowser = new Microsoft.Web.WebView2.WinForms.WebView2();
            this.TestXAction = new System.Windows.Forms.Button();
            this.SelectCryptoFileDialog = new System.Windows.Forms.OpenFileDialog();
            this.MainNotifyIcon = new System.Windows.Forms.NotifyIcon(this.components);
            this.MNI_ContextMenuStrip = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.MNICMS_Exit = new System.Windows.Forms.ToolStripMenuItem();
            ((System.ComponentModel.ISupportInitialize)(this.MainWebBrowser)).BeginInit();
            this.MNI_ContextMenuStrip.SuspendLayout();
            this.SuspendLayout();
            // 
            // MainWebBrowser
            // 
            this.MainWebBrowser.AllowExternalDrop = true;
            this.MainWebBrowser.CreationProperties = null;
            this.MainWebBrowser.DefaultBackgroundColor = System.Drawing.Color.White;
            this.MainWebBrowser.Dock = System.Windows.Forms.DockStyle.Fill;
            this.MainWebBrowser.Location = new System.Drawing.Point(0, 0);
            this.MainWebBrowser.Name = "MainWebBrowser";
            this.MainWebBrowser.Size = new System.Drawing.Size(1008, 729);
            this.MainWebBrowser.TabIndex = 1;
            this.MainWebBrowser.ZoomFactor = 1D;
            this.MainWebBrowser.CoreWebView2InitializationCompleted += new System.EventHandler<Microsoft.Web.WebView2.Core.CoreWebView2InitializationCompletedEventArgs>(this.MainWebBrowser_CoreWebView2InitializationCompleted);
            // 
            // TestXAction
            // 
            this.TestXAction.Location = new System.Drawing.Point(12, 12);
            this.TestXAction.Name = "TestXAction";
            this.TestXAction.Size = new System.Drawing.Size(110, 43);
            this.TestXAction.TabIndex = 2;
            this.TestXAction.Text = "Test X";
            this.TestXAction.UseVisualStyleBackColor = true;
            this.TestXAction.Visible = false;
            this.TestXAction.Click += new System.EventHandler(this.TestXAction_Click);
            // 
            // MainNotifyIcon
            // 
            this.MainNotifyIcon.ContextMenuStrip = this.MNI_ContextMenuStrip;
            this.MainNotifyIcon.Text = "MainNotifyIcon";
            this.MainNotifyIcon.Visible = true;
            this.MainNotifyIcon.DoubleClick += new System.EventHandler(this.MainNotifyIcon_DoubleClick);
            // 
            // MNI_ContextMenuStrip
            // 
            this.MNI_ContextMenuStrip.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.MNICMS_Exit});
            this.MNI_ContextMenuStrip.Name = "contextMenuStrip1";
            this.MNI_ContextMenuStrip.Size = new System.Drawing.Size(181, 48);
            // 
            // MNICMS_Exit
            // 
            this.MNICMS_Exit.Name = "MNICMS_Exit";
            this.MNICMS_Exit.Size = new System.Drawing.Size(180, 22);
            this.MNICMS_Exit.Text = "Exit";
            this.MNICMS_Exit.Click += new System.EventHandler(this.MNICMS_Exit_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Window;
            this.ClientSize = new System.Drawing.Size(1008, 729);
            this.Controls.Add(this.TestXAction);
            this.Controls.Add(this.MainWebBrowser);
            this.MinimumSize = new System.Drawing.Size(800, 600);
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "OneFileEncryptDecrypt";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.MainForm_FormClosing);
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.MainForm_FormClosed);
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.Shown += new System.EventHandler(this.MainForm_Shown);
            this.SizeChanged += new System.EventHandler(this.MainForm_SizeChanged);
            ((System.ComponentModel.ISupportInitialize)(this.MainWebBrowser)).EndInit();
            this.MNI_ContextMenuStrip.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion
        private Microsoft.Web.WebView2.WinForms.WebView2 MainWebBrowser;
        private System.Windows.Forms.Button TestXAction;
        private System.Windows.Forms.OpenFileDialog SelectCryptoFileDialog;
        private System.Windows.Forms.NotifyIcon MainNotifyIcon;
        private System.Windows.Forms.ContextMenuStrip MNI_ContextMenuStrip;
        private System.Windows.Forms.ToolStripMenuItem MNICMS_Exit;
    }
}

