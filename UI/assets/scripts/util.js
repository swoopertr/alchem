const util = (() => {
    let cookie = {
        add(name, value, minutes) {
            let expires = "";
            if (minutes) {
                const date = new Date();
                date.setTime(date.getTime() + minutes * 60 * 1000);
                expires = `; expires=${date.toUTCString()}`;
            }
            document.cookie = `${name}=${value || ""}${expires}; path=/`;
        },
        get(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length == 2)
                return parts
                    .pop()
                    .split(";")
                    .shift();
        },
        remove(name) {
            document.cookie = `${name}=; Max-Age=-99999999;`;
        }
    };

    const device = {
        isMobile() {
            return this.isiPhone() || this.isAndroidPhone() || this.isWindowsPhone();
        },
        isTablet() {
            return this.isiPad() || this.isAndroidTablet();
        },
        isDesktop() {
            return !this.isTablet() && !this.isMobile() && !this.isSmartTV();
        },
        isSmartTV() {
            return (
                (!this.isAppleTV() &&
                    navigator.userAgent.toLowerCase().match(/tv/i) == "tv") ||
                location.hostname == "tvsb.fotv.me" ||
                location.hostname == "tv.fotv.me"
            );
        },
        isAppleTV() {
            return navigator.platform.indexOf("AppleTV") > -1;
        },
        isMac() {
            return navigator.platform.indexOf("Mac") > -1;
        },
        isPc() {
            return navigator.platform.indexOf("Win") > -1;
        },
        isiPhone() {
            return navigator.userAgent.match(/iPhone/i) === "iPhone";
        },
        isiPad() {
            return navigator.userAgent.match(/iPad/i) === "iPad";
        },
        isAndroidPhone() {
            if (navigator.userAgent.match(/Android/i)) {
                return navigator.userAgent.match(/Mobile/i) === "Mobile";
            }
            return false;
        },
        isAndroidTablet() {
            if (navigator.userAgent.match(/Android/i)) {
                return navigator.userAgent.match(/Mobile/i) == null;
            }
            return false;
        },
        isWindowsPhone() {
            return navigator.userAgent.match(/Windows Phone/i) === "Windows Phone";
        },
        platform() {
            return this.isMobile() === true
                ? "mobile"
                : this.isTablet() === true
                    ? "tablet"
                    : this.isAppleTV() === true
                        ? "appletv"
                        : this.isSmartTV() === true
                            ? "smarttv"
                            : "desktop";
        },
        isPhone() {
            return (
                util.device.isiPhone() ||
                util.device.isWindowsPhone() ||
                util.device.isAndroidPhone()
            );
        },
        isTablet() {
            return util.device.isiPad() || util.device.isAndroidTablet();
        },
        isiPad() {
            return navigator.userAgent.match(/iPad/i) == "iPad";
        },
        isiPhone() {
            return navigator.userAgent.match(/iPhone/i) == "iPhone";
        },
        isWindowsPhone() {
            return navigator.userAgent.match(/Windows Phone/i) == "Windows Phone";
        },
        isAndroidPhone() {
            if (navigator.userAgent.match(/Android/i)) {
                return navigator.userAgent.match(/Mobile/i) == "Mobile";
            }
            return false;
        },
        isAndroidTablet() {
            if (navigator.userAgent.match(/Android/i)) {
                return navigator.userAgent.match(/Mobile/i) == null;
            }

            return false;
        },
        isWeb() {
            if (
                util.device.isiPad() == false &&
                util.device.isiPhone() == false &&
                util.device.isWindowsPhone() == false &&
                util.device.isAndroidPhone() == false &&
                util.device.isAndroidTablet() == false
            ) {
                return true;
            }

            return false;
        },
        is_safari() {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        }
    };

    const browser = {
        isOnline() {
            return navigator.onLine;
        },
        isChrome() {
            return navigator.userAgent.match(/Chrome/i) == "Chrome";
        },
        isIE() {
            return (
                navigator.userAgent.match(/MSIE/i) == "MSIE" ||
                navigator.userAgent.match(/Trident/i) == "Trident" ||
                navigator.userAgent.match(/Edge/i) == "Edge"
            );
        },
        isSafari() {
            return navigator.userAgent.match(/Safari/i) == "Safari";
        },
        isFirefox() {
            return navigator.userAgent.match(/Firefox/i) == "Firefox";
        },
        isOpera() {
            return navigator.userAgent.match(/Opera/i) == "Opera";
        },
        ieVersion() {
            if (this.isIE()) {
                ua = navigator.userAgent;
                msie = ua.indexOf("MSIE ");
                if (msie > 0) {
                    // IE 10 or older => return version number
                    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
                }
                trident = ua.indexOf("Trident/");
                if (trident > 0) {
                    // IE 11 => return version number
                    rv = ua.indexOf("rv:");
                    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
                }
                edge = ua.indexOf("Edge/");
                if (edge > 0) {
                    // Edge (IE 12+) => return version number
                    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
                }
                return 1;
            } else {
                return 0;
            }
        }
    };

    const event = {
        bindLive(selector, event, cb, cnx) {
            util.event.addEvent(cnx || document, event, e => {
                const qs = (cnx || document).querySelectorAll(selector);
                if (qs) {
                    let el = e.target || e.srcElement, index = -1;
                    while (el && (index = Array.prototype.indexOf.call(qs, el)) === -1)
                        el = el.parentElement;
                    if (index > -1) cb.call(el, e);
                }
            });
        },
        addEvent(el, type, fn) {
            if (el.attachEvent) el.attachEvent(`on${type}`, fn);
            else el.addEventListener(type, fn);
        },
        on(eventName, fn) {
            window.events[eventName] = window.events[eventName] || [];
            window.events[eventName].push(fn);
        },
        off(eventName, fn) {
            if (window.events[eventName]) {
                for (let i = 0; i < window.events[eventName].length; i++) {
                    if (window.events[eventName][i] === fn) {
                        window.events[eventName].splice(i, 1);
                        break;
                    }
                }
            }
        },
        emit(eventName, data) {
            if (window.events[eventName]) {
                for (let i = 0; i < window.events[eventName].length; i++) {
                    window.events[eventName][i](data);
                }
            }
        },
        trigger(eventName, data) {
            util.event.emit(eventName, data);
        }
    };

    const localCache = {
        data: {},
        remove(url) {
            delete localCache.data[url];
        },
        exist(url) {
            return (
                localCache.data.hasOwnProperty(url) && localCache.data[url] !== null
            );
        },
        get(url) {
            return localCache.data[url];
        },
        set(url, cachedData, cb) {
            localCache.remove(url);
            localCache.data[url] = cachedData;
            cb && cb(cachedData);
        }
    };

    const localData = {
        insert(key, value) {
            localStorage.setItem(key, value);
        },
        remove(key) {
            localStorage.removeItem(key);
        },
        get(key) {
            return localStorage.getItem(key);
        },
        list() {
            const values = [];
            const keys = Object.keys(localStorage);
            let i = keys.length;
            while (i--) {
                values.push(localStorage.getItem(keys[i]));
            }
            return values;
        },
        clear() {
            localStorage.clear();
        }
    };

    function init() {
        window.events = {};
    }

    function isAdblockEnable(cb) {
        let adBlockEnabled = false;
        const testAd = document.createElement("div");
        testAd.innerHTML = " ";
        testAd.className = "adsbox";
        document.body.appendChild(testAd);
        window.setTimeout(() => {
            if (testAd.offsetHeight === 0) {
                adBlockEnabled = true;
            }
            util.remove(testAd);
            cb && cb(adBlockEnabled);
        }, 50);
    }

    function isEmail(email) {
        const regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return regex.test(email);
    }

    function convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "_");
    }

    function scrollToElement(elem) {
        elem.scrollIntoView();
    }

    function scroll(fn) {
        if (fn) {
            window.addEventListener("scroll", fn, false);
        }
    }

    function resize(fn) {
        if (fn) {
            window.addEventListener("resize", fn);
        }
    }

    function isScriptLoaded(src) {
        const scripts = document.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++)
            if (scripts[i].getAttribute("src") == src) return true;
        return false;
    }

    function loadScriptAsync(url, cb) {
        try {
            if (util.isScriptLoaded(url)) {
                cb && cb();
            } else {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.async = false;
                if (script.readyState) {
                    script.onreadystatechange = function() {
                        if (
                            script.readyState == "loaded" ||
                            script.readyState == "complete"
                        ) {
                            script.onreadystatechange = null;
                            cb && cb();
                        }
                    };
                } else {
                    script.onload = function() {
                        cb && cb();
                    };
                }
                script.onerror = function() {
                    cb && cb(false);
                };

                script.src = url;
                (
                    document.getElementsByTagName("head")[0] ||
                    document.getElementsByTagName("body")[0]
                ).appendChild(script);
            }
        } catch (e) {
            console.log(e);

            xhr.open("GET", url);
            if (header) {
                for (let i = 0; i < header.length; i++) {
                    xhr.setRequestHeader(header[i].name, header[i].value);
                }
            }
            xhr.send();
        }
    }

    function randomGen() {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        );
    }

    function ready(cb) {
        if (
            document.attachEvent
                ? document.readyState === "complete"
                : document.readyState !== "loading"
        ) {
            cb && cb();
        } else {
            document.addEventListener("DOMContentLoaded", cb);
        }
    }

    function getRequest(url, header, cb) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                cb && cb(xhr.responseText, xhr.status);
            } else {
                cb && cb(xhr.responseText, xhr.status);
                console.log("The request failed!");
            }
        };

        xhr.open("GET", url);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        if (header) {
            for (let i = 0; i < header.length; i++) {
                xhr.setRequestHeader(header[i].name, header[i].value);
            }
        }
        xhr.send();
    }

    function postRequest(url, data, headers, cb) {
        const params =
            typeof data == "string"
                ? data
                : Object.keys(data)
                    .map(k => {
                        return `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`;
                    })
                    .join("&");

        const xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("POST", url);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status == 200) {
                //console.log(xhr.responseText)
                cb && cb(xhr.responseText);
            }
        };
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (headers) {
            for (let i = 0; i < headers.length; i++) {
                xhr.setRequestHeader(headers[i].name, headers[i].value);
            }
        }
        xhr.send(params);
        return xhr;
    }

    function postJsonRequest(url, data, headers, cb) {
        const params = JSON.stringify(data);
        const xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("POST", url);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                cb && cb(xhr.responseText, xhr.status);
            }
        };
        xhr.setRequestHeader("Content-Type", "application/json");
        if (headers) {
            for (let i = 0; i < headers.length; i++) {
                xhr.setRequestHeader(headers[i].name, headers[i].value);
            }
        }
        try {
            xhr.send(params);
        } catch (e) {
            console.log(e);
        }
        return xhr;
    }

    function putJsonRequest(url, data, headers, cb) {
        const params = JSON.stringify(data);
        const xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("PUT", url);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                cb && cb(xhr.responseText, xhr.status);
            }
        };
        xhr.setRequestHeader("Content-Type", "application/json");
        if (headers) {
            for (let i = 0; i < headers.length; i++) {
                xhr.setRequestHeader(headers[i].name, headers[i].value);
            }
        }
        try {
            xhr.send(params);
        } catch (e) {
            console.log(e);
        }
        return xhr;
    }

    function selectDom(selector) {
        let selectorType = "querySelectorAll";
        if (selector.indexOf("#") === 0) {
            selectorType = "getElementById";
            selector = selector.substr(1, selector.length);
        }
        return document[selectorType](selector);
    }

    function find(elem, selector) {
        return elem.querySelectorAll(selector);
    }

    function getParents(elem, selector) {
        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    let matches = (this.document || this.ownerDocument).querySelectorAll(
                        s
                        ),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {
                    }
                    return i > -1;
                };
        }

        // Set up a parent array
        const parents = [];

        // Push each parent element to the array
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (selector) {
                if (elem.matches(selector)) {
                    parents.push(elem);
                }
                continue;
            }
            parents.push(elem);
        }
        return parents;
    }

    function strToJson(string) {
        const queryString = string;
        const query = {};
        const pairs = (queryString[0] === "?"
                ? queryString.substr(1)
                : queryString
        ).split("&");
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split("=");
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
        }
        return query;
    }

    function isInViewport(elem) {
        const distance = elem.getBoundingClientRect();
        return (
            distance.top >= 0 &&
            distance.left >= 0 &&
            distance.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
            distance.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function remove(elem) {
        if (elem) {
            if (elem.length) {
                for (let i = 0; i < elem.length; i++) {
                    if (elem[i].parentNode) {
                        elem[i].parentNode.removeChild(elem[i]);
                    }
                }
            } else {
                if (elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                }
            }
        }
    }

    function append(parent, el) {
        parent.appendChild(el);
    }

    function insertAfter(newEl, refNode) {
        refNode.parentNode.insertBefore(newEl, refNode.nextSibling);
    }

    function hasClass(el, className) {
        if (el && el.classList) return el.classList.contains(className);
        return !!el.className.match(new RegExp(`(\s|^)${className}(\s|$)`));
    }

    function addClass(el, className) {
        if (el && el.classList) el.classList.add(className);
        else if (!hasClass(el, className)) el.className += ` ${className}`;
    }

    function removeClass(el, className) {
        if (el.length) {
            for (let i = 0; i < el.length; i++) {
                if (el[i] && el[i].classList) el[i].classList.remove(className);
                else if (hasClass(el[i], className)) {
                    const reg = new RegExp(`(\s|^)${className}(\s|$)`);
                    el[i].className = el[i].className.replace(reg, " ");
                }
            }
        } else {
            if (el && el.classList) el.classList.remove(className);
            else if (hasClass(el, className)) {
                const reg = new RegExp(`(\s|^)${className}(\s|$)`);
                el.className = el.className.replace(reg, " ");
            }
        }
    }

    function getWindowSize() {
        const w = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight, size = {width: x, height: y};

        return size;
    }

    function getElIndex(el) {
        for (let i = 0; (el = el.previousElementSibling); i++) ;
        return i;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function getAllSiblings(el, classSelector) {
        let result=undefined;
        if (el) {
            return classSelector ? util.find(el.parentNode, classSelector) : el.parentNode.children;
        }
        return result;
    }

    function show(el) {
        if (el) {
            el.style.display = "block";
        }
    }

    function hide(el) {
        if (el) {
            el.style.display = "none";
        }
    }


    function isHide(elem) {
        if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
        const style = getComputedStyle(elem);
        if (style.display === 'none') return false;
        if (style.visibility !== 'visible') return false;
        if (style.opacity < 0.1) return false;
        if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
            elem.getBoundingClientRect().width === 0) {
            return false;
        }
        const elemCenter = {
            x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
            y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
        };
        if (elemCenter.x < 0) return false;
        if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
        if (elemCenter.y < 0) return false;
        if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
        let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
        do {
            if (pointContainer === elem) return true;
        } while (pointContainer = pointContainer.parentNode);
        return false;
    }

    function qsObject() {
        const search = document.location.search.slice(1);
        return JSON.parse(`{"${search.replace(/&/g, '","').replace(/=/g, '":"')}"}`, (key, value) => {
            return key === "" ? value : decodeURIComponent(value)
        });
    }

    function toggleVisibility(el) {
        if (el.style.display == "block") {
            el.style.display = "none";
        } else {
            el.style.display = "block";
        }
    }

    function konami() {
        let cursor = 0;
        const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        document.addEventListener('keydown', (e) => {
            cursor = (e.keyCode == KONAMI_CODE[cursor]) ? cursor + 1 : 0;
            if (cursor == KONAMI_CODE.length) activate();
        });
    }


    return {
        show: show,
        hide: hide,
        isHide: isHide,
        toggleVisibility: toggleVisibility,
        getAllSiblings: getAllSiblings,
        numberWithCommas: numberWithCommas,
        isAdblockEnable: isAdblockEnable,
        getElIndex: getElIndex,
        scroll: scroll,
        resize: resize,
        getWindowSize: getWindowSize,
        append: append,
        insertAfter: insertAfter,
        addClass: addClass,
        hasClass: hasClass,
        isEmail: isEmail,
        removeClass: removeClass,
        convertToSlug: convertToSlug,
        scrollToElement: scrollToElement,
        loadScriptAsync: loadScriptAsync,
        isScriptLoaded: isScriptLoaded,
        randomGen: randomGen,
        domReady: ready,
        getRequest: getRequest,
        postRequest: postRequest,
        postJsonRequest: postJsonRequest,
        putJsonRequest: putJsonRequest,
        remove: remove,
        selectDom: selectDom,
        find: find,
        getParents: getParents,
        strToJson: strToJson,
        qsObject: qsObject,
        isInViewport: isInViewport,
        konami: konami,
        init: init,
        device: device,
        browser: browser,
        cookie: cookie,
        event: event,
        localCache: localCache,
        localStorage: localData
    };
})();
util.init();