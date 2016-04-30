# Chirashi

## Getting Started

In all examples I will presume that your using ES2015 syntax with imports.

### Installation

Install Chirashi using npm:

```
npm install --save chirashi
```

Now you can import functions in your project:

```js
import $ from 'chirashi'

ready(() => {
  alert('Hello World!')
})
```

The main purpose of this library is to stay as lightweight so the best way to use it is by using a loader:

```js
// in chirashi-loader.js

export { ready, append } from 'chirashi'

// in app.js

import * as chirashi from 'chirashi-loader'

chirashi.ready(() => {
  chirashi.append(document.body, '<h1>Hello World!</h1>')
})
```

## What's included ?

### Functions

#### Core

* `forEach (elements, callback)`: excecute `callback` on each element of `elements` from last to first.

* `forElements (elements, callback)`: same as for but excecuting callback only for DOM elements.

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

* `trigger (elements, events)`: trigger all `events` passed as string on each element of `elements`.

* `hover (elements, enter, leave)`: call `enter` when mouse enter an element of `elements` and `leave` when mouse leave.

* `unhover (elements, enter, leave)`: unbind events from `hover`.

* `load (elements, eachCallback, allCallback)`: call `eachCallback` when one element of `elements` is loaded and call `allCallback` when all `elements` are loaded.

* `resize (callback)`: call `callback` on window resize. Return the real callback for unbind.

* `unresize (callback)`: unbind resize callback.

* `scroll (callback)`: call `callback` with an argument featuring top and left on scroll. Return the real callback for unbind.

* `unscroll (callback)`: unbind scroll callback.

* `ready (callback)`: call `callback` when DOM is ready.

#### Styles

* `getHeight (element)`: return `element`'s offset height.

* `setHeight (elements, height)`: set `height` for all `elements`.

* `height (elements, height)`: call `setHeight` if argument `height` is defined, else call `getHeight`.

* `getWidth (element)`: return `element`'s offset height.

* `setWidth (elements, width)`: set `width` for all `elements`.

* `width (elements, width)`: call `setWidth` if argument `width` is defined, else call `getWidth`.

* `getSize (element)`: return `element`'s width and height in an object.

* `setSize (elements, width, height)`: set `width` and `height` for all `elements`.

* `size (elements, width, height)`: call `setSize` if arguments `width` and `height` are defined, else call `getSize`.

* `getStyle (element, property)`: return `element`'s value for CSS `property`.

* `setStyle (elements, options)`: set CSS properties from `options` keys as respective values for each element of `elements`.

* `style (elements, option)`: call `setStyle` if argument `option` is an object or `getStyle` if argument `option` is a string.

* `hide (elements)`: set display property as none for each element of `elements`.

* `show (elements)`: unset inline display property for each element of `elements`.

* `offset (element)`: return top and left offsets of `element` as object.

* `position (element)`: return `element`'s position relative to its parent as object.

* `screenPosition (element)`: return `element`'s position relative to the screen as object.

* `transform3d (elements, transformation)`: apply a 3D matrix on each element of `elements` for `transformation` described as object. Support: x, y, z, rotate (2D rotation in radiant), rotateX, rotateY, rotateZ, scale, scaleX, scaleY, scaleZ, skew, skewX and skewY.
Each propertyAXIS value can be declared as:
```js
property: {
    x: valueX,
    y: valueY,
    z: valueZ
}
```

* `transform2d (elements, transformation)`: apply a 2d matrix on each element of `elements` for `transformation` described as object. Support: x, y, rotate (2D rotation in radiant), scale, scaleX, scaleY, skew, skewX and skewY.
Each propertyAXIS value can be declared as:
```js
property: {
    x: valueX,
    y: valueY
}
```

* `transform (elements, transformation)`: execute `transform3d` if 3D matrices are supported, else execute `transform2d`.

#### Is tests

* `isIE (version)`: return true if the navigator's user agent correspond to Internet Explorer of `version`. Return IE version or false if `version` is not defined.

* `isLarger (width)`: return true if the window is larger than `width`.

* `isAndroid()`, `isChrome()`, `isFirefox()`, `isIOS()`, `isIPad()`, `isIPod()`, `isSafari()`: all based on user agent.

* `isDefined()`
* `isObject()`

#### Utils

* `deepClone (object)`: return a deep clone of `object`.

* `defaultify (options, defaults)`: return `defaults` applied on `options`.

### Plugins - WIP

#### Scroll60FPS

To use this plugin, just import it. It will disable pointer events while scrolling offering a smoother scroll. It also add the class `scrolling`.

#### VirtualScroll

VirtualScroll is not part of Chirashi but come from [drojdjou/bartekdrozdz.com](https://github.com/drojdjou/bartekdrozdz.com/blob/master/static/src/framework/VirtualScroll.js). Report issues [here](https://github.com/drojdjou/bartekdrozdz.com/issues).
Still it is integrated in Chirashi to make it CommonJS complient and use it in other Chirashi's plugin. You can find how to use it [here](http://www.everyday3d.com/blog/index.php/2014/08/18/smooth-scrolling-with-virtualscroll/).

#### SmootScroller

SmootScroller disable native browser's scroll to use a transformation matrix. Thanks to this, scroll appears smoother and is easier to disable or force to value.

```js
    let scroller = new SmoothScroller({
      direction: 'vertical' | 'horizontal' | 'auto',//default: 'auto'
      ease: [numeric value],//default: 0.2
      autoEase: [numeric value],//default: 0.08
      fixed: [Array, selector, NodeList or DOMElement]// default: []
    })
```

Methods:

* `on(callback)`: execute `callback` on scroll event.

* `off(callback)`: unbind `callback` for scroll event.

* `scrollTo(target)`: scroll automatically to target define as `{ x: value, y: value }`.

* `fixElement(element)`: reproduce `position: fixed` behaviour for `element`.

* `unfixElement(element)`: reset `element` transformation.

* `disable()`: disable scroll.

* `enable()`: enable scroll.

* `kill()`: reset all style changes induced by `SmootScroller`.

<!-- #### Slider

You won't have animations or controls from this plugin. It's a choice, because I want different controls for each project and I don't want Chirashi to depends on GSAP or any other animation library. So what does this plugin ? It will set fixed sizes in pixels for each slide of a slider and his wrapper. It also call the provided animation and manage swipe and touch events.

```js
let slider = new Slider({
  container: [container selector],
  wrapper: [wrapper selector relative to container],
  slides: [slides selector relative to container],
  infinite: [bool],//true if slider should loop. default: false
  slideWidth: [numeric value or string with '%'],//default: '100%'
  touchThreshold: [numeric value or string with '%'],//min touchmove size to slide. default: '50%',
  swipeTime: [numeric value],//max touch time to be a swipe in ms. default: 300
  swipeThreshold: [numeric value or string with '%'],//min swipe touchmove size to slide. default: 10,
  gutter: [numeric value] //space between slides. default: 0
})
``` -->
