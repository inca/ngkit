module.exports = function (app) {

  app.factory('notices', [ '$timeout',
    function ($timeout) {

      return {

        queue: [],

        add: function (text, kind, timeout) {
          var notices = this;
          var notice = {
            id: Math.random().toString(36).substring(2),
            text: text,
            kind: kind || 'info'
          };
          notices.queue.push(notice);
          $timeout(function () {
            notices.remove(notice);
          }, timeout == null ? 10000 : timeout);
          return this;
        },

        remove: function (notice) {
          var id = typeof notice == 'string' ? notice : notice.id;
          for (var i = 0; i < this.queue.length; i++) {
            var n = this.queue[i];
            if (n.id == id) {
              this.queue.splice(i, 1);
              return this;
            }
          }
          return this;
        },

        addInfo: function (text, timeout) {
          return this.add(text, 'info', timeout);
        },

        addSuccess: function (text, timeout) {
          return this.add(text, 'success', timeout);
        },

        addWarn: function (text, timeout) {
          return this.add(text, 'warn', timeout);
        },

        addError: function (text, timeout) {
          return this.add(text, 'error', timeout);
        },

        clear: function () {
          this.queue = [];
        }

      };
    }
  ]);

  app.directive('uiNotices', [ 'notices',
    function (notices) {
      return {
        restrict: 'EA',
        template: '<div ng-class="[\'notice\', notice.kind]" ' +
          'ng-repeat="notice in notices.queue">{{notice.text}}</div>',
        link: function ($scope) {
          var $wnd = angular.element(window);
          $wnd.on('keyup', function (ev) {
            if (ev.keyCode != 27)
              return;
            notices.clear();
            $scope.$digest();
          });
        }
      };
    }
  ]);

};

