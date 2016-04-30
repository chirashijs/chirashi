# Chirashi

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
import { ready } from 'chirashi'

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
