# generator-mithril [![Build Status](https://secure.travis-ci.org/hung-phan/generator-mithril.png?branch=master)](https://travis-ci.org/hung-phan/generator-mithril)

> [Yeoman](http://yeoman.io) generator


## Getting Started

To run this version of yeoman generator. First, make sure that you have already installed yeoman

```bash
$ npm install -g yo
```

To install generator-angular-with-require from npm, run:

```bash
$ npm install -g generator-mithril
```

Finally, initiate the generator:

```bash
$ yo mithril
```

Other dependencies

1. [Bower] (http://bower.io/)

2. [Grunt] (http://gruntjs.com/)

3. SASS (gem install sass)

4. Compass (gem install compass)

## Known bug
__Don't use browserify for now__, for the reason that Mithril is not compatible with it yet.
If you eager to do it, change (this) to refer to the __window__ object.

```js
Mithril = m = new function app(window) {
...
//}(this)
}(window)
```

## Browserify alias
Alias for grunt browserify task are declared in __browserify.config.js__ with the format of __path:alias__.

## Usage

Your main javascript file is placed in app/scripts/index.js. The main.js is generated from grunt browserify task - I recommend to
leave the app/main.js unchanged. (For browserify)

The version of generator uses SASS Bootstrap as its main theme. If you want to use Compass framework, make sure that you
view their docs to know what to include [Compass](http://compass-style.org/reference/compass)

To run the serve, and start building your application
```
$ grunt serve
```
It will automatically open the webpage on your localhost:9000, or you will have to do it manuallly

To build files for production
```
$ grunt build
```

This also supports for subgenerator for components. Make sure you link them in your
main module

__working on__

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
