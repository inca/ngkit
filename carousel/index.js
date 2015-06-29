module.exports = function (app) {

  app.directive('uiCarousel', [ '$interval',
    function ($interval) {

      return {
        restrict: 'A',
        scope: true,
        controllerAs: 'carousel',
        controller: [ '$scope', '$element', '$attrs',
          function ($scope, $element, $attrs) {

            var ctrl = this
              , timer = null;

            ctrl.duration =
              parseInt($scope.$eval($attrs.uiCarouselDuration)) || 8000;

            ctrl.index = 0;
            ctrl.nextIndex = null;
            ctrl.previousIndex = null;

            ctrl.getClass = function (index) {
              if (index === ctrl.index) return 'active';
              if (index === ctrl.nextIndex) return 'next';
              if (index === ctrl.previousIndex) return 'previous';
              return '';
            };

            ctrl.go = function (index) {
              ctrl.index = index;
              _update();
            };

            $scope.$watch($attrs.uiCarousel, _update);

            $element.on('$destroy', function () {
              if (timer)
                $interval.cancel(timer);
            });

            function _constrain(value, length) {
              return (value + length) % length;
            }

            function _update() {
              var arr = $scope.$eval($attrs.uiCarousel);
              ctrl.index = _constrain(ctrl.index, arr.length);
              ctrl.nextIndex = _constrain(ctrl.index + 1, arr.length);
              ctrl.previousIndex = _constrain(ctrl.index - 1, arr.length);
              _initTimer();
            }

            function _initTimer() {
              if (timer)
                $interval.cancel(timer);
              timer = $interval(function () {
                ctrl.index += 1;
                _update();
              }, ctrl.duration);
            }

          }
        ]
      };

    }
  ]);

};
