# ngKit compare input values

A validator for a typical scenario where the user is required to retype
email or password into another field.

```html
<label>
Your password:
<input type='password'
       ng-model='user.password'/>
</label>

<label>
Retype password:
<input type='password'
       ng-model='user.confirmPassword'
       compare-to='user.password'/>
</label>
```

Add some styles as you see fit.

## Usage

Add `compare-to` directive to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.compare-to')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
