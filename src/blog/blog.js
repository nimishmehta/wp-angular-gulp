(function (window, angular, undefined) {
'use strict';

    angular.module('app')
        .factory('blogService', function ($resource, $q, blogConfig) {
            var blogResource = $resource(blogConfig.apiUrl),
                postResource = $resource(blogConfig.apiUrl + '/:id'),
                defaultFilter = {'category_name': 'post'};

            return {
                allPosts: function () {
                    var filter = defaultFilter;

                    return getFilteredPosts(filter);
                },

                allPostsByTag: function (tag) {
                    var filter = angular.extend(
                        defaultFilter,
                        {'tag': tag}
                    );

                    return getFilteredPosts(filter);
                },

                allPostsBySearchTerm: function (searchTerm) {
                    var filter = angular.extend(
                        defaultFilter,
                        {'s': searchTerm}
                    );

                    return getFilteredPosts(filter);
                },

                featuredPosts: function () {
                    var filter = angular.extend(
                        defaultFilter,
                        {'category_name': 'post%2Bfeatured'}
                    );

                    return getFilteredPosts(filter);
                },

                postById: function (id) {
                    var deferred = $q.defer();

                    postResource.get(
                        {
                            id : id,
                            cache: true 
                        },
                        function (response) {
                            deferred.resolve(response);
                        }, function (err) {
                            deferred.reject(err);
                        })
                    
                    return deferred.promise;
                }
            }

            function getFilteredPosts(filter) {
                var deferred = $q.defer();

                blogResource.query(
                    {'filter': filter},
                    function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    })
                

                return deferred.promise;
            }
        })

        .controller('blogController', function (blogService, $scope) {
            blogService.allPosts()
                .then(function (response) {
                    $scope.posts = response;
                }, function (err) {
                    $scope.error = err || 'nope';
                });
        })

;})(window, window.angular);