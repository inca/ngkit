module.exports = function (app) {

  app.directive('uiScrollSpy', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        var _el = $element[0]
          , yThreshold = parseInt($scope.$eval($attrs.uiScrollSpy)) || 64
          , $wnd = angular.element(window)
          , links = [].slice.call(_el.querySelectorAll('a[href^="#"]'))
          , updating = false;

        links.forEach(function (link) {
          var href = link.getAttribute('href');
          link._scrollSpyBlock = document.querySelector(href);
        });

        function update() {
          var active = null;
          for (var i = 0; i < links.length; i++) {
            var link = links[i];
            angular.element(link).removeClass('active');
            if (!link._scrollSpyBlock)
              return;
            var box = link._scrollSpyBlock.getBoundingClientRect();
            if (box.top < yThreshold)
              active = link;
          }
          if (active)
            angular.element(active).addClass('active');
        }

        function onScroll(ev) {
          if (!updating)
            window.requestAnimationFrame(function () {
              updating = false;
              update(ev);
            });
          updating = true;
        }

        update();
        $wnd.on('scroll', onScroll);
        $wnd.on('resize', onScroll);
        $element.on('$destroy', function () {
          $wnd.off('scroll', onScroll);
          $wnd.off('resize', onScroll);
        });

      }
    };
  });

};
