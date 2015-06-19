module.exports = function (app) {

  app.directive('uiAutosize', function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function ($scope, $element, $attrs, ngModel) {

        var e = $element[0];
        var styles = window.getComputedStyle(e);
        var lh = parseInt(styles.getPropertyValue('line-height').replace('px', ''));

        function onInput() {
          setTimeout(function () {
            var rows = e.rows * lh;
            var height = e.scrollHeight + (e.offsetHeight - e.clientHeight);
            height = Math.max(rows, height);
            e.style.height = height + 'px';
          }, 0);
        }

        if (ngModel) {
          var _render = ngModel.$render;
          ngModel.$render = function () {
            _render.apply(ngModel, arguments);
            onInput();
          };
        } else {
          onInput();
        }

        $element.on('change', onInput);
        $element.on('input', onInput);

        $element.on('$destroy', function () {
          $element.off('change', onInput);
          $element.off('input', onInput);
        });

      }
    };
  });

};
