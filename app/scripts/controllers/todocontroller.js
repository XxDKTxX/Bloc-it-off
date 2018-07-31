(function() {
    function HomeCtrl() {

bloc-it-off.HomeCtrl("HomeCtrl", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    var ref = firebase.database().ref(tasks);
    var list = $firebaseArray(ref);

    $scope.list = list;
  }
]);
    }

    angular
        .module('bloc-it-off')
        .controller('HomeCtrl', [HomeCtrl]);
})();
