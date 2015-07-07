# Angular ngResource made simple

This module exports a `Resource` service that allows you to create
constructors for working with your data via REST.

A typical constructor looks like this:

```js
app.factory('Product', ['Resource', function (Resource) {

  return new Resource({
    list: '/products',
    get: '/product/:productId'
  }, {
    productId: '=_id'
  });

}]);
```

You can use this constructor later like this:

```js
controller: ['Product', function(Product) {

  // List products, returns promise of Array<Product>
  Product.$list({
    page: 1,    // these are sent as query params
    limit: 10
  });
  
  // Get a product, returns promise of Product
  Product.$get({
    productId: 12345
  });
  
  // Create an instance of Product
  
  var product = new Product({
    title: 'Banana',
    price: 20
  });
  
  // Automatic dirty tracking
  product.title = 'Orange';
  product.$diff()   // { title: 'Orange' };
  
  // HTTP POST entire document, returns promise, accepts opt. callback
  product.$post(function(err) {
    // Do something when done
  });
  
  // HTTP PUT only what's modified, returns promise, accepts opt. callback
  product.$put(/* ... */);
  
  // HTTP DELETE, returns promise, accepts opt. callback
  product.$delete(/* ... */);

}];
```

All I/O methods return promise so that they are super-friendly to
[ui-router](https://github.com/angular-ui/ui-router):

```js
.state('product', {
  url: '/product/:productId',
  resolve: {
    product: [ '$stateParams', 'Product',
      function($stateParams, Product) {
        return Product.get($stateParams);
      }]
  },
  controller: [ '$scope', 'product', function($scope, product) {
    $scope.product = product;
  }]
});
```

## Usage

Add `Resource` service to your Angular module directly:

```js
var app = angular.module('myApp', []);

require('ngkit.resource')(app);
```

Note: ngKit requires Browserify.

## License

ISC / Boris Okunskiy
