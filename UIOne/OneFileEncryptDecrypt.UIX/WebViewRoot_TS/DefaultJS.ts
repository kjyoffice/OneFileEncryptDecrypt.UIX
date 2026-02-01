type LatestFileListType = {
    fileID:string;
    fileName:string;
    directoryPath:string;
    isEncrypt:boolean;
};

type SimpleDialogXConfirmFN = (isConfirm:boolean) => void;
type CryptoPasswordDialogXConfirmFN = (isConfirm:boolean, cryptoPassword:string) => void;
type EventParameterFNType = (e:Event) => void;

type ProcessXType = {
    LanguageCode : string;
    MessageSetX : MessageSetXType;
    IsSavePasswordBoxInPassword:boolean;
};

type MessageSetXType = {
    HTML_SelectNewEncrypt:string;
    HTML_SelectNewDecrypt:string;
    HTML_ListRefresh:string;
    // ------------
    Common_Encrypt:string;
    Common_Decrypt:string;    
    Common_NotExistItem:string;
    Common_Delete:string;
    Common_DeleteConfirm:string;
    Common_Confirm:string;
    Common_Cancel:string;
    Common_PleaseCheck:string;
    Common_GoProcess:string;
    Common_Complete:string;
    // ------------
    LatestFileItemDeleteQuestion:string;
    EncryptFileQuestion:string;
    DecryptFileQuestion:string;
    PleaseInputEncryptPassword:string;
    PleaseInputDecryptPassword:string;
    PleaseInputPasswordNotify:string;
    SavePasswordTitle:string;
    SavePasswordTimeNotify:string;
    // ------------
    WF_EMPTY_OR_WRONG_FILEID:string;
    WF_NOT_EXIST_FILEITEM:string;
    WF_UNDEFINED_PROCESS:string;
    WF_NOT_EXIST_FILE:string;
    WF_WRONG_ENCRYPT_FILE:string;
    WF_WRONG_DECRYPT_FILE:string;
    WF_OFED_AFTER_EXECUTE_WRONG:string;
}
& {
    [key: string]: string | undefined;
};
// 위 & { ... } 부분을 주석처리 하면 GetMessageSetX 메소드에서만 오류안내가 될 것임

type ReceiveWebVeiwMessageOrderType = {
    orderID:string;
    isSuccess:boolean;
    messageCode:string;
    supportData:RWMOT_SD_LatestDeleteFileIDType | null;
    mainData : LatestFileListType | RWMOT_MD_NewCryptoSelectFileType | null;
};

type RWMOT_SD_LatestDeleteFileIDType = {
    deleteFileID:string;
};

type RWMOT_MD_NewCryptoSelectFileType = {
    filePath:string;
    isEncrypt:boolean;
};

const MessageSetX_Hangul:MessageSetXType = {
    HTML_SelectNewEncrypt:'암호화 파일 선택',
    HTML_SelectNewDecrypt:'복호화 파일 선택',
    HTML_ListRefresh:'새로고침',
    // ------------
    Common_Encrypt : '암호화',
    Common_Decrypt : '복호화',
    Common_NotExistItem : '항목이 없습니다.',
    Common_Delete : '삭제',
    Common_DeleteConfirm : '삭제했습니다.',
    Common_Confirm:'확인',
    Common_Cancel:'취소',
    Common_PleaseCheck:'확인해주세요.',
    Common_GoProcess:'진행하겠습니까?',
    Common_Complete : '완료했습니다.',
    // ------------
    LatestFileItemDeleteQuestion : '해당 항목을 삭제하겠습니까?',
    EncryptFileQuestion : '파일을 암호화 하겠습니까?',
    DecryptFileQuestion : '파일을 복호화 하겠습니까?',
    PleaseInputEncryptPassword : '암호화 할 비밀번호를 입력해주세요.',
    PleaseInputDecryptPassword : '복호화 할 비밀번호를 입력해주세요.',
    PleaseInputPasswordNotify : '비밀번호를 입력해주세요.',
    SavePasswordTitle : '비밀번호 저장',
    SavePasswordTimeNotify : '비밀번호 저장은 현재 프로그램 실행에서만 허용됩니다.',
    // ------------
    WF_EMPTY_OR_WRONG_FILEID : 'FileID가 없거나 올바르지 않습니다.',
    WF_NOT_EXIST_FILEITEM : '파일 항목이 없습니다.',
    WF_UNDEFINED_PROCESS : '지정되지 않은 진행입니다.',
    WF_NOT_EXIST_FILE : '파일이 존재하지 않습니다.',
    WF_WRONG_ENCRYPT_FILE : '암호화 할 파일이 올바르지 않습니다.',
    WF_WRONG_DECRYPT_FILE : '복호화 할 파일이 올바르지 않습니다.',
    WF_OFED_AFTER_EXECUTE_WRONG : '프로그램 실행 결과가 올바르지 않습니다.'
};

const MessageSetX_English:MessageSetXType = {
    HTML_SelectNewEncrypt:'Select encrypt file',
    HTML_SelectNewDecrypt:'Select decrypt file',
    HTML_ListRefresh:'Refresh',
    // ------------
    Common_Encrypt : 'Encrypt',
    Common_Decrypt : 'Decrypt',
    Common_NotExistItem : 'Not exist item',
    Common_Delete : 'Delete',
    Common_DeleteConfirm : 'Delete done.',
    Common_Confirm:'OK',
    Common_Cancel:'Cancel',
    Common_PleaseCheck:'Please check',
    Common_GoProcess:'Go process?',
    Common_Complete : 'Complete.',
    // ------------
    LatestFileItemDeleteQuestion : 'Are you sure delete this item?',
    EncryptFileQuestion : 'Are you sure encrypt file?',
    DecryptFileQuestion : 'Are you sure decrypt file?',
    PleaseInputEncryptPassword : 'Please input encrypt password.',
    PleaseInputDecryptPassword : 'Please input decrypt password.',
    PleaseInputPasswordNotify : 'Please input password.',
    SavePasswordTitle : 'Save password',
    SavePasswordTimeNotify : 'Password saving is only allowed for the current program execution.',
    // ------------
    WF_EMPTY_OR_WRONG_FILEID : 'Empty or wrong FileID.',
    WF_NOT_EXIST_FILEITEM : 'Not exist file item.',
    WF_UNDEFINED_PROCESS : 'Undefined process.',
    WF_NOT_EXIST_FILE : 'Not exist file.',
    WF_WRONG_ENCRYPT_FILE : 'Wrong encrypt file.',
    WF_WRONG_DECRYPT_FILE : 'Erong decrypt file',
    WF_OFED_AFTER_EXECUTE_WRONG : 'Wrong OFED execute result.'
};

const ProcessX:ProcessXType = {
    LanguageCode : 'KO-KR',
    MessageSetX : MessageSetX_Hangul,
    IsSavePasswordBoxInPassword : false
};

const WVHandShakeX = function() {
    // 여기 "wvHandShake"와 윈폼내 AddHostObjectToScript 부분의 "wvHandShake"가 같아야 한다
    return window.chrome.webview.hostObjects.wvHandShake;    
};

const SendHelloMessage = async function () : Promise<void> {
    console.log(await WVHandShakeX().HelloMessage('Anders'));
};

// 얘가 있는 이유는 지정되지 않은 메세지가 있을 수 있나 싶어서임
// 즉
// MessageSetXType 타입 선언의 & { ... } 부분을 주석처리 하면 Dynamic 하게 메세지를 받는 부분에서 오류가 남
// 이 오류안내를 줄이고자 이 GetMessageSetX 이란 메소드를 만들었고 의도적으로 여기서만 오류가 나게함
// 결론
// 메세지 디버그용 ㅎㅎㅎ
const GetMessageSetX = function(msgSetX:MessageSetXType, msgCode:string) : string | undefined {
    return msgSetX[msgCode];
};

const NewCryptoX = {
    EncryptFile : function(e:Event) : void {    
        NewCryptoX.StartNewCrypto(true);
    },
    DecryptFile : function(e:Event) : void {
        NewCryptoX.StartNewCrypto(false);
    },
    StartNewCrypto : async function(isEncrypt:boolean) : Promise<void> {
        DefaultPageBlindX.ShowNow();
        await WVHandShakeX().NewCryptoNow(isEncrypt);
    },
    StartNewCrypto_SelectedFile : function(dataX:ReceiveWebVeiwMessageOrderType) : void {
        const msgSetX = ProcessX.MessageSetX;

        if(dataX.isSuccess == true) {      
            const md = (dataX.mainData as RWMOT_MD_NewCryptoSelectFileType);
            const confirmMsgX = ((md.isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);
            const passwordMsgX = ((md.isEncrypt == true) ? msgSetX.PleaseInputEncryptPassword : msgSetX.PleaseInputDecryptPassword);

            SimpleDialogX.PasswordBox(
                confirmMsgX,
                passwordMsgX,
                async function(isConfirm:boolean, cryptoPassword:string) : Promise<void> {
                    if(isConfirm == true) {
                        // 이제 실제 프로그램 실행시키러 콜
                        await WVHandShakeX().NewCryptoStartProcess(md.filePath, md.isEncrypt, cryptoPassword);
                    } else {
                        DefaultPageBlindX.HideNow();                
                    }
                }
            );
        } else {
            DefaultPageBlindX.HideNow();
            SimpleDialogX.AlertBox(GetMessageSetX(msgSetX, dataX.messageCode));
        }        
    },
    StartNewCrypto_StartProcessResult : function(dataX:ReceiveWebVeiwMessageOrderType) : void {
        const msgSetX = ProcessX.MessageSetX;
        const msgX = ((dataX.isSuccess == true) ? msgSetX.Common_Complete : GetMessageSetX(msgSetX, dataX.messageCode));

        DefaultPageBlindX.HideNow();
        LatestListX.DisplayList();
        SimpleDialogX.AlertBox(msgX);
    }
};

const LatestListX = {
    DisplayList : async function() : Promise<void> {
        DefaultPageBlindX.ShowNow();

        const areaX = (document.querySelector('#mainframe .latestlistarea ul') as HTMLUListElement);
        const rawFileList = await WVHandShakeX().GetLatestCryptoFileList();
        const fileList = (JSON.parse(rawFileList) as LatestFileListType[]);
        const msgSetX = ProcessX.MessageSetX;

        LatestListX.AllClear(areaX);
        
        if(fileList.length > 0) {

            fileList.forEach(
                function(fileItem:LatestFileListType) : void {
                    const htmlX = LatestListX.CreateFileItem(fileItem, msgSetX);

                    areaX.insertAdjacentHTML('beforeend', htmlX);
                }
            );
        } else {
            LatestListX.CreateNotExist(areaX, msgSetX);
        }

        DefaultPageBlindX.HideNow();
    },
    AllClear : function(areaX : HTMLUListElement) : void {
        const itemList = (areaX.querySelectorAll('li') as NodeListOf<HTMLLIElement>);

        if(itemList.length > 0) {
            itemList.forEach(
                function(item:HTMLLIElement) : void {
                    item.remove();
                }
            );
        }
    },
    CreateNotExist : function(areaX:HTMLUListElement, msgSetX:MessageSetXType) : void {
        var itemX = (document.createElement('LI') as HTMLLIElement);
        itemX.classList.add('emptyitembox');
        itemX.innerText = msgSetX.Common_NotExistItem;

        areaX.appendChild(itemX);
    },
    CreateFileItem : function(fileItem:LatestFileListType, msgSetX:MessageSetXType) : string {
        // 암호화면, 복호화로 표시
        // 암호화가 아니면(=복호화) 암호화로 표시
        const cryptoBoxHTML = (
            (fileItem.isEncrypt == true) ? 
            ('<div class="decryptaction"><button type="button" class="decryptbutton" onclick="LatestListX.DecryptFile(\'' + fileItem.fileID + '\');">' + msgSetX.Common_Decrypt + '</button></div>') : 
            ('<div class="encryptaction"><button type="button" class="encryptbutton" onclick="LatestListX.EncryptFile(\'' + fileItem.fileID + '\');">' + msgSetX.Common_Encrypt + '</button></div>')    
        );
        const result = `
            <li id="fileitemx_${fileItem.fileID}" class="itemx">
                <div class="filenamebox">
                    <div class="filename" title="FileID : ${fileItem.fileID}">${fileItem.fileName}</div>
                    <div class="dirpath">${fileItem.directoryPath}</div>
                </div>
                <div class="cryptobox">${cryptoBoxHTML}</div>
                <div class="deletebox">
                    <div class="deleteaction"><button type="button" onclick="LatestListX.DeleteItem(\'${fileItem.fileID}\');">${msgSetX.Common_Delete}</button></div>
                </div>
            </li>      
        `;

        return result;
    },
    CryptoFileNow : function(fileID:string, isEncrypt:boolean) : void {
        const itemX = (document.getElementById(('fileitemx_' + fileID)) as HTMLLIElement);

        if(itemX != null) {
            const msgSetX = ProcessX.MessageSetX;
            const confirmMsgX = ((isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);
            const passwordMsgX = ((isEncrypt == true) ? msgSetX.PleaseInputEncryptPassword : msgSetX.PleaseInputDecryptPassword);

            SimpleDialogX.PasswordBox(
                confirmMsgX,
                passwordMsgX,
                async function(isConfirm:boolean, cryptoPassword:string) : Promise<void> {
                    if(isConfirm == true) {
                        DefaultPageBlindX.ShowNow();

                        const delResult = await WVHandShakeX().CryptoLatestFile(fileID, isEncrypt, cryptoPassword);

                        if(delResult == 'OK') {                    
                            // 뭐가 됐던 일단 프로그램은 실행됐음, 
                            // 결과는 여기서 기다리기엔 언제 끝날지 모르는 프로그램이라서 블라인드만 유지시켜둠
                            // 이후 ReceiveWebVeiwMessage를 통해 아래의 OrderID, "CRYPTOFILERESULT" 신호 받을때 까지 대기, 신호 받으면 후처리 함
                        } else {
                            DefaultPageBlindX.HideNow();
                            SimpleDialogX.AlertBox(GetMessageSetX(msgSetX, delResult));
                        }
                    }
                }                
            );
        }
    },
    CryptoFileNow_Result : function(dataX:ReceiveWebVeiwMessageOrderType) : void {
        const msgSetX = ProcessX.MessageSetX;
        const msgX = ((dataX.isSuccess == true) ? msgSetX.Common_Complete : GetMessageSetX(msgSetX, dataX.messageCode));

        DefaultPageBlindX.HideNow();
        LatestListX.DisplayList();        
        SimpleDialogX.AlertBox(msgX);
    },
    EncryptFile : function(fileID:string) : void {
        LatestListX.CryptoFileNow(fileID, true);
    },
    DecryptFile : function(fileID:string) : void {
        LatestListX.CryptoFileNow(fileID, false);
    },    
    DeleteItem : function(fileID:string) : void {
        const itemX = (document.getElementById(('fileitemx_' + fileID)) as HTMLLIElement);

        if(itemX != null) {
            const msgSetX = ProcessX.MessageSetX;

            SimpleDialogX.ConfirmBox(
                msgSetX.LatestFileItemDeleteQuestion,
                async function(isConfirm:boolean) : Promise<void> {
                    if(isConfirm == true) {
                        DefaultPageBlindX.ShowNow();

                        const delResult = await WVHandShakeX().DeleteLatestCryptoFile(fileID);

                        if(delResult == 'OK') {
                            // 선택된 리스트 지우고
                            itemX.remove();
                            // 리스트가 모두 지워졌을 수 있으니 메세지 뿌리기
                            LatestListX.DeleteItemAfterNotExist(msgSetX);
                        }

                        const msgX = ((delResult == 'OK') ? msgSetX.Common_DeleteConfirm : GetMessageSetX(msgSetX, delResult));

                        DefaultPageBlindX.HideNow();
                        SimpleDialogX.AlertBox(msgX);
                    }
                }                
            );
        }
    },
    DeleteItemAfterNotExist : function(msgSetX:MessageSetXType) : void {
        const areaX = (document.querySelector('#mainframe .latestlistarea ul') as HTMLUListElement);
        const itemList = (areaX.querySelectorAll('li') as NodeListOf<HTMLLIElement>);

        if(itemList.length <= 0) {
            LatestListX.CreateNotExist(areaX, msgSetX);
        }
    }
};

const DefaultPageBlindX = {
    ShowAndHide : function(isShow:boolean) {
        const blindX = (document.getElementById('defaultpageblind') as HTMLDivElement);

        if(isShow == true) {
            blindX.classList.add('shownow'); 
        } else {
            blindX.classList.remove('shownow'); 
        }   
    },
    ShowNow : function() {
        DefaultPageBlindX.ShowAndHide(true);
    },
    HideNow : function() {
        DefaultPageBlindX.ShowAndHide(false);
    }    
};

const SimpleDialogX = {
    ShowAndHide : function(tagID:string, isShow:boolean) {
        const sdX = (document.getElementById(tagID) as HTMLDivElement);
        const blindX = (document.getElementById((tagID + 'blind')) as HTMLDivElement);

        if(isShow == true) {
            blindX.classList.add('shownow'); 
            sdX.classList.add('shownow'); 
        } else {
            sdX.classList.remove('shownow'); 
            blindX.classList.remove('shownow'); 
            // 닫을때 삭제
            sdX.remove();
            blindX.remove();
        }   
    },
    ShowNow : function(tagID:string) {
        SimpleDialogX.ShowAndHide(tagID, true);
    },
    HideNow : function(tagID:string) {
        SimpleDialogX.ShowAndHide(tagID, false);
    },
    AlertBox : function(message:string|undefined) : void {
        const msgSetX = ProcessX.MessageSetX;
        const bodyX = (document.getElementsByTagName('BODY')[0] as HTMLBodyElement);
        const tagID = ('alertdialog' + Math.random().toString().replace('.', ''));
        const htmlX = `
            <div id="${tagID}blind" class="pageblind"></div>
            <div id="${tagID}" class="simpledialog">
                <div class="titlebox">${msgSetX.Common_PleaseCheck}</div>
                <div class="contentbox">
                    <div class="messagebox">${message}</div>
                </div>
                <div class="actionbox">
                    <button type="button" class="confirmcolor okbutton" onclick="SimpleDialogX.HideNow('${tagID}');">${msgSetX.Common_Confirm}</button>
                </div>
            </div>        
        `;

        bodyX.insertAdjacentHTML('beforeend', htmlX);

        SimpleDialogX.ShowNow(tagID);
    },
    ConfirmBox : function(message:string|undefined, actionCallbackFN:SimpleDialogXConfirmFN) : void {
        const msgSetX = ProcessX.MessageSetX;
        const bodyX = (document.getElementsByTagName('BODY')[0] as HTMLBodyElement);
        const tagID = ('confirmdialog' + Math.random().toString().replace('.', ''));
        const htmlX = `
            <div id="${tagID}blind" class="pageblind"></div>
            <div id="${tagID}" class="simpledialog">
                <div class="titlebox">${msgSetX.Common_GoProcess}</div>
                <div class="contentbox">
                    <div class="messagebox">${message}</div>
                </div>
                <div class="actionbox">
                    <button type="button" class="confirmcolor okbutton">${msgSetX.Common_Confirm}</button>
                    <button type="button" class="cancelcolor cancelbutton">${msgSetX.Common_Cancel}</button>
                </div>
            </div>           
        `;

        bodyX.insertAdjacentHTML('beforeend', htmlX);

        const sdX = (document.getElementById(tagID) as HTMLDivElement);
        const okBtn = (sdX.querySelector('.actionbox .okbutton') as HTMLButtonElement);
        const cencelBtn = (sdX.querySelector('.actionbox .cancelbutton') as HTMLButtonElement);

        okBtn.addEventListener(
            'click', 
            function(e:Event) : void {
                SimpleDialogX.HideNow(tagID);
                actionCallbackFN(true);
            }
        );

        cencelBtn.addEventListener(
            'click', 
            function(e:Event) : void {
                SimpleDialogX.HideNow(tagID);
                actionCallbackFN(false);
            }
        );        

        SimpleDialogX.ShowNow(tagID);
    },
    PasswordBox : async function(message:string|undefined, passwordMsg:string, actionCallbackFN:CryptoPasswordDialogXConfirmFN) : Promise<void> {
        const msgSetX = ProcessX.MessageSetX;
        const bodyX = (document.getElementsByTagName('BODY')[0] as HTMLBodyElement);
        const tagID = ('passworddialog' + Math.random().toString().replace('.', ''));
        const savedPWD = ((ProcessX.IsSavePasswordBoxInPassword == true) ? await WVHandShakeX().GetSavedCryptoPassword() : '')
        const checkedSign = ((ProcessX.IsSavePasswordBoxInPassword == true) ? 'checked="checked"' : '');
        const htmlX = `
            <div id="${tagID}blind" class="pageblind"></div>
            <div id="${tagID}" class="simpledialog passworddialog">
                <div class="titlebox">${msgSetX.Common_GoProcess}</div>
                <div class="contentbox">
                    <div class="messagebox">${message}</div>
                    <div class="inputbox">
                        <div class="contentx">
                            <div class="titlex">${passwordMsg}</div>
                            <div class="inputx"><input type="password" name="cryptopassword" value="${savedPWD}" class="cryptopassword" /></div>
                            <div class="subaction">
                                <label><input type="checkbox" name="savepassword" class="savepassword" onclick="SimpleDialogX.PasswordBox_SavePasswordAlertBox(this);" ${checkedSign} /> ${msgSetX.SavePasswordTitle}</label>
                            </div>
                            <div class="notifymessage"></div>
                        </div>
                    </div>                    
                </div>
                <div class="actionbox">
                    <button type="button" class="confirmcolor okbutton">${msgSetX.Common_Confirm}</button>
                    <button type="button" class="cancelcolor cancelbutton">${msgSetX.Common_Cancel}</button>
                </div>
            </div>           
        `;

        bodyX.insertAdjacentHTML('beforeend', htmlX);

        const sdX = (document.getElementById(tagID) as HTMLDivElement);
        const okBtn = (sdX.querySelector('.actionbox .okbutton') as HTMLButtonElement);
        const cencelBtn = (sdX.querySelector('.actionbox .cancelbutton') as HTMLButtonElement);

        okBtn.addEventListener(
            'click', 
            async function(e:Event) : Promise<void> {                
                const cryptoPWD = (sdX.querySelector('.cryptopassword') as HTMLInputElement);
                const notifyMsg = (sdX.querySelector('.notifymessage') as HTMLDivElement);
                const savePWD = (sdX.querySelector('.savepassword') as HTMLInputElement);

                cryptoPWD.classList.remove('invalidsign');
                cryptoPWD.value = cryptoPWD.value.trim();
                notifyMsg.innerText = '';
                
                if(cryptoPWD.value == '') {
                    cryptoPWD.classList.add('invalidsign');
                    notifyMsg.innerText = msgSetX.PleaseInputPasswordNotify;
                    cryptoPWD.focus();
                } else {                    
                    if(savePWD.checked == true) {
                        await WVHandShakeX().SetSaveCryptoPassword(cryptoPWD.value);
                    }

                    ProcessX.IsSavePasswordBoxInPassword = savePWD.checked;
                    SimpleDialogX.HideNow(tagID);
                    actionCallbackFN(true, cryptoPWD.value);
                }
            }
        );

        cencelBtn.addEventListener(
            'click', 
            function(e:Event) : void {
                SimpleDialogX.HideNow(tagID);
                actionCallbackFN(false, '');
            }
        );        

        SimpleDialogX.ShowNow(tagID);
    },
    PasswordBox_SavePasswordAlertBox : function(inputSource:HTMLInputElement) : void {
        if(inputSource.checked == true) {
            const msgSetX = ProcessX.MessageSetX;
            const bodyX = (document.getElementsByTagName('BODY')[0] as HTMLBodyElement);
            const tagID = ('alertdialog' + Math.random().toString().replace('.', ''));
            const htmlX = `
                <div id="${tagID}blind" class="pageblind sdoverpageblind"></div>
                <div id="${tagID}" class="simpledialog sdoversimpledialog">
                    <div class="titlebox">${msgSetX.SavePasswordTitle}</div>
                    <div class="contentbox">
                        <div class="messagebox">${msgSetX.SavePasswordTimeNotify}</div>
                    </div>
                    <div class="actionbox">
                        <button type="button" class="confirmcolor okbutton" onclick="SimpleDialogX.HideNow('${tagID}');">${msgSetX.Common_Confirm}</button>
                    </div>
                </div>        
            `;

            bodyX.insertAdjacentHTML('beforeend', htmlX);

            SimpleDialogX.ShowNow(tagID);
        }
    }    
};

const LanguageX = {
    SetLanguageCode : function(usp:URLSearchParams) : void {
        const langCode = (usp.get('languagecode') ?? '').toUpperCase();

        if(langCode == 'EN-US') {
            ProcessX.LanguageCode = langCode;
            ProcessX.MessageSetX = MessageSetX_English;
        }
        // else - KO-KR
    },
    SetPageLanguage : function() : void {
        const langXList = (document.querySelectorAll('.languagex') as NodeListOf<HTMLElement>);
        const msgSetX = ProcessX.MessageSetX;
        
        langXList.forEach(
            function(eleX:HTMLElement) : void {
                eleX.innerText = LanguageX.GetMessage(msgSetX, eleX, 'languagextext');
            }
        );
    },
    GetMessage : function(msgSetX:MessageSetXType, eleX:HTMLElement, codeName:string) : string {
        const msgCode = eleX.dataset[codeName];
        let result = '';

        if(msgCode != undefined) {
            const msgX = GetMessageSetX(msgSetX, ('HTML_' + msgCode));
         
            if(msgX != undefined) {            
                result = msgX.toString();
            } else {
                result = ('NOT_EXIST_MESSAGE_CODE - ' + msgCode);            
            }
        }

        return result;
    }
};

const PageLoadingX = {
    StartInitialize : function(e:Event) : void {
        const usp = new URLSearchParams(location.search);

        LanguageX.SetLanguageCode(usp);
        LanguageX.SetPageLanguage();
        PageLoadingX.NewCryptoAction('encrypt', NewCryptoX.EncryptFile);
        PageLoadingX.NewCryptoAction('decrypt', NewCryptoX.DecryptFile);
        PageLoadingX.LatestListRefresh();
        LatestListX.DisplayList();
    },
    NewCryptoAction : function(cryptoType:string, clickAction:EventParameterFNType) {
        const btnX = (document.querySelector(('#mainframe .newcryptobox .' + cryptoType + 'box .mainaction button')) as HTMLButtonElement);

        btnX.addEventListener('click', clickAction);
    },
    LatestListRefresh : function() : void {
        const btnX = (document.querySelector('#mainframe .refresharea button.listrefresh') as HTMLButtonElement);

        btnX.addEventListener(
            'click', 
            function(e:Event) : void {
                LatestListX.DisplayList();
            }
        );
    }
};

const ReceiveWebVeiwMessage = function(e:MessageEvent<any>) : void {
    const dataX = (e.data as ReceiveWebVeiwMessageOrderType);

    console.log('[ReceiveWebVeiwMessage] ', dataX);

    if(dataX.orderID == 'LATESTFILE_CRYPTOFILERESULT') {
        LatestListX.CryptoFileNow_Result(dataX);
    } else if(dataX.orderID == 'HIDEPAGEBLIND') {
        DefaultPageBlindX.HideNow();
    } else if(dataX.orderID == 'NEWCRYPTO_SELECTEDFILE') {
        NewCryptoX.StartNewCrypto_SelectedFile(dataX);
    } else if(dataX.orderID == 'NEWCRYPTO_STARTPROCESSRESULT') {
        NewCryptoX.StartNewCrypto_StartProcessResult(dataX);
    }
};

window.addEventListener('load', PageLoadingX.StartInitialize);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);

