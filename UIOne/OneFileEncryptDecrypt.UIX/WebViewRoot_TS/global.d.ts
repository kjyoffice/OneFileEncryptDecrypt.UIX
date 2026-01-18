export {};

declare global {
    interface Window {
        chrome: {
            webview: {
                postMessage(message: any): void;
                addEventListener(type: 'message', listener: (ev: MessageEvent<any>) => void): void;
                removeEventListener(type: 'message', listener: (ev: MessageEvent<any>) => void): void;
                hostObjects : {
                    handShake : {
                        HelloMessage(name:string) : string;                
                    }
                }
            };
        };
    }
}


