module.exports = function (app) {

  app.directive('uiMagnifier', function () {

    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {

        function getGlass() {
          var el = document.querySelector('.magnifier');
          if (!el) {
            el = document.createElement('div');
            el.className = 'magnifier';
            document.querySelector('body').appendChild(el);
          }
          return angular.element(el);
        }

        var url = $scope.$eval($attrs.uiMagnifier) || $attrs.src
          , $glass = getGlass()
          , img = new Image();

        function onMove(ev) {
          var rbox = $element[0].getBoundingClientRect();
          var rx = ev.clientX - rbox.left
            , ry = ev.clientY - rbox.top
            , ix = img.width * rx / rbox.width
            , iy = img.height * ry / rbox.height;
          $glass[0].style.backgroundPosition =
            -Math.round(ix - $glass[0].clientWidth / 2) + 'px ' +
            -Math.round(iy - $glass[0].clientHeight / 2) + 'px';
          $glass[0].style.left = ev.pageX - $glass[0].clientWidth / 2 + 'px';
          $glass[0].style.top = ev.pageY - $glass[0].clientHeight / 2 + 'px';
        }

        function onEnter() {
          $glass.addClass('active');
          $glass[0].style.backgroundImage = 'url(' + url + ')';
        }

        function onLeave() {
          $glass.removeClass('active');
          $glass[0].style.backgroundImage = '';
        }

        // Initialize when image loads

        img.src = url;
        img.onload = function () {
          $element.on('mousemove', onMove);
          $element.on('mouseenter', onEnter);
          $element.on('mouseleave', onLeave);
          $element.on('$destroy', function () {
            $element.off('mousemove', onMove);
            $element.off('mouseenter', onEnter);
            $element.off('mouseleave', onLeave);
          });
        };

      }
    };

  });

};
