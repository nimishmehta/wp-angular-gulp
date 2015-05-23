(function (window, angular, undefined) {
'use strict';

	angular.module('app')
		.controller('postController', function (blogService, $scope, $stateParams) {
			blogService.postById($stateParams.id).then(function(post) {
			        $scope.post = post;
			});
		})

;})(window, window.angular);