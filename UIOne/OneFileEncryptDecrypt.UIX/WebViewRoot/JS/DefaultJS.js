"use strict";
const MessageSetX_Hangul = {
    HTML_SelectNewEncrypt: '암호화 파일 선택',
    HTML_SelectNewDecrypt: '복호화 파일 선택',
    HTML_ListRefresh: '새로고침',
    Common_Encrypt: '암호화',
    Common_Decrypt: '복호화',
    Common_NotExistItem: '항목이 없습니다.',
    Common_Delete: '삭제',
    Common_DeleteConfirm: '삭제했습니다.',
    Common_Confirm: '확인',
    Common_Cancel: '취소',
    Common_PleaseCheck: '확인해주세요.',
    Common_GoProcess: '진행하겠습니까?',
    Common_Complete: '완료했습니다.',
    LatestFileItemDeleteQuestion: '해당 항목을 삭제하겠습니까?',
    EncryptFileQuestion: '파일을 암호화 하겠습니까?',
    DecryptFileQuestion: '파일을 복호화 하겠습니까?',
    PleaseInputEncryptPassword: '암호화 할 비밀번호를 입력해주세요.',
    PleaseInputDecryptPassword: '복호화 할 비밀번호를 입력해주세요.',
    PleaseInputPasswordNotify: '비밀번호를 입력해주세요.',
    SavePasswordTitle: '비밀번호 저장',
    SavePasswordTimeNotify: '비밀번호 저장은 현재 프로그램 실행에서만 허용됩니다.',
    WF_EMPTY_OR_WRONG_FILEID: 'FileID가 없거나 올바르지 않습니다.',
    WF_NOT_EXIST_FILEITEM: '파일 항목이 없습니다.',
    WF_UNDEFINED_PROCESS: '지정되지 않은 진행입니다.',
    WF_NOT_EXIST_FILE: '파일이 존재하지 않습니다.',
    WF_WRONG_ENCRYPT_FILE: '암호화 할 파일이 올바르지 않습니다.',
    WF_WRONG_DECRYPT_FILE: '복호화 할 파일이 올바르지 않습니다.',
    WF_OFED_AFTER_EXECUTE_WRONG: '프로그램 실행 결과가 올바르지 않습니다.'
};
const MessageSetX_English = {
    HTML_SelectNewEncrypt: 'Select encrypt file',
    HTML_SelectNewDecrypt: 'Select decrypt file',
    HTML_ListRefresh: 'Refresh',
    Common_Encrypt: 'Encrypt',
    Common_Decrypt: 'Decrypt',
    Common_NotExistItem: 'Not exist item',
    Common_Delete: 'Delete',
    Common_DeleteConfirm: 'Delete done.',
    Common_Confirm: 'OK',
    Common_Cancel: 'Cancel',
    Common_PleaseCheck: 'Please check',
    Common_GoProcess: 'Go process?',
    Common_Complete: 'Complete.',
    LatestFileItemDeleteQuestion: 'Are you sure delete this item?',
    EncryptFileQuestion: 'Are you sure encrypt file?',
    DecryptFileQuestion: 'Are you sure decrypt file?',
    PleaseInputEncryptPassword: 'Please input encrypt password.',
    PleaseInputDecryptPassword: 'Please input decrypt password.',
    PleaseInputPasswordNotify: 'Please input password.',
    SavePasswordTitle: 'Save password',
    SavePasswordTimeNotify: 'Password saving is only allowed for the current program execution.',
    WF_EMPTY_OR_WRONG_FILEID: 'Empty or wrong FileID.',
    WF_NOT_EXIST_FILEITEM: 'Not exist file item.',
    WF_UNDEFINED_PROCESS: 'Undefined process.',
    WF_NOT_EXIST_FILE: 'Not exist file.',
    WF_WRONG_ENCRYPT_FILE: 'Wrong encrypt file.',
    WF_WRONG_DECRYPT_FILE: 'Erong decrypt file',
    WF_OFED_AFTER_EXECUTE_WRONG: 'Wrong OFED execute result.'
};
const ProcessX = {
    LanguageCode: 'KO-KR',
    MessageSetX: MessageSetX_Hangul,
    IsSavePasswordBoxInPassword: false
};
const WVHandShakeX = function () {
    return window.chrome.webview.hostObjects.wvHandShake;
};
const SendHelloMessage = async function () {
    console.log(await WVHandShakeX().HelloMessage('Anders'));
};
const GetMessageSetX = function (msgSetX, msgCode) {
    return msgSetX[msgCode];
};
const NewCryptoX = {
    EncryptFile: function (e) {
        NewCryptoX.StartNewCrypto(true);
    },
    DecryptFile: function (e) {
        NewCryptoX.StartNewCrypto(false);
    },
    StartNewCrypto: async function (isEncrypt) {
        DefaultPageBlindX.ShowNow();
        await WVHandShakeX().NewCryptoNow(isEncrypt);
    },
    StartNewCrypto_SelectedFile: function (dataX) {
        const msgSetX = ProcessX.MessageSetX;
        if (dataX.isSuccess == true) {
            const md = dataX.mainData;
            const confirmMsgX = ((md.isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);
            const passwordMsgX = ((md.isEncrypt == true) ? msgSetX.PleaseInputEncryptPassword : msgSetX.PleaseInputDecryptPassword);
            SimpleDialogX.PasswordBox(confirmMsgX, passwordMsgX, async function (isConfirm, cryptoPassword) {
                if (isConfirm == true) {
                    await WVHandShakeX().NewCryptoStartProcess(md.filePath, md.isEncrypt, cryptoPassword);
                }
                else {
                    DefaultPageBlindX.HideNow();
                }
            });
        }
        else {
            DefaultPageBlindX.HideNow();
            SimpleDialogX.AlertBox(GetMessageSetX(msgSetX, dataX.messageCode));
        }
    },
    StartNewCrypto_StartProcessResult: function (dataX) {
        const msgSetX = ProcessX.MessageSetX;
        const msgX = ((dataX.isSuccess == true) ? msgSetX.Common_Complete : GetMessageSetX(msgSetX, dataX.messageCode));
        DefaultPageBlindX.HideNow();
        LatestListX.DisplayList();
        SimpleDialogX.AlertBox(msgX);
    }
};
const LatestListX = {
    DisplayList: async function () {
        DefaultPageBlindX.ShowNow();
        const areaX = document.querySelector('#mainframe .latestlistarea ul');
        const rawFileList = await WVHandShakeX().GetLatestCryptoFileList();
        const fileList = JSON.parse(rawFileList);
        const msgSetX = ProcessX.MessageSetX;
        LatestListX.AllClear(areaX);
        if (fileList.length > 0) {
            fileList.forEach(function (fileItem) {
                const htmlX = LatestListX.CreateFileItem(fileItem, msgSetX);
                areaX.insertAdjacentHTML('beforeend', htmlX);
            });
        }
        else {
            LatestListX.CreateNotExist(areaX, msgSetX);
        }
        DefaultPageBlindX.HideNow();
    },
    AllClear: function (areaX) {
        const itemList = areaX.querySelectorAll('li');
        if (itemList.length > 0) {
            itemList.forEach(function (item) {
                item.remove();
            });
        }
    },
    CreateNotExist: function (areaX, msgSetX) {
        var itemX = document.createElement('LI');
        itemX.classList.add('emptyitembox');
        itemX.innerText = msgSetX.Common_NotExistItem;
        areaX.appendChild(itemX);
    },
    CreateFileItem: function (fileItem, msgSetX) {
        const cryptoBoxHTML = ((fileItem.isEncrypt == true) ?
            ('<div class="decryptaction"><button type="button" class="decryptbutton" onclick="LatestListX.DecryptFile(\'' + fileItem.fileID + '\');">' + msgSetX.Common_Decrypt + '</button></div>') :
            ('<div class="encryptaction"><button type="button" class="encryptbutton" onclick="LatestListX.EncryptFile(\'' + fileItem.fileID + '\');">' + msgSetX.Common_Encrypt + '</button></div>'));
        const result = `
            <li id="fileitemx_${fileItem.fileID}" class="itemx">
                <div class="filenamebox">
                    <div class="filename">
                        <a href="#filename" onclick="LatestListX.OpenFileOrDirectory('${fileItem.fileID}', true);">${fileItem.fileName}</a>
                    </div>
                    <div class="dirpath">
                        <a href="#dirpath" onclick="LatestListX.OpenFileOrDirectory('${fileItem.fileID}', false);">${fileItem.directoryPath}</a>
                    </div>
                </div>
                <div class="cryptobox">${cryptoBoxHTML}</div>
                <div class="deletebox">
                    <div class="deleteaction"><button type="button" onclick="LatestListX.DeleteItem(\'${fileItem.fileID}\');">${msgSetX.Common_Delete}</button></div>
                </div>
            </li>      
        `;
        return result;
    },
    OpenFileOrDirectory: async function (fileID, isOpenFile) {
        const resultCode = await WVHandShakeX().OpenFileOrDirectory(fileID, isOpenFile);
        if (resultCode != 'OK') {
            SimpleDialogX.AlertBox(GetMessageSetX(ProcessX.MessageSetX, resultCode));
        }
    },
    CryptoFileNow: function (fileID, isEncrypt) {
        const itemX = document.getElementById(('fileitemx_' + fileID));
        if (itemX != null) {
            const msgSetX = ProcessX.MessageSetX;
            const confirmMsgX = ((isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);
            const passwordMsgX = ((isEncrypt == true) ? msgSetX.PleaseInputEncryptPassword : msgSetX.PleaseInputDecryptPassword);
            SimpleDialogX.PasswordBox(confirmMsgX, passwordMsgX, async function (isConfirm, cryptoPassword) {
                if (isConfirm == true) {
                    DefaultPageBlindX.ShowNow();
                    const delResult = await WVHandShakeX().CryptoLatestFile(fileID, isEncrypt, cryptoPassword);
                    if (delResult == 'OK') {
                    }
                    else {
                        DefaultPageBlindX.HideNow();
                        SimpleDialogX.AlertBox(GetMessageSetX(msgSetX, delResult));
                    }
                }
            });
        }
    },
    CryptoFileNow_Result: function (dataX) {
        const msgSetX = ProcessX.MessageSetX;
        const msgX = ((dataX.isSuccess == true) ? msgSetX.Common_Complete : GetMessageSetX(msgSetX, dataX.messageCode));
        DefaultPageBlindX.HideNow();
        LatestListX.DisplayList();
        SimpleDialogX.AlertBox(msgX);
    },
    EncryptFile: function (fileID) {
        LatestListX.CryptoFileNow(fileID, true);
    },
    DecryptFile: function (fileID) {
        LatestListX.CryptoFileNow(fileID, false);
    },
    DeleteItem: function (fileID) {
        const itemX = document.getElementById(('fileitemx_' + fileID));
        if (itemX != null) {
            const msgSetX = ProcessX.MessageSetX;
            SimpleDialogX.ConfirmBox(msgSetX.LatestFileItemDeleteQuestion, async function (isConfirm) {
                if (isConfirm == true) {
                    DefaultPageBlindX.ShowNow();
                    const delResult = await WVHandShakeX().DeleteLatestCryptoFile(fileID);
                    if (delResult == 'OK') {
                        itemX.remove();
                        LatestListX.DeleteItemAfterNotExist(msgSetX);
                    }
                    const msgX = ((delResult == 'OK') ? msgSetX.Common_DeleteConfirm : GetMessageSetX(msgSetX, delResult));
                    DefaultPageBlindX.HideNow();
                    SimpleDialogX.AlertBox(msgX);
                }
            });
        }
    },
    DeleteItemAfterNotExist: function (msgSetX) {
        const areaX = document.querySelector('#mainframe .latestlistarea ul');
        const itemList = areaX.querySelectorAll('li');
        if (itemList.length <= 0) {
            LatestListX.CreateNotExist(areaX, msgSetX);
        }
    }
};
const DefaultPageBlindX = {
    ShowAndHide: function (isShow) {
        const blindX = document.getElementById('defaultpageblind');
        if (isShow == true) {
            blindX.classList.add('shownow');
        }
        else {
            blindX.classList.remove('shownow');
        }
    },
    ShowNow: function () {
        DefaultPageBlindX.ShowAndHide(true);
    },
    HideNow: function () {
        DefaultPageBlindX.ShowAndHide(false);
    }
};
const SimpleDialogX = {
    ShowAndHide: function (tagID, isShow) {
        const sdX = document.getElementById(tagID);
        const blindX = document.getElementById((tagID + 'blind'));
        if (isShow == true) {
            blindX.classList.add('shownow');
            sdX.classList.add('shownow');
        }
        else {
            sdX.classList.remove('shownow');
            blindX.classList.remove('shownow');
            sdX.remove();
            blindX.remove();
        }
    },
    ShowNow: function (tagID) {
        SimpleDialogX.ShowAndHide(tagID, true);
    },
    HideNow: function (tagID) {
        SimpleDialogX.ShowAndHide(tagID, false);
    },
    AlertBox: function (message) {
        const msgSetX = ProcessX.MessageSetX;
        const bodyX = document.getElementsByTagName('BODY')[0];
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
    ConfirmBox: function (message, actionCallbackFN) {
        const msgSetX = ProcessX.MessageSetX;
        const bodyX = document.getElementsByTagName('BODY')[0];
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
        const sdX = document.getElementById(tagID);
        const okBtn = sdX.querySelector('.actionbox .okbutton');
        const cencelBtn = sdX.querySelector('.actionbox .cancelbutton');
        okBtn.addEventListener('click', function (e) {
            SimpleDialogX.HideNow(tagID);
            actionCallbackFN(true);
        });
        cencelBtn.addEventListener('click', function (e) {
            SimpleDialogX.HideNow(tagID);
            actionCallbackFN(false);
        });
        SimpleDialogX.ShowNow(tagID);
    },
    PasswordBox: async function (message, passwordMsg, actionCallbackFN) {
        const msgSetX = ProcessX.MessageSetX;
        const bodyX = document.getElementsByTagName('BODY')[0];
        const tagID = ('passworddialog' + Math.random().toString().replace('.', ''));
        const savedPWD = ((ProcessX.IsSavePasswordBoxInPassword == true) ? await WVHandShakeX().GetSavedCryptoPassword() : '');
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
        const sdX = document.getElementById(tagID);
        const okBtn = sdX.querySelector('.actionbox .okbutton');
        const cencelBtn = sdX.querySelector('.actionbox .cancelbutton');
        okBtn.addEventListener('click', async function (e) {
            const cryptoPWD = sdX.querySelector('.cryptopassword');
            const notifyMsg = sdX.querySelector('.notifymessage');
            const savePWD = sdX.querySelector('.savepassword');
            cryptoPWD.classList.remove('invalidsign');
            cryptoPWD.value = cryptoPWD.value.trim();
            notifyMsg.innerText = '';
            if (cryptoPWD.value == '') {
                cryptoPWD.classList.add('invalidsign');
                notifyMsg.innerText = msgSetX.PleaseInputPasswordNotify;
                cryptoPWD.focus();
            }
            else {
                if (savePWD.checked == true) {
                    await WVHandShakeX().SetSaveCryptoPassword(cryptoPWD.value);
                }
                ProcessX.IsSavePasswordBoxInPassword = savePWD.checked;
                SimpleDialogX.HideNow(tagID);
                actionCallbackFN(true, cryptoPWD.value);
            }
        });
        cencelBtn.addEventListener('click', function (e) {
            SimpleDialogX.HideNow(tagID);
            actionCallbackFN(false, '');
        });
        SimpleDialogX.ShowNow(tagID);
    },
    PasswordBox_SavePasswordAlertBox: function (inputSource) {
        if (inputSource.checked == true) {
            const msgSetX = ProcessX.MessageSetX;
            const bodyX = document.getElementsByTagName('BODY')[0];
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
    SetLanguageCode: function (usp) {
        const langCode = (usp.get('languagecode') ?? '').toUpperCase();
        if (langCode == 'EN-US') {
            ProcessX.LanguageCode = langCode;
            ProcessX.MessageSetX = MessageSetX_English;
        }
    },
    SetPageLanguage: function () {
        const langXList = document.querySelectorAll('.languagex');
        const msgSetX = ProcessX.MessageSetX;
        langXList.forEach(function (eleX) {
            eleX.innerText = LanguageX.GetMessage(msgSetX, eleX, 'languagextext');
        });
    },
    GetMessage: function (msgSetX, eleX, codeName) {
        const msgCode = eleX.dataset[codeName];
        let result = '';
        if (msgCode != undefined) {
            const msgX = GetMessageSetX(msgSetX, ('HTML_' + msgCode));
            if (msgX != undefined) {
                result = msgX.toString();
            }
            else {
                result = ('NOT_EXIST_MESSAGE_CODE - ' + msgCode);
            }
        }
        return result;
    }
};
const PageLoadingX = {
    StartInitialize: function (e) {
        const usp = new URLSearchParams(location.search);
        LanguageX.SetLanguageCode(usp);
        LanguageX.SetPageLanguage();
        PageLoadingX.NewCryptoAction('encrypt', NewCryptoX.EncryptFile);
        PageLoadingX.NewCryptoAction('decrypt', NewCryptoX.DecryptFile);
        PageLoadingX.LatestListRefresh();
        LatestListX.DisplayList();
    },
    NewCryptoAction: function (cryptoType, clickAction) {
        const btnX = document.querySelector(('#mainframe .newcryptobox .' + cryptoType + 'box .mainaction button'));
        btnX.addEventListener('click', clickAction);
    },
    LatestListRefresh: function () {
        const btnX = document.querySelector('#mainframe .refresharea button.listrefresh');
        btnX.addEventListener('click', function (e) {
            LatestListX.DisplayList();
        });
    }
};
const ReceiveWebVeiwMessage = function (e) {
    const dataX = e.data;
    console.log('[ReceiveWebVeiwMessage] ', dataX);
    if (dataX.orderID == 'LATESTFILE_CRYPTOFILERESULT') {
        LatestListX.CryptoFileNow_Result(dataX);
    }
    else if (dataX.orderID == 'HIDEPAGEBLIND') {
        DefaultPageBlindX.HideNow();
    }
    else if (dataX.orderID == 'NEWCRYPTO_SELECTEDFILE') {
        NewCryptoX.StartNewCrypto_SelectedFile(dataX);
    }
    else if (dataX.orderID == 'NEWCRYPTO_STARTPROCESSRESULT') {
        NewCryptoX.StartNewCrypto_StartProcessResult(dataX);
    }
};
window.addEventListener('load', PageLoadingX.StartInitialize);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);
