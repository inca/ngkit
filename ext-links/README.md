# ngKit external links

Add `target="_blank"` to all links starting with protocol `http:` or `https:`
within the `ui-ext-links` directive.

```html
<div ui-ext-links>
  <a href='#'>Untouched</a>
  <a href='/local'>Untouched</a>
  <a href='http://foo.bar/path'>Externalized</a>
</div>
```

## Usage

Add `ui-ext-links` directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.ext-links')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
