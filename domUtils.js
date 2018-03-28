// 兼容IE8大全
var domUtils = {
    // 事件
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    addEvent: function (element, event, fn) {
        if (element.addEventListener) {
            element.addEventListener(event, fn, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, fn);
        } else {
            element["on" + type] = handler;
        }
    },
    removeEvent: function (element, event, fn) {
        if (element.removeEventListener) {
            element.removeEventListener(event, fn, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + event, fn);
        } else {
            element["on" + type] = null;
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    // 宽高
    clientWidth: document.body.clientWidth || document.docuemntElement.clientWidth,
    clientHeight: document.body.clientHeight || document.docuemntElement.clientHeight,

    scrollWidth: document.body.scrollWidth || document.docuemntElement.scrollWidth,
    scrollHeight: document.body.scrollHeight || document.docuemntElement.scrollHeight,

    offsetWidth: document.documentElement.offsetWidth || document.body.offsetWidth,
    offsetHeight: document.documentElement.offsetHeight || document.body.offsetHeight,

    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
    scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
    // 节点
    hasClass: function (el, clsName) {
        var reg = new RegExp('(^|\\s)' + clsName + '(\\s|$)');
        return reg.test(el.className);
    },
    addClass: function (el, clsName) {
        if (!hasClass(el, clsName)) {
            var newCls = el.className.split(' ')
            newCls.push(clsName)
            el.className = newCls.join(' ')
        }
    },
    getElementsByClassName: function (clsName, parentId) {
        var tags;
        var parent = document.getElementById(parentId);
        if (parent) {
            tags = parent.all ? parent.all : parent.getElementsByTagName('*');
        } else {
            tags = document.all ? document.all : document.getElementsByTagName('*');
        }
        var arr = [];
        for (var i = 0; i < tags.length; i++) {
            if (hasClass(clsName)) {
                arr.push(tags[i]);
            };
        };
        return arr;
    },
    settingOfAttr: function (el, name, value) {
        const prefix = 'data-';
        name = prefix + name;
        if (value) {
            return el.setAttribute(name, value);
        } else {
            return el.getAttribute(name);
        }
    },
    nextnode: function (obj) {//获取下一个兄弟节点
        if (obj.nextElementSibling) {
            return obj.nextElementSibling;
        } else {
            return obj.nextSibling;
        };
    },
    prenode: function (obj) {
        if (obj.previousElementSibling) {
            return obj.previousElementSibling;
        } else {
            return obj.previousSibling;
        };
    },
    firstnode: function (obj) {//获取第一个子节点
        if (obj.firstElementChild) {
            return obj.firstElementChild;//非IE678支持
        } else {
            return obj.firstChild;//IE678支持
        };
    },
    lastnode: function (obj) {//获取最后一个子节点
        if (obj.lastElementChild) {
            return obj.lastElementChild;//非IE678支持
        } else {
            return obj.lastChild;//IE678支持
        };
    },
    // 其他
    vendor: (function () {
        var eleStyle = document.createElement('div').style;
        // 以 transform 为例子，只是用来判断加前缀，并不是只支持这一个属性。
        var transformNames = {
            webkit: 'webkitTransform',
            Moz: 'MozTransform',
            O: 'OTransform',
            ms: 'msTransform',
            standard: 'transform'
        };

        for (var key in transformNames) {
            if (eleStyle[transformNames[key]] !== undefined) {
                return key;
            }
        }
        return false;
    })(),
    // js 操作 css3 时加前缀保证兼容性
    prefixStyle: function (style) {
        if (this.vendor) {
            if (this.vendor === 'standard') {
                return style;
            }
            return this.vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }
    }

}
