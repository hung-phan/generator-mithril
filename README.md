# generator-mithril [![Build Status](https://secure.travis-ci.org/hung-phan/generator-mithril.png?branch=master)](https://travis-ci.org/hung-phan/generator-mithril)

> [Yeoman](http://yeoman.io) generator

[![NPM](https://nodei.co/npm/generator-mithril.png?downloads=true)](https://nodei.co/npm/generator-mithril/)

## Getting Started

To run this version of yeoman generator. First, make sure that you have already installed yeoman:

```bash
$ npm install -g yo
```

To install generator-mithril from npm, run:

```bash
$ npm install -g generator-mithril
```

Finally, initiate the generator:

```bash
$ yo mithril
```

Other dependencies

1. [Bower](http://bower.io/)
2. [Grunt](http://gruntjs.com/)
3. [Sass](http://sass-lang.com/) (`gem install sass`)
4. [Compass](http://compass-style.org/) (`gem install compass`)

## Known bug Mithril 0.1.15
For __Browserify__, change the source code to the following.

```js
Mithril = m = new function app(window) {
...
//}(this)
}(window)
```

## Browserify alias
Aliases for `grunt browserify` tasks are declared in [`browserify.config.js`](https://github.com/hung-phan/generator-mithril/blob/master/app/templates/browserify.config.js) with the format “*path*:*alias*”.

## Usage

Your main JavaScript file is placed in `app/scripts/index.js`. The `main.js` is generated from the `grunt browserify` task – I recommend that you leave
leave the `app/main.js` unchanged, for browserify.

The version of generator uses Sass Bootstrap as its main theme. If you want to use the Compass framework, make sure that you
view [their docs](http://compass-style.org/reference/compass) to know what to include.

To run the server, and start building your application:
```bash
$ grunt serve
```
It will automatically open the webpage on your `localhost:9000`, or you will have to do it manuallly.

To build files for production:
```bash
$ grunt build
```

This also implements a subgenerator for components. Make sure you link them in your
main module.
```bash
$ yo mithril:component "name" # replace name with your module name
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
