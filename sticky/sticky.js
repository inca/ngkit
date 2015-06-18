module.exports = function (app) {

  /**
   * position:sticky polyfill
   *
   * Sticky element becomes fixed once the viewport is scrolled beyond
   * the top boundary of its parent; then once the viewport is scrolled
   * beyond the bottom boundary of its parent the sticky element becomes
   * released again.
   *
   * This component relies on some stylesheets, both for the sticky element
   * and for its parent.
   *
   * <div class="has-sticky">
   *   <aside class="sidenav sticky">
   *   </aside>
   *   <main>
   *   </main>
   * </div>
   *
   * See `sticky.css` for example stylesheet.
   */
  app.directive('uiSticky', function () {

    return {
      restrict: 'A',
      link: function ($scope, $element) {

        var $wnd = angular.element(window)
          , $parent = $element.parent()
          , _el = $element[0];

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
          if (parentBox.top > 0) {
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
