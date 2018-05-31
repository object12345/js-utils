const hasClass = function (el, clsName) {
    const reg = new RegExp('(^|\\s)' + clsName.trim() + '(\\s|$)')
    return reg.test(el.className)
}

const addClass = function (el, clsName) {
    const spaceReg = new RegExp('^\\s+$')
    if (!clsName.match(spaceReg) && !hasClass(el, clsName)) {
        el.className += ' ' + clsName.trim()
        el.className = el.className.trim()
    }
}

const removeClass = function (el, clsName) {
    const spaceReg = new RegExp('^\\s+$')
    if (!clsName.match(spaceReg) && hasClass(el, clsName)) {
        const reg = new RegExp('(\\s|^)' + clsName.trim() + '(\\s|$)')
        el.className = el.className.replace(reg, ' ').trim()
    }
}

const toggleClass = function (el, clsName) {
    clsName = clsName.trim()
    if (hasClass(el, clsName)) {
        removeClass(el, clsName)
    } else {
        addClass(el, clsName)
    }
}

const _vendor = (function () {
    const eleStyle = document.createElement('div').style
    // 以 transform 为例子，只是用来判断加前缀，并不是只支持这一个属性。
    const transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (eleStyle[transformNames[key]] !== undefined) {
            return key
        }
    }
    return false
})(),

const prefixStyle = function (style) {
    if (_vendor) {
        if (_vendor === 'standard') {
            return style
        }
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1)
    }
}

const formatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        // 一定要加括号，不然正则匹配不到
        if (new RegExp('(' + k + ')').test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
    }
    return fmt
}

const debounce = function (fn, delay) {
    let debounceTimer
    return function (...args) {
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
        debounceTimer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

const throttle = function (fn, threshhold) {
    let lastTime, throttle, throttleTimer
    threshhold || (threshhold = 250)
    return function (...args) {
        var nowTime = +new Date()
        if (lastTime && nowTime < lastTime + threshhold) {
            clearTimeout(throttleTimer)
            // 保证在当前时间区间结束后，再执行一次 fn
            throttleTimer = setTimeout(function () {
                lastTime = nowTime
                fn.apply(this, args)
            }, threshhold)
            // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
        } else {
            lastTime = nowTime
            fn.apply(this, args)
        }
    }
}

const removeElementFromArray = function (array, element) {
    let _array = [...array]
    let index = _array.findIndex((value) => {
        return value === element
    })
    if (index !== -1) {
        _array.splice(index, 1)
    }
    return _array
}

// 设置cookie
const setCookie = function (name, value, expiredays) {
    // 获取当前时间
    var exdate = new Date();
    // 将date设置为 expiredays 天以后的时间
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + ";" + "path=/;" +
        ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString());
}

// 读取cookie
const getCookie = function (name) {
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    var arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

// 删除cookies
const delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval !== null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export {
    hasClass,
    addClass,
    removeClass,
    toggleClass,
    prefixStyle,
    formatDate,
    debounce,
    throttle,
    setCookie,
    getCookie,
    delCookie
}
