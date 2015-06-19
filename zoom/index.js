module.exports = function (app) {

  function getDimensions(originalWidth, originalHeight, targetWidth, targetHeight) {
    var w = Math.min(targetWidth, originalWidth);
    var h = originalHeight / originalWidth * w;
    h = Math.min(targetHeight, h);
    w = originalWidth / originalHeight * h;
    return {
      width: w,
      height: h
    };
  }

  app.directive('uiZoom', function () {

    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {

        function getZoomOverlay() {
          var el = document.querySelector('.zoom-overlay');
          if (!el) {
            el = document.createElement('div');
            el.className = 'zoom-overlay';
            document.querySelector('body').appendChild(el);
            var cnt = document.createElement('div');
            cnt.className = 'zoom-container';
            cnt.style.webkitTransform =
              cnt.style.MozTransform =
                cnt.style.msTransform =
                  cnt.style.transform =
                    'translate(0, 0) scale(1)';
            cnt.style.webkitTransformOrigin =
              cnt.style.MozTransformOrigin =
                cnt.style.msTransformOrigin =
                  cnt.style.transformOrigin =
                    '0 0';
            el.appendChild(cnt);
          }
          return angular.element(el);
        }

        var url = $scope.$eval($attrs.uiZoom)
          , $overlay = getZoomOverlay()
          , img = new Image();

        function onClick() {
          var el = $element[0];
          var cnt = $overlay[0].querySelector('.zoom-container');
          // Bind events
          window.addEventListener('scroll', onLeave);
          $overlay.on('click', onLeave);
          // Apply initial styles
          $overlay.addClass('active');
          cnt.style.backgroundImage = 'url(' + url + ')';
          // Position container top the image initially
          var coords = el.getBoundingClientRect();
          cnt.style.top = Math.round(coords.top) + 'px';
          cnt.style.left = Math.round(coords.left) + 'px';
          var thumbDimensions = getDimensions(
            img.width, img.height, el.clientWidth, el.clientHeight);
          cnt.style.width = Math.round(thumbDimensions.width) + 'px';
          cnt.style.height = Math.round(thumbDimensions.height) + 'px';
          // Eval target coordinates
          var maxWidth = window.innerWidth - 120
            , maxHeight = window.innerHeight - 120;
          var dimensions = getDimensions(
                img.width * 100, img.height * 100, maxWidth, maxHeight)
            , width = dimensions.width
            , height = dimensions.height;
          var left = (window.innerWidth - width) / 2
            , top = (window.innerHeight - height) / 2;
          var dx = left - coords.left
            , dy = top - coords.top
            , s = width / thumbDimensions.width;
          cnt.style.webkitTransform =
            cnt.style.MozTransform =
              cnt.style.msTransform =
                cnt.style.transform =
                  'translate(' + dx + 'px, ' + dy + 'px) scale(' + s + ')';
        }

        function onLeave() {
          $overlay.removeClass('active');
          var cnt = $overlay[0].querySelector('.zoom-container');
          delete cnt.style.backgroundImage;
          delete cnt.style.top;
          delete cnt.style.left;
          delete cnt.style.width;
          delete cnt.style.height;
          cnt.style.webkitTransform =
            cnt.style.MozTransform =
              cnt.style.msTransform =
                cnt.style.transform =
                  'translate(0, 0) scale(1)';
          // Unbind events
          window.removeEventListener('scroll', onLeave);
          $overlay.off('click', onLeave);
        }

        // Initialize when image loads

        img.src = url;
        img.onload = function () {
          $element.on('click', onClick);
          $element.on('$destroy', function () {
            $element.off('click', onClick);
          });
        };

      }
    };

  });

};
