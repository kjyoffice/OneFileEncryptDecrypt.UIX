"use strict";
const HandShakeX = function () {
    return window.chrome.webview.hostObjects.handShake;
};
const SendHelloMessage = async function () {
    console.log(await HandShakeX().HelloMessage('Anders'));
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
const DisplayLatestList = function () {
    const areaX = document.querySelector('#mainframe .latestlistarea ul');
    const fileList = [];
    DisplayLatestList_AllClear(areaX);
    if (fileList.length > 0) {
        fileList.forEach(function (fileItem) {
            DisplayLatestList_CreateFileItem(areaX, fileItem);
        });
    }
    else {
        DisplayLatestList_CreateNotExist(areaX);
    }
};
const DisplayLatestList_AllClear = function (areaX) {
    const itemList = areaX.querySelectorAll('li');
    if (itemList.length > 0) {
        itemList.forEach(function (item) {
            item.remove();
        });
    }
};
const DisplayLatestList_CreateNotExist = function (areaX) {
    var itemX = document.createElement('LI');
    itemX.classList.add('emptyitembox');
    itemX.innerText = areaX.dataset.emptyitembox;
    areaX.appendChild(itemX);
};
const DisplayLatestList_CreateFileItem = function (areaX, fileItem) {
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
    const encAction = document.querySelector('#mainframe .newcryptobox .encryptaction button');
    const decAction = document.querySelector('#mainframe .newcryptobox .decryptaction button');
    encAction.addEventListener('click', SelectNewEncryptFileAction);
    decAction.addEventListener('click', SelectNewDecryptFileAction);
    DisplayLatestList();
};
const ReceiveWebVeiwMessage = function (e) {
    console.log(e.data, e);
};
window.addEventListener('load', PageLoadEventAction);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);
