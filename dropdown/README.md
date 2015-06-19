# ngKit dropdown

Add dropdown menus like a pro.

```html
<div class="has-dropdown"
     ui-dropdown>
  <button type="button"
          click="dropdown.toggle($event)">
    <span>Show menu</span>
  </button>
  
  <div class="dropdown"
       ng-class="{ active: dropdown.active }">
    <a href="">One</a>
    <a href="">Two</a>
    <a href="">Three</a>
  </div>
  
</div>
```

Add some trivial styling (you've done this stuff thousand times).

## Usage

Add `ui-dropdown` directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.dropdown')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
