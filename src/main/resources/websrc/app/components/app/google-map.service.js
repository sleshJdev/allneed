import React from 'react';

class GoogleMapService {

    constructor() {
        this.scriptsCache = new Map();
    }

    loadScript(key, src) {
        if (!this.scriptsCache.has(key)) {
            const tag = document.createElement('script');
            tag.type = 'text/javascript';

            const callbackName = `google_callback_${Date.now()}`;

            const promise = new Promise((resolve, reject) => {
                const handleLoading = (event) => {
                    if(!event) {
                        return;
                    }
                    const scriptCache = this.scriptsCache.get(key);
                    switch (event.type) {
                        case 'load':
                            scriptCache.loaded = true;
                            resolve(src);
                            break;
                        case 'error':
                            scriptCache.error = true;
                            reject(src);
                    }

                    if (typeof window[callbackName] === 'function') {
                        window[callbackName] = null;
                        delete window[callbackName];
                    }
                };

                tag.onload = handleLoading;
                tag.onerror = handleLoading;

                if (src.match(/callback=CALLBACK_NAME/)) {
                    src = src.replace(/(callback=)[^\&]+/, `$1${callbackName}`);
                    window[callbackName] = tag.onload;
                }
                tag.src = src;

                const body = document.querySelector('body');
                body.appendChild(tag);
            });

            this.scriptsCache.set(key, {
                promise: promise,
                tag: tag,
                error: false,
                loaded: false
            });
        }

        return this.scriptsCache.get(key);
    }
}

const googleUtils = new GoogleMapService();

export default googleUtils;