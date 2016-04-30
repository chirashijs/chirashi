// CORE

import forEach        from './core/for-each.js'
import forElements    from './core/for-elements.js'
import forIn          from './core/for-in.js'
import getElement     from './core/get-element.js'
import getElements    from './core/get-elements.js'
import getSelectorAll from './core/get-selector-all.js'
import getSelector    from './core/get-selector.js'
import isDomElement   from './core/is-dom-element.js'

// DOM

import addClass       from './dom/add-class.js'
import append         from './dom/append.js'
import attr           from './dom/attr.js'
import clone          from './dom/clone.js'
import closest        from './dom/closest.js'
import createElement  from './dom/create-element.js'
import data           from './dom/data.js'
import empty          from './dom/empty.js'
import filter         from './dom/filter.js'
import findOne        from './dom/find-one.js'
import find           from './dom/find.js'
import getAttr        from './dom/get-attr.js'
import getData        from './dom/get-data.js'
import getHtml        from './dom/get-html.js'
import getProp        from './dom/get-prop.js'
import hasClass       from './dom/has-class.js'
import html           from './dom/html.js'
import indexInParent  from './dom/index-in-parent.js'
import insertAfter    from './dom/insert-after.js'
import insertBefore   from './dom/insert-before.js'
import next           from './dom/next.js'
import parent         from './dom/parent.js'
import prev           from './dom/prev.js'
import prop           from './dom/prop.js'
import removeClass    from './dom/remove-class.js'
import remove         from './dom/remove.js'
import setAttr        from './dom/set-attr.js'
import setData        from './dom/set-data.js'
import setHtml        from './dom/set-html.js'
import setProp        from './dom/set-prop.js'
import toggleClass    from './dom/toggle-class.js'

// EVENTS

import drag           from './events/drag.js'
import hover          from './events/hover.js'
import load           from './events/load.js'
import off            from './events/off.js'
import on             from './events/on.js'
import ready          from './events/ready.js'
import resize         from './events/resize.js'
import scroll         from './events/scroll.js'
import trigger        from './events/trigger.js'
import undrag         from './events/undrag.js'
import unhover        from './events/unhover.js'
import unresize       from './events/unresize.js'
import unscroll       from './events/unscroll.js'
import unwatchProp    from './events/unwatch-prop.js'
import watchProp      from './events/watch-prop.js'

// IS

import androidTablet  from './is/android-tablet.js'
import android        from './is/android.js'
import chrome         from './is/chrome.js'
import firefox        from './is/firefox.js'
import ie             from './is/ie.js'
import ios            from './is/ios.js'
import ipad           from './is/ipad.js'
import iphone         from './is/iphone.js'
import ipod           from './is/ipod.js'
import mobile         from './is/mobile.js'
import safari         from './is/safari.js'
import tablet         from './is/tablet.js'
import touchable      from './is/touchable.js'
import wider          from './is/wider.js'
import windowsPhone   from './is/windows-phone.js'
import windowsTablet  from './is/windows-tablet.js'
import windows        from './is/windows.js'

// STYLES

import getHeight      from './styles/get-height.js'
import getSize        from './styles/get-size.js'
import getStyle       from './styles/get-style.js'
import getWidth       from './styles/get-width.js'
import height         from './styles/height.js'
import hide           from './styles/hide.js'
import matrix         from './styles/matrix.js'
import matrix2d       from './styles/matrix2d.js'
import matrix3d       from './styles/matrix3d.js'
import offset         from './styles/offset.js'
import position       from './styles/position.js'
import scale          from './styles/scale.js'
import scale2d        from './styles/scale2d.js'
import scale3d        from './styles/scale3d.js'
import screenPosition from './styles/screen-position.js'
import setHeight      from './styles/set-height.js'
import setSize        from './styles/set-size.js'
import setStyle       from './styles/set-style.js'
import setWidth       from './styles/set-width.js'
import show           from './styles/show.js'
import size           from './styles/size.js'
import style          from './styles/style.js'
import transform      from './styles/transform.js'
import translate      from './styles/translate.js'
import translate2d    from './styles/translate2d.js'
import translate3d    from './styles/translate3d.js'

// UTILS

import width          from './styles/width.js'
import between        from './utils/between.js'
import deepClone      from './utils/deep-clone.js'
import defaultify     from './utils/defaultify.js'
import range          from './utils/range.js'

export default {
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
    resize,
    scroll,
    trigger,
    undrag,
    unhover,
    unresize,
    unscroll,
    unwatchProp,
    watchProp,
    androidTablet,
    android,
    chrome,
    firefox,
    ie,
    ios,
    ipad,
    iphone,
    ipod,
    mobile,
    safari,
    tablet,
    touchable,
    wider,
    windowsPhone,
    windowsTablet,
    windows,
    getHeight,
    getSize,
    getStyle,
    getWidth,
    height,
    hide,
    matrix,
    matrix2d,
    matrix3d,
    offset,
    position,
    scale,
    scale2d,
    scale3d,
    screenPosition,
    setHeight,
    setSize,
    setStyle,
    setWidth,
    show,
    size,
    style,
    transform,
    translate,
    translate2d,
    translate3d,
    width,
    between,
    deepClone,
    defaultify,
    range
}
