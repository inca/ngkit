module.exports = function (app) {

  app.directive('uiHl', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {

        var cssClass = $scope.$eval($attrs.uiHlClass) || $attrs.uiHlClass || 'active';
        var selector = $scope.$eval($attrs.uiHl) || $attrs.uiHl;

        var elems = angular.element(document.querySelectorAll(selector));

        elems.addClass(cssClass);

        $element.on('$destroy', function () {
          elems.removeClass(cssClass);
        });

      }
    };
  });

};
