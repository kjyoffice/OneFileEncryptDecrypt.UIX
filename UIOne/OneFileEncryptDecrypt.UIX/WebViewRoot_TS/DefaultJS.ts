type LatestFileListType = {
    itemID:string;
    fileName:string;
    directoryPath:string;
    isEncrypt:boolean;
};

const WVHandShakeX = function () {
    // 여기 "wvHandShake"와 윈폼내 AddHostObjectToScript 부분의 "wvHandShake"가 같아야 한다
    return window.chrome.webview.hostObjects.wvHandShake;
};

const SendHelloMessage = async function () {
    console.log(await WVHandShakeX().HelloMessage('Anders'));
};

const SelectNewEncryptFileAction = function(e:Event) : void {
    alert('SelectNewEncryptFileAction');
};

const SelectNewDecryptFileAction = function(e:Event) : void {
    alert('SelectNewDecryptFileAction');
};

const FileItemEncryptAction = function(fileID:string) : void {
    alert(('FileItemEncryptAction > ' + fileID));
};

const FileItemDecryptAction = function(fileID:string) : void {
    alert(('FileItemDecryptAction > ' + fileID));
};

const FileItemDeleteAction = function(fileID:string) : void {
    alert(('FileItemDeleteAction > ' + fileID));
};

const DisplayLatestFileList = async function() : Promise<void> {
    const areaX = (document.querySelector('#mainframe .latestlistarea ul') as HTMLUListElement);
    /*
    const fileList:LatestFileListType[] = [
        {
            itemID : 'aaa',
            fileName : 'Hello.jpg',
            directoryPath : 'D:\Download',
            isEncrypt : false
        },
        {
            itemID : 'bbb',
            fileName : 'World.jpg.ofedx',
            directoryPath : 'D:\HAHAHA',
            isEncrypt : true
        }
    ];
    */
    const fileList:LatestFileListType[] = [];
    
    ShowHidePageBlind(true);

    DisplayLatestFileList_AllClear(areaX);

    const fileListRawText = await WVHandShakeX().GetLatestFileList();

    console.log(fileListRawText);

    if(fileList.length > 0) {
        fileList.forEach(
            function(fileItem:LatestFileListType) : void {
                DisplayLatestFileList_CreateFileItem(areaX, fileItem);
            }
        );
    } else {
        DisplayLatestFileList_CreateNotExist(areaX);
    }

    ShowHidePageBlind(false);
};

const DisplayLatestFileList_AllClear = function(areaX : HTMLUListElement) : void {
    const itemList = (areaX.querySelectorAll('li') as NodeListOf<HTMLLIElement>);

    if(itemList.length > 0) {
        itemList.forEach(
            function(item:HTMLLIElement) : void {
                item.remove();
            }
        );
    }
};

const DisplayLatestFileList_CreateNotExist = function(areaX:HTMLUListElement) : void {
    var itemX = (document.createElement('LI') as HTMLLIElement);
    itemX.classList.add('emptyitembox');
    itemX.innerText = areaX.dataset.emptyitembox!;

    areaX.appendChild(itemX);
};

const DisplayLatestFileList_CreateFileItem = function(areaX:HTMLUListElement, fileItem:LatestFileListType) : void {
    // 암호화면, 복호화로 표시
    // 암호화가 아니면(=복호화) 암호화로 표시
    const cryptoBoxHTML = (
        (fileItem.isEncrypt == true) ? 
        ('<div class="decryptaction"><button type="button" class="decryptbutton" onclick="FileItemDecryptAction(\'' + fileItem.itemID + '\');">' + areaX.dataset.decryptbutton + '</button></div>') : 
        ('<div class="encryptaction"><button type="button" class="encryptbutton" onclick="FileItemEncryptAction(\'' + fileItem.itemID + '\');">' + areaX.dataset.encryptbutton + '</button></div>')    
    );
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

const ShowHidePageBlind = function(isShow:boolean) : void {
    const blindX = (document.getElementById('pageblind') as HTMLDivElement);

    if(isShow == true) {
        blindX.classList.add('shownow');
    } else {        
        blindX.classList.remove('shownow');
    }
};

const PageLoadEventAction = function(e:Event) : void {
    const ncb = (document.querySelector('#mainframe .newcryptobox') as HTMLDivElement);
    const encAction = (ncb.querySelector('.encryptbox .mainaction button') as HTMLButtonElement);
    const decAction = (ncb.querySelector('.decryptbox .mainaction button') as HTMLButtonElement);

    encAction.addEventListener('click', SelectNewEncryptFileAction);
    decAction.addEventListener('click', SelectNewDecryptFileAction);

    DisplayLatestFileList();
};

const ReceiveWebVeiwMessage = function(e:MessageEvent<any>) : void {
    console.log(e.data, e);
};

window.addEventListener('load', PageLoadEventAction);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);

