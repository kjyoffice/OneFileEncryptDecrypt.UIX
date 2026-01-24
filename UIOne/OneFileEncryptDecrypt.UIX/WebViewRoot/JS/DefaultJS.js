"use strict";
const MessageSetX_Hangul = {
    NewEncryptButtonText: '암호화 파일 선택',
    NewDecryptButtonText: '복호화 파일 선택',
    LatestCryptoFile_NotExist: '항목이 없습니다.',
    LatestCryptoFile_Encrypt: '암호화',
    LatestCryptoFile_Decrypy: '복호화',
    LatestCryptoFile_Delete: '삭제',
};
const MessageSetX_English = {
    NewEncryptButtonText: 'Select encrypt file',
    NewDecryptButtonText: 'Select decrypt file',
    LatestCryptoFile_NotExist: 'Not exist item',
    LatestCryptoFile_Encrypt: 'Encrypt',
    LatestCryptoFile_Decrypy: 'Decrypt',
    LatestCryptoFile_Delete: 'Delete',
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
const SelectNewEncryptFileAction = function (e) {
    alert('SelectNewEncryptFileAction');
};
const SelectNewDecryptFileAction = function (e) {
    alert('SelectNewDecryptFileAction');
};
const FileItemEncryptAction = function (fileID) {
    alert(('FileItemEncryptAction > ' + fileID));
};
const FileItemDecryptAction = function (fileID) {
    alert(('FileItemDecryptAction > ' + fileID));
};
const FileItemDeleteAction = function (fileID) {
    const delItem = document.getElementById(('fileitemx_' + fileID));
};
const LatestListX = {
    DisplayList: async function () {
        PageBlindX.ShowNow();
        const areaX = document.querySelector('#mainframe .latestlistarea ul');
        const rawFileList = await WVHandShakeX().GetLatestCryptoFileList();
        const fileList = JSON.parse(rawFileList);
        LatestListX.AllClear(areaX);
        if (fileList.length > 0) {
            fileList.forEach(function (fileItem) {
                LatestListX.CreateFileItem(areaX, fileItem);
            });
        }
        else {
            LatestListX.CreateNotExist(areaX);
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
    CreateNotExist: function (areaX) {
        var itemX = document.createElement('LI');
        itemX.classList.add('emptyitembox');
        itemX.innerText = ProcessX.MessageSetX.LatestCryptoFile_NotExist;
        areaX.appendChild(itemX);
    },
    CreateFileItem: function (areaX, fileItem) {
        const msgSetX = ProcessX.MessageSetX;
        const cryptoBoxHTML = ((fileItem.isEncrypt == true) ?
            ('<div class="decryptaction"><button type="button" class="decryptbutton" onclick="FileItemDecryptAction(\'' + fileItem.fileID + '\');">' + msgSetX.LatestCryptoFile_Encrypt + '</button></div>') :
            ('<div class="encryptaction"><button type="button" class="encryptbutton" onclick="FileItemEncryptAction(\'' + fileItem.fileID + '\');">' + msgSetX.LatestCryptoFile_Decrypt + '</button></div>'));
        const htmlX = `
            <li id="fileitemx_${fileItem.fileID}" class="itemx">
                <div class="filenamebox">
                    <div class="filename">${fileItem.fileName}</div>
                    <div class="dirpath">${fileItem.directoryPath}</div>
                </div>
                <div class="cryptobox">${cryptoBoxHTML}</div>
                <div class="deletebox">
                    <div class="deleteaction"><button type="button" onclick="FileItemDeleteAction(\'${fileItem.fileID}\');">${msgSetX.LatestCryptoFile_Delete}</button></div>
                </div>
            </li>      
        `;
        areaX.insertAdjacentHTML('beforeend', htmlX);
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
        langXList.forEach(function (eleX) {
            eleX.innerText = LanguageX.GetMessage(eleX, 'languagextext');
        });
    },
    GetMessage: function (eleX, codeName) {
        const msgCode = eleX.dataset[codeName];
        let result = '';
        if (msgCode != undefined) {
            const msgX = ProcessX.MessageSetX[msgCode];
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
        PageLoadingX.NewCryptoAction('encrypt', SelectNewEncryptFileAction);
        PageLoadingX.NewCryptoAction('decrypt', SelectNewDecryptFileAction);
        LatestListX.DisplayList();
    },
    NewCryptoAction: function (cryptoType, clickAction) {
        const btnX = document.querySelector(('#mainframe .newcryptobox .' + cryptoType + 'box .mainaction button'));
        btnX.addEventListener('click', clickAction);
    }
};
const ReceiveWebVeiwMessage = function (e) {
    console.log(e.data, e);
};
window.addEventListener('load', PageLoadingX.StartInitialize);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);
