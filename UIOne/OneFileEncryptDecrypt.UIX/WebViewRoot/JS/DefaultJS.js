"use strict";
const MessageSetX_Hangul = {
    HTML_SelectNewEncrypt: '암호화 파일 선택',
    HTML_SelectNewDecrypt: '복호화 파일 선택',
    Common_Encrypt: '암호화',
    Common_Decrypt: '복호화',
    Common_NotExistItem: '항목이 없습니다.',
    Common_Delete: '삭제',
    LatestFileItemDeleteQuestion: '해당 항목을 삭제하겠습니까?',
    EncryptFileQuestion: '파일을 암호화 하겠습니까?',
    DecryptFileQuestion: '파일을 복호화 하겠습니까?',
    WF_EMPTY_OR_WRONG_FILEID: 'FileID가 없거나 올바르지 않습니다.',
    WF_NOT_EXIST_FILEITEM: '파일 항목이 없습니다.',
    WF_UNDEFINED_PROCESS: '지정되지 않은 진행입니다.',
    WF_NOT_EXIST_FILE: '파일이 존재하지 않습니다.',
    WF_WRONG_ENCRYPT_FILE: '암호화 할 파일이 올바르지 않습니다.',
    WF_WRONG_DECRYPT_FILE: '복호화 할 파일이 올바르지 않습니다.',
};
const MessageSetX_English = {
    HTML_SelectNewEncrypt: 'Select encrypt file',
    HTML_SelectNewDecrypt: 'Select decrypt file',
    Common_Encrypt: 'Encrypt',
    Common_Decrypt: 'Decrypt',
    Common_NotExistItem: 'Not exist item',
    Common_Delete: 'Delete',
    LatestFileItemDeleteQuestion: 'Are you sure delete this item?',
    EncryptFileQuestion: 'Are you sure encrypt file?',
    DecryptFileQuestion: 'Are you sure decrypt file?',
    WF_EMPTY_OR_WRONG_FILEID: 'Empty or wrong FileID.',
    WF_NOT_EXIST_FILEITEM: 'Not exist file item.',
    WF_UNDEFINED_PROCESS: 'Undefined process.',
    WF_NOT_EXIST_FILE: 'Not exist file.',
    WF_WRONG_ENCRYPT_FILE: 'Wrong encrypt file.',
    WF_WRONG_DECRYPT_FILE: 'Erong decrypt file',
};
const ProcessX = {
    LanguageCode: 'KO-KR',
    MessageSetX: MessageSetX_Hangul
};
const WVHandShakeX = function () {
    return window.chrome.webview.hostObjects.wvHandShake;
};
const SendHelloMessage = async function () {
    console.log(await WVHandShakeX().HelloMessage('Anders'));
};
const NewCryptoX = {
    EncryptFile: function (e) {
        NewCryptoX.StartNewCrypto(true);
    },
    DecryptFile: function (e) {
        NewCryptoX.StartNewCrypto(false);
    },
    StartNewCrypto: async function (isEncrypt) {
        PageBlindX.ShowNow();
        await WVHandShakeX().NewCryptoNow(isEncrypt);
    },
    StartNewCrypto_SelectedFile: async function (dataX) {
        const msgSetX = ProcessX.MessageSetX;
        if (dataX.isSuccess == true) {
            const md = dataX.mainData;
            const confirmMsgX = ((md.isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);
            if (confirm(confirmMsgX) == true) {
                await WVHandShakeX().NewCryptoStartProcess(md.filePath, md.isEncrypt);
            }
            else {
                PageBlindX.HideNow();
            }
        }
        else {
            alert(msgSetX[dataX.messageCode]);
            PageBlindX.HideNow();
        }
    },
    StartNewCrypto_StartProcessResult: function (dataX) {
        const msgSetX = ProcessX.MessageSetX;
        if (dataX.isSuccess == true) {
            console.log('StartNewCrypto_StartProcessResult', dataX);
            PageBlindX.HideNow();
        }
        else {
            alert(msgSetX[dataX.messageCode]);
            PageBlindX.HideNow();
        }
    }
};
const LatestListX = {
    DisplayList: async function () {
        PageBlindX.ShowNow();
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
        PageBlindX.HideNow();
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
    CryptoFileNow: async function (fileID, isEncrypt) {
        const itemX = document.getElementById(('fileitemx_' + fileID));
        if (itemX != null) {
            const msgSetX = ProcessX.MessageSetX;
            const confirmMsgX = ((isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);
            if (confirm(confirmMsgX) == true) {
                PageBlindX.ShowNow();
                const delResult = await WVHandShakeX().CryptoLatestFile(fileID, isEncrypt);
                if (delResult == 'OK') {
                }
                else {
                    alert(msgSetX[delResult]);
                    PageBlindX.HideNow();
                }
            }
        }
    },
    CryptoFileNow_Result: function (dataX) {
        const msgSetX = ProcessX.MessageSetX;
        if (dataX.isSuccess == true) {
            const sd = dataX.supportData;
            const fileItem = dataX.mainData;
            const delItemX = document.getElementById(('fileitemx_' + sd.deleteFileID));
            const areaX = document.querySelector('#mainframe .latestlistarea ul');
            const htmlX = LatestListX.CreateFileItem(fileItem, msgSetX);
            delItemX.remove();
            areaX.insertAdjacentHTML('afterbegin', htmlX);
        }
        else {
            alert(msgSetX[dataX.messageCode]);
        }
        PageBlindX.HideNow();
    },
    EncryptFile: function (fileID) {
        LatestListX.CryptoFileNow(fileID, true);
    },
    DecryptFile: function (fileID) {
        LatestListX.CryptoFileNow(fileID, false);
    },
    DeleteItem: async function (fileID) {
        const itemX = document.getElementById(('fileitemx_' + fileID));
        if (itemX != null) {
            const msgSetX = ProcessX.MessageSetX;
            if (confirm(msgSetX.LatestFileItemDeleteQuestion) == true) {
                PageBlindX.ShowNow();
                const delResult = await WVHandShakeX().DeleteLatestCryptoFile(fileID);
                if (delResult == 'OK') {
                    itemX.remove();
                    LatestListX.DeleteItemAfterNotExist(msgSetX);
                }
                else {
                    alert(msgSetX[delResult]);
                }
                PageBlindX.HideNow();
            }
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
const PageBlindX = {
    ShowAndHide: function (isShow) {
        const blindX = document.getElementById('pageblind');
        if (isShow == true) {
            blindX.classList.add('shownow');
        }
        else {
            blindX.classList.remove('shownow');
        }
    },
    ShowNow: function () {
        PageBlindX.ShowAndHide(true);
    },
    HideNow: function () {
        PageBlindX.ShowAndHide(false);
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
            const msgX = msgSetX[('HTML_' + msgCode)];
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
        LatestListX.DisplayList();
    },
    NewCryptoAction: function (cryptoType, clickAction) {
        const btnX = document.querySelector(('#mainframe .newcryptobox .' + cryptoType + 'box .mainaction button'));
        btnX.addEventListener('click', clickAction);
    }
};
const ReceiveWebVeiwMessage = function (e) {
    const dataX = e.data;
    if (dataX.orderID == 'LATESTFILE_CRYPTOFILERESULT') {
        LatestListX.CryptoFileNow_Result(dataX);
    }
    else if (dataX.orderID == 'HIDEPAGEBLIND') {
        PageBlindX.HideNow();
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
