# Better xCloud
Improve Xbox Cloud Gaming (xCloud) experience

## Features:
- Block a lot of tracking in background.
- Disable bandwidth checking -> xCloud always tries to use the best possible quality.
- Hide splash video (still have sound).
- Make the top-left dots icon invisible while playing. You can still click on it, but it doesn't block the screen anymore.
- Add video filter. Default: set saturation to 110%. This won't affect latency.
- Hide footer and other UI elements.

## How to use:
1. Install [Tampermonkey extension](https://www.tampermonkey.net/).
2. Click to install [better-xcloud.user.js](https://github.com/redphx/better-xcloud/raw/main/better-xcloud.user.js).
3. Refresh xCloud.
4. Done.

🤓 It's recommended to change your browser's User-Agent to:
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox;) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67
```
This will trick xCloud to think you're using Edge browser on an Xbox console. It might or might not improve the stream's quality. You might need to install an extension to do that.  

Tested on:
- Chrome on macOS.
- [Hermit Browser](https://play.google.com/store/apps/details?id=com.chimbori.hermitcrab) on Android. It supports custom User-Agent and has built-in Userscript support (paid version) so you don't have to install anything else

[Kiwi Browser for Android](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser) might work but I haven't tested it yet.
