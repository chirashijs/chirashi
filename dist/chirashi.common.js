/*!
 * Chirashi.js v5.0.0
 * (c) 2016 Alex Toudic
 * Released under the MIT License.
 */
'use strict';

/**
* Iterates over items and apply callback on each one.
* @param {*} items - The iterable.
* @param {forEachCallback} callback - The callback to call for each iteratee.
* @param {bool} [forceOrder=false] - Respect items order.
* @return {Array | NodeList | HTMLCollection} items for chaining.
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
* forEach(0, (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0]
* //   0: 1
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
* Chirashi.forEach(0, function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0]
* // logs:
* //   0: 1
*/
function forEach(items, callback) {
  var forceOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!items) return [];

  if (!(items instanceof Array)) {
    if (!(items instanceof window.NodeList || items instanceof window.HTMLCollection)) {
      items = [items];
    }
  }

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

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
  if (input && input['_chrsh-valid']) return input;

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
  } else if (input instanceof window.NodeList || input instanceof window.HTMLCollection) {
    output = [].concat(toConsumableArray(input));
  } else {
    output = isDomElement(input) ? [input] : [];
  }

  output.chrshPush = function (input) {
    this.push.apply(this, toConsumableArray(getElements(input)));
    this['_chrsh-valid'] = true;

    return this;
  };

  forEach(breakingMethods, function (method) {
    output[method] = function () {
      this['_chrsh-valid'] = false;

      return Array.prototype[method].apply(this, arguments);
    };
  });

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
  var forceOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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
  var forceOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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

function _stringToArray(input, prefix) {
  var output = typeof input === 'string' ? input.split(/[,\s]+/g) : input;

  return prefix ? output.map(function (string) {
    return '' + prefix + string;
  }) : output;
}

function _updateClassList(elements, method, classes) {
  classes = _stringToArray(classes);

  return forElements(elements, function (element) {
    var _element$classList;

    if (!element.classList) return;

    (_element$classList = element.classList)[method].apply(_element$classList, toConsumableArray(classes));
  });
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
  return _updateClassList(elements, 'add', classes);
}

/**
 * Apply props as key value pairs on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {object} - The props key value pairs.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, setProp, getProp } from 'chirashi'
 * const maki = createElement('input.maki')
 * setProp(maki, { value: 'こんにちは世界' })
 * getProp(maki, 'value') //returns: こんにちは世界
 * @example //es5
 * var maki = Chirashi.createElement('input.maki')
 * Chirashi.setProp(maki, { value: 'こんにちは世界' })
 * Chirashi.getProp(maki, 'value') //returns: こんにちは世界
 */
function setProp(elements, props) {
  return forElements(elements, function (element) {
    return Object.assign(element, props);
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
  return forElements(elements, function (element) {
    forIn(dataAttributes, function (name, value) {
      element.setAttribute(name.indexOf('data') === 0 ? name : 'data-' + name, value);
    });
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
  var props = {};
  var dataAttributes = {};

  forIn(attributes, function (name, value) {
    if (typeof value !== 'string' && !(value instanceof Array)) {
      value = JSON.stringify(value);
    }

    if (name.indexOf('data') === 0) {
      dataAttributes[name] = value;
    } else {
      props[name] = value;
    }
  });

  setProp(elements, props);

  return setData(elements, dataAttributes);
}

/**
 * Creates a dom element from an HTML string, tag or css selector.
 * @param {string} string - The html string, tag or css selector.
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
  var attributes = {};
  var classes = [];

  if (string.indexOf('<') === -1) {
    var core = null;

    forEach(string.match(/[#\.\[]?[a-zA-Z0-9-_+]+(=["'a-zA-Z0-9-_+\.]+\]?)?/g), function (segment) {
      if (segment.indexOf('.') === 0) {
        classes.push(segment.slice(1));
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
  addClass(element, classes);

  return element;
}

/**
 * Appends each node to element.
 * @param {string | HTMLElement | SVGElement} element - Selector or element.
 * @param {Array | string | HTMLElement | SVGElement | Text} nodes - Array of dom elements or string to create it using createElement.
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
 * Chirashi.append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 */
function append(element, nodes) {
  element = getElement(element);

  if (!element || !element.appendChild) return;

  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      element.appendChild(createElement(node));
    } else if (isDomElement(node)) element.appendChild(node);
  }, true);

  return element;
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

  return element ? element[property] : null;
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
  var children = getProp(element, 'children');

  return !!children && [].concat(toConsumableArray(children));
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
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

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
    if (!('querySelectorAll' in element)) return;

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
  return element.getAttribute(name.indexOf('data') === 0 ? name : 'data-' + name);
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
  return name.indexOf('data') === 0 ? getData(element, name) : getProp(element, name);
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
  return getProp(element, 'innerHTML');
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

  classes = _stringToArray(classes);

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
  element = getElement(element);

  if (!element || !('parentNode' in element)) return;

  var parent = element.parentNode;

  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      node = createElement(node);
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
  element = getElement(element);

  if (!element || !('parentNode' in element)) return;

  var parent = element.parentNode;

  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      node = createElement(node);
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
  return getProp(element, 'nextElementSibling');
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
  return getProp(element, 'parentNode');
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
  return getProp(element, 'previousElementSibling');
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

function _applyForEach(elements, method, args) {
  return forElements(elements, function (element) {
    if (!element[method]) return;

    forEach(args, function (arg) {
      element[method](arg);
    });
  });
}

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {Array | string} attributes - Array of attributes' name, string of attributes' name seperated by space and/or comas or name of a single attribute.
 * @return {Array} elements - The elements for chaining.
 * import { createElement, append, removeAttr } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * removeAttr('.salmon', 'data-fish') //returns: [<div class="salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.removeAttr('.salmon', 'data-fish') //returns: [<div class="salmon"></div>]
 */
function removeAttr(elements, attributes) {
  return _applyForEach(elements, 'removeAttribute', _stringToArray(attributes));
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
  return _updateClassList(elements, 'remove', classes);
}

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {Array | string} attributes - Array of attributes' name, string of attributes' name seperated by space and/or comas or name of a single attribute.
 * @return {Array} elements - The elements for chaining.
 * import { createElement, append, removeAttr } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * removeAttr('.salmon', 'data-fish') //returns: [<div class="salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.removeAttr('.salmon', 'data-fish') //returns: [<div class="salmon"></div>]
 */
function removeAttr$1(elements, attributes) {
  return _applyForEach(elements, 'removeAttribute', _stringToArray(attributes, 'data-'));
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
  return setProp(elements, { 'innerHTML': string });
}

/**
 * Iterates over classes and toggle it on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {string | Array | Object} classes - Array of classes or string of classes seperated with comma and/or spaces.
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
function toggleClass(elements, input) {
  if (input instanceof Array || typeof input === 'string') {
    var _ret = function () {
      var classes = _stringToArray(input);

      return {
        v: forElements(elements, function (element) {
          if (!element.classList) return;

          forEach(classes, function (className) {
            element.classList.toggle(className);
          });
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return forElements(elements, function (element) {
      if (!element.classList) return;

      forIn(input, function (classes, condition) {
        forEach(_stringToArray(classes), function (className) {
          element.classList.toggle(className, condition(element));
        });
      });
    });
  }
}

function _setEvents(elements, method, input) {
  method += 'EventListener';

  return forElements(elements, function (element) {
    forIn(input, function (events, callback) {
      forEach(_stringToArray(events), function (event) {
        return element[method](event, callback);
      });
    });
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
  elements = _setEvents(elements, 'add', input);

  return {
    off: function off(element) {
      _setEvents(element || elements, 'remove', input);
    }
  };
}

/**
* Callback to execute on event.
* @callback eventCallback
* @param {Event} event - Triggered event.
*/

/**
 * Bind events listener on delegate and execute callback when target matches selector (targets doesn't have to be in the DOM at binding).
 * @param {string} selector - The selector to match.
 * @param {string | Array} events - Array of events to listen or string of events seperated with comma and/or spaces.
 * @param {bindCallback} callback - The callback to execute when one event is triggered.
 * @return {Object} object - An object with unbind method for unbinding.
 * @return {function} object.unbind - The unbind method.
 * @example //esnext
 * import { createElement, append, bind, trigger } from 'chirashi'
 * const listener = bind('.cheese, .wasabi', {
 *   'click': (e, target) => {
 *     console.log('clicked', target)
 *   }
 * })
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.unbind() //remove listeners
 * @example //es5
 * var listener = Chirashi.bind('.cheese, .wasabi', {
 *   'click': function (e, target) {
 *     console.log('clicked', target)
 *   }
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.unbind() //remove listeners
 */
function bind(selector, input) {
  var delegate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;

  var eventsObj = {};
  forIn(input, function (events, callback) {
    eventsObj[events] = function (event) {
      var target = closest(event.target, selector, delegate);
      if (target) callback(event, target);
    };
  });

  var bound = on(delegate, eventsObj);

  return {
    unbind: bound.off
  };
}

/**
* Callback to execute on event.
* @callback bindCallback
* @param {Event} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/

/**
 * Bind events listener on each element of elements and unbind after first triggered.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be bound seperated with spaces
 * @param {eventCallback} callback - The callback used for event binding
 * @return {object} offObject - An object with off method for unbinding
 * @return {object.off} off - off method
 */
function once(elements, input) {
  var listener = void 0;
  var eventsObj = {};

  forIn(input, function (events, callback) {
    eventsObj[events] = function (event) {
      callback(event);

      listener.off();
    };
  });

  listener = on(elements, eventsObj);

  return {
    cancel: listener.off
  };
}

/**
 * Execute callback when dom is ready.
 * @param {eventCallback} callback - The callback.
 */
function ready(callback) {
  return once(document, {
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
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  elements = getElements(elements);

  if (!elements.length) return;

  options = _extends({}, options, defaults$1);

  forEach(_stringToArray(events), function (event) {
    event = new window.CustomEvent(event, options);

    forEach(elements, function (element) {
      return element.dispatchEvent(event);
    });
  });

  return elements;
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
* Set the provided style to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} style - The style options as object linking value to property
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
function clearStyle(elements, props) {
  props = _stringToArray(props);

  var style = {};
  forEach(props, function (prop) {
    return style[prop] = '';
  });

  return setStyle(elements, style);
}

/**
 * Get height in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} height - The height in pixels
 */
function getHeight(element) {
  var inner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return getProp(element, inner ? 'clientHeight' : 'offsetHeight');
}

/**
 * Get width in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} width - The width in pixels
 */
function getWidth(element) {
  var inner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return getProp(element, inner ? 'clientWidth' : 'offsetWidth');
}

/**
 * Get size in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} size - The size in pixels
 */
function getSize(element) {
  var inner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return {
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

  return ret.indexOf('px') === -1 ? ret : parseFloat(ret);
}

/**
 * Hide each element of elements using visibility.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @return {string | Array | NodeList | HTMLCollection} elements for chaining
 */
function hide(elements) {
  return setStyle(elements, { visibility: 'hidden' });
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
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector.
* @param {number} width - The width value.
* @param {number} height - The height value.
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining.
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
  return setStyle(elements, { visibility: 'visible' });
}

function _transformMatrix(transformation) {
  var x = 'x' in transformation ? transformation.x : 0;
  var y = 'y' in transformation ? transformation.y : 0;
  var z = 'z' in transformation ? transformation.z : 0;

  var scaleX = void 0,
      scaleY = void 0,
      scaleZ = void 0;
  if ('scale' in transformation) {
    if (_typeof(transformation.scale) === 'object') {
      scaleX = 'x' in transformation.scale ? transformation.scale.x : 1;
      scaleY = 'y' in transformation.scale ? transformation.scale.y : 1;
      scaleZ = 'z' in transformation.scale ? transformation.scale.z : 1;
    } else {
      scaleX = scaleY = transformation.scale;
      scaleZ = 1;
    }
  } else {
    scaleX = scaleY = scaleZ = 1;
  }

  var rotateX = void 0,
      rotateY = void 0,
      rotateZ = void 0;
  if ('rotate' in transformation) {
    if (_typeof(transformation.rotate) === 'object') {
      rotateX = 'x' in transformation.rotate ? transformation.rotate.x : 0;
      rotateY = 'y' in transformation.rotate ? transformation.rotate.y : 0;
      rotateZ = 'z' in transformation.rotate ? transformation.rotate.z : 0;
    } else {
      rotateX = rotateY = 0;
      rotateZ = transformation.rotate;
    }
  } else {
    rotateX = rotateY = rotateZ = 0;
  }

  var skewX = void 0,
      skewY = void 0;
  if ('skew' in transformation) {
    if (_typeof(transformation.skew) === 'object') {
      skewX = 'x' in transformation.skew ? transformation.skew.x : 0;
      skewY = 'y' in transformation.skew ? transformation.skew.y : 0;
    } else {
      skewX = skewY = transformation.skew;
    }
  } else {
    skewX = skewY = 0;
  }

  var cosRotateX = Math.cos(rotateX);
  var sinRotateX = Math.sin(rotateX);
  var cosRotateY = Math.cos(rotateY);
  var sinRotateY = Math.sin(rotateY);
  var cosRotateZ = Math.cos(rotateZ);
  var sinRotateZ = Math.sin(rotateZ);
  var tanSkewX = Math.tan(skewX);
  var tanSkewY = Math.tan(skewY);

  var matrix = [scaleX * cosRotateY * cosRotateZ, sinRotateZ + tanSkewY, -sinRotateY, 0, -sinRotateZ + tanSkewX, scaleY * cosRotateX * cosRotateZ, sinRotateX, 0, sinRotateY, -sinRotateX, scaleZ * cosRotateX * cosRotateY, 0, x, y, z, 1];

  forEach(matrix, function (item, index) {
    matrix[index] = +item.toFixed(2);
  });

  return matrix;
}

/**
 * Set the provided transformation to all elements using a matrix if needed and 3d if supported.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {object} [transformation] - The transformation as an object
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
function transform(elements, transformation) {
  setStyle(elements, { transform: 'matrix3d(' + _transformMatrix(transformation).join(',') + ')' });
}

var index = {
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
  removeAttr: removeAttr,
  removeClass: removeClass,
  removeData: removeAttr$1,
  setAttr: setAttr,
  setData: setData,
  setHtml: setHtml,
  setProp: setProp,
  toggleClass: toggleClass,
  bind: bind,
  on: on,
  once: once,
  ready: ready,
  trigger: trigger,
  clearStyle: clearStyle,
  getHeight: getHeight,
  getSize: getSize,
  getStyle: getStyle,
  getWidth: getWidth,
  hide: hide,
  offset: offset,
  position: position,
  screenPosition: screenPosition,
  setHeight: setHeight,
  setSize: setSize,
  setStyle: setStyle,
  setWidth: setWidth,
  show: show,
  transform: transform
};

module.exports = index;
