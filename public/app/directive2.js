/**
 * Created by NOUBISSI TAPAH PHOEB on 16/09/2016.
 */
/*app.directive('permission', ['Auth', function(Auth) {
    return {
        restrict: 'A',

        link: function (scope, element,attrs) {
            console.log(attrs.permission)
            scope.$watch(Auth.isLoggedIn, function() {
                console.log(Auth.userHasPermission(attrs.permission))
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
            console.log(scope.permission)
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
                    angular.forEach(ProfilFactory.allMedias,function(media){
                        if(media._id==attrs.objectid){
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