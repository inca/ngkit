# ngKit textarea autosize

Autosize textarea without dummy elements.

```html
<textarea ui-autosize
          ng-model='value'></textarea>
```

ngModel is optional.

## Usage

Add `ui-autosize` directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.autosize')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
