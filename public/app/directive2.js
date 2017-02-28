/**
 * Created by NOUBISSI TAPAH PHOEB on 16/09/2016.
 */
/*app.directive('permission', ['Auth', function(Auth) {
    return {
        restrict: 'A',

        link: function (scope, element,attrs) {

            scope.$watch(Auth.isLoggedIn, function() {

                if (Auth.userHasPermission(attrs.permission)) {
                    scope.donnee=true;
                    element.show();
                } else {
                    element.hide();
                }
            });
        }
    }
}]);*/
app.directive('permission', ['Auth', function(Auth) {
    return {
        restrict: 'A',
        scope: {
            permission: '='
        },
        link: function (scope, elem, attrs) {
            scope.$watch(Auth.isLoggedIn, function() {
                if (Auth.userHasPermission(scope.permission)) {
                    elem.show();
                } else {
                    elem.hide();
                }
            });
        }
    }
}]);

app.directive('menuToggle', ['$timeout', function ($timeout ) {
    return {
        restrict : 'A',
        scope: {
            prf: '='
        },
        template: '<md-button class="md-button-toggle" ng-class="{\'toggled\' : isOpen()}"\n' +
        '  ng-click="toggle()"\n' +
        '  aria-controls="docs-menu-{{prf.nom | nospace}}"\n' +
        '  flex layout="row"\n' +
        '  aria-expanded="{{isOpen()}}">\n' +
        '<i class="fa fa-list-ol"></i>'+
            '&nbsp &nbsp'+
        '  {{prf.nom}}\n' +
        '  <md-icon md-font-set="fa fa-chevron-down" class="md-toggle-icon" ng-class="{\'toggled\' : isOpen()}"></md-icon>' +
        '</md-button>\n' +
        '<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n' +
        '  <li ng-repeat="ct in prf.categories" >\n' +
        '    <div prf="ct" menu-link></div>\n' +
        '  </li>\n' +
        '</ul>\n' +
        '',
        link: function ($scope, $element,elem,attrs) {
            var controller = $element.parent().controller();
            $scope.isOpen = function () {
                return controller.isOpen($scope.prf);
            };
            $scope.toggle = function () {
                controller.toggleOpen($scope.prf);
            };
            var parentNode = $element[0].parentNode.parentNode.parentNode;
            if (parentNode.classList.contains('parent-list-item')) {
                var heading = parentNode.querySelector('h2');
                $element[0].firstChild.setAttribute('aria-describedby', heading.id);
            }
        }
    };
}]);
app.directive('starRating',
    function(ProfilFactory) {
        return {
            restrict : 'A',
            template : '<ul class="rating">'
            + ' <li ng-repeat="star in stars"'
            +'ng-class="star" ng-click="toggle($index)">'
                + '  <i class="fa fa-star-o"></i>'
                + ' </li>'
                + '</ul>',
            scope : {
                ratingValue : '=',
                max : '=',
                onRatingSelected : '&',
                ngModel:'='

            },
            link : function(scope, elem, attrs) {
                var updateStars = function() {
                    scope.stars = [];
                    if(!scope.ngModel){
                        for ( var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled : i < scope.ratingValue
                            });
                        }
                    }
                    else{
                        for ( var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled : i < scope.ngModel
                            });
                        }
                    }

                };

                scope.toggle = function(index) {
                    angular.forEach(ProfilFactory.allMedias,function(media){//on récupère tous les médias du master en cours car on a envoyé ses profils et récupéré les médias de ces profils
                        if(media._id==attrs.objectid){
                            console.log(media._id==attrs.objectid)
                            scope.ratingValue = index + 1;
                            scope.onRatingSelected({
                                rating : index + 1
                            });
                        }
                    })
                };

                scope.$watch('ratingValue',
                    function(oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
);
app.directive('menuLink', function () {
    return {
        restrict : 'A',
        scope: {
            prf: '='
        },
        template: '<md-button ng-class="{\'{{ct.icon}}\' : true}" \n' +
        '   ng-click="focusSection(prf)">\n' +
            '<i class="fa fa-object-group"></i>'+
        '&nbsp &nbsp'+
        '  {{prf.nom}}\n' +
        '  <span class="md-visually-hidden "\n' +
        '    ng-if="isSelected()">\n' +
        '    current page\n' +
        '  </span>\n' +
        '</md-button>\n' +
        '',
        link: function ($scope, $element,elem,attrs) {
            var controller = $element.parent().controller();
            $scope.focusSection = function () {
                // set flag to be used later when
                // $locationChangeSuccess calls openPage()
                controller.autoFocusContent = true;
                controller.tri($scope.prf);
            };
        }
    };
});
    app.directive('wanPaging', function () {
    return {
        restrict: 'EA',
        scope: {
            wpTotal: '=',
            position: '@',
            gotoPageProf: '&',
            stepProf: '=',
            currentPageProf: '='
        },
        controller: Controller,
        controllerAs: 'vm',
        template: [
            '<div layout="row" class="wan-material-paging" layout-align="{{ position }}">',
            '<md-button class="md-raised md-primary wmp-button" ng-click="vm.gotoFirst()">{{ vm.first }}</md-button>',
            '<md-button class="md-raised wmp-button" ng-click="vm.getoPre()" ng-show="vm.index - 1 >= 0">...</md-button>',
            '<md-button class="md-raised wmp-button" ng-repeat="i in vm.stepInfo"',
            ' ng-click="vm.goto(vm.index + i);" ng-show="vm.page[vm.index + i]" ',
            ' ng-class="{true: \'md-primary\', false: \'\'}[vm.page[vm.index + i] === currentPageProf]">',
            ' {{ vm.page[vm.index + i] }}',
            '</md-button>',
            '<md-button class="md-raised wmp-button" ng-click="vm.getoNext()" ng-show="vm.index + vm.step < wpTotal">...</md-button>',
            '<md-button class="md-raised md-primary wmp-button" ng-click="vm.gotoLast()">{{ vm.last }}</md-button>',
            '</div>'
        ].join('')
    };


/**
 * @ngInject
 */
function Controller($scope,$attrs) {
    var vm = this;

    vm.first = '<<';
    vm.last = '>>';
    vm.index = 0;
    vm.step = $scope.stepProf;


    vm.goto = function(index) {
        $scope.currentPageProf = vm.page[index];
    };

    vm.getoPre = function(){
        $scope.currentPageProf = vm.index;
        vm.index -= vm.step;
    };

    vm.getoNext = function(){
        vm.index += vm.step;
        $scope.currentPageProf = vm.index + 1;
    };

    vm.gotoFirst = function(){
        vm.index = 0;
        $scope.currentPageProf = 1;
    };

    vm.gotoLast = function(){
        vm.index = parseInt($scope.wpTotal / vm.step) * vm.step;
        vm.index === $scope.wpTotal ? vm.index = vm.index - vm.step : '';
        $scope.currentPageProf = $scope.wpTotal;
    };

    $scope.$watch('currentPageProf', function() {
        $scope.gotoPageProf();
    });

    $scope.$watch('wpTotal', function() {
        vm.init();
    });

    vm.init = function() {
        vm.stepInfo = (function() {
            var i, result = [];
            for (i = 0; i < vm.step; i++) {
                result.push(i)
            }
            return result;
        })();

        vm.page = (function() {
            var i, result = [];
            for (i = 1; i <= $scope.wpTotal; i++) {
                result.push(i);
            }
            return result;
        })();

    };
}
    });




