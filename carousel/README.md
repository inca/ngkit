# ngKit carousel

Extra fat-free carousel slider for Angular.

```html
<div class="carousel carousel-3d"
     ui-carousel="myCollection">
  <div class="carousel-items carousel-items-3d">
    <div class="carousel-item carousel-item-3d"
         ng-class="carousel.getClass($index)"
         ng-repeat="element in myCollection track by $index">
      <div>Slide content</div>
    </div>
  </div>
  <div class="carousel-nav">
    <a href=""
       class="carousel-nav-link"
       ng-click="carousel.go($index)"
       ng-repeat="element in myCollection track by $index">
      <span>$index</span>
    </a>
  </div>
</div>
```

Carousel itself heavily relies on styling.
See `carousel.css` for example stylesheets.

## Usage

Add `ui-carousel` directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.carousel')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
