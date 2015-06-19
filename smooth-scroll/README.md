# ngKit smooth scroll

Add this directive to anchor links (the ones that start with #)
and they'll become magically smooth!

```html
<a href='#section'
   ui-smooth-scroll>
  This link will scroll smoothly
</a>

<div id='section'>
</div>
```

You can also provide custom animation duration in milliseconds
(e.g. `ui-smooth-scroll='1000'`).

## How it works?

The default action is prevented and the `window.scrollY` becomes animated
from current position to target element top position.

No additional stylesheets required.

## Usage

Add directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.smooth-scroll')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
