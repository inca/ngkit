module.exports = function (app) {

  app.factory('Resource', [ '$q', '$http',
    function ($q, $http) {

      function formatUrlParams(url, params) {
        params = params || {};
        var result = {
          url: url,
          params: angular.copy(params)
        };
        result.url = url.replace(/:([a-zA-Z0-9_]+)/g, function (match, $1) {
          var value = params[$1];
          if (value) {
            delete result.params[$1];
            return value;
          }
          return '';
        }).replace(/\/+$/, '');
        return result;
      }

      var StaticMethods = {

        $find: function (url, params) {
          var Self = this;
          var fmt = formatUrlParams(url, Self.$getParams(params));
          return $http.get(fmt.url, { params: fmt.params })
            .then(function (resp) {
              var results = resp.data;
              results.items = (results.items || []).map(function (item) {
                return new Self(item);
              });
              return results;
            });
        },

        $list: function (params) {
          return this.$find(this.$endpoints.list, params);
        },

        $get: function (params) {
          var Self = this;
          var url = Self.$endpoints.get;
          var fmt = formatUrlParams(url, Self.$getParams(params));
          return $http.get(fmt.url)
            .then(function (resp) {
              return new Self(resp.data);
            });
        },

        $setParams: function (params) {
          angular.extend(this.$params, params);
          return this;
        },

        $getParams: function (params) {
          var result = angular.extend({}, this.$params, params);
          Object.keys(result).forEach(function (key) {
            var value = result[key] || '';
            if (value.toString().charAt(0) == '=')
              delete result[key];
          });
          return result;
        },

        $onError: function (reason) {
          $q.reject(reason);
        }

      };

      var InstanceMethods = {

        $endpoint: function (endpoint) {
          var self = this
            , _params = angular.extend({}, self.$resource.$params, self.$params);
          Object.keys(_params).forEach(function (key) {
            var value = _params[key];
            if (value.charAt(0) == '=')
              _params[key] = self[value.substring(1)];
            else
              _params[key] = value;
          });
          var url = self.$resource.$endpoints[endpoint];
          return formatUrlParams(url, _params).url;
        },

        $extend: function (data) {
          if (data && typeof data == 'object')
            angular.extend(this, data);
          return this;
        },

        $setParams: function (params) {
          angular.extend(this.$params, params);
          return this;
        },

        $diff: function () {
          var original = this.$originalData
            , changed = this
            , result = {};
          Object.keys(changed).forEach(function (key) {
            if (key.charAt(0) == '$')
              return;
            var value = changed[key];
            if (typeof value == 'function')
              return;
            if (!angular.equals(value, original[key]))
              result[key] = value;
          });
          return result;
        },

        $data: function () {
          var result = {}
            , self = this;
          Object.keys(self).forEach(function (key) {
            if (key.charAt(0) == '$')
              return;
            var value = self[key];
            if (typeof value == 'function')
              return;
            result[key] = value;
          });
          return result;
        },

        $get: function (done) {
          var self = this
            , Resource = self.$resource;
          var promise = $http.get(self.$endpoint('get'))
            .then(function (resp) {
              self.$extend(resp.data);
              self.$originalData = resp.data;
              return self;
            }, Resource.$onError);
          return typeof done == 'function' ?
            promise.then(done) :
            promise;
        },

        $put: function (done) {
          var self = this
            , Resource = self.$resource;
          var promise = $http.put(self.$endpoint('put'), self.$diff())
            .then(function (resp) {
              return self.$extend(resp.data);
            }, Resource.$onError);
          return typeof done == 'function' ?
            promise.then(done) :
            promise;
        },

        $post: function (done) {
          var self = this
            , Resource = self.$resource;
          var promise = $http.post(self.$endpoint('list'), self.$data())
            .then(function (resp) {
              return self.$extend(resp.data);
            }, Resource.$onError);
          return typeof done == 'function' ?
            promise.then(done) :
            promise;
        },

        $delete: function (done) {
          var self = this
            , Resource = self.$resource;
          var promise = $http.delete(self.$endpoint('delete'))
            .then(function (resp) {
              return resp.data;
            }, Resource.$onError);
          return typeof done == 'function' ?
            promise.then(done) :
            promise;
        }

      };

      Object.defineProperty(InstanceMethods, '$url', {
        get: function () {
          var self = this
            , _params = angular.extend({}, self.$resource.$params, self.$params);
          Object.keys(_params).forEach(function (key) {
            var value = _params[key];
            if (value.toString().charAt(0) == '=')
              _params[key] = self[value.substring(1)];
            else
              _params[key] = value;
          });
          var url = self.$resource.$endpoints.get;
          return formatUrlParams(url, _params).url;
        }
      });

      return function (endpoints, params) {
        // Process endpoints
        endpoints = endpoints || {};
        // `post` endpoint defaults to `list` if not specified
        endpoints.post = endpoints.post || endpoints.list;
        // `put` and `delete` endpoints default to `get` if not specified
        endpoints.put = endpoints.put || endpoints.get;
        endpoints.delete = endpoints.delete || endpoints.get;
        // Prepare and return constructor
        var Resource = function (data) {
          if (!(this instanceof Resource))
            return new Resource(data);
          data = data || {};
          this.$extend(data);
          this.$originalData = angular.copy(data);
          this.$resource = Resource;
          this.$params = {};
        };
        angular.extend(Resource, StaticMethods);
        Resource.prototype = InstanceMethods;
        Resource.$endpoints = endpoints;
        Resource.$params = params || {};
        return Resource;
      };

    }
  ]);

};
