var app = angular.module('app', ['ngAnimate']);

function ManageCtrl($scope) {
    $scope.projects = [];
    $scope.orig = angular.copy($scope.projects);
    $scope.overlayClass = '';
    $scope.projectPlaceholder = 'Add project';

    // app functions
    $scope.reset = function() {
        $scope.projects = angular.copy($scope.orig);
    };

    $scope.switchOverlay = function(){
        if ($scope.overlayClass === "active")
            $scope.overlayClass = "";
         else
            $scope.overlayClass = "active";
    };

    // project specific functions
    $scope.add = function() {
        if ($scope.projectName) {
            $scope.projects.push({name:$scope.projectName});
            $scope.projectName = '';
            $scope.projectPlaceholder = 'Add project';
        }
        else {
            $scope.projectPlaceholder = 'Title required';
        }
    };

    $scope.delete = function(index){
        $scope.projects.splice(index, 1);
    };

}

function TaskCtrl($scope) {
    $scope.tasks = [];
    $scope.taskPlaceholder = 'Add task';

    $scope.add = function() {
        if ($scope.taskName) {
            $scope.tasks.push({name:$scope.taskName});
            $scope.taskName = '';
            $scope.taskPlaceholder = 'Add task';
        }
        else {
            $scope.taskPlaceholder = 'Title required';
        }

    };

    $scope.delete = function(index){
        $scope.tasks.splice(index, 1);
    };

    $scope.stopTimer = function() {
        $scope.$broadcast('stopTheTimer');
    };

}

function Timer($scope, $timeout) {
    // $scope.seconds = '0' + $scope.seconds.toString();
    $scope.seconds = '00';
    $scope.minutes = '00';
    $scope.hours = '00';
    $scope.activated = false;
    $scope.buttonval = "Start";

    function buttonSwitch() {
        if ($scope.buttonval === "Start") {
            $scope.buttonval = "Stop";
        }
        else {
            $scope.buttonval = "Start";
        }
    }

    function countdown() {
        $scope.seconds++;

        // add seconds into minutes and minutes into hours
        if ($scope.seconds > 59) {
            $scope.minutes++;
            if ($scope.minutes < 10) {
                $scope.minutes = '0' + $scope.minutes.toString();
            }
            $scope.seconds = 0;

            if ($scope.minutes > 59) {
                $scope.hours++;
                if ($scope.hours < 10) {
                    $scope.hours = '0' + $scope.hours.toString();
                }
                $scope.minutes = '00';
                $scope.seconds = '00';

                if ($scope.hours > 23) {
                    $scope.hours = '00';
                    $scope.minutes = '00';
                    $scope.seconds = '00';
                }
            }
        }

        if ($scope.seconds < 10) {
            $scope.seconds = '0' + $scope.seconds.toString();
        }

        // set counter speed to 1000 milliseconds
        $scope.timeout = $timeout(countdown, 1000);
    }

    $scope.startStop = function() {
        if ($scope.activated === false) {
            countdown();
            $scope.activated = true;
        }
        else {
            $timeout.cancel($scope.timeout);
            $scope.activated = false;
        }
        buttonSwitch();
    };

    $scope.$on('stopTheTimer', function() {
        if ($scope.activated === true) {
            $timeout.cancel($scope.timeout);
            $scope.activated = false;
            buttonSwitch();
        }
    });

    $scope.reset = function() {
        $timeout.cancel($scope.timeout);
        if ($scope.activated !== false) {
            buttonSwitch();
        }
        $scope.activated = false;
        $scope.seconds = '00';
        $scope.minutes = '00';
        $scope.hours = '00';
    };

}