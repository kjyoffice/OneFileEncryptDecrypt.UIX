type LatestFileListType = {
    fileID:string;
    fileName:string;
    directoryPath:string;
    isEncrypt:boolean;
};

type EventParameterFNType = (e:Event) => void;

type ProcessXType = {
    LanguageCode : string;
    MessageSetX : MessageSetXType;
};

type MessageSetXType = {
    NewEncryptButtonText:string;
    NewDecryptButtonText:string;
    LatestCryptoFile_NotExist:string;
    LatestCryptoFile_Encrypt:string;
    LatestCryptoFile_Decrypy:string;
    LatestCryptoFile_Delete:string;
}
& {
    [key: string]: string | undefined;
};

const MessageSetX_Hangul:MessageSetXType = {
    NewEncryptButtonText:'암호화 파일 선택',
    NewDecryptButtonText:'복호화 파일 선택',
    LatestCryptoFile_NotExist : '항목이 없습니다.',
    LatestCryptoFile_Encrypt : '암호화',
    LatestCryptoFile_Decrypy : '복호화',
    LatestCryptoFile_Delete : '삭제',
};

const MessageSetX_English:MessageSetXType = {
    NewEncryptButtonText:'Select encrypt file',
    NewDecryptButtonText:'Select decrypt file',
    LatestCryptoFile_NotExist : 'Not exist item',
    LatestCryptoFile_Encrypt : 'Encrypt',
    LatestCryptoFile_Decrypy : 'Decrypt',
    LatestCryptoFile_Delete : 'Delete',
};

const ProcessX:ProcessXType = {
    LanguageCode : 'KO-KR',
    MessageSetX : MessageSetX_Hangul
};

const WVHandShakeX = function() {
    // 여기 "wvHandShake"와 윈폼내 AddHostObjectToScript 부분의 "wvHandShake"가 같아야 한다
    return window.chrome.webview.hostObjects.wvHandShake;    
};

const SendHelloMessage = async function () : Promise<void> {
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
    const delItem = document.getElementById(('fileitemx_' + fileID));    
};

const LatestListX = {
    DisplayList : async function() : Promise<void> {
        PageBlindX.ShowNow();

        const areaX = (document.querySelector('#mainframe .latestlistarea ul') as HTMLUListElement);
        const rawFileList = await WVHandShakeX().GetLatestCryptoFileList();
        const fileList = (JSON.parse(rawFileList) as LatestFileListType[]);

        LatestListX.AllClear(areaX);
        
        if(fileList.length > 0) {
            fileList.forEach(
                function(fileItem:LatestFileListType) : void {
                    LatestListX.CreateFileItem(areaX, fileItem);
                }
            );
        } else {
            LatestListX.CreateNotExist(areaX);
        }

        PageBlindX.HideNow();
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
    CreateNotExist : function(areaX:HTMLUListElement) : void {
        var itemX = (document.createElement('LI') as HTMLLIElement);
        itemX.classList.add('emptyitembox');
        itemX.innerText = ProcessX.MessageSetX.LatestCryptoFile_NotExist;

        areaX.appendChild(itemX);
    },
    CreateFileItem : function(areaX:HTMLUListElement, fileItem:LatestFileListType) : void {
        // 암호화면, 복호화로 표시
        // 암호화가 아니면(=복호화) 암호화로 표시
        const msgSetX = ProcessX.MessageSetX;
        const cryptoBoxHTML = (
            (fileItem.isEncrypt == true) ? 
            ('<div class="decryptaction"><button type="button" class="decryptbutton" onclick="FileItemDecryptAction(\'' + fileItem.fileID + '\');">' + msgSetX.LatestCryptoFile_Encrypt + '</button></div>') : 
            ('<div class="encryptaction"><button type="button" class="encryptbutton" onclick="FileItemEncryptAction(\'' + fileItem.fileID + '\');">' + msgSetX.LatestCryptoFile_Decrypt + '</button></div>')    
        );
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
    ShowAndHide : function(isShow:boolean) {
        const blindX = (document.getElementById('pageblind') as HTMLDivElement);

        if(isShow == true) {
            blindX.classList.add('shownow'); 
        } else {
            blindX.classList.remove('shownow'); 
        }        
    },
    ShowNow : function() {
        PageBlindX.ShowAndHide(true);
    },
    HideNow : function() {
        PageBlindX.ShowAndHide(false);
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
        
        langXList.forEach(
            function(eleX:HTMLElement) : void {
                eleX.innerText = LanguageX.GetMessage(eleX, 'languagextext');
            }
        );
    },
    GetMessage : function(eleX:HTMLElement, codeName:string) : string {
        const msgCode = eleX.dataset[codeName];
        let result = '';

        if(msgCode != undefined) {
            const msgX = ProcessX.MessageSetX[msgCode];
         
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
        PageLoadingX.NewCryptoAction('encrypt', SelectNewEncryptFileAction);
        PageLoadingX.NewCryptoAction('decrypt', SelectNewDecryptFileAction);
        LatestListX.DisplayList();    
    },
    NewCryptoAction : function(cryptoType:string, clickAction:EventParameterFNType) {
        const btnX = (document.querySelector(('#mainframe .newcryptobox .' + cryptoType + 'box .mainaction button')) as HTMLButtonElement);

        btnX.addEventListener('click', clickAction);
    }
};

const ReceiveWebVeiwMessage = function(e:MessageEvent<any>) : void {
    console.log(e.data, e);
};

window.addEventListener('load', PageLoadingX.StartInitialize);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);

