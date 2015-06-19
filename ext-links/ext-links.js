module.exports = function (app) {

  app.directive('uiExtLinks', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element) {
        var links = [].slice.call($element[0].querySelectorAll('a[href^="http"]'));
        links.forEach(function (link) {
          if (link.href.indexOf(window.location.origin) == 0)
            return;
          link.setAttribute('target', '_blank');
        });
      }
    };
  });

};
