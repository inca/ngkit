# ngKit pure HTML5 sortable

Make your elements sortable by leveraging HTML5 draggable and some subtle
styling.

```html
<div ui-sortable="myCollection"
     ui-sortable-update="saveStuff()">
  <div ui-sortable-item
       draggable="true"
       ng-repeat="element in myCollection">
    <span>{{ element }}</span>
  </div>
</div>
```

When dragging, sortable item receives some classes so that you can style
stuff as appropriate:

  * dragging
  * drag-over
  * drag-over-before
  * drag-over-after

## Usage

Add `ui-sortable` directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.sortable')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
