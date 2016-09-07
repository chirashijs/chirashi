# Chirashi

## Get started

Find API documentation, guide and more on [chirashijs.github.io](http://chirashijs.github.io).

## Quick view

### Installation

#### Using npm

```
npm i --save chirashi
```

Now you can import methods in your project:

```js
import { ready, append } from 'chirashi'

ready(() => {
  append(document.body, '<h1>Hello World!</h1>')
})
```

For advanced usage see [chirashi-loader](https://github.com/chirashijs/chirashi-loader).

#### Standalone

You can also load [chirashi.js](https://github.com/chirashijs/chirashi/releases/download/4.1.1/chirashi.js) or [chirashi.min.js](https://github.com/chirashijs/chirashi/releases/download/4.1.1/chirashi.min.js) using a script tag. It'll create an intance of Chirashi on your window. Then use as following example

```js
Chirashi.ready(function () {
  Chirashi.append(document.body, '<h1>Hello World!</h1>')
})
```
