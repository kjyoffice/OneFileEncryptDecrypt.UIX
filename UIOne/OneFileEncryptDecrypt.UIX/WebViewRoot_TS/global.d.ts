export {};

declare global {
    interface Window {
        chrome: {
            webview: {
                postMessage(message: any): void;
                addEventListener(type: 'message', listener: (ev: MessageEvent<any>) => void): void;
                removeEventListener(type: 'message', listener: (ev: MessageEvent<any>) => void): void;
                hostObjects : {
                    wvHandShake : {
                        HelloMessage(name:string) : string;
                        GetLatestCryptoFileList() : string;
                        DeleteLatestCryptoFile(fileID:string) : string;
                        CryptoLatestFile(fileID:string, isEncrypt:boolean, cryptoPassword:string) : string;
                        NewCryptoNow(isEncrypt:boolean) : void;
                        NewCryptoStartProcess(filePath:string, isEncrypt:boolean, cryptoPassword:string) : void;
                        GetSavedCryptoPassword():string;
                        SetSaveCryptoPassword(cryptoPassword:string):void;
                        OpenFileOrDirectory(filePath:string, isOpenFile:boolean) : string;
                    }
                }
            };
        };
    }
}


