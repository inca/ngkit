# ngKit notices

Quickly add disposable messages to your application.

```html
<div ui-notices></div>
```

Use `notices` service to display them.

```js
['notices', function (notices) {

  notices.addInfo('I am a message');

}];
```

Style with stylesheets.

## Usage

Add `ui-notices` directive and `notices` factory to your Angular
module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.notices')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
