(function (window, angular, undefined) {
'use strict';

    angular.module('app', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngResource', 'ngSanitize'])
        .constant('blogConfig', {
            // global constant config values live here
            apiUrl: 'http://www.nimishmehta.com/migration/wp-json/posts'
        })
        .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: "/",
                    views: {
                        'main': {
                            templateUrl: 'home/home.tpl.html',
                            controller: 'homeController',
                        }
                    }
                })
                .state('blog', {
                    url: "/blog",
                    views: {
                        'main': {
                            templateUrl: 'blog/blog.tpl.html',
                            controller: 'blogController',
                        }
                    }
                })
                .state('post', {
                    url: '/blog/:id/:title',
                    views: {
                        'main': {
                            templateUrl: 'post/post.tpl.html',
                            controller: 'postController',
                        }
                    }
                });

            $locationProvider.html5Mode(true).hashPrefix('!');

            $urlRouterProvider.rule(function ($injector, $location) {
                var slashHashRegex,
                    matches,
                    path = $location.url();

                // check to see if the path already has a slash where it should be
                if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
                    return path.substring(0, path.length - 1);
                }

                // if there is a trailing slash *and* there is a hash, remove the last slash so the route will correctly fire
                slashHashRegex = /\/(#[^\/]*)$/;
                matches = path.match(slashHashRegex);
                if (1 < matches.length) {
                    return path.replace(matches[0], matches[1]);
                }
            });
        })

;})(window, window.angular);