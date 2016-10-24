/*!
 * Chirashi.js v5.0.0
 * (c) 2016 Alex Toudic
 * Released under the MIT License.
 */
'use strict';

/** User Agent in lower case. */
var ua = navigator && navigator.userAgent.toLowerCase();

/** Variable true if the device is running Android based on User Agent. */
var isAndroid = /android/i.test(ua);

/** Variable true if the device is an Android Tablet based on User Agent. */
var isAndroidTablet = isAndroid && !/mobile/i.test(ua);

/** Navigator's vendor in lower case. */
var vendor = navigator && navigator.vendor && navigator.vendor.toLowerCase();

/** Variable true if the browser is Chrome or Chromium based on User Agent. */
var isChrome = /chrome|chromium/i.test(ua) && /google inc/.test(vendor);

/** Variable true if the browser is Firefox based on User Agent. */
var isFirefox = /firefox/i.test(ua);

/** Version number if the browser is Internet Explorer or false based on User Agent. */
var isIE = ua.indexOf('msie') !== -1 ? +ua.split('msie')[1] : false;

/** Variable true if the device is running iOS based on User Agent. */
var isIOS = /iphone|ipad|ipod/i.test(ua);

/** Variable true if the device is an iPad based on User Agent. */
var isIPad = /ipad/i.test(ua);

/** Variable true if the device is an iPhone based on User Agent. */
var isIPhone = /iphone/i.test(ua);

/** Variable true if the device is an iPod based on User Agent. */
var isIPod = /ipod/i.test(ua);

/** Variable true if the device is running Windows based on User Agent. */
var isWindows = /win/i.test('navigator' in window && 'appVersion' in window.navigator && window.navigator.appVersion.toLowerCase() || '');

/** Variable true if the device handle touches events. */
var isTouchable = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);

/** Variable true if the device is a mobile based on User Agent. */
var isMobile = isIOS || isAndroid || isWindows && isTouchable;

/** Variable true if the browser is Safari based on User Agent. */
var isSafari = /safari/i.test(ua) && /apple computer/.test(vendor);

/** Variable true if the device is a Windows Phone based on User Agent. */
var isWindowsPhone = isWindows && /phone/i.test(ua);

/** Variable true if the device is a Windows Tablet based on User Agent. */
var isWindowsTablet = isWindows && !isWindowsPhone && isTouchable;

/** Variable true if the device is a tablet based on User Agent. */
var isTablet = isIPad || isAndroidTablet || isWindowsTablet;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Browser prefix for styling. */
var prefix = ([].concat(toConsumableArray(window.getComputedStyle(document.documentElement, ''))).join('').match(/-(moz|webkit|ms)-/) || window.styles.OLink === '' && ['', 'o'])[1];

var property = prefix + 'Transform';
document.documentElement.style[property] = 'matrix3D(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';

/** Variable true if the browser supports 3D css transformations. */
var support3D = !!document.documentElement.style[property];

document.documentElement.style[property] = '';

/**
* Iterates over items and apply callback on each one.
* @param {string | Array | NodeList | HTMLCollection} items - The iterable.
* @param {forEachCallback} callback - The callback to call for each iteratee.
* @param {bool} [forceOrder=false] - Respect items order.
* @return {string | Array | NodeList | HTMLCollection} items for chaining.
* @example //esnext
* import { forEach } from 'chirashi'
*
* const items = forEach([0, 1, 2], (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0, 1, 2]
* // logs:
* //   2: 3
* //   1: 2
* //   0: 1
* forEach(items, (item, i) => console.log(`${i}: ${item + 1}`), true) //returns: [0, 1, 2]
* // logs:
* //   0: 1
* //   1: 2
* //   2: 3
* @example //es5
* var items = Chirashi.forEach([0, 1, 2], function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0, 1, 2]
* // logs:
* //   2: 3
* //   1: 2
* //   0: 1
* Chirashi.forEach(items, function (item, i) { console.log(i+': '+(item + 1)) }, true) //returns: [0, 1, 2]
* // logs:
* //   0: 1
* //   1: 2
* //   2: 3
*/
function forEach(items, callback) {
  var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if (!items) return;

  if (!(items instanceof Array || items instanceof window.NodeList || items instanceof window.HTMLCollection)) {
    callback(items, 0);
  } else {
    if (!forceOrder) {
      var i = items.length;
      while (i--) {
        callback(items[i], i);
      }
    } else {
      var _i = -1;
      var len = items.length;
      while (++_i < len) {
        callback(items[_i], _i);
      }
    }
  }

  return items;
}

/**
* Callback to apply on item.
* @callback forEachCallback
* @param {*} item
* @param {number} index - Index of item in items.
*/

/**
 * Test if element is a dom element. Doesn't resolve selectors.
 * @param {*} element - The element to test.
 * @return {bool} isDomElement - true if element is HTMLElement, SVGElement, window, document or Text.
 * @example //esnext
 * import { createElement, append, isDomElement } from 'chirashi'
 * const sushi = createElement('.sushi')
 * append(document.body, sushi)
 * isDomElement(window) //returns: true
 * isDomElement(sushi) //returns: true
 * isDomElement('.sushi') //returns: false
 * @example //es5
 * var sushi = Chirashi.createElement('.sushi')
 * Chirashi.append(document.body, sushi)
 * Chirashi.isDomElement(window) //returns: true
 * Chirashi.isDomElement(sushi) //returns: true
 * Chirashi.isDomElement('.sushi') //returns: false
 */
function isDomElement(element) {
  return element instanceof window.HTMLElement || element === window || element === document || element instanceof window.SVGElement || element instanceof window.Text;
}

var breakingMethods = ['push', 'splice', 'unshift'];

/**
* Get recursively dom element from iterable or selector.
* @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} input - The iterable, selector or elements.
* @return {Array} domElements - The array of dom elements from elements.
* @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
* @example //esnext
* import { createElement, append, getElements } from 'chirashi'
* const sushi = createElement('.sushi')
* const unagi = createElement('.unagi')
* const yakitori = createElement('.yakitori')
* const sashimi = createElement('.sashimi')
* append(document.body, [sushi, unagi, yakitori, sashimi])
* getElements('div') //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
* getElements('.yakitori, .sashimi') //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
* getElements([sushi, unagi, '.sashimi', '.wasabi']) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="sashimi"></div>]
* getElements('.wasabi') //returns: []
* @example //es5
* var sushi = Chirashi.createElement('.sushi')
* var unagi = Chirashi.createElement('.unagi')
* var yakitori = Chirashi.createElement('.yakitori')
* var sashimi = Chirashi.createElement('.sashimi')
* Chirashi.append(document.body, [sushi, unagi, yakitori, sashimi])
* Chirashi.getElements('div') //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
* Chirashi.getElements('.yakitori, .sashimi') //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
* Chirashi.getElements([sushi, unagi, '.sashimi', '.wasabi']) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="sashimi"></div>]
* Chirashi.getElements('.wasabi') //returns: []
*/
function getElements(input) {
  if (input['_chrsh-valid']) return input;

  var output = void 0;

  if (typeof input === 'string') {
    output = [].concat(toConsumableArray(document.querySelectorAll(input)));
  } else if (input instanceof Array) {
    (function () {
      var parsedElements = [];
      forEach(input, function (element) {
        parsedElements.push.apply(parsedElements, toConsumableArray(getElements(element)));
      });

      output = parsedElements;
    })();
  } else if (input instanceof window.NodeList) {
    output = [].concat(toConsumableArray(input));
  } else {
    output = isDomElement(input) ? [input] : [];
  }

  if (!('_chrsh-valid' in output)) {
    output.chrshPush = function (input) {
      return this.push.apply(this, toConsumableArray(getElements(input)));
    };

    forEach(breakingMethods, function (method) {
      output[method] = function () {
        this['_chrsh-valid'] = false;

        return Array.prototype[method].apply(this, arguments);
      };
    });
  }

  output['_chrsh-valid'] = true;

  return output;
}

/**
 * Iterates over dom elements and apply callback on each one.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {forElementsCallback} callback - The function to call for each element.
 * @param {bool} [forceOrder=false] - Respect elements order.
 * @return {Array} domElements - The array of dom elements from elements.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
 * @example //esnext
 * import { createElement, append, forElements } from 'chirashi'
 * const sushi = createElement('.sushi')
 * const unagi = createElement('.unagi')
 * const yakitori = createElement('.yakitori')
 * const sashimi = createElement('.sashimi')
 * append(document.body, [sushi, unagi, yakitori, sashimi])
 * forElements('div', console.log) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="sashimi"></div> 3
 * // <div class="yakitori"></div> 2
 * // <div class="unagi"></div> 1
 * // <div class="sushi"></div> 0
 * forElements([yakitori, sashimi], console.log, true) //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="yakitori"></div> 0
 * // <div class="sashimi"></div> 1
 * @example //es5
 * var sushi = Chirashi.createElement('.sushi')
 * var unagi = Chirashi.createElement('.unagi')
 * var yakitori = Chirashi.createElement('.yakitori')
 * var sashimi = Chirashi.createElement('.sashimi')
 * Chirashi.append(document.body, [sushi, unagi, yakitori, sashimi])
 * Chirashi.forElements('div', console.log) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="sashimi"></div> 3
 * // <div class="yakitori"></div> 2
 * // <div class="unagi"></div> 1
 * // <div class="sushi"></div> 0
 * Chirashi.forElements([yakitori, sashimi], console.log, true) //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="yakitori"></div> 0
 * // <div class="sashimi"></div> 1
 */
function forElements(elements, callback) {
  var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  return forEach(getElements(elements), callback, forceOrder);
}

/**
 * Callback to apply on element.
 * @callback forElementsCallback
 * @param {window | document | HTMLElement | SVGElement | Text} element
 * @param {number} index - Index of element in elements.
 */

/**
 * Iterates over object's keys and apply callback on each one.
 * @param {Object} object - The iterable.
 * @param {forInCallback} callback - The function to call for each key-value pair.
 * @param {bool} [forceOrder=false] - Respect keys order.
 * @return {Object} object - The iterable for chaining.
 * @example //esnext
 * import { forIn } from 'chirashi'
 * const californiaRoll = { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * forIn(californiaRoll, (key, value) => {
 *   console.log(`${key} -> ${value}`)
 * }) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * //logs:
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * // price -> 4.25
 * // name -> California Roll
 * forIn(californiaRoll, (key, value) => {
 *   console.log(`${key} -> ${value}`)
 * }, true) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * //logs:
 * // name -> California Roll
 * // price -> 4.25
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * @example //es5
 * var californiaRoll = { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * Chirashi.forIn(californiaRoll, (key, value) => {
 *   console.log(key + ' -> ' + value)
 * }) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * //logs:
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * // price -> 4.25
 * // name -> California Roll
 * Chirashi.forIn(californiaRoll, (key, value) => {
 *   console.log(key + ' -> ' + value)
 * }, true) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * //logs:
 * // name -> California Roll
 * // price -> 4.25
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 */
function forIn(object, callback) {
  var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return;

  forEach(Object.keys(object), function (key) {
    return callback(key, object[key]);
  }, forceOrder);

  return object;
}

/**
 * Callback to apply on each key-value pair.
 * @callback forInCallback
 * @param {string} key
 * @param {*} value
 */

/**
 * Get first dom element from iterable or selector.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} input - The iterable, selector or elements.
 * @return {window | document | HTMLElement | SVGElement | Text} element - The dom element from input.
 * @example //esnext
 * import { createElement, append, getElement } from 'chirashi'
 * const sushi = createElement('.sushi')
 * const unagi = createElement('.unagi')
 * const yakitori = createElement('.yakitori')
 * const sashimi = createElement('.sashimi')
 * append(document.body, [sushi, unagi, yakitori, sashimi])
 * getElement('div') //returns: <div class="sushi"></div>
 * getElement('.yakitori, .sashimi') //returns: <div class="yakitori"></div>
 * getElement([sushi, unagi, '.sashimi', '.unknown']) //returns: <div class="sushi"></div>
 * getElement('.wasabi') //returns: null
 * @example //es5
 * var sushi = Chirashi.createElement('.sushi')
 * var unagi = Chirashi.createElement('.unagi')
 * var yakitori = Chirashi.createElement('.yakitori')
 * var sashimi = Chirashi.createElement('.sashimi')
 * Chirashi.append(document.body, [sushi, unagi, yakitori, sashimi])
 * Chirashi.getElement('div') //returns: <div class="sushi"></div>
 * Chirashi.getElement('.yakitori, .sashimi') //returns: <div class="yakitori"></div>
 * Chirashi.getElement([sushi, unagi, '.sashimi', '.unknown']) //returns: <div class="sushi"></div>
 * Chirashi.getElement('.wasabi') //returns: null
 */
function getElement(input) {
  if (typeof input === 'string') return document.querySelector(input);

  if (input instanceof Array) return getElement(input[0]);

  return isDomElement(input) && input;
}

/**
 * Iterates over classes and add it on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string | Array} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, addClass } from 'chirashi'
 * const maki = createElement('div')
 * addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * addClass(maki, 'seaweed, cheese') //returns: <div class="wasabi cheese seaweed"></div>
 * addClass(maki, 'avocado salmon') //returns: <div class="wasabi cheese seaweed salmon avocado"></div>
 * addClass(maki, ['egg', 'tuna']) //returns: <div class="wasabi cheese seaweed salmon avocado tuna egg"></div>
 * @example //es5
 * var maki = Chirashi.createElement('div')
 * Chirashi.addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * Chirashi.addClass(maki, 'seaweed, cheese') //returns: <div class="wasabi cheese seaweed"></div>
 * Chirashi.addClass(maki, 'avocado salmon') //returns: <div class="wasabi cheese seaweed salmon avocado"></div>
 * Chirashi.addClass(maki, ['egg', 'tuna']) //returns: <div class="wasabi cheese seaweed salmon avocado tuna egg"></div>
 */
function addClass(elements, classes) {
  if (typeof classes === 'string') classes = classes.split(/[,\s]+/g);

  return forElements(elements, function (element) {
    var _element$classList;

    if (!element.classList) return;

    (_element$classList = element.classList).add.apply(_element$classList, toConsumableArray(classes));
  });
}

/**
 * Iterates over attributes as key value pairs and apply on each element of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {object} - The attributes key value pairs.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, setAttr } from 'chirashi'
 * const maki = createElement('.maki')
 * setAttr(maki, {
 *   dataFish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.setAttr(maki, {
 *   dataFish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 */
function setAttr(elements, attributes) {
  forIn(attributes, function (name, value) {
    if (value instanceof Array) {
      attributes[name] = value.join(' ');
    } else if (typeof value !== 'string') {
      attributes[name] = JSON.stringify(value);
    }
  });

  return forElements(elements, function (element) {
    if (!element.setAttribute) return;

    forIn(attributes, element.setAttribute.bind(element));
  });
}

/**
 * Creates a dom element from an HTML string, tag or css selector.
 * @param {string} string - The html string, tag or css selector.
 * @param {object} [attributes={}] - Object associating attribute name to value.
 * @return {HTMLElement | SVGElement} element - The dom element created from the string.
 * @example //esnext
 * import { createElement } from 'chirashi'
 * const maki = createElement('.maki')
 * const cheese = createElement('.cheese')
 * append(maki, cheese)
 * append(document.body, maki)
 * let level = {}
 * closest(cheese, maki, level) //returns: <div class="maki"></div>
 * console.log(level.value) //logs: 1
 * closest('.cheese', '.sushi') //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * var cheese = Chirashi.createElement('.cheese')
 * Chirashi.append(maki, cheese)
 * Chirashi.append(document.body, maki)
 * var level = {}
 * Chirashi.closest(cheese, '.maki', level) //returns: <div class="maki"></div>
 * console.log(level.value) //logs: 1
 * Chirashi.closest('.cheese', '.sushi') //returns: false
 */
function createElement(string) {
  var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (string.indexOf('<') === -1) {
    var core = null;

    forEach(string.match(/[#\.\[]?[a-zA-Z0-9-="'#]+[\]]?/g), function (segment) {
      if (segment.indexOf('.') === 0) {
        if (!('class' in attributes)) {
          attributes.class = segment.slice(1);
        } else if (attributes.class instanceof Array) {
          attributes.class = attributes.class.join(' ');
          attributes.class += ' ' + segment.slice(1);
        } else {
          attributes.class += ' ' + segment.slice(1);
        }
      } else if (segment.indexOf('#') === 0) {
        attributes.id = segment.slice(1);
      } else if (segment.indexOf('[') === 0) {
        segment = segment.replace(/[\[\]]/g, '').split('=');
        attributes[segment[0]] = segment.length > 1 ? segment[1].slice(1, -1) : '';
      } else {
        core = segment;
      }
    });

    if (core === null) core = 'div';

    string = '<' + core + '></' + core + '>';
  }

  var temp = document.createElement('div');
  temp.innerHTML = string;

  var element = temp.firstChild;

  setAttr(element, attributes);

  return element;
}

/**
 * Appends each node to element.
 * @param {string | HTMLElement | SVGElement} element - Selector or element.
 * @param {Array | string | HTMLElement | SVGElement | Text} nodes - Array of dom elements or string to create it using createElement.
 * @param {Array} [attributes=[]] - The array of attributes' object ( only used with node creation so length should match number of strings in nodes ).
 * @return {HTMLElement | SVGElement} element - The element for chaining.
 * @example //esnext
 * import { createElement, append } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 */
function append(element, nodes) {
  var attributes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  element = getElement(element);

  if (!element || !element.appendChild) return;

  var attributeIndex = 0;
  var attrLen = attributes.length;
  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      node = createElement(node, attributeIndex < attrLen && attributes[attributeIndex++] || {});
    }

    if (isDomElement(node)) element.appendChild(node);
  }, true);

  return element;
}

/**
 * Returns an array of element's children.
 * @param {string | HTMLElement | SVGElement} element - Selector or element.
 * @return {Array} children - element's clone.
 * @example //esnext
 * import { createElement, append, children } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon', '.avocado'])
 * children(maki) //returns: [<div class="salmon"></div>, <div class="avocado"></div>]
 * @example //es5
 * const maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon', '.avocado'])
 * Chirashi.children(maki) //returns: [<div class="salmon"></div>, <div class="avocado"></div>]
 */
function children(element) {
  element = getElement(element);

  return !!element && 'children' in element && [].concat(toConsumableArray(element.children));
}

/**
 * Clones element.
 * @param {string | HTMLElement | SVGElement} element - Selector or element.
 * @return {string | HTMLElement | SVGElement} clone - element's clone.
 * @example //esnext
 * import { createElement, append, clone } from 'chirashi'
 * const maki = createElement('.maki')
 * clone(maki) //returns: <div class="maki"></div>
 * const sushi = createElement('.sushi')
 * append(document.body, sushi)
 * clone('.sushi') //returns: <div class="sushi"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.clone(maki) //returns: <div class="maki"></div>
 * var sushi = Chirashi.createElement('.sushi')
 * Chirashi.append(document.body, sushi)
 * Chirashi.clone('.sushi') //returns: <div class="sushi"></div>
 */
function clone(element) {
  element = getElement(element);

  return !!element && element.cloneNode(true);
}

/**
 * Get closest element matching the tested selector or element traveling up the DOM tree from element to limit.
 * @param {string | HTMLElement | SVGElement | Text} element - Selector or element.
 * @param {string | HTMLElement | SVGElement | Text} tested - The selector or dom element to match.
 * @param {string | document | HTMLElement | SVGElement} [limit=document] - Returns false when this selector or element is reached.
 * @return {bool | HTMLElement | SVGElement | Text} matchedElement - The matched element or false.
 * @example //esnext
 * import { createElement, append, closest } from 'chirashi'
 * const maki = createElement('.maki')
 * const cheese = createElement('.cheese')
 * append(maki, cheese)
 * append(cheese, '.avocado')
 * append(document.body, maki)
 * closest('.avocado', '.maki') //returns: <div class="maki"></div>
 * closest('.avocado', '.maki', '.cheese') //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * var cheese = Chirashi.createElement('.cheese')
 * Chirashi.append(maki, cheese)
 * Chirashi.append(cheese, '.avocado')
 * Chirashi.append(document.body, maki)
 * Chirashi.closest('.avocado', '.maki') //returns: <div class="maki"></div>
 * Chirashi.closest('.avocado', '.maki', '.cheese') //returns: false
 */
function closest(element, tested) {
  var limit = arguments.length <= 2 || arguments[2] === undefined ? document : arguments[2];

  element = getElement(element);

  if (!element || (typeof limit === 'string' ? element.matches(limit) : element === limit)) {
    return false;
  }

  if (typeof tested === 'string' ? element.matches(tested) : element === tested) {
    return element;
  }

  return !!element.parentNode && closest(element.parentNode, tested, limit);
}

/**
 * Iterates over elements, returning an array of all elements matching tested selector.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {string | HTMLElement | SVGElement | Text} tested - The selector or dom element to match.
 * @return {Array} matching - The array of filtered elements.
 * @example //esnext
 * import { createElement, append, filter } from 'chirashi'
 * const salmonMaki = createElement('.salmon.maki')
 * const tunaMaki = createElement('.tuna.maki')
 * const salmonSushi = createElement('.salmon.sushi')
 * const tunaSushi = createElement('.tuna.sushi')
 * append(document.body, [salmonMaki, tunaMaki, salmonSushi, tunaSushi])
 * filter('div', '.salmon') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon"></div>]
 * filter([salmonMaki, tunaMaki, salmonSushi, tunaSushi], '.maki') //returns: [<div class="maki salmon"></div>, <div class="maki tuna"></div>]
 * filter('div', '.salmon') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon"></div>]
 * @example //es5
 * const salmonMaki = Chirashi.createElement('.salmon.maki')
 * const tunaMaki = Chirashi.createElement('.tuna.maki')
 * const salmonSushi = Chirashi.createElement('.salmon.sushi')
 * const tunaSushi = Chirashi.createElement('.tuna.sushi')
 * Chirashi.append(document.body, [salmonMaki, tunaMaki, salmonSushi, tunaSushi])
 * Chirashi.filter('div', '.salmon') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon"></div>]
 * Chirashi.filter([salmonMaki, tunaMaki, salmonSushi, tunaSushi], '.maki') //returns: [<div class="maki salmon"></div>, <div class="maki tuna"></div>]
 * Chirashi.filter('div', '.salmon') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon"></div>]
 */
function filter(elements, tested) {
  return getElements(elements).filter(function (element) {
    return typeof tested === 'string' && 'matches' in element && element.matches(tested) || element === tested;
  });
}

/**
 * Iterates over each element of elements and returns an array containing all elements' children matching a selector.
 * @param {string | Array | NodeList | HTMLCollection | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string} selector - The selector.
 * @return {Array} found - The elements' children matching the selector.
 * @example //esnext
 * import { createElement, append, find } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * const roll = createElement('.roll')
 * append(roll, '.tuna[data-fish][data-inside]')
 * append(document.body, [maki, roll])
 * find('div', '[data-fish]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="tuna" data-fish data-inside></div>]
 * find(maki, '[data-inside]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="avocado" data-inside></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * var roll = Chirashi.createElement('.roll')
 * Chirashi.append(roll, '.tuna[data-fish][data-inside]')
 * Chirashi.append(document.body, [maki, roll])
 * Chirashi.find('div', '[data-fish]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="tuna" data-fish data-inside></div>]
 * Chirashi.find(maki, '[data-inside]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="avocado" data-inside></div>]
 */
function find(elements, selector) {
  var found = [];

  forElements(elements, function (element) {
    found.push.apply(found, toConsumableArray(element.querySelectorAll(selector)));
  });

  return found;
}

/**
 * Find the first element's child matching the selector.
 * @param {string | Array | NodeList | HTMLCollection | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string} selector - The selector to match.
 * @return {HTMLElement | SVGElement} element - The first child of elements matching the selector.
 * @example //esnext
 * import { createElement, append, find } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * const roll = createElement('.roll')
 * append(roll, '.tuna[data-fish][data-inside]')
 * append(document.body, [maki, roll])
 * findOne('div', '[data-fish]') //returns: <div class="salmon" data-fish data-inside></div>
 * findOne(maki, '[data-inside]') //returns: <div class="salmon" data-fish data-inside></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * var roll = Chirashi.createElement('.roll')
 * Chirashi.append(roll, '.tuna[data-fish][data-inside]')
 * Chirashi.append(document.body, [maki, roll])
 * Chirashi.findOne('div', '[data-fish]') //returns: <div class="salmon" data-fish data-inside></div>
 * Chirashi.findOne(maki, '[data-inside]') //returns: <div class="salmon" data-fish data-inside></div>
 */
function findOne(element, selector) {
  element = getElement(element);

  return !!element && 'querySelector' in element ? element.querySelector(selector) : null;
}

/**
 * Get value for named attribute of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element.
 * @param {string} name - The attribute's name.
 * @return {string} value - The value for the attribute.
 * @example //esnext
 * import { createElement, getAttr } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getAttr(maki, 'data-fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getAttr(maki, 'data-fish') //returns: "salmon"
 */
function getAttr(element, name) {
  element = getElement(element);

  return !!element && 'getAttribute' in element ? element.getAttribute(name) : null;
}

/**
 * Alias on getAttr prefixing name with 'data-'.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element.
 * @param {string} name - The data-attribute's name.
 * @return {string} value - The value for the data-attribute.
 * @example //esnext
 * import { createElement, getData } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getData(maki, 'fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getData(maki, 'fish') //returns: "salmon"
 */
function getData(element, name) {
  return getAttr(element, 'data-' + name);
}

/**
 * Get the inner html of an element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element.
 * @return {string} innerHTML - The inner html of the element.
 * @example //esnext
 * import { createElement, setHtml, getHtml } from 'chirashi'
 * const maki = createElement('p.maki')
 * setHtml(maki, 'salmon')
 * getHtml(maki) //returns: "salmon"
 * @example //es5
 * var maki = createElement('p.maki')
 * setHtml(maki, 'salmon')
 * getHtml(maki) //returns: "salmon"
 */
function getHtml(element) {
  element = getElement(element);

  return element ? element.innerHTML : null;
}

/**
 * Get the value for the property name on the element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element.
 * @param {string} property - The name of the property.
 * @return {string} value - The value for the property.
 * @example //esnext
 * import { createElement, append, getProp } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon')
 * getProp(maki, 'firstChild') //returns: <div class="salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon')
 * Chirashi.getProp(maki, 'firstChild') //returns: <div class="salmon"></div>
 */
function getProp(element, property) {
  element = getElement(element);

  return !!element && element[property];
}

/**
 * Iterates over classes and test if element has each.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element.
 * @param {string | Array} classes - Array of classes, classes seperated by coma and/or spaces or single class.
 * @return {bool} hasClass - Is true if element has all classes.
 * @example //esnext
 * import { createElement, hasClass } from 'chirashi'
 * const maki = createElement('.salmon.cheese.maki')
 * hasClass(maki, 'salmon cheese') //returns: true
 * hasClass(maki, ['salmon', 'avocado']) //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.salmon.cheese.maki')
 * Chirashi.hasClass(maki, 'salmon cheese') //returns: true
 * Chirashi.hasClass(maki, ['salmon', 'avocado']) //returns: false
 */
function hasClass(element, classes) {
  element = getElement(element);
  if (!element || !element.classList) return;

  if (typeof classes === 'string') classes = classes.split(/[\s,]+/g);

  var i = classes.length;
  var found = void 0;
  while (i-- && (found = element.classList.contains(classes[i]))) {}

  return found;
}

/**
 * Returns index of element in parent's children.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @return {Number} index - The position of element in his parent's children.
 * @example //esnext
 * import { createElement, append, indexInParent } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * indexInParent('.cheese') //returns: 1
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.indexInParent('.cheese') //returns: 1
 */
function indexInParent(element) {
  element = getElement(element);

  if (!element) return null;

  var current = element;
  var i = 0;
  while (current = current.previousElementSibling) {
    ++i;
  }return i;
}

/**
 * Insert nodes after element in his parent.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @param {Array | string | HTMLElement | SVGElement | Text} nodes - Array of dom elements or string to create it using createElement.
 * @param {Array} [attributes=[]] - The array of attributes' object ( only used with node creation so length should match number of strings in nodes ).
 * @return {HTMLElement | SVGElement} element - The element for chaining.
 * @example //esnext
 * import { createElement, append, insertAfter } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }])
 * insertAfter('.salmon', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }])
 * Chirashi.insertAfter('.salmon', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 */
function insertAfter(element, nodes) {
  var attributes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  element = getElement(element);

  if (!element || !('parentNode' in element) || !('insertBefore' in element.parentNode)) return;

  var parent = element.parentNode;

  var attributeIndex = 0;
  var attrLen = attributes.length;
  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      node = createElement(node, attributeIndex < attrLen && attributes[attributeIndex++] || {});
    }

    if (isDomElement(node)) parent.insertBefore(node, element.nextElementSibling);
  }, true);

  return element;
}

/**
 * Insert nodes before element in his parent.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @param {Array | string | HTMLElement | SVGElement | Text} nodes - Array of dom elements or string to create it using createElement.
 * @param {Array} [attributes=[]] - The array of attributes' object ( only used with node creation so length should match number of strings in nodes ).
 * @return {HTMLElement | SVGElement} element - The element for chaining.
 * @example //esnext
 * import { createElement, append, insertBefore } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }])
 * insertBefore('.cheese', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }])
 * Chirashi.insertBefore('.cheese', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 */
function insertBefore(element, nodes) {
  var attributes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  element = getElement(element);

  if (!element || !('parentNode' in element) || !('insertBefore' in element.parentNode)) return;

  var parent = element.parentNode;

  var attributeIndex = 0;
  var attrLen = attributes.length;
  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      node = createElement(node, attributeIndex < attrLen && attributes[attributeIndex++] || {});
    }

    if (isDomElement(node)) parent.insertBefore(node, element);
  }, true);

  return element;
}

/**
 * Get the next sibling of element.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @return {HTMLElement | SVGElement | Text} nextElement - The element's next sibling.
 * @example //esnext
 * import { createElement, append, next } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * next(avocado) //returns: <div class="cheese" data-cheese="cream"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.next(avocado) //returns: <div class="cheese" data-cheese="cream"></div>
 */
function next(element) {
  element = getElement(element);
  if (!element) return;

  return element.nextElementSibling;
}

/**
 * Returns the parent node of the element.
 * @param {string | document | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @return {document | HTMLElement | SVGElement} parentElement - The parent node.
 * @example //esnext
 * import { createElement, append, parent } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * parent('.salmon') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * append(maki
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * Chirashi.parent('.salmon') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 */
function parent(element) {
  element = getElement(element);

  return !!element && element.parentNode;
}

/**
 * Get the previous sibling of element.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @return {HTMLElement | SVGElement | Text} previousElement - The element's previous sibling.
 * @example //esnext
 * import { createElement, append, prev } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * prev(avocado) //returns: <div class="salmon" data-fish="salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.prev(avocado) //returns: <div class="salmon" data-fish="salmon"></div>
 */
function prev(element) {
  element = getElement(element);

  return !!element && element.previousElementSibling;
}

/**
 * Iterates over elements and removes it from DOM.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @return {Array} elements - The removed elements.
 * @example //esnext
 * import { createElement, append, remove } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * remove('.cheese') //returns: [<div class="cheese" data-cheese="cream"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.remove('.cheese') //returns: [<div class="cheese" data-cheese="cream"></div>]
 */
function remove(elements) {
  return forElements(elements, function (element) {
    if (!element.parentNode) return;

    element.parentNode.removeChild(element);
  });
}

/**
 * Iterates over classes and remove it from each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {string | Array} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, removeClass } from 'chirashi'
 * const maki = createElement('.salmon.cheese.maki') //returns: <div class="maki cheese salmon"></div>
 * removeClass(maki, 'cheese') //returns: [<div class="maki salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.salmon.cheese.maki') //returns: <div class="maki cheese salmon"></div>
 * Chirashi.removeClass(maki, 'cheese') //returns: [<div class="maki salmon"></div>]
 */
function removeClass(elements, classes) {
  if (typeof classes === 'string') classes = classes.split(/[,\s]+/g);

  return forElements(elements, function (element) {
    var _element$classList;

    if (!element.classList) return;

    (_element$classList = element.classList).remove.apply(_element$classList, toConsumableArray(classes));
  });
}

/**
 * Iterates over data-attributes as key value pairs and apply on each element of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {object} - The data-attributes key value pairs.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, setData } from 'chirashi'
 * const maki = createElement('.maki')
 * setData(maki, {
 *   fish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.setData(maki, {
 *   fish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 */
function setData(elements, dataAttributes) {
  var attributes = {};
  forIn(dataAttributes, function (name, value) {
    attributes['data-' + name] = value;
  });

  setAttr(elements, attributes);
}

/**
 * Set the inner html of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @return {string} htmlString - The html to insert.
 * @example //esnext
 * @example //esnext
* import { createElement, setHtml, getHtml } from 'chirashi'
* const maki = createElement('p.maki')
* setHtml(maki, 'salmon') //returns: [<p class="maki">salmon</p>]
* getHtml(maki) //returns: "salmon"
* @example //es5
* var maki = createElement('p.maki')
* setHtml(maki, 'salmon') //returns: [<p class="maki">salmon</p>]
* getHtml(maki) //returns: "salmon"
 */
function setHtml(elements, string) {
  return forElements(elements, function (element) {
    element.innerHTML = string;
  });
}

/**
 * Apply props as key value pairs on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {object} - The props key value pairs.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, setAttr } from 'chirashi'
 * const maki = createElement('.maki')
 * setAttr(maki, {
 *   dataFish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.setAttr(maki, {
 *   dataFish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 */
function setProp(elements, props) {
  return forElements(elements, function (element) {
    return Object.assign(element, props);
  });
}

/**
 * Iterates over classes and toggle it on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {string | Array} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, toggleClass } from 'chirashi'
 * const maki = createElement('.wasabi.salmon.maki') //returns: <div class="maki salmon wasabi"></div>
 * const sushi = createElement('.salmon.sushi') //returns: <div class="sushi salmon"></div>
 * toggleClass([maki, sushi], 'wasabi') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon wasabi"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.wasabi.salmon.maki') //returns: <div class="wasabi salmon maki"></div>
 * var sushi = Chirashi.createElement('.salmon.sushi') //returns: <div class="salmon sushi"></div>
 * Chirashi.toggleClass([maki, sushi], 'wasabi') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon wasabi"></div>]
 */
function toggleClass(elements, classes) {
  if (typeof classes === 'string') classes = classes.split(/[,\s]+/g);

  return forElements(elements, function (element) {
    var _element$classList;

    if (!element.classList) return;

    (_element$classList = element.classList).toggle.apply(_element$classList, toConsumableArray(classes));
  });
}

/**
 * Bind events listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string | Array} events - Array of events to listen or string of events seperated with comma and/or spaces.
 * @param {eventCallback} callback - The callback used for event binding.
 * @return {Array} elements - The iterable for chaining.
 */
function on(elements, input) {
  return forElements(elements, function (element) {
    if (!element.addEventListener) return;

    forIn(input, function (events, callback) {
      forEach(events.split(/[,\s]+/g), function (event) {
        return element.addEventListener(event, callback);
      });
    });
  });
}

/**
* Callback to execute on event.
* @callback eventCallback
* @param {object} event - Triggered event.
*/

/**
 * Bind events listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string | Array} events - Array of events to listen or string of events seperated with comma and/or spaces.
 * @param {eventCallback} callback - The callback used for event binding.
 * @return {Array} elements - The iterable for chaining.
 */
function off(elements, input) {
  return forElements(elements, function (element) {
    if (!element.addEventListener) return;

    forIn(input, function (events, callback) {
      forEach(events.split(/[,\s]+/g), function (event) {
        return element.removeEventListener(event, callback);
      });
    });
  });
}

/**
* Callback to execute on event.
* @callback eventCallback
* @param {object} event - Triggered event.
*/

/**
 * Bind events listener on delegate and execute callback when target matches selector (targets doesn't have to be in the DOM at binding).
 * @param {string} selector - The selector to match.
 * @param {string | Array} events - Array of events to listen or string of events seperated with comma and/or spaces.
 * @param {bindCallback} callback - The callback to execute when one event is triggered.
 * @return {Object} object - An object with unbind method for unbinding.
 * @return {function} object.unbind - The unbind method.
 * @example //esnext
 * import { createElement, bind, trigger } from 'chirashi'
 * const listener = bind('.cheese, .wasabi', 'click', (e, target) => {
 *   console.log('clicked', target)
 * })
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.unbind()
 * @example //es5
 * var listener = Chirashi.bind('.cheese, .wasabi', 'click', (e, target) => {
 *   console.log('clicked', target)
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.unbind()
 */
function bind(selector, input) {
  var delegate = arguments.length <= 2 || arguments[2] === undefined ? document.body : arguments[2];

  var eventsObj = {};
  forIn(input, function (events, callback) {
    eventsObj[events] = function (event) {
      var target = closest(event.target, selector, delegate);
      if (target) callback(event, target);
    };
  });

  on(delegate, eventsObj);

  return {
    unbind: function unbind() {
      off(delegate, eventsObj);
    }
  };
}

/**
* Callback to execute on event.
* @callback bindCallback
* @param {object} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/

/**
 * Bind drag listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {function} move - The move callback
 * @param {function} begin - The begin callback
 * @param {function} end - The end callback
 * @return {object} offObject - An object with off method for unbinding
 * @return {object.off} off - off method
 */
function drag(elements, _move, _begin, _end) {
  var undragProperties = [];

  forElements(elements, function (element) {
    var dragging = false;

    var undragProperty = {
      element: element,

      begin: function begin(e) {
        e.preventDefault();
        e.stopPropagation();

        if ('touches' in e && e.touches.length) e = e.touches[0];

        dragging = true;

        if (_begin) _begin({ x: e.pageX, y: e.pageY });
      },
      move: function move(e) {
        if (!dragging) return;

        e.preventDefault();
        e.stopPropagation();

        if ('touches' in e && e.touches.length) e = e.touches[0];

        if (_move) _move({ x: e.pageX, y: e.pageY });
      },
      end: function end(e) {
        if (!dragging) return;

        e.preventDefault();
        e.stopPropagation();

        if ('touches' in e && e.touches.length) e = e.touches[0];

        dragging = false;

        if (_end) _end({ x: e.pageX, y: e.pageY });
      }
    };

    on(element, 'touchstart mousedown', undragProperty.begin);
    on(document.body, 'touchmove mousemove', undragProperty.move);
    on(document.body, 'touchend mouseup', undragProperty.end);

    undragProperties.push(undragProperty);
  });

  return {
    off: function off$$() {
      forEach(undragProperties, function (undragProperty) {
        off(undragProperty.element, 'touchstart, mousedown', undragProperty.begin);
        off(document.body, 'touchmove, mousemove', undragProperty.move);
        off(document.body, 'touchend, mouseup', undragProperty.end);
      });
    }
  };
}

/**
 * Bind hover listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {bindCallback} callback - The callback to execute when one event is triggered.
 * @param {function} enter - The enter callback.
 * @param {function} leave - The leave callback.
 * @return {Object} object - An object with off method for unbinding.
 * @return {function} object.off - The off method.
 */
function hover(elements, enter, leave) {
  var events = {
    mouseenter: enter,
    mouseleave: leave
  };

  on(elements, events);

  return {
    off: function off$$() {
      off(elements, events);
    }
  };
}

/**
* Callback to execute on event.
* @callback bindCallback
* @param {object} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/

/**
 * Bind hover listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {function} eachCallback - The callback on each load event
 * @param {function} allCallback - The callback when all elements have been loaded
 * @param {bool} [once] = true - Trigger only once for each media if true
 * @param {bool} [testSrc] = true - If true callback will be called with error when an element doesn't have src
 * @return {object} offObject - An object with off method for unbinding
 * @return {object.off} off - off method
 */
function load(elements, eachCallback, allCallback) {
  var once = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
  var testSrc = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

  elements = getElements(elements);

  if (!elements || elements.length === 0) {
    if (allCallback) allCallback();

    return;
  }

  var n = {
    value: elements.length
  };

  var callback = function callback(event, element, error) {
    if (event) {
      element = event.target;
      if (event.type === 'error') error = event;
    }

    if (once) off(element, 'load loadedmetadata error', callback);

    if (eachCallback) eachCallback(element, error);

    if (! --n.value && allCallback) allCallback();
  };

  forEach(elements, function (element) {
    if (testSrc && !element.src) {
      callback(null, element, 'image without src');
    } else if (element.naturalWidth || element.loadedmetadata) {
      callback(null, element, null);
    } else {
      on(element, 'load loadedmetadata error', callback);
    }
  });

  return {
    off: function off$$() {
      forEach(elements, function (element) {
        return off(element, 'load loadedmetadata error', callback);
      });
    }
  };
}

/**
 * Bind events listener on each element of elements and unbind after first triggered.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be bound seperated with spaces
 * @param {function} callback - The callback used for event binding
 * @return {object} offObject - An object with off method for unbinding
 * @return {object.off} off - off method
 */
function once(elements, events, callback) {
  var innerCallback = function innerCallback(event) {
    callback(event);

    off(elements, events, innerCallback);
  };

  on(elements, events, innerCallback);

  return {
    cancel: function cancel() {
      off(elements, events, innerCallback);
    }
  };
}

/**
 * Execute callback when dom is ready.
 * @param {function} callback - The callback
 */
function ready(callback) {
  on(document, {
    'DOMContentLoaded': callback
  });
}

var defaults$1 = {
  bubbles: true,
  cancelable: true
};

/**
 * Trigger events on elements with data
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be tiggered seperated with spaces
 * @param {object} data - The events' data
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function trigger(elements, events) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  elements = getElements(elements);

  if (!elements.length) return;

  options = _extends({}, options, defaults$1);

  if (typeof events === 'string') events = events.split(/[,\s]+/g);

  forEach(events, function (event) {
    event = new window.CustomEvent(event, options);

    forEach(elements, function (element) {
      if (!element.dispatchEvent) return;

      element.dispatchEvent(event);
    });
  });

  return elements;
}

/**
 * Get height in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} height - The height in pixels
 */
function getHeight(element) {
  var inner = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  element = getElement(element);

  return !!element && (inner ? element.clientHeight : element.offsetHeight);
}

/**
 * Get width in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} width - The width in pixels
 */
function getWidth(element) {
  var inner = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  element = getElement(element);

  return !!element && (inner ? element.clientWidth : element.offsetWidth);
}

/**
 * Get size in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} size - The size in pixels
 */
function getSize(element) {
  var inner = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  return !!element && {
    width: getWidth(element, inner),
    height: getHeight(element, inner)
  };
}

/**
 * Get style property of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} value - The value for the property
 */
function getStyle(element, property) {
  element = getElement(element);
  if (!element) return;

  var ret = window.getComputedStyle(element)[property];

  return ret.indexOf('px') === -1 ? ret : +ret;
}

var unitless = ['zIndex', 'z-index', 'zoom', 'font-weight', 'lineHeight', 'line-height', 'counterReset', 'counter-reset', 'counterIncrement', 'counter-increment', 'volume', 'stress', 'pitchRange', 'pitch-range', 'richness', 'opacity'];

/**
* Set the provided style to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} style - The style options as object linking value to property
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
function setStyle(elements, style) {
  forIn(style, function (prop, value) {
    if (unitless.indexOf(prop) === -1 && typeof value === 'number') {
      style[prop] += 'px';
    }
  });

  return forElements(elements, function (element) {
    if (!element.style) return;

    Object.assign(element.style, style);
  });
}

/**
 * Hide each element of elements using visibility.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @return {string | Array | NodeList | HTMLCollection} elements for chaining
 */
function hide(elements) {
  return setStyle(elements, { visibility: 'hidden' });
}

function _applyPropertyToMatrix(property, value, matrix) {
  switch (property) {
    case 'x':
      matrix[4] += value;
      break;

    case 'y':
      matrix[5] += value;
      break;

    case 'rotate':
      var cosValue = Math.cos(value);
      var sinValue = Math.sin(value);

      matrix[0] *= cosValue;
      matrix[1] += sinValue;
      matrix[2] -= sinValue;
      matrix[3] *= cosValue;
      break;

    case 'scale':
      matrix[0] *= value;
      matrix[2] *= value;
      break;

    case 'scaleX':
      matrix[0] *= value;
      break;

    case 'scaleY':
      matrix[3] *= value;
      break;

    case 'skew':
      var tanValue = Math.tan(value);

      matrix[2] += tanValue;
      matrix[1] += tanValue;
      break;

    case 'skewX':
      matrix[2] += Math.tan(value);
      break;

    case 'skewY':
      matrix[1] += Math.tan(value);
      break;
  }
}

/**
 * Convert a transformation as object to a 2D matrix as object
 * @param {object} transformation - The transformation object
 * @return {Array} matrix - The 2D matrix
 */
function transformTo2DMatrix(transformation) {
  var matrix = [1, 0, 0, 1, 0, 0];

  forIn(transformation, function (prop, value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      forIn(value, function (subProp, subValue) {
        _applyPropertyToMatrix(prop + subProp.toUpperCase(), subValue, matrix);
      });
    } else {
      _applyPropertyToMatrix(prop, value, matrix);
    }
  });

  return matrix;
}

/**
* Apply the provided transformation as a 2D matrix on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.rotate} rotate - rotate option
* @param {object.rotate.x} x - rotateX option
* @param {object.rotate.y} y - rotateY option
* @param {object.rotateX} rotateX - rotateX option
* @param {object.rotateY} rotateY - rotateY option
* @param {object.rotate} rotate - rotate option
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.skew} skew - skew option
* @param {object.skew.x} x - skewX option
* @param {object.skew.y} y - skewY option
* @param {object.skewX} skewX - skewX option
* @param {object.skewY} skewY - skewY option
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function matrix2D(elements, transformation) {
  var matrix = transformTo2DMatrix(transformation);

  matrix = 'matrix(' + matrix.join(',') + ')';

  return forElements(elements, function (element) {
    if (!element.style) return;

    element.style[prefix + 'transform'] = matrix;
  });
}

function _applyPropertyToMatrix$1(property, value, matrix) {
  switch (property) {
    case 'x':
      matrix[12] += value;
      break;

    case 'y':
      matrix[13] += value;
      break;

    case 'z':
      matrix[14] += value;
      break;

    case 'rotate':
      var cosValue = Math.cos(value);
      var sinValue = Math.sin(value);

      matrix[0] *= cosValue;
      matrix[1] += sinValue;
      matrix[4] -= sinValue;
      matrix[5] *= cosValue;
      break;

    case 'rotateX':
      var cosValue2 = Math.cos(value);
      var sinValue2 = Math.sin(value);

      matrix[5] *= cosValue2;
      matrix[6] += sinValue2;
      matrix[9] -= sinValue2;
      matrix[10] *= cosValue2;
      break;

    case 'rotateY':
      var cosValue3 = Math.cos(value);
      var sinValue3 = Math.sin(value);

      matrix[0] *= cosValue3;
      matrix[2] -= sinValue3;
      matrix[8] += sinValue3;
      matrix[10] *= cosValue3;
      break;

    case 'rotateZ':
      var cosValue4 = Math.cos(value);
      var sinValue4 = Math.sin(value);

      matrix[0] *= cosValue4;
      matrix[1] += sinValue4;
      matrix[4] -= sinValue4;
      matrix[5] *= cosValue4;
      break;

    case 'scale':
      matrix[0] *= value;
      matrix[5] *= value;
      break;

    case 'scaleX':
      matrix[0] *= value;
      break;

    case 'scaleY':
      matrix[5] *= value;
      break;

    case 'scaleZ':
      matrix[10] *= value;
      break;

    case 'skew':
      var tanValue = Math.tan(value);

      matrix[4] += tanValue;
      matrix[1] += tanValue;
      break;

    case 'skewX':
      matrix[4] += Math.tan(value);
      break;

    case 'skewY':
      matrix[1] += Math.tan(value);
      break;
  }
}

/**
 * Convert a transformation as object to a 3D matrix as object
 * @param {object} transformation - The transformation object
 * @return {Array} matrix - The 3D matrix
 */
function transformTo3DMatrix(transformation) {
  var matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  forIn(transformation, function (prop, value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      forIn(value, function (subProp, subValue) {
        _applyPropertyToMatrix$1(prop + subProp.toUpperCase(), subValue, matrix);
      });
    } else {
      _applyPropertyToMatrix$1(prop, value, matrix);
    }
  });

  return matrix;
}

/**
* Apply the provided transformation as a 3D matrix on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.z} z - translateZ option
* @param {object.rotate} rotate - rotate option
* @param {object.rotate.x} x - rotateX option
* @param {object.rotate.y} y - rotateY option
* @param {object.rotate.z} z - rotateZ option
* @param {object.rotateX} rotateX - rotateX option
* @param {object.rotateY} rotateY - rotateY option
* @param {object.rotateZ} rotateZ - rotateZ option
* @param {object.rotate} rotate - rotate option
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scale.z} z - scaleZ option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.scaleZ} scaleZ - scaleZ option
* @param {object.skew} skew - skew option
* @param {object.skew.x} x - skewX option
* @param {object.skew.y} y - skewY option
* @param {object.skewX} skewX - skewX option
* @param {object.skewY} skewY - skewY option
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function matrix3D(elements, transformation) {
  var matrix = transformTo3DMatrix(transformation);

  matrix = 'matrix3D(' + matrix.join(',') + ')';

  return forElements(elements, function (element) {
    if (!element.style) return;

    element.style[prefix + 'transform'] = matrix;
  });
}

/**
* Apply the provided transformation as a matrix (3D if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.z} z - translateZ option
* @param {object.rotate} rotate - rotate option
* @param {object.rotate.x} x - rotateX option
* @param {object.rotate.y} y - rotateY option
* @param {object.rotate.z} z - rotateZ option
* @param {object.rotateX} rotateX - rotateX option
* @param {object.rotateY} rotateY - rotateY option
* @param {object.rotateZ} rotateZ - rotateZ option
* @param {object.rotate} rotate - rotate option
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scale.z} z - scaleZ option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.scaleZ} scaleZ - scaleZ option
* @param {object.skew} skew - skew option
* @param {object.skew.x} x - skewX option
* @param {object.skew.y} y - skewY option
* @param {object.skewX} skewX - skewX option
* @param {object.skewY} skewY - skewY option
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function matrix(elements, transformation) {
  return support3D ? matrix3D(elements, transformation) : matrix2D(elements, transformation);
}

/**
* Return the top and left offset of an element. Offset is relative to web page
* @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
* @return {object} offset
* @return {object.top} top offset
* @return {object.left} left offset
*/
function offset(element) {
  element = getElement(element);
  if (!element) return false;

  var rect = element.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  };
}

/**
* Return the top and left position of an element. Position is relative to parent
* @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
* @return {object} position
*/
function position(element) {
  element = getElement(element);

  return !!element && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}

/**
* Apply the provided scale transformation on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function scale2D(elements, transformation, keep) {
  var scaleX = void 0;
  if ('scaleX' in transformation) {
    scaleX = transformation.scaleX;
  } else if ('scale' in transformation) {
    if ('x' in transformation.scale) {
      scaleX = transformation.scale.x;
    } else {
      scaleX = transformation.scale;
    }
  } else {
    scaleX = 1;
  }

  var scaleY = void 0;
  if ('scaleY' in transformation) {
    scaleY = transformation.scaleY;
  } else if ('scale' in transformation) {
    if ('y' in transformation.scale) {
      scaleY = transformation.scale.y;
    } else {
      scaleY = transformation.scale;
    }
  } else {
    scaleY = 1;
  }

  var style = 'scale(' + scaleX + ',' + scaleY + ')';

  return forElements(elements, function (element) {
    if (!element.style) return;

    if (keep) {
      element.style[prefix + 'transform'] += ' ' + style;
    } else {
      element.style[prefix + 'transform'] = style;
    }
  });
}

/**
* Apply the provided 3D scale transformation on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scale.z} z - scaleZ option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.scaleZ} scaleZ - scaleZ option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function scale3D(elements, transformation, keep) {
  var scaleX = void 0;
  if ('scaleX' in transformation) {
    scaleX = transformation.scaleX;
  } else if ('scale' in transformation) {
    if ('x' in transformation.scale) {
      scaleX = transformation.scale.x;
    } else {
      scaleX = transformation.scale;
    }
  } else {
    scaleX = 1;
  }

  var scaleY = void 0;
  if ('scaleY' in transformation) {
    scaleY = transformation.scaleY;
  } else if ('scale' in transformation) {
    if ('y' in transformation.scale) {
      scaleY = transformation.scale.y;
    } else {
      scaleY = transformation.scale;
    }
  } else {
    scaleY = 1;
  }

  var scaleZ = void 0;
  if ('scaleZ' in transformation) {
    scaleZ = transformation.scaleZ;
  } else if ('scale' in transformation && 'z' in transformation.scale) {
    scaleZ = transformation.scale.z;
  } else {
    scaleZ = 1;
  }

  var style = 'scale3D(' + scaleX + ',' + scaleY + ',' + scaleZ + ')';

  return forElements(elements, function (element) {
    if (!element.style) return;

    if (keep) {
      element.style[prefix + 'transform'] += ' ' + style;
    } else {
      element.style[prefix + 'transform'] = style;
    }
  });
}

/**
* Apply the provided scale transformation (3D if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scale.z} z - scaleZ option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.scaleZ} scaleZ - scaleZ option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function scale(elements, transformation, keep) {
  return support3D ? scale3D(elements, transformation, keep) : scale2D(elements, transformation, keep);
}

/**
* Return the screen relative position of an element
* @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
* @return {object} screenPosition
*/
function screenPosition(element) {
  element = getElement(element);

  return !!element && element.getBoundingClientRect();
}

/**
* Set the provided height to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {number} height - The height
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
function setHeight(elements, height) {
  return setStyle(elements, { height: height });
}

/**
* Set the provided size to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} size - The size as an object with width and height
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
function setSize(elements, width, height) {
  return setStyle(elements, { width: width, height: height });
}

/**
* Set the provided width to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {number} width - The width
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
function setWidth(elements, width) {
  return setStyle(elements, { width: width });
}

/**
* Reset visibility style attribute for elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
function show(elements) {
  return setStyle(elements, { visibility: 'hidden' });
}

/**
* Apply the provided translate transformation on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function translate2D(elements, transformation, keep) {
    var x = 'x' in transformation ? transformation.x : 0,
        y = 'y' in transformation ? transformation.y : 0;

    if (typeof x == 'number') x += 'px';
    if (typeof y == 'number') y += 'px';

    var style = 'translate(' + x + ',' + y + ')';

    return forElements(elements, function (element) {
        if (!element.style) return;

        if (keep) {
            element.style[prefix + 'transform'] += ' ' + style;
            element.style.transform += ' ' + style;
        } else {
            element.style[prefix + 'transform'] = style;
            element.style.transform = style;
        }
    });
}

/**
* Apply the provided 3D translate transformation on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.z} z - translateZ option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function translate3D(elements, transformation, keep) {
    var x = 'x' in transformation ? transformation.x : 0,
        y = 'y' in transformation ? transformation.y : 0,
        z = 'z' in transformation ? transformation.z : 0;

    if (typeof x == 'number') x += 'px';
    if (typeof y == 'number') y += 'px';
    if (typeof z == 'number') z += 'px';

    var style = 'translate3D(' + x + ',' + y + ',' + z + ')';

    return forElements(elements, function (element) {
        if (!element.style) return;

        if (keep) {
            element.style[prefix + 'transform'] += ' ' + style;
            element.style.transform += ' ' + style;
        } else {
            element.style[prefix + 'transform'] = style;
            element.style.transform = style;
        }
    });
}

/**
* Apply the provided translate transformation (3D if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.z} z - translateZ option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
function translate(elements, transformation, keep) {
    return support3D ? translate3D(elements, transformation, keep) : translate2D(elements, transformation, keep);
}

/**
 * Set the provided transformation to all elements using a matrix if needed and 3D if supported.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {object} [transformation] - The transformation as an object
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function transform(elements, transformation) {
   // if skew or rotation use matrix
   if ('skew' in transformation || 'skewX' in transformation || 'skewY' in transformation || 'rotate' in transformation || 'rotateX' in transformation || 'rotateY' in transformation || 'rotateZ' in transformation) {
      return matrix(elements, transformation);
   } else {
      var shouldKeep = false; // don't crush translate property

      if (shouldKeep = 'x' in transformation || 'y' in transformation || 'z' in transformation) return translate(elements, transformation);

      if ('scale' in transformation || 'scaleX' in transformation || 'scaleY' in transformation || 'scaleZ' in transformation) return scale(elements, transformation, shouldKeep);
   }
}

/**
 * Return value if in the range, max if greater, min if lower
 * @param {number} value - The tested value
 * @param {number} [min=0] - The minimum value
 * @param {number} [max=1] - The maximum value
 * @return {function} value - A random interger between min and max or max if value isn't a number
 */
function clamp(value) {
  var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return isNaN(value) ? max : Math.min(Math.max(value, min), max);
}

/**
 * Execute callback once for all fired during a waiting time.
 * @param {function} callback - The callback function
 * @param {number} wait - The waiting time in milliseconds
 * @param {bool} [immediate=false] - Execute callback on first trigger
 * @return {function} debounced - The debounced callback with cancel method
 */
function debounce(callback, wait) {
  var immediate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var canCall = immediate;
  var timeout = void 0;

  var applyCallback = function applyCallback(args) {
    canCall = false;
    callback.apply(undefined, toConsumableArray(args));

    timeout = setTimeout(function () {
      return canCall = immediate;
    }, wait);
  };

  var debounced = function debounced() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);

    if (canCall) {
      applyCallback(args);
    } else {
      timeout = setTimeout(applyCallback.bind(null, args), wait);
    }

    debounced.cancel = function () {
      clearTimeout(timeout);
      canCall = true;
      timeout = null;
    };
  };

  return debounced;
}

/**
 * Cache callbacks result for arguments and return cached results when called with the same ones
 * @param {function} callback - The function to call
 * @return {function} memoized - The memoized callback
 */
function memoize(callback) {
  var _arguments = arguments,
      _this = this;

  var cache = {};

  return function () {
    var args = JSON.stringify(_arguments);

    return args in cache ? cache[args] : cache[args] = callback.call.apply(callback, [_this].concat(Array.prototype.slice.call(_arguments)));
  };
}

/**
 * Return a random number between two values
 * @param {number} max - The maximum value
 * @param {number} [min=0] - The minimum value
 * @return {function} value - A random value between min and max
 */
function randomBetween(max) {
  var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return Math.random() * (max - min + 1) + min;
}

/**
 * Return a random integer between two integers
 * @param {number} max - The maximum integer
 * @param {number} [min=0] - The minimum integer
 * @return {function} value - A random interger between min and max
 */
function randomIntBetween(max) {
  var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return ~~(Math.random() * (max - min + 1)) + min;
}

/**
 * Execute callback at most once in wait time.
 * @param {function} callback - The callback function
 * @param {number} wait - The waiting time in milliseconds
 * @param {bool} [leading=false] - Execute callback on first trigger
 * @param {bool} [trailing=false] - Execute callback wait time after last execution
 * @return {function} throttled - The throttled callback with cancel method
 */
function throttle(callback, wait) {
  var leading = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
  var trailing = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  var last = 0;
  var timeout = void 0;

  var applyCallback = function applyCallback(args) {
    timeout = null;
    last = leading ? window.performance.now() : 0;
    callback.apply(undefined, toConsumableArray(args));
  };

  var throttled = function throttled() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var now = window.performance.now();

    if (!last && !leading) last = now;

    var remaining = wait - (now - last);

    if (remaining < 0 || remaining > wait) {
      applyCallback(args);
    } else if (trailing && !timeout) {
      timeout = setTimeout(applyCallback.bind(null, args), remaining);
    }

    throttled.cancel = function () {
      clearTimeout(timeout);
      last = 0;
      timeout = null;
    };
  };

  return throttled;
}

var index = {
  isAndroid: isAndroid,
  isAndroidTablet: isAndroidTablet,
  isChrome: isChrome,
  isFirefox: isFirefox,
  isIE: isIE,
  isIOS: isIOS,
  isIPad: isIPad,
  isIPhone: isIPhone,
  isIPod: isIPod,
  isMobile: isMobile,
  isSafari: isSafari,
  isTablet: isTablet,
  isTouchable: isTouchable,
  isWindows: isWindows,
  isWindowsPhone: isWindowsPhone,
  isWindowsTablet: isWindowsTablet,
  prefix: prefix,
  support3D: support3D,
  ua: ua,
  vendor: vendor,
  forEach: forEach,
  forElements: forElements,
  forIn: forIn,
  getElement: getElement,
  getElements: getElements,
  isDomElement: isDomElement,
  addClass: addClass,
  append: append,
  children: children,
  clone: clone,
  closest: closest,
  createElement: createElement,
  filter: filter,
  find: find,
  findOne: findOne,
  getAttr: getAttr,
  getData: getData,
  getHtml: getHtml,
  getProp: getProp,
  hasClass: hasClass,
  indexInParent: indexInParent,
  insertAfter: insertAfter,
  insertBefore: insertBefore,
  next: next,
  parent: parent,
  prev: prev,
  remove: remove,
  removeClass: removeClass,
  setAttr: setAttr,
  setData: setData,
  setHtml: setHtml,
  setProp: setProp,
  toggleClass: toggleClass,
  bind: bind,
  drag: drag,
  hover: hover,
  load: load,
  off: off,
  on: on,
  once: once,
  ready: ready,
  trigger: trigger,
  getHeight: getHeight,
  getSize: getSize,
  getStyle: getStyle,
  getWidth: getWidth,
  hide: hide,
  matrix: matrix,
  matrix2D: matrix2D,
  matrix3D: matrix3D,
  offset: offset,
  position: position,
  scale: scale,
  scale2D: scale2D,
  scale3D: scale3D,
  screenPosition: screenPosition,
  setHeight: setHeight,
  setSize: setSize,
  setStyle: setStyle,
  setWidth: setWidth,
  show: show,
  transform: transform,
  translate: translate,
  translate2D: translate2D,
  translate3D: translate3D,
  clamp: clamp,
  debounce: debounce,
  memoize: memoize,
  randomBetween: randomBetween,
  randomIntBetween: randomIntBetween,
  throttle: throttle,
  transformTo2DMatrix: transformTo2DMatrix,
  transformTo3DMatrix: transformTo3DMatrix
};

module.exports = index;