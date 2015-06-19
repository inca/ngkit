# ngKit image zoom

Lightweight image zoom for Angular (similar to Medium's).

```html
<img ui-zoom="'large.png'"
     src="thumb.jpg" />
```

Note that `ui-zoom` attribute is an expression, don't forget extra quotes
if you're using string literals. If you omit the value, `src` attribute is taken.

See `zoom.css` for example styling.

## Usage

Add 'ui-zoom' directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.zoom')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
