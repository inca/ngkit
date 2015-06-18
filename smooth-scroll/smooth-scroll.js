module.exports = function (app) {

  app.directive('uiSmoothScroll', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {

        function onClick(ev) {
          ev.preventDefault();
          var target = document.querySelector($attrs.href);
          if (!target) return;
          var dy = target.getBoundingClientRect().top;
          var duration = parseInt($scope.$eval($attrs.uiSmoothScroll)) || 300;
          var startTime = Date.now()
            , startY = window.scrollY;

          animate();

          function animate() {
            var progress = Math.min((Date.now() - startTime) / duration, 1);
            window.scrollTo(0, startY + dy * progress);
            if (progress < 1)
              window.requestAnimationFrame(animate);
          }
        }

        $element.on('click', onClick);

        $element.on('$destroy', function () {
          $element.off('click', onClick);
        });

      }
    };
  });

};
