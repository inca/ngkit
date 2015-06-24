# ngKit context highlight

Super-simple context highlighter: adds `active` class to specified selector.

```html
<nav>
  <a id="page-one" href="/one">One</a>
  <a id="page-two" href="/two">Two</a>
  <a id="page-three" href="/three">Three</a>
</nav>

<section ui-hl="#page-one">
  <h1>One</h1>
</section>
```

When the element is destroyed, the class is removed. Additionally you can
specify another class using `ui-hl-class` attribute.

This solution has proven extremely useful in static pages assembly
with dynamic navigations. We've been doing that for years, yeah.

## Usage

Add `ui-hl` directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.hl')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
