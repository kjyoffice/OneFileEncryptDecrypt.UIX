"use strict";
const HandShakeX = function () {
    return window.chrome.webview.hostObjects.handShake;
};
const SendHelloMessage = async function () {
    console.log(await HandShakeX().HelloMessage('Anders'));
};
window.chrome.webview.addEventListener('message', function (e) {
    console.log(e.data, e);
});
