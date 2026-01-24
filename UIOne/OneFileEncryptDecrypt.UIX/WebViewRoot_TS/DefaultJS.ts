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
    HTML_SelectNewEncrypt:string;
    HTML_SelectNewDecrypt:string;
    // ------------
    Common_Encrypt:string;
    Common_Decrypt:string;    
    Common_NotExistItem:string;
    Common_Delete:string;
    // ------------
    LatestFileItemDeleteQuestion:string;
    EncryptFileQuestion:string;
    DecryptFileQuestion:string;
    // ------------
    WF_EMPTY_OR_WRONG_FILEID:string;
    WF_NOT_EXIST_FILEITEM:string;
    WF_UNDEFINED_PROCESS:string;
    WF_NOT_EXIST_FILE:string;
    WF_WRONG_ENCRYPT_FILE:string;
    WF_WRONG_DECRYPT_FILE:string;
}
& {
    [key: string]: string | undefined;
};

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
    // ------------
    Common_Encrypt : '암호화',
    Common_Decrypt : '복호화',
    Common_NotExistItem : '항목이 없습니다.',
    Common_Delete : '삭제',
    // ------------
    LatestFileItemDeleteQuestion : '해당 항목을 삭제하겠습니까?',
    EncryptFileQuestion : '파일을 암호화 하겠습니까?',
    DecryptFileQuestion : '파일을 복호화 하겠습니까?',
    // ------------
    WF_EMPTY_OR_WRONG_FILEID : 'FileID가 없거나 올바르지 않습니다.',
    WF_NOT_EXIST_FILEITEM : '파일 항목이 없습니다.',
    WF_UNDEFINED_PROCESS : '지정되지 않은 진행입니다.',
    WF_NOT_EXIST_FILE : '파일이 존재하지 않습니다.',
    WF_WRONG_ENCRYPT_FILE : '암호화 할 파일이 올바르지 않습니다.',
    WF_WRONG_DECRYPT_FILE : '복호화 할 파일이 올바르지 않습니다.',
};

const MessageSetX_English:MessageSetXType = {
    HTML_SelectNewEncrypt:'Select encrypt file',
    HTML_SelectNewDecrypt:'Select decrypt file',
    // ------------
    Common_Encrypt : 'Encrypt',
    Common_Decrypt : 'Decrypt',
    Common_NotExistItem : 'Not exist item',
    Common_Delete : 'Delete',
    // ------------
    LatestFileItemDeleteQuestion : 'Are you sure delete this item?',
    EncryptFileQuestion : 'Are you sure encrypt file?',
    DecryptFileQuestion : 'Are you sure decrypt file?',
    // ------------
    WF_EMPTY_OR_WRONG_FILEID : 'Empty or wrong FileID.',
    WF_NOT_EXIST_FILEITEM : 'Not exist file item.',
    WF_UNDEFINED_PROCESS : 'Undefined process.',
    WF_NOT_EXIST_FILE : 'Not exist file.',
    WF_WRONG_ENCRYPT_FILE : 'Wrong encrypt file.',
    WF_WRONG_DECRYPT_FILE : 'Erong decrypt file',    
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

const NewCryptoX = {
    EncryptFile : function(e:Event) : void {    
        NewCryptoX.StartNewCrypto(true);
    },
    DecryptFile : function(e:Event) : void {
        NewCryptoX.StartNewCrypto(false);
    },
    StartNewCrypto : async function(isEncrypt:boolean) : Promise<void> {
        PageBlindX.ShowNow();
        await WVHandShakeX().NewCryptoNow(isEncrypt);
    },
    StartNewCrypto_SelectedFile : async function(dataX:ReceiveWebVeiwMessageOrderType) : Promise<void> {
        const msgSetX = ProcessX.MessageSetX;

        if(dataX.isSuccess == true) {      
            const md = (dataX.mainData as RWMOT_MD_NewCryptoSelectFileType);
            const confirmMsgX = ((md.isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);

            if(confirm(confirmMsgX) == true) {
                // 이제 실제 프로그램 실행시키러 콜
                await WVHandShakeX().NewCryptoStartProcess(md.filePath, md.isEncrypt);
            } else {
                PageBlindX.HideNow();                
            }
        } else {
            alert(msgSetX[dataX.messageCode]);
            PageBlindX.HideNow();
        }        
    },
    StartNewCrypto_StartProcessResult : function(dataX:ReceiveWebVeiwMessageOrderType) : void {
        const msgSetX = ProcessX.MessageSetX;

        if(dataX.isSuccess == true) {      
            // const md = (dataX.mainData as RWMOT_MD_NewCryptoSelectFileType);
            // const confirmMsgX = ((md.isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);

            // if(confirm(confirmMsgX) == true) {
            //     // 이제 실제 프로그램 실행시키러 콜
            //     await WVHandShakeX().NewCryptoStartProcess(md.filePath, md.isEncrypt);
            // } else {
            //     PageBlindX.HideNow();                
            // }
            console.log('StartNewCrypto_StartProcessResult', dataX);
            PageBlindX.HideNow();
        } else {
            alert(msgSetX[dataX.messageCode]);
            PageBlindX.HideNow();
        }          
    }
};

const LatestListX = {
    DisplayList : async function() : Promise<void> {
        PageBlindX.ShowNow();

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
    CryptoFileNow : async function(fileID:string, isEncrypt:boolean) : Promise<void> {
        const itemX = (document.getElementById(('fileitemx_' + fileID)) as HTMLLIElement);

        if(itemX != null) {
            const msgSetX = ProcessX.MessageSetX;
            const confirmMsgX = ((isEncrypt == true) ? msgSetX.EncryptFileQuestion : msgSetX.DecryptFileQuestion);

            if(confirm(confirmMsgX) == true) {
                PageBlindX.ShowNow();

                const delResult = await WVHandShakeX().CryptoLatestFile(fileID, isEncrypt);

                if(delResult == 'OK') {                    
                    // 뭐가 됐던 일단 프로그램은 실행됐음, 
                    // 결과는 여기서 기다리기엔 언제 끝날지 모르는 프로그램이라서 블라인드만 유지시켜둠
                    // 이후 ReceiveWebVeiwMessage를 통해 아래의 OrderID, "CRYPTOFILERESULT" 신호 받을때 까지 대기, 신호 받으면 후처리 함
                } else {
                    alert(msgSetX[delResult]);
                    PageBlindX.HideNow();
                }
            }
        }
    },
    CryptoFileNow_Result : function(dataX:ReceiveWebVeiwMessageOrderType) : void {
        const msgSetX = ProcessX.MessageSetX;

        if(dataX.isSuccess == true) {
            const sd = (dataX.supportData as RWMOT_SD_LatestDeleteFileIDType);
            const fileItem = (dataX.mainData as LatestFileListType);
            const delItemX = (document.getElementById(('fileitemx_' + sd.deleteFileID)) as HTMLLIElement);
            const areaX = (document.querySelector('#mainframe .latestlistarea ul') as HTMLUListElement);
            const htmlX = LatestListX.CreateFileItem(fileItem, msgSetX);

            delItemX.remove();
            areaX.insertAdjacentHTML('afterbegin', htmlX);        
        } else {
            alert(msgSetX[dataX.messageCode]);
        }

        PageBlindX.HideNow();    
    },
    EncryptFile : function(fileID:string) : void {
        LatestListX.CryptoFileNow(fileID, true);
    },
    DecryptFile : function(fileID:string) : void {
        LatestListX.CryptoFileNow(fileID, false);
    },    
    DeleteItem : async function(fileID:string) : Promise<void> {
        const itemX = (document.getElementById(('fileitemx_' + fileID)) as HTMLLIElement);

        if(itemX != null) {
            const msgSetX = ProcessX.MessageSetX;

            if(confirm(msgSetX.LatestFileItemDeleteQuestion) == true) {
                PageBlindX.ShowNow();

                const delResult = await WVHandShakeX().DeleteLatestCryptoFile(fileID);

                if(delResult == 'OK') {
                    // 선택된 리스트 지우고
                    itemX.remove();
                    // 리스트가 모두 지워졌을 수 있으니 메세지 뿌리기
                    LatestListX.DeleteItemAfterNotExist(msgSetX);
                } else {
                    alert(msgSetX[delResult]);
                }

                PageBlindX.HideNow();
            }
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
            const msgX = msgSetX[('HTML_' + msgCode)];
         
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
        //LatestListX.DisplayList();
    },
    NewCryptoAction : function(cryptoType:string, clickAction:EventParameterFNType) {
        const btnX = (document.querySelector(('#mainframe .newcryptobox .' + cryptoType + 'box .mainaction button')) as HTMLButtonElement);

        btnX.addEventListener('click', clickAction);
    }
};

const ReceiveWebVeiwMessage = function(e:MessageEvent<any>) : void {
    const dataX = (e.data as ReceiveWebVeiwMessageOrderType);

    if(dataX.orderID == 'LATESTFILE_CRYPTOFILERESULT') {
        LatestListX.CryptoFileNow_Result(dataX);
    } else if(dataX.orderID == 'HIDEPAGEBLIND') {
        PageBlindX.HideNow();
    } else if(dataX.orderID == 'NEWCRYPTO_SELECTEDFILE') {
        NewCryptoX.StartNewCrypto_SelectedFile(dataX);
    } else if(dataX.orderID == 'NEWCRYPTO_STARTPROCESSRESULT') {
        NewCryptoX.StartNewCrypto_StartProcessResult(dataX);
    }
};

window.addEventListener('load', PageLoadingX.StartInitialize);
window.chrome.webview.addEventListener('message', ReceiveWebVeiwMessage);

