module.exports = function (app) {

  app.directive('uiDropdown', function () {

    return {
      restrict: 'A',
      scope: true,
      controllerAs: 'dropdown',
      controller: function ($scope, $element) {

        var ctrl = this
          , $html = angular.element(document.documentElement);

        ctrl.active = false;

        ctrl.toggle = function (ev) {
          ctrl.active = !ctrl.active;
          ev.stopPropagation();
        };

        ctrl.show = function () {
          ctrl.active = true;
        };

        ctrl.hide = function () {
          ctrl.active = false;
        };

        function onClick() {
          ctrl.hide();
          $scope.$digest();
        }

        function onKeyup(ev) {
          if (ev.keyCode != 27)
            return;
          ctrl.hide();
          $scope.$digest();
        }

        $html.on('click', onClick);
        $html.on('keyup', onKeyup);

        $element.on('$destroy', function () {
          $html.off('click', onClick);
          $html.off('keyup', onKeyup);
        });

      }
    };

  });

};

