module.exports = function (app) {

  app.directive('uiSticky', function () {

    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {

        var $wnd = angular.element(window)
          , $parent = $element.parent()
          , _el = $element[0]
          , yOffset = parseInt($scope.$eval($attrs.uiSticky)) || 0;

        var elementBox
          , enabled = true
          , updating = false;

        function reinit() {
          clearClasses();
          $element.removeAttr('style');
          elementBox = _el.getBoundingClientRect();
          redraw();
        }

        function redraw() {
          if (!enabled) return;
          clearClasses();
          var parentBox = $parent[0].getBoundingClientRect();
          if (parentBox.top - yOffset > 0) {
            $element.addClass('sticky-top');
            $element.removeAttr('style');
          } else if (parentBox.bottom < elementBox.height) {
            $element.addClass('sticky-bottom');
            _el.style.left = Math.round(elementBox.left - parentBox.left) + 'px';
          } else {
            $element.addClass('sticky-fixed');
            _el.style.left = Math.round(elementBox.left) + 'px';
          }
        }

        function clearClasses() {
          $element
            .removeClass('sticky-top')
            .removeClass('sticky-bottom')
            .removeClass('sticky-fixed');
        }

        function onScroll(ev) {
          if (!updating)
            window.requestAnimationFrame(function () {
              updating = false;
              redraw(ev);
            });
          updating = true;
        }

        reinit();
        $wnd.on('scroll', onScroll);
        $wnd.on('resize', reinit);
        $element.on('$destroy', function () {
          $wnd.off('scroll', onScroll);
          $wnd.off('resize', reinit);
        });

      }
    };

  });

};
