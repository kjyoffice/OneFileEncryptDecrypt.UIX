type LatestFileListType = {
    itemID:string;
    fileName:string;
    directoryPath:string;
    isEncrypt:boolean;
};

const HandShakeX = function () {
    return window.chrome.webview.hostObjects.handShake;
};

const SendHelloMessage = async function () {
    console.log(await HandShakeX().HelloMessage('Anders'));
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

const DisplayLatestList = function() : void {
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
    
    DisplayLatestList_AllClear(areaX);

    if(fileList.length > 0) {
        fileList.forEach(
            function(fileItem:LatestFileListType) : void {
                DisplayLatestList_CreateFileItem(areaX, fileItem);
            }
        );
    } else {
        DisplayLatestList_CreateNotExist(areaX);
    }
};

const DisplayLatestList_AllClear = function(areaX : HTMLUListElement) : void {
    const itemList = (areaX.querySelectorAll('li') as NodeListOf<HTMLLIElement>);

    if(itemList.length > 0) {
        itemList.forEach(
            function(item:HTMLLIElement) : void {
                item.remove();
            }
        );
    }
};

const DisplayLatestList_CreateNotExist = function(areaX:HTMLUListElement) : void {
    var itemX = (document.createElement('LI') as HTMLLIElement);
    itemX.classList.add('emptyitembox');
    itemX.innerText = areaX.dataset.emptyitembox!;

    areaX.appendChild(itemX);
};

const DisplayLatestList_CreateFileItem = function(areaX:HTMLUListElement, fileItem:LatestFileListType) : void {
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
    const encAction = (document.querySelector('#mainframe .newcryptobox .encryptaction button') as HTMLButtonElement);
    const decAction = (document.querySelector('#mainframe .newcryptobox .decryptaction button') as HTMLButtonElement);

    encAction.addEventListener('click', SelectNewEncryptFileAction);
    decAction.addEventListener('click', SelectNewDecryptFileAction);

    DisplayLatestList();
};

const ReceiveWebVeiwMessage = function(e:MessageEvent<any>) : void {
    //console.log(e.data, e);
};

window.addEventListener('load', PageLoadEventAction);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);

