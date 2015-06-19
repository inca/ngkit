# ngKit image magnifier

Lightweight image magnifier for Angular (similar to Medium's).

```html
<img ui-magnifier="'large.png'"
     src="thumb.jpg" />
```

Note that `ui-magnifier` attribute is an expression, don't forget extra quotes
if you're using string literals. If you omit the value, `src` attribute is taken.

See `magnifier.css` for example styling.

## Usage

Add 'ui-magnifier' directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.magnifier')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
