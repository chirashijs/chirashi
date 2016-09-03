import isAndroidTablet     from './src/browser/is-android-tablet.js'
import isAndroid           from './src/browser/is-android.js'
import isChrome            from './src/browser/is-chrome.js'
import isFirefox           from './src/browser/is-firefox.js'
import isIe                from './src/browser/is-ie.js'
import isIos               from './src/browser/is-ios.js'
import isIpad              from './src/browser/is-ipad.js'
import isIphone            from './src/browser/is-iphone.js'
import isIpod              from './src/browser/is-ipod.js'
import isMobile            from './src/browser/is-mobile.js'
import isSafari            from './src/browser/is-safari.js'
import isTablet            from './src/browser/is-tablet.js'
import isTouchable         from './src/browser/is-touchable.js'
import isWindowsPhone      from './src/browser/is-windows-phone.js'
import isWindowsTablet     from './src/browser/is-windows-tablet.js'
import isWindows           from './src/browser/is-windows.js'
import ua                  from './src/browser/ua.js'
import vendor              from './src/browser/vendor.js'
import forEach             from './src/core/for-each.js'
import forElements         from './src/core/for-elements.js'
import forIn               from './src/core/for-in.js'
import getElement          from './src/core/get-element.js'
import getElements         from './src/core/get-elements.js'
import getSelectorAll      from './src/core/get-selector-all.js'
import getSelector         from './src/core/get-selector.js'
import isDomElement        from './src/core/is-dom-element.js'
import addClass            from './src/dom/add-class.js'
import append              from './src/dom/append.js'
import attr                from './src/dom/attr.js'
import clone               from './src/dom/clone.js'
import closest             from './src/dom/closest.js'
import createElement       from './src/dom/create-element.js'
import data                from './src/dom/data.js'
import empty               from './src/dom/empty.js'
import filter              from './src/dom/filter.js'
import findOne             from './src/dom/find-one.js'
import find                from './src/dom/find.js'
import getAttr             from './src/dom/get-attr.js'
import getData             from './src/dom/get-data.js'
import getHtml             from './src/dom/get-html.js'
import getProp             from './src/dom/get-prop.js'
import hasClass            from './src/dom/has-class.js'
import html                from './src/dom/html.js'
import indexInParent       from './src/dom/index-in-parent.js'
import insertAfter         from './src/dom/insert-after.js'
import insertBefore        from './src/dom/insert-before.js'
import next                from './src/dom/next.js'
import parent              from './src/dom/parent.js'
import prev                from './src/dom/prev.js'
import prop                from './src/dom/prop.js'
import removeClass         from './src/dom/remove-class.js'
import remove              from './src/dom/remove.js'
import setAttr             from './src/dom/set-attr.js'
import setData             from './src/dom/set-data.js'
import setHtml             from './src/dom/set-html.js'
import setProp             from './src/dom/set-prop.js'
import toggleClass         from './src/dom/toggle-class.js'
import drag                from './src/events/drag.js'
import hover               from './src/events/hover.js'
import load                from './src/events/load.js'
import off                 from './src/events/off.js'
import on                  from './src/events/on.js'
import ready               from './src/events/ready.js'
import trigger             from './src/events/trigger.js'
import getHeight           from './src/styles/get-height.js'
import getSize             from './src/styles/get-size.js'
import getStyle            from './src/styles/get-style.js'
import getWidth            from './src/styles/get-width.js'
import height              from './src/styles/height.js'
import hide                from './src/styles/hide.js'
import matrix              from './src/styles/matrix.js'
import matrix2D            from './src/styles/matrix2d.js'
import matrix3D            from './src/styles/matrix3d.js'
import offset              from './src/styles/offset.js'
import position            from './src/styles/position.js'
import scale               from './src/styles/scale.js'
import scale2D             from './src/styles/scale2d.js'
import scale3D             from './src/styles/scale3d.js'
import screenPosition      from './src/styles/screen-position.js'
import setHeight           from './src/styles/set-height.js'
import setSize             from './src/styles/set-size.js'
import setStyle            from './src/styles/set-style.js'
import setWidth            from './src/styles/set-width.js'
import show                from './src/styles/show.js'
import size                from './src/styles/size.js'
import transform           from './src/styles/transform.js'
import translate           from './src/styles/translate.js'
import translate2D         from './src/styles/translate2d.js'
import translate3D         from './src/styles/translate3d.js'
import width               from './src/styles/width.js'
import debounce            from './src/utils/debounce.js'
import deepClone           from './src/utils/deep-clone.js'
import defaultify          from './src/utils/defaultify.js'
import memoize             from './src/utils/memoize.js'
import randomBetween       from './src/utils/random-between.js'
import randomIntBetween    from './src/utils/random-int-between.js'
import range               from './src/utils/range.js'
import throttle            from './src/utils/throttle.js'
import transformTo2DMatrix from './src/utils/transform-to-2d-matrix.js'
import transformTo3DMatrix from './src/utils/transform-to-3d-matrix.js'

export default {
    isAndroidTablet,
    isAndroid,
    isChrome,
    isFirefox,
    isIe,
    isIos,
    isIpad,
    isIphone,
    isIpod,
    isMobile,
    isSafari,
    isTablet,
    isTouchable,
    isWindowsPhone,
    isWindowsTablet,
    isWindows,
    ua,
    vendor,
    forEach,
    forElements,
    forIn,
    getElement,
    getElements,
    getSelectorAll,
    getSelector,
    isDomElement,
    addClass,
    append,
    attr,
    clone,
    closest,
    createElement,
    data,
    empty,
    filter,
    findOne,
    find,
    getAttr,
    getData,
    getHtml,
    getProp,
    hasClass,
    html,
    indexInParent,
    insertAfter,
    insertBefore,
    next,
    parent,
    prev,
    prop,
    removeClass,
    remove,
    setAttr,
    setData,
    setHtml,
    setProp,
    toggleClass,
    drag,
    hover,
    load,
    off,
    on,
    ready,
    trigger,
    getHeight,
    getSize,
    getStyle,
    getWidth,
    height,
    hide,
    matrix,
    matrix2D,
    matrix3D,
    offset,
    position,
    scale,
    scale2D,
    scale3D,
    screenPosition,
    setHeight,
    setSize,
    setStyle,
    setWidth,
    show,
    size,
    transform,
    translate,
    translate2D,
    translate3D,
    width,
    debounce,
    deepClone,
    defaultify,
    memoize,
    randomBetween,
    randomIntBetween,
    range,
    throttle,
    transformTo2DMatrix,
    transformTo3DMatrix
}
