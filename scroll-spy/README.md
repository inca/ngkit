# ngKit scroll spy

Scroll spy anchor links change classes when scrolled beyond the elements
they reference to. Scroll spies are usually combined with sticky.

```html
<div class="grid">
  <aside ui-sticky ui-scroll-spy>
    <a href="#top">Page title</a>
    <a href="#heading1">Heading 1</a>
    <a href="#heading2">Heading 2</a>
  </aside>
  <article>
    <div id="top">
      <h1 id="heading1">Heading 1</h1>
      ...
      <h2 id="heading2">Heading 2</h2>
    </div>
  </article>
</div>
```

Add some styles as you see fit.

## Usage

Add `ui-scroll-spy` directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.scroll-spy')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
