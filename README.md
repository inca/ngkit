# ngKit — Angular UI Kit

Tiny Browserify-friendly Angular UI components.
 
Key features:

* each component is available separately in npm
* pure modules (see below)
* very small footprint per component
* no Angular dependencies

## Pure modules

Unlike most Angular libraries ngKit components are packaged as "pure modules":

```js
module.exports = function (app) {

  app.directive(...);
  
  app.factory(...);

};
```

This allows one to define numerous Angular stuff (directives, services, etc.)
directly on the application module, thus effectively eliminating the performance
overhead imposed by the Angular dependency management system.

## Usage

OK, how to use these "pure modules"?

With Browserify! Just require them and pass your application:
 
```js
// Create your module, without additional Angular dependencies
var app = angular.module('myApp', []);

// Hook up stuff from ngKit
require('ngkit.sticky')(app);
require('ngkit.smoothScroll')(app);
// etc.
```

Piece of cake, huh?

## Components

We'll cover individual components and their usage pretty soon, stay tuned.

## License

ISC / Boris Okunskiy
