# Contributing to chirashijs :sushi:

Thank you very much for considering contributing to chirashijs 👌

The following is a set of guidelines and things to know about chirashi and plugins hosted in the [chirashijs organization](https://github.com/chirashijs) on GitHub.

By contributing to chirashijs you agree to respect the [code of conduct](CODE_OF_CONDUCT.md).

## chirashijs' design

### Libraries should serve one goal only
For example, [chirashi](https://github.com/chirashijs/chirashi) is meant to deal with DOM manipulation, featuring styling and event management, [wasabi](https://github.com/chirashijs/chirashi-wasabi) allows to trigger events when scrolling etc.
It allows to keep libraries lights, fast to download and install, with a simpler code and easy to test and document. So please keep this in mind when thinking about adding features to an existing repo.

### Libraries should be modular
[chirashi-loader](https://github.com/chirashijs/chirashi-loader) is a Webpack loader allowing to include only needed files in the final build.<br/>
To serve this purpose, libraries' code should be modular as well. An entry file wrap all repo's exports for users not using ES6 or Webpack, see [this example](https://github.com/chirashijs/chirashi-utils/blob/master/src/index.js).<br/>
The loader uses a `files.json` which should be in each repo and constructed like [this](https://github.com/chirashijs/chirashi-utils/blob/master/files.json).

### Libraries should be highly customizable
We don't want chirashijs' libraries to be limiting, that's why [chirashi-slider](https://github.com/chirashijs/chirashi-slider) allows any animation when changing, [chirashi](https://github.com/chirashijs/chirashi)'s methods returns Arrays and DOM elements instead of fancy objects and [wasabi](https://github.com/chirashijs/chirashi-wasabi)'s handles can be surcharged for each zone and each scroll direction. Try to respect this philosophy while contributing.

### Libraries should be fast and lightweight
To keep the code efficient don't bother supporting all existing browsers, code straight to the point, for latest browsers only. If polyfills are needed, just list them in the documentation.

## Styleguides

### JavaScript Styleguide
All JavaScript must adhere to [JavaScript Standard Style](http://standardjs.com/). Code is automatically reviewed using [codeclimate](https://codeclimate.com/), you can install [codeclimate's CLI](https://github.com/codeclimate/codeclimate) to run code review locally. Your pull request will be merged faster if codeclimate find no issues in your code.

### Unit testing
Ideally all chirashijs' libraries should have a 100% code coverage so please consider writing tests for the code you add and be sure you doesn't break any test with changes. Tests are executing using [karma](https://github.com/karma-runner/karma) and [chaijs](http://chaijs.com/), reports are generated using [istanbul](https://github.com/gotwarlost/istanbul).

## Fun begins
* Open an issue on GitHub documenting your problem if it doesn't exists yet
* Fork and clone the repo
* Enjoy coding :tada:
* Push to your fork and open a pull request
* Receive many thanks for your contribution :smile::+1:
