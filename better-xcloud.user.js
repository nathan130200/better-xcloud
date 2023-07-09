// ==UserScript==
// @name         Better xCloud
// @namespace    https://github.com/redphx
// @version      0.1
// @description  Improve Xbox Cloud Gaming (xCloud) experience
// @author       redphx
// @match        https://www.xbox.com/*/play*
// @icon         https://assets-www.xbox.com/xbox-web/static/media/apple-icon-180.8db22303.png
// @run-at       document-start
// @grant        none
// ==/UserScript==
'use strict';

function addCss() {
    const style = document.createElement('style');
    style.textContent = `
/* Hide the top-left dots icon while playing */
div[class*=Grip-module__container] {
    visibility: hidden;
}

/* Add video filters: https://developer.mozilla.org/en-US/docs/Web/CSS/filter */
#game-stream video {
    filter: saturate(110%) contrast(110%) brightness(110%);

    /* Fill xcloud video screen (eg. 4:3 resolutions, or even when running browser in non fullscreen mode) */
    object-fit: 'fill'; 
}

/* Hide footer */
#uhfSkipToMain, .uhf-footer {
    display: none;
}

/* Hide splash video (still have sound) */
video[class*=XboxSplashVideo] {
    display: none !important;
}

/* Hide not focused warning dialog */

div[class*=NotFocusedDialog] {
    display: none !important;
}
`;

    document.documentElement.appendChild(style);
}

function blockTracking() {
    const blockedUrl = 'https://browser.events.data.microsoft.com';

    const xhrPrototype = XMLHttpRequest.prototype;
    xhrPrototype.orgOpen = xhrPrototype.open;
    xhrPrototype.orgSend = xhrPrototype.send;

    xhrPrototype.open = function(method, url) {
        // Save URL to use it later in send()
        this._url = url;
        return this.orgOpen.apply(this, arguments);
    };

    xhrPrototype.send = function(...arg) {
        if (this._url.startsWith(blockedUrl)) {
            return false;
        }

        return this.orgSend.apply(this, arguments);
    };

    const orgFetch = window.fetch;
    window.fetch = async (...arg) => {
        const request = arg[0];
        if (typeof request === 'string' && request.startsWith(blockedUrl)) {
            // Return fake response
            return new Response('{"acc":1,"webResult":{}}', {
                status: 200,
                statusText: '200 OK',
            });
        }

        return orgFetch(...arg);
    }
}

// Clear data of window.navigator.userAgentData, force Xcloud to detect browser based on User-Agent header
Object.defineProperty(window.navigator, 'userAgentData', {});

// Disable bandwidth checking
Object.defineProperty(window.navigator, 'connection', {
    get: () => undefined,
});

// Block tracking
blockTracking();

// Add additional CSS
addCss();
