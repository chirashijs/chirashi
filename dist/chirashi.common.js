/*!
 * Chirashi.js v4.0.0
 * (c) 2016 Alex Toudic
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var raf = _interopDefault(require('raf'));

/**
 * Get array of dom elements from selector.
 * @param {string} selector - The query selector
 * @return {Array} domElements - The dom elements matching selector
 */
function getSelectorAll(selector) {
  return [].slice.call(document.querySelectorAll(selector));
}

/**
 * Test if element is a dom element.
 * @param {HTMLElement | window | document | SVGElement} element - If element doesn't match of this types false will be returned
 * @return {bool} isDomElement - true if element is a dom element, false otherwise
 */
function isDomElement(element) {
  return element instanceof HTMLElement || element === window || element === document || element instanceof SVGElement;
}

/**
 * Get a dom element from selector.
 * @param {string} selector - The query selector
 * @return {HTMLElement | window | document | SVGElement} domElement - The first dom element matching selector
 */
function getSelector(selector) {
  return document.querySelector(selector);
}

/**
 * Get Dom Element from iterable or selector.
 * @param {string | Array | HTMLElement | window | document | SVGElement} element - The iterable or selector
 * @return {HTMLElement | window | document | SVGElement} domElement - The dom element from element
 */
function getElement(element) {
  if (typeof element == 'string') return getSelector(element);

  if (element instanceof Array) return getElement(element[0]);

  return isDomElement(element) ? element : null;
}

/**
 * Iterates over elements and apply callback on each one.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable
 * @param {function} callback - The function to call for each iteratee
 * @param {bool} [forceOrder=false] - Respect elements order
 * @return {string | Array | NodeList | HTMLCollection} elements for chaining
 */
function forEach$1(elements, callback) {
    var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    if (!elements) return;

    if (!(elements instanceof Array || elements instanceof NodeList || elements instanceof HTMLCollection)) {
        callback(elements, 0);
    } else {
        if (!forceOrder) {
            var i = elements.length;
            while (i--) {
                callback(elements[i], i);
            }
        } else {
            var _i = -1,
                len = elements.length;
            while (++_i < len) {
                callback(elements[_i], _i);
            }
        }
    }

    return elements;
}

/**
 * Get Dom Element from iterable or selector.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable or selector
 * @return {HTMLElement | window | document | SVGElement} domElements - The dom elements from elements
 */
function getElements(elements) {
  if (typeof elements == 'string') return getSelectorAll(elements);

  if (elements instanceof Array) {
    var _ret = function () {
      var parsedElements = [];
      forEach$1(elements, function (element) {
        var newElements = getElements(element);
        if (newElements) parsedElements = parsedElements.concat(newElements);
      });

      return {
        v: parsedElements
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }

  if (elements instanceof NodeList) return [].slice.call(elements);

  return isDomElement(elements) ? [elements] : null;
}

/**
 * Iterates over dom elements and apply callback on each one.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {function} callback - The function to call for each iteratee
 * @param {bool} [forceOrder=false] - Respect elements order
 * @return {string | Array | NodeList | HTMLCollection} elements for chaining
 */
function forElements(elements, callback) {
  var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  return forEach$1(getElements(elements), callback, forceOrder);
}

/**
 * Iterates over object's keys and apply callback on each one.
 * @param {Object} object - The iterable
 * @param {function} callback - The function to call for each iteratee
 * @param {bool} [forceOrder=false] - Respect keys order
 * @return {Object} object - The iterable for chaining
 */
function forIn(object, callback) {
    var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    if (typeof object != 'object') return;

    var keys = Object.keys(object);

    if (!forceOrder) {
        var i = keys.length;

        while (i--) {
            var key = keys[i];
            callback(key, object[key]);
        }
    } else {
        var _i = -1,
            len = keys.length;
        while (++_i < len) {
            var _key = keys[_i];
            callback(_key, object[_key]);
        }
    }

    return object;
}

/**
 * Add all classes on each elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} classes - The classes seperated with spaces
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function addClass(elements, classes) {
    classes = classes.split(' ');

    return forElements(elements, function (element) {
        if (!element.classList) return;

        var i = classes.length;
        while (i--) {
            element.classList.add(classes[i]);
        }
    });
}

/**
 * Create a dom element from an HTML string or tag.
 * @param {string | HTMLElement | SVGElement} string - The html string or tag
 * @return {HTMLElement | SVGElement} element - The dom element created from the string
 */
function createElement(string) {
  if (string.indexOf('<') == -1) string = '<' + string + '></' + string + '>';

  var temp = document.createElement('div');
  temp.innerHTML = string;

  return temp.firstChild;
}

/**
 * Append node to each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string | HTMLElement | SVGElement} node - Dom element or html string or tag to create it
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function append(elements, node) {
    if (typeof node == 'string') node = createElement(node);else if (!isDomElement(node)) return elements;

    return forElements(elements, function (element) {
        if (!element.appendChild) return;

        element.appendChild(node);
    });
}

/**
 * Set attributes from attributes object keys to values on elements
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {Object} attributes - attribute names and values association
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function setAttr(elements, attributes) {
    var attributesName = Object.keys(attributes);

    return forElements(elements, function (element) {
        if (!element.setAttribute) return;

        var i = attributesName.length,
            attributeName = void 0,
            value = void 0;
        while (i--) {
            attributeName = attributesName[i];
            value = attributes[attributeName];

            if (value) element.setAttribute(attributeName, value);else element.removeAttribute(name);
        }
    });
}

/**
 * Get value of the name attribute on element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} name - The attribute's name
 * @return {string} value - The value for the attribute
 */
function getAttr(element, name) {
  element = getElement(element);

  return element && element.getAttribute && element.getAttribute(name);
}

/**
 * Get attribute option from element if option is a string,
 * set attributes from option keys to option values on elements
 * if option is an object.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @param {string | Object} option - attribute name or attribute names and values association
 * @return {string | Array | HTMLElement | window | document | SVGElement} value or elements - Value for option attribute or elements for chaining
 */
function attr(elements, option) {
    if (typeof option == 'object') return setAttr(elements, option);else return getAttr(elements, option);
}

/**
 * Clone element.
 * @param {string | HTMLElement | SVGElement} element - The dom element or selector
 * @return {HTMLElement | SVGElement} clone - The clone of element
 */
function clone(element) {
  element = getElement(element);

  return element && element.cloneNode(true);
}

/**
 * Get closest element matching the tested value traveling up the DOM tree from element.
 * @param {string | HTMLElement | SVGElement} element - The dom element or selector
 * @param {string | HTMLElement | SVGElement} tested - The selector or dom element to match
 * @param {{value: number}} [level] - The value is incremented for each parent tested
 * @return {bool | HTMLElement | SVGElement} matchedElement - The matched element or false
 */
function closest(element, tested, level) {
  if (level && typeof level.value != 'undefined') ++level.value;

  element = getElement(element);

  return !element || element === window || element === document ? false : typeof tested == 'string' && element.matches(tested) || element == tested ? element : closest(element.parentNode, tested, level);
}

/**
 * Set data attributes from attributes object keys to values on elements
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {Object} attributes - attribute names and values association
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function setData(elements, attributes) {
    var attributesName = Object.keys(attributes);

    return forElements(elements, function (element) {
        if (!element.setAttribute) return;

        var i = attributesName.length,
            attributeName = void 0;
        while (i--) {
            attributeName = attributesName[i];
            value = attributes[attributeName];

            if (value) element.setAttribute('data-' + attributeName, value);else element.removeAttribute(name);
        }
    });
}

/**
 * Get value of the name date attribute on element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} name - The data attribute's name
 * @return {string} value - The value for the data attribute
 */
function getData(element, name) {
  return getAttr(element, 'data-' + name);
}

/**
 * Get data attribute option from element if option is a string,
 * set data attributes from option keys to option values on elements
 * if option is an object.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @param {string | Object} option - data attribute name or data attribute names and values association
 * @return {string | Array | HTMLElement | window | document | SVGElement} value or elements - Value for option data attribute or elements for chaining
 */
function data(elements, option) {
    if (typeof option == 'object') return setData(elements, option);else return getData(elements, option);
}

/**
 * Set inner html of elements to string.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} string - The content to inject in the elements
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function setHtml(elements, string) {
    return forElements(elements, function (element) {
        element.innerHTML = string;
    });
}

/**
 * Remove children of provided dom elements.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @return {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable for chaining
 */
function empty(elements) {
  return setHtml(elements, '');
}

/**
 * Filter items matching the tested value from elements.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @param {string | HTMLElement | SVGElement} tested - The selector or dom element to match
 */
function filter(elements, tested) {
    var matching = [];

    forElements(elements, function (element) {
        if (!!element && element !== window && element !== document && (typeof tested == 'string' && element.matches(tested) || element == tested)) matching.push(element);
    });

    return matching;
}

/**
 * Find the first element's child matching the selector.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} selector - The selector
 * @return {HTMLElement | SVGElement} element - The first child of element matching the selector
 */
function findOne(element, selector) {
  element = getElement(element);

  return element && element.querySelector(selector);
}

/**
 * Find the element's children matching the selector.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} selector - The selector
 * @return {Array} elements - The children of element matching the selector
 */
function find(element, selector) {
  element = getElement(element);

  return !element ? [] : [].slice.call(element.querySelectorAll(selector));
}

/**
 * Get the inner html of the element.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {string} innerHTML - The inner html of the element
 */
function getHtml(element) {
  element = getElement(element);

  return element && element.innerHTML;
}

/**
 * Get the value for the property name on the element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} name - The name of the property
 * @return {string} innerHTML - The inner html of the element
 */
function getProp(element, name) {
  element = getElement(element);

  return element && element[name];
}

/**
 * Test if element has all the classes.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} classes - The classes seperated with spaces
 * @return {bool} hasClass - True if element has all the classes, false otherwise
 */
function hasClass(element, classes) {
    element = getElement(element);
    if (!element || !element.classList) return;

    classes = classes.split(' ');

    var i = classes.length,
        found = false;
    while (i-- && (found = element.classList.contains(classes[i]))) {}

    return found;
}

/**
 * Set inner html of elements if string is provided, get it otherwise.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} [string] - The content to inject in the elements
 * @return {string | Array | HTMLElement | window | document | SVGElement} innerHTML or elements - The inner html of the elements or elements for chaining
 */
function html(elements, string) {
    if (typeof string == 'string') return setHtml(elements, string);else return getHtml(elements);
}

/**
 * Get the position of element in his parent's children.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} index - The position of element in his parent's children
 */
function indexInParent(element) {
    element = getElement(element);
    if (!element) return;

    var currentElement = element,
        parent = element.parentNode,
        i = 0;

    while (currentElement.previousElementSibling) {
        ++i;
        currentElement = currentElement.previousElementSibling;
    }

    return element === parent.children[i] ? i : -1;
}

/**
 * Insert node to each element's parent of elements after element.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string | HTMLElement | SVGElement} node - Dom element or html string or tag to create it
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function insertAfter(elements, node) {
    if (typeof node == 'string') node = createElement(node);

    return forElements(elements, function (element) {
        if (!element.parentNode) return;

        element.parentNode.insertBefore(node, element.nextElementSibling);
    });
}

/**
 * Insert node to each element's parent of elements after element.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string | HTMLElement | SVGElement} node - Dom element or html string or tag to create it
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function insertBefore(elements, node) {
    if (typeof node == 'string') node = createElement(node);

    return forElements(elements, function (element) {
        if (!element.parentNode) return;

        element.parentNode.insertBefore(node, element);
    });
}

/**
 * Get the next sibling of element.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {HTMLElement | SVGElement} element - The next element
 */
function next(element) {
  element = getElement(element);
  if (!element) return;

  return element.nextElementSibling;
}

/**
 * Get the parent node of the element.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {HTMLElement | SVGElement} element - The parent node
 */
function parent(element) {
  element = getElement(element);

  return element && element.parentNode;
}

/**
 * Get the previous sibling of element.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {HTMLElement | SVGElement} element - The previous element
 */
function prev(element) {
  element = getElement(element);

  return element && element.previousElementSibling;
}

/**
 * Set properties from props object keys to values on elements
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {Object} props - properties names and values association
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function setProp(elements, props) {
    var propsName = Object.keys(props);

    return forElements(elements, function (element) {
        var i = propsName.length,
            propName = void 0;
        while (i--) {
            propName = propsName[i];
            element[propName] = props[propName];
        }
    });
}

/**
 * Get property option from element if option is a string,
 * set properties from option keys to option values on elements
 * if option is an object.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @return {string | Array | HTMLElement | window | document | SVGElement} value or elements - Value for option property or elements for chaining
 */
function prop(elements, option) {
    if (typeof option == 'object') return setProp(elements, option);else return getProp(elements, option);
}

/**
 * Remove all classes on each elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} classes - The classes seperated with spaces
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function removeClass(elements, classes) {
    classes = classes.split(' ');

    return forElements(elements, function (element) {
        if (!element.classList) return;

        var i = classes.length;
        while (i--) {
            element.classList.remove(classes[i]);
        }
    });
}

/**
 * Remove all elements from dom.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @return {string | Array | NodeList | HTMLCollection} elements - The removed elements
 */
function remove(elements) {
    return forElements(elements, function (element) {
        if (!element.parentNode) return;

        element.parentNode.removeChild(element);
    });
}

/**
 * Toggle all classes on each elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} classes - The classes seperated with spaces
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function toggleClass(elements, classes) {
    classes = classes.split(' ');

    return forElements(elements, function (element) {
        if (!element.classList) return;

        var i = classes.length;
        while (i--) {
            element.classList.toggle(classes[i]);
        }
    });
}

function on(elements, events, callback) {
  events = events.split(' ');

  forElements(elements, function (element) {
    if (!element.addEventListener) return;

    var i = events.length;
    while (i--) {
      element.addEventListener(events[i], callback);
    }
  });
}

/**
 * Bind drag listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {function} move - The move callback
 * @param {function} begin - The begin callback
 * @param {function} end - The end callback
 * @return {object} undragProperties - The object to pass to undrag for unbinding
 */
function drag(elements, move, begin, end) {
    var undragProperties = [];

    forElements(elements, function (element) {
        var dragging = false;

        var undragProperty = {
            element: element,

            begin: function (e) {
                e.preventDefault();
                e.stopPropagation();

                if ('touches' in e && e.touches.length) e = e.touches[0];

                dragging = true;

                if (begin) begin({ x: e.pageX, y: e.pageY });
            },
            move: function (e) {
                if (!dragging) return;

                e.preventDefault();
                e.stopPropagation();

                if ('touches' in e && e.touches.length) e = e.touches[0];

                if (move) move({ x: e.pageX, y: e.pageY });
            },
            end: function (e) {
                if (!dragging) return;

                e.preventDefault();
                e.stopPropagation();

                if ('touches' in e && e.touches.length) e = e.touches[0];

                dragging = false;

                if (end) end({ x: e.pageX, y: e.pageY });
            }
        };

        on(element, 'touchstart mousedown', undragProperty.begin);
        on(document.body, 'touchmove mousemove', undragProperty.move);
        on(document.body, 'touchend mouseup', undragProperty.end);
    });

    return undragProperties;
}

function hover(elements, enter, leave) {
  forElements(elements, function (element) {
    if (enter) on(element, 'mouseenter', enter);
    if (leave) on(element, 'mouseleave', leave);
  });
}

function off(elements, events, callback) {
  events = events.split(' ');

  forElements(elements, function (element) {
    if (!element.removeEventListener) return;

    var i = events.length;
    while (i--) {
      element.removeEventListener(events[i], callback);
    }
  });
}

function load(elements, eachCallback, allCallback) {
  elements = getElements(elements);

  if (!elements || elements.length == 0) {
    if (allCallback) allCallback();

    return;
  }

  var n = {
    value: elements.length
  };

  var callback = function (event, element, error) {
    if (event) {
      element = event.target;
      if (event.type == 'error') error = event;
    }

    off(element, 'load loadedmetadata error', callback);

    if (eachCallback) eachCallback(element, error);

    if (! --n.value && allCallback) allCallback();
  };

  forEach$1(elements, function (element) {
    if (element.tagName == 'IMG' && !element.src) {
      callback(null, element, 'image without src');
    } else if (element.naturalWidth || element.loadedmetadata) {
      callback(null, element, null);
    } else {
      on(element, 'load loadedmetadata error', callback);
    }
  });
}

function ready(callback) {
  document.addEventListener('DOMContentLoaded', callback);
}

function resize(userCallback) {
  var callbackRaf = void 0;
  var callback = function () {
    raf.cancel(callbackRaf);
    callbackRaf = raf(function () {
      userCallback({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  };

  on(window, 'resize', callback);

  return callback;
}

function scroll(userCallback) {
  var callback = function (event) {
    var deltaY = void 0;

    if (typeof event.deltaY !== 'undefined') {
      deltaY = -event.deltaY;
    } else if (typeof event.delta !== 'undefined') {
      deltaY = event.delta;
    } else if (typeof event.detail !== 'undefined') {
      deltaY = -event.detail;
    }

    userCallback({
      top: deltaY
    }, {
      top: window.pageYOffset || document.documentElement.scrollTop,
      left: window.pageXOffset || document.documentElement.scrollLeft
    }, event);
  };

  on(window, 'scroll', callback);

  return callback;
}

function trigger(elements, events, data) {
  events = events.split(' ');
  var i = events.length;

  var _loop = function () {
    var event = events[i];

    if (window.CustomEvent) {
      event = new CustomEvent(event, { detail: data });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(event, true, true, data);
    }

    forElements(elements, function (element) {
      if (!element.dispatchEvent) return;

      element.dispatchEvent(event);
    });
  };

  while (i--) {
    _loop();
  }
}

function undrag(undragProperties) {
  forEach$1(undragProperties, function (undragProperty) {
    off(undragProperty.element, 'touchstart, mousedown', undragProperty.begin);
    off(document.body, 'touchmove, mousemove', undragProperty.move);
    off(document.body, 'touchend, mouseup', undragProperty.end);
  });
}

function unhover(elements, enter, leave) {
  forElements(elements, function (element) {
    if (enter) off(element, 'mouseenter', enter);
    if (leave) off(element, 'mouseleave', leave);
  });
}

function unresize(callback) {
  off(window, 'resize', callback);
}

function unscroll(callback) {
  off(window, 'scroll mousewheel DOMMouseScroll', callback);
}

function unwatchProp(watching) {
  watching.value = false;
}

function watchProp(elements, prop, handler) {
    var watching = {
        value: true
    };

    var watched = [];
    forElements(elements, function (element) {
        watched.push({
            element: element,
            prop: prop,
            value: getProp(element, prop)
        });
    });

    function update() {
        if (!watching.value) return;

        forEach(watched, function (item) {
            var value = getProp(item.element, item.prop);
            if (item.value != value) {
                handler.call(item.element, item.prop, value);
            }
        });

        requestAnimationFrame(update);
    }

    update();

    return watching;
}

function isAndroidTablet() {
  var ua = navigator.userAgent.toLowerCase();

  return (/android/i.test(ua) && !/mobile/i.test(ua)
  );
}

function isAndroid() {
  return (/android/i.test(navigator.userAgent.toLowerCase())
  );
}

function isChrome() {
  var ua = navigator.userAgent.toLowerCase(),
      vendor = navigator.vendor && navigator.vendor.toLowerCase();

  return (/chrome|chromium/i.test(ua) && /google inc/.test(vendor)
  );
}

function isFirefox() {
  return (/firefox/i.test(navigator.userAgent.toLowerCase())
  );
}

function isIE(version) {
  var ua = navigator.userAgent.toLowerCase(),
      ie = ua.indexOf('msie') != -1 ? parseInt(ua.split('msie')[1], 10) : false;

  return version ? ie == version : ie;
}

function isIOS() {
  return (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
  );
}

function isIPad() {
  return (/ipad/i.test(navigator.userAgent.toLowerCase())
  );
}

function isIPhone() {
  return (/iphone/i.test(navigator.userAgent.toLowerCase())
  );
}

function isIPod() {
  return (/ipod/i.test(navigator.userAgent.toLowerCase())
  );
}

function isWindows() {
  var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

  return (/win/i.test(appVersion)
  );
}

function isTouchable() {
  return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
}

function isMobile() {
  return isIOS() || isAndroid() || isWindows() && isTouchable();
}

function isSafari() {
  var ua = navigator.userAgent.toLowerCase(),
      vendor = navigator.vendor && navigator.vendor.toLowerCase();

  return (/safari/i.test(ua) && /apple computer/.test(vendor)
  );
}

function isWindowsPhone() {
  var ua = navigator.userAgent.toLowerCase();

  return isWindows() && /phone/i.test(ua);
}

function isWindowsTablet() {
  var ua = navigator.userAgent.toLowerCase(),
      vendor = navigator.vendor && navigator.vendor.toLowerCase();

  return isWindows() && !isWindowsPhone() && isTouchable();
}

function isTablet() {
  return isIPad() || isAndroidTablet() || isWindowsTablet();
}

function isWider(width) {
  return window.innerWidth > width;
}

function getHeight(element) {
  element = getElement(element);

  return element && element.offsetHeight;
}

function getWidth(element) {
  element = getElement(element);

  return element && element.offsetWidth;
}

function getSize(element) {
  element = getElement(element);

  return element && {
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

function getStyle(element, property) {
  element = getElement(element);
  if (!element) return;

  var ret = getComputedStyle(element)[property];

  return ret.indexOf('px') == -1 ? ret : parseInt(ret, 10);
}

function setHeight(elements, height) {
  if (typeof height == 'number') height += 'px';

  forElements(elements, function (element) {
    if (!element.style) return;

    element.style.height = height;
  });
}

function height(elements, height) {
  if (typeof height != 'undefined') {
    setHeight(elements, height);
  } else {
    return getHeight(elements);
  }
}

function hide(elements) {
  forElements(elements, function (element) {
    if (!element.style) return;

    element.style.visibility = 'hidden';
  });
}

var prefix$1 = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';

function applyPropertyToMatrix(property, value, matrix) {
  switch (property) {
    case 'x':
      matrix[4] += value;
      break;

    case 'y':
      matrix[5] += value;
      break;

    case 'rotate':
      var cosValue = Math.cos(value),
          sinValue = Math.sin(value);
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
      matrix[2] += value;
      matrix[1] += value;
      break;

    case 'skewX':
      matrix[2] += Math.tan(value);
      break;

    case 'skewY':
      matrix[1] += Math.tan(value);
      break;
  }
}

function matrix2d(elements, transformation) {
  var properties = Object.keys(transformation),
      i = properties.length,
      matrix = [1, 0, 0, 1, 0, 0];
  while (i--) {
    var property = properties[i],
        value = transformation[property];

    if (typeof value == 'object') {
      var subProperties = Object.keys(value),
          j = subProperties.length;

      while (j--) {
        var subProperty = subProperties[j];
        applyPropertyToMatrix(property + subProperty.toUpperCase(), value[subProperty], matrix);
      }
    } else {
      applyPropertyToMatrix(property, value, matrix);
    }
  }

  matrix = 'matrix(' + matrix.join(',') + ')';

  forElements(elements, function (element) {
    if (!element.style) return;

    element.style[prefix$1 + 'transform'] = element.style.transform = matrix;
  });
}

var prefix$2 = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';

function applyPropertyToMatrix$1(property, value, matrix) {
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
      var cosValue = Math.cos(value),
          sinValue = Math.sin(value);
      matrix[0] *= cosValue;
      matrix[1] += sinValue;
      matrix[4] -= sinValue;
      matrix[5] *= cosValue;
      break;

    case 'rotateX':
      var cosValue2 = Math.cos(value),
          sinValue2 = Math.sin(value);
      matrix[5] *= cosValue2;
      matrix[6] += sinValue2;
      matrix[9] -= sinValue2;
      matrix[10] *= cosValue2;
      break;

    case 'rotateY':
      var cosValue3 = Math.cos(value),
          sinValue3 = Math.sin(value);
      matrix[0] *= cosValue3;
      matrix[2] -= sinValue3;
      matrix[8] += sinValue3;
      matrix[10] *= cosValue3;
      break;

    case 'rotateZ':
      var cosValue4 = Math.cos(value),
          sinValue4 = Math.sin(value);
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
      matrix[4] += value;
      matrix[1] += value;
      break;

    case 'skewX':
      matrix[4] += Math.tan(value);
      break;

    case 'skewY':
      matrix[1] += Math.tan(value);
      break;
  }
}

function matrix3d(elements, transformation) {
  var properties = Object.keys(transformation),
      i = properties.length,
      matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  while (i--) {
    var property = properties[i],
        value = transformation[property];

    if (typeof value == 'object') {
      var subProperties = Object.keys(value),
          j = subProperties.length;

      while (j--) {
        var subProperty = subProperties[j];
        applyPropertyToMatrix$1(property + subProperty.toUpperCase(), value[subProperty], matrix);
      }
    } else {
      applyPropertyToMatrix$1(property, value, matrix);
    }
  }

  matrix = 'matrix3d(' + matrix.join(',') + ')';

  forElements(elements, function (element) {
    if (!element.style) return;

    element.style[prefix$2 + 'transform'] = element.style.transform = matrix;
  });
}

var prefix = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';
document.documentElement.style[prefix + 'matrix'] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
var use2d = !document.documentElement.style[prefix + 'matrix'];
document.documentElement.style[prefix + 'matrix'] = '';

function matrix(elements, transformation) {
  if (use2d) matrix2d(elements, transformation);else matrix3d(elements, transformation);
}

function offset(element) {
  element = getElement(element);
  if (!element) return;

  var rect = element.getBoundingClientRect();

  return {
    top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop),
    left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft)
  };
}

function position(element) {
  element = getElement(element);

  return element && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}

var prefix$4 = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';

function scale2d(elements, transformation, keep) {
  forElements(elements, function (element) {
    if (!element.style) return;

    var style = 'scale(' + (transformation.scaleX || transformation.scale || 1) + ',' + (transformation.scaleY || transformation.scale || 1) + ')';

    if (keep) {
      var newStyle = element.style[prefix$4 + 'transform'] || element.style.transform;
      newStyle += ' ' + style;
      element.style[prefix$4 + 'transform'] = newStyle;
      element.style.transform = newStyle;
    } else element.style[prefix$4 + 'transform'] = element.style.transform = style;
  });
}

var prefix$5 = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';

function scale3d(elements, transformation, keep) {
  forElements(elements, function (element) {
    if (!element.style) return;

    var style = 'scale3d(' + (transformation.scaleX || transformation.scale || 1) + ',' + (transformation.scaleY || transformation.scale || 1) + ',' + (transformation.scaleZ || 1) + ')';

    if (keep) {
      var newStyle = element.style[prefix$5 + 'transform'] || element.style.transform;
      newStyle += ' ' + style;
      element.style[prefix$5 + 'transform'] = newStyle;
      element.style.transform = newStyle;
    } else element.style[prefix$5 + 'transform'] = element.style.transform = style;
  });
}

var prefix$3 = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';
document.documentElement.style[prefix$3 + 'transform'] = 'scale3d(1, 1, 1)';
var use2d$1 = !document.documentElement.style[prefix$3 + 'transform'];
document.documentElement.style[prefix$3 + 'transform'] = '';

function scale(elements, transformation, keep) {
  if (use2d$1) scale2d(elements, transformation, keep);else scale3d(elements, transformation, keep);
}

function screenPosition(element) {
  element = getElement(element);
  if (!element) return;

  var rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
}

function setSize(elements, object) {
  var width = object.width,
      height = object.height;

  if (typeof width == 'number') width += 'px';
  if (typeof height == 'number') height += 'px';

  forElements(elements, function (element) {
    if (!element.style) return;

    element.style.width = width;
    element.style.height = height;
  });
}

var unitLessAttributes = ['z-index', 'font-weight', 'line-height', 'counter-reset', 'counter-increment', 'volume', 'stress', 'pitch-range', 'richness', 'opacity'];

function setStyle(elements, options) {
  var properties = Object.keys(options);

  var i = properties.length,
      property = void 0,
      value = void 0;
  while (i--) {
    property = properties[i];
    value = options[property];

    if (typeof value == 'number' && unitLessAttributes.indexOf(property) == -1) options[property] += 'px';
  }

  forElements(elements, function (element) {
    if (!element.style) return;

    var i = properties.length,
        property = void 0,
        value = void 0;
    while (i--) {
      property = properties[i];
      element.style[property] = options[property];
    }
  });
}

function setWidth(elements, width) {
  if (typeof width == 'number') width += 'px';

  forElements(elements, function (element) {
    if (!element.style) return;

    element.style.width = width;
  });
}

function show(elements) {
  forElements(elements, function (element) {
    if (!element.style) return;

    element.style.visibility = '';
  });
}

function size(elements, object) {
  if (typeof object != 'object') {
    return getSize(elements);
  } else {
    setSize(elements, object);
  }
}

function style(elements, option) {
  if (typeof option == 'object') {
    setStyle(elements, option);
  } else if (typeof option == 'string') {
    return getStyle(elements, option);
  }
}

var prefix$7 = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';

function translate2d(elements, transformation, keep) {
  forElements(elements, function (element) {
    if (!element.style) return;

    var style = 'translate(' + transformation.x || 0 + 'px,' + transformation.y || 0 + 'px)';

    if (keep) {
      element.style[prefix$7 + 'transform'] += style;
      element.style.transform += style;
    } else element.style[prefix$7 + 'transform'] = element.style.transform = style;
  });
}

var prefix$8 = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';

function translate3d(elements, transformation, keep) {
  forElements(elements, function (element) {
    if (!element.style) return;

    var style = 'translate3d(' + (transformation.x || 0) + 'px,' + (transformation.y || 0) + 'px,' + (transformation.z || 0) + 'px)';

    if (keep) {
      element.style[prefix$8 + 'transform'] += style;
      element.style.transform += style;
    } else element.style[prefix$8 + 'transform'] = element.style.transform = style;
  });
}

var prefix$6 = '-' + (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1] + '-';
document.documentElement.style[prefix$6 + 'transform'] = 'translate3d(0, 0, 0)';
var use2d$2 = !document.documentElement.style[prefix$6 + 'transform'];
document.documentElement.style[prefix$6 + 'transform'] = '';

function translate(elements, transformation, keep) {
  if (use2d$2) translate2d(elements, transformation, keep);else translate3d(elements, transformation, keep);
}

function transform(elements, transformation) {
    if (transformation.skew || transformation.skewX || transformation.skewY || transformation.rotate || transformation.rotateX || transformation.rotateY || transformation.rotateZ) {
        matrix(elements, transformation);
    } else {
        var shouldKeep = false;

        if (shouldKeep = transformation.x || transformation.y || transformation.z) translate(elements, transformation);

        if (transformation.scale || transformation.scaleX || transformation.scaleY || transformation.scaleZ) scale(elements, transformation, shouldKeep);
    }
}

function width(elements, width) {
  if (typeof width != 'undefined') {
    setWidth(elements, width);
  } else {
    return getWidth(elements);
  }
}

function between(max) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deepClone(object) {
  if (object == null || typeof object !== 'object') return object;

  var copy = object.constructor();
  for (var attr in object) {
    if (object.hasOwnProperty(attr)) copy[attr] = object[attr];
  }

  return copy;
}

function defaultify(options, defaults) {
  if (typeof options == 'undefined' || options == null) return defaults;

  var keys = Object.keys(defaults),
      newOptions = deepClone(options);

  for (var i = keys.length - 1; i >= 0; --i) {
    var key = keys[i];

    if (typeof options[key] === 'undefined') newOptions[key] = defaults[key];
  }

  return newOptions;
}

function range(value) {
  var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return isNaN(value) ? max : Math.min(Math.max(value, min), max);
}

var index = {
    forEach: forEach$1,
    forElements: forElements,
    forIn: forIn,
    getElement: getElement,
    getElements: getElements,
    getSelectorAll: getSelectorAll,
    getSelector: getSelector,
    isDomElement: isDomElement,
    addClass: addClass,
    append: append,
    attr: attr,
    clone: clone,
    closest: closest,
    createElement: createElement,
    data: data,
    empty: empty,
    filter: filter,
    findOne: findOne,
    find: find,
    getAttr: getAttr,
    getData: getData,
    getHtml: getHtml,
    getProp: getProp,
    hasClass: hasClass,
    html: html,
    indexInParent: indexInParent,
    insertAfter: insertAfter,
    insertBefore: insertBefore,
    next: next,
    parent: parent,
    prev: prev,
    prop: prop,
    removeClass: removeClass,
    remove: remove,
    setAttr: setAttr,
    setData: setData,
    setHtml: setHtml,
    setProp: setProp,
    toggleClass: toggleClass,
    drag: drag,
    hover: hover,
    load: load,
    off: off,
    on: on,
    ready: ready,
    resize: resize,
    scroll: scroll,
    trigger: trigger,
    undrag: undrag,
    unhover: unhover,
    unresize: unresize,
    unscroll: unscroll,
    unwatchProp: unwatchProp,
    watchProp: watchProp,
    androidTablet: isAndroidTablet,
    android: isAndroid,
    chrome: isChrome,
    firefox: isFirefox,
    ie: isIE,
    ios: isIOS,
    ipad: isIPad,
    iphone: isIPhone,
    ipod: isIPod,
    mobile: isMobile,
    safari: isSafari,
    tablet: isTablet,
    touchable: isTouchable,
    wider: isWider,
    windowsPhone: isWindowsPhone,
    windowsTablet: isWindowsTablet,
    windows: isWindows,
    getHeight: getHeight,
    getSize: getSize,
    getStyle: getStyle,
    getWidth: getWidth,
    height: height,
    hide: hide,
    matrix: matrix,
    matrix2d: matrix2d,
    matrix3d: matrix3d,
    offset: offset,
    position: position,
    scale: scale,
    scale2d: scale2d,
    scale3d: scale3d,
    screenPosition: screenPosition,
    setHeight: setHeight,
    setSize: setSize,
    setStyle: setStyle,
    setWidth: setWidth,
    show: show,
    size: size,
    style: style,
    transform: transform,
    translate: translate,
    translate2d: translate2d,
    translate3d: translate3d,
    width: width,
    between: between,
    deepClone: deepClone,
    defaultify: defaultify,
    range: range
};

module.exports = index;
