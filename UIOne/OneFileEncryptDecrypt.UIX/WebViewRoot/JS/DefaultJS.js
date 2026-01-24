"use strict";
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
    alert(('FileItemDeleteAction > ' + fileID));
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
        itemX.innerText = areaX.dataset.emptyitembox;
        areaX.appendChild(itemX);
    },
    CreateFileItem: function (areaX, fileItem) {
        const cryptoBoxHTML = ((fileItem.isEncrypt == true) ?
            ('<div class="decryptaction"><button type="button" class="decryptbutton" onclick="FileItemDecryptAction(\'' + fileItem.fileID + '\');">' + areaX.dataset.decryptbutton + '</button></div>') :
            ('<div class="encryptaction"><button type="button" class="encryptbutton" onclick="FileItemEncryptAction(\'' + fileItem.fileID + '\');">' + areaX.dataset.encryptbutton + '</button></div>'));
        const htmlX = `
            <li id="fileitemx_${fileItem.fileID}" class="itemx">
                <div class="filenamebox">
                    <div class="filename">${fileItem.fileName}</div>
                    <div class="dirpath">${fileItem.directoryPath}</div>
                </div>
                <div class="cryptobox">${cryptoBoxHTML}</div>
                <div class="deletebox">
                    <div class="deleteaction"><button type="button" onclick="FileItemDeleteAction(\'${fileItem.fileID}\');">${areaX.dataset.deletebutton}</button></div>
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
const PageLoadingX = {
    StartInitialize: function (e) {
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
