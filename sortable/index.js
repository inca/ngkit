module.exports = function (app) {

  app.directive('uiSortable', function () {

    return {
      restrict: 'A',
      scope: true,
      controllerAs: 'sortable',
      controller: ['$attrs',
        function ($attrs) {
          var ctrl = this;
          ctrl._expr = $attrs.uiSortable;
          ctrl._update = $attrs.uiSortableUpdate;
        }
      ]
    };

  });

  app.directive('uiSortableItem', [ '$parse',
    function ($parse) {
      return {
        restrict: 'A',
        link: function ($scope, $element) {

          function onStart(ev) {
            $element.addClass('dragging');
            $scope.sortable.$srcIndex = $scope.$index;
            ev.dataTransfer.effectAllowed = 'move';
          }

          function onEnter(ev) {
            $element.addClass('drag-over');
            var srcI = $scope.sortable.$srcIndex
              , dstI = $scope.$index;
            if (srcI > dstI)
              $element.addClass('drag-over-before');
            if (srcI < dstI)
              $element.addClass('drag-over-after');
            ev.preventDefault();
          }

          function onLeave(ev) {
            $element.removeClass('drag-over');
            $element.removeClass('drag-over-before');
            $element.removeClass('drag-over-after');
            ev.preventDefault();
          }

          function onDrop(ev) {
            $element.removeClass('drag-over');
            var srcI = $scope.sortable.$srcIndex
              , dstI = $scope.$index
              , model = $parse($scope.sortable._expr)
              , arr = model($scope)
              , src = arr[srcI]
              , before = srcI > dstI;
            arr.splice(before ? dstI : dstI + 1, 0, src);
            arr.splice(before ? srcI + 1 : srcI, 1);
            model.assign($scope, arr);
            $scope.$apply();
            if ($scope.sortable._update)
              $scope.$eval($scope.sortable._update);
            onLeave(ev);
          }

          function onEnd(ev) {
            $element.removeClass('dragging');
            ev.preventDefault();
          }

          $element.on('dragstart', onStart);
          $element.on('drop', onDrop);
          $element.on('dragenter', onEnter);
          $element.on('dragleave', onLeave);
          $element.on('dragover', onEnter);
          $element.on('dragend', onEnd);

          $element.on('$destroy', function () {
            $element.off('dragstart', onStart);
            $element.off('drop', onDrop);
            $element.off('dragenter', onEnter);
            $element.off('dragleave', onLeave);
            $element.off('dragover', onEnter);
            $element.off('dragend', onEnd);
          });

        }
      };

    }
  ]);

};
