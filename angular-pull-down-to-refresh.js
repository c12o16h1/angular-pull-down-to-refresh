/**
 * Created by Yurii Kovalenko c12o16h1@gmail.com on 11/29/15.
 */
(function (window, document, undefined) {
    'use strict';
    angular.module('c12o16h1.pullDownToRefresh', []).constant('pullDownToRefreshConfig', {
        treshold: 60,
        debounce: 400,
        text: {
            pull: 'pull to refresh',
            ready: 'release to refresh',
            loading: 'refreshing...',
            hide: 'refreshed'
        },

        icon: {
            pull: 'glyphicon glyphicon-arrow-down',
            ready: 'glyphicon glyphicon-play',
            loading: 'glyphicon glyphicon-refresh',
            hide: 'glyphicon glyphicon-arrow-up'
        }
    }).directive('pullDownToRefresh', [
        '$compile',
        '$timeout',
        '$q',
        'pullDownToRefreshConfig',
        function ($compile, $timeout, $q, pullDownToRefreshConfig) {
            return {
                scope: true,
                restrict: 'A',
                transclude: true,
                templateUrl: 'angular-pull-down-to-refresh.tpl.html',
                compile: function compile(tElement, tAttrs, transclude) {
                    return function postLink(scope, iElement, iAttrs) {
                        var config = angular.extend({}, pullDownToRefreshConfig, iAttrs);
                        var targetEl = window.ptr = iElement.children()[0];
                        var startPosY;
                        scope.text = config.text;
                        scope.icon = config.icon;
                        scope.status = 'pull';
                        var shouldReload = false;
                        var setStatus = function (status) {
                            shouldReload = status === 'ready';
                            scope.$apply(function () {
                                scope.status = status;
                            });
                        };
                        iElement.bind('touchstart', function (e) {
                            startPosY = e.originalEvent.touches[0].clientY;
                        });
                        iElement.bind('touchmove', function (e) {
                            targetEl.style.webkitTransitionDuration = 0;
                            targetEl.style.margin = '0 auto';
                            var curPosY = e.originalEvent.touches[0].clientY - startPosY;
                            if (curPosY > config.treshold && !shouldReload) {
                                setStatus('ready');
                            } else if (curPosY < config.treshold && shouldReload) {
                                setStatus('pull');
                            }
                        });
                        iElement.bind('touchend', function (e) {
                            if (!shouldReload){
                                targetEl.style.webkitTransitionDuration = 0;
                                targetEl.style.margin = '-40px auto 0';
                                return;
                            }
                            setStatus('loading');
                            var start = +new Date();
                            $q.when(scope.$eval(iAttrs.pullDownToRefresh)).then(function () {
                                var elapsed = +new Date() - start;
                                $timeout(function () {
                                    targetEl.style.margin = '';
                                    targetEl.style.webkitTransitionDuration = '';
                                    scope.status = 'hide';
                                }, elapsed < config.debounce ? config.debounce - elapsed : 0);
                            });
                        });
                        scope.$on('$destroy', function () {
                            iElement.unbind('touchmove');
                            iElement.unbind('touchend');
                            iElement.unbind('touchstart');
                        });
                    };
                }
            };
        }
    ]);
    angular.module('c12o16h1.pullDownToRefresh').run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('angular-pull-down-to-refresh.tpl.html', '<div class=\'pull-down-to-refresh\'>\n' + '  <i ng-class=\'icon[status]\'></i>&nbsp;\n' + '  <span ng-bind=\'text[status]\'></span>\n' + '</div>\n' + '<div ng-transclude></div>\n');
        }
    ]);
}(window, document));