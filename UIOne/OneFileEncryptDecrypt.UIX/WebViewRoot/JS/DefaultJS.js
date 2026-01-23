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
const DisplayLatestFileList = async function () {
    const areaX = document.querySelector('#mainframe .latestlistarea ul');
    const fileList = [];
    ShowHidePageBlind(true);
    DisplayLatestFileList_AllClear(areaX);
    const fileListRawText = await WVHandShakeX().GetLatestFileList();
    console.log(fileListRawText);
    if (fileList.length > 0) {
        fileList.forEach(function (fileItem) {
            DisplayLatestFileList_CreateFileItem(areaX, fileItem);
        });
    }
    else {
        DisplayLatestFileList_CreateNotExist(areaX);
    }
    ShowHidePageBlind(false);
};
const DisplayLatestFileList_AllClear = function (areaX) {
    const itemList = areaX.querySelectorAll('li');
    if (itemList.length > 0) {
        itemList.forEach(function (item) {
            item.remove();
        });
    }
};
const DisplayLatestFileList_CreateNotExist = function (areaX) {
    var itemX = document.createElement('LI');
    itemX.classList.add('emptyitembox');
    itemX.innerText = areaX.dataset.emptyitembox;
    areaX.appendChild(itemX);
};
const DisplayLatestFileList_CreateFileItem = function (areaX, fileItem) {
    const cryptoBoxHTML = ((fileItem.isEncrypt == true) ?
        ('<div class="decryptaction"><button type="button" class="decryptbutton" onclick="FileItemDecryptAction(\'' + fileItem.itemID + '\');">' + areaX.dataset.decryptbutton + '</button></div>') :
        ('<div class="encryptaction"><button type="button" class="encryptbutton" onclick="FileItemEncryptAction(\'' + fileItem.itemID + '\');">' + areaX.dataset.encryptbutton + '</button></div>'));
    const htmlX = `
        <li id="fileitemx_${fileItem.itemID}" class="itemx">
            <div class="filenamebox">
                <div class="filename">${fileItem.fileName}</div>
                <div class="dirpath">${fileItem.directoryPath}</div>
            </div>
            <div class="cryptobox">${cryptoBoxHTML}</div>
            <div class="deletebox">
                <div class="deleteaction"><button type="button" onclick="FileItemDeleteAction(\'${fileItem.itemID}\');">${areaX.dataset.deletebutton}</button></div>
            </div>
        </li>      
    `;
    areaX.insertAdjacentHTML('beforeend', htmlX);
};
const ShowHidePageBlind = function (isShow) {
    const blindX = document.getElementById('pageblind');
    if (isShow == true) {
        blindX.classList.add('shownow');
    }
    else {
        blindX.classList.remove('shownow');
    }
};
const PageLoadEventAction = function (e) {
    const ncb = document.querySelector('#mainframe .newcryptobox');
    const encAction = ncb.querySelector('.encryptbox .mainaction button');
    const decAction = ncb.querySelector('.decryptbox .mainaction button');
    encAction.addEventListener('click', SelectNewEncryptFileAction);
    decAction.addEventListener('click', SelectNewDecryptFileAction);
    DisplayLatestFileList();
};
const ReceiveWebVeiwMessage = function (e) {
    console.log(e.data, e);
};
window.addEventListener('load', PageLoadEventAction);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);
