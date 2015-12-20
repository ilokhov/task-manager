var app = angular.module('app', ['ngAnimate']);

function ManageCtrl($scope) {
	$scope.projects = [];
	$scope.orig = angular.copy($scope.projects);
	$scope.projectPlaceholder = 'Project name';

	// app functions
	$scope.reset = function() {
		$scope.projects = angular.copy($scope.orig);
	};

	// project specific functions
	$scope.add = function() {
		if ($scope.projectName) {
			$scope.projects.push({name:$scope.projectName});
			$scope.projectName = '';
			$scope.projectPlaceholder = 'Project name';
		}
		else {
			$scope.projectPlaceholder = 'Title required';
		}
	};

	$scope.remove = function(index){
		$scope.projects.splice(index, 1);
	};

}

function TaskCtrl($scope) {
	$scope.tasks = [];
	$scope.taskPlaceholder = 'Task name';

	$scope.add = function() {
		if ($scope.taskName) {
			$scope.tasks.push({name:$scope.taskName});
			$scope.taskName = '';
			$scope.taskPlaceholder = 'Task name';
		}
		else {
			$scope.taskPlaceholder = 'Title required';
		}

	};

	$scope.remove = function(index){
		$scope.tasks.splice(index, 1);
	};
}