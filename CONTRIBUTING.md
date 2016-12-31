# Contributing to chirashijs :sushi:

Thank you very much for considering contributing to chirashijs 👌

The following is a set of guidelines and things to know about chirashi and plugins hosted in the [chirashijs organization](https://github.com/chirashijs) on GitHub.

By contributing to chirashijs you agree to respect the [Open Source code of conduct](https://opensource.org/codeofconduct).

## chirashijs' design

### libraries should serve one goal only
For example, [chirashi](https://github.com/chirashijs/chirashi) is for DOM manipulation, featuring styling and event management, [wasabi](https://github.com/chirashijs/chirashi-wasabi) is to trigger events when scrolling etc.
It' allows to keep libraries lights, fast to install, light in the code and easy to test and document. So please keep this in mind when thinking about adding features to an existing repo.

### libraries should be modular
[chirashi-loader](https://github.com/chirashijs/chirashi-loader) is a webpack loader allowing to include only needed files in the final build.<br/>
To serve this purpose, libraries' code should be modular as well. An entry file wrap all repo's content for users not using ES6 or Webpack, see [this example](https://github.com/chirashijs/chirashi-utils/blob/master/src/index.js).<br/>
The loader use a `files.json` which should be in each repo and constructed like [this](https://github.com/chirashijs/chirashi-utils/blob/master/files.json).

### libraries should be highly customizable
We don't want chirashijs' libraries to be limiting, that's why [chirashi-slider](https://github.com/chirashijs/chirashi-slider) allows any animation when changing, [chirashi](https://github.com/chirashijs/chirashi)'s methods returns Arrays and DOM elements instead of fancy objects and [wasabi](https://github.com/chirashijs/chirashi-wasabi)'s handles can be surcharged for each zone and each scroll direction. Try to respect this philosophy in mind when contributing.

### libraries should be fast and lightweight
To keep the code efficient don't bother supporting all existing browsers, code straight to the point, for latest browsers only. If polyfills are needed, just list it in the documentation.

## Styleguides

### JavaScript Styleguide
All JavaScript must adhere to [JavaScript Standard Style](http://standardjs.com/). Code is automatically reviewed using [codeclimate](https://codeclimate.com/) so please consider testing your code locally using [codeclimate's CLI](https://github.com/codeclimate/codeclimate) and fix issues before submitting your pull request.

### Unit testing
Ideally all chirashijs' libraries should have a 100% code coverage so please consider writing tests for the code you had or change. Tests are executing using [karma](https://github.com/karma-runner/karma) and [chaijs](http://chaijs.com/), reports are generated using [istanbul](https://github.com/gotwarlost/istanbul).

## Fun begins
* Open an issue on GitHub documenting your problem if it doesn't exists yet
* Fork and clone the repo
* Enjoy coding :tada:
* Push to your fork and open a pull request
* Receive many thanks for your contribution :smile::+1:
