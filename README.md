# Chirashi - WIP

## Getting Started

### Prerequisites

To use Chirashi, you need to work with Webpack or Browserify and Babel (running on node_modules).

### Installation

Install Chirashi using npm:

```
npm install --save chirashi
```

Now you can import functions in your project:

```js
import { ready } from 'chirashi';

ready(() => {
  alert('Hello World!');
});
```

The main purpose of this library is to stay as lightweight so the best way to use it is by using a loader:

```js
// in chirashi-loader.js

export { ready, append } from 'chirashi';

// in app.js

import * as chirashi from 'chirashi-loader';

chirashi.ready(() => {
  chirashi.append(document.body, '<h1>Hello World!</h1>');
});
```

### Functions

#### Core

* `forEach (elements, callback)`: excecute `callback` on each element of `elements` from last to first.

* `getElement (element)`: get a DOM element from `element`. Simply return `element` if it's a DOM element, the first element if it's an Array or NodeList or the first matching if selector.

* `getSelector (selector)`: return the first element matching the `selector`.

* `getSelectorAll (selector)`: return all elements matching the `selector`.

* `isDomElement (element)`: return true if `element` is a HTMLElement, SVGElement, window or document.

#### DOM

* `addClass (elements, classes)`: add all `classes` to `elements`.

* `removeClass (elements, classes)`: remove all `classes` from `elements`.

* `toggleClass (elements, classes)`: toggle all `classes` from `elements`.

* `removeClass (elements, classes)`: remove all `classes` from `elements`.

* `createElement (string)`: return a DOM element created from `string` which has to be HTML.

* `append (elements, node)`: append `node` to each element of `elements`. If `node` is a string it will be passed to `createElement`.

* `insertBefore (elements, node)`: insert `node` before each element of `elements`. If `node` is a string it will be passed to `createElement`.

* `insertAfter (elements, node)`: insert `node` after each element of `elements`. If `node` is a string it will be passed to `createElement`.

* `clone (element)`: return a clone of `element`.

* `closest (element, selector)`: return the first element matching the `selector` traveling up the DOM tree from `element` or `null`.

* `setAttr (elements, attributes)`: set each attribute from the object `attributes` for each element of `elements`.

* `getAttr (element, name)`: get attribute `name` from `element`.

* `attr (elements, option)`: call `setAttr` if `option` is an object else call `getAttr`.

* `removeAttr (elements, name)`: remove the attribute `name` from `elements`.

* `setData (elements, attributes)`: set each data-attribute from the object `attributes` for each element of `elements`.

* `getData (element, name)`: get data-attribute `name` from `element`.

* `data (elements, option)`: call `setData` if `option` is an object else call `getData`.

* `removeData (elements, name)`: remove the data-attribute `name` from `elements`.

* `setProp (elements, props)`: set each property from the object `props` for each element of `elements`.

* `getProp (element, name)`: get property `name` from `element`.

* `prop (elements, option)`: call `setProp` if `option` is an object else call `getProp`.

* `empty (elements)`: empty each element of `elements`.

* `setHtml (elements, string)`: set `string` as `innerHTML` for each element of `elements`.

* `getHtml (element)`: get `innerHTML` for `element`.

* `html (elements, string)`: call `setHtml` if `string` is a string else call `getHtml`.

* `find (element, selector)`: return all DOM elements matching `selector` in `element`'s children.

* `indexInParent (element)`: return index of `element` in its parent.

* `prev (element)`: return the element before `element`.

* `next (element)`: return the element after `element`.

* `parent (element)`: return the parent of `element`.

* `remove (elements)`: remove all `elements` from DOM.

#### Events

* `on (elements, events, callback)`: call `callback` for each event of `events` on each element of `elements`.

* `off (elements, events, callback)`: unbind events from `on`.

* `hover (elements, enter, leave)`: call `enter` when mouse enter an element of `elements` and `leave` when mouse leave.

* `unhover (elements, enter, leave)`: unbind events from `hover`.

* `load (elements, eachCallback, allCallback)`: call `eachCallback` when one element of `elements` is loaded and call `allCallback` when all `elements` are loaded.

* `resize (callback)`: call `callback` on window resize. Return the real callback for unbind.

* `unresize (callback)`: unbind resize callback.

* `ready (callback)`: call `callback` when DOM is ready.
