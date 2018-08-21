(function() {
     function config($locationProvider, $stateProvider) {
         $locationProvider
             .html5Mode({
                 enabled: true,
                 requireBase: false
              });

         $stateProvider
             .state('todo', {
                 url: '/',
                 controller: 'todoController',
                 templateUrl: '/templates/todo.html'
             });
     };


     angular
         .module('ToDo', ['ui.router', 'firebase'])

         .config(config)

         .controller('todoController',["$scope", "$firebaseArray",
           function($scope, $firebaseArray) {

             var ref = firebase.database().ref(todos);
             var todos = $firebaseArray(ref);

             $scope.date = new Date();

             $scope.currentTime = $scope.date.getTime()

             $scope.weekMs = 604800000

             $scope.dateFilter = function(todo){
                if ($scope.currentTime - $scope.weekMs >=  todo.created ) {
                  return true;
              };
            };

             $scope.todos = todos

             $scope.addTodo = function(){
              $scope.todos.$add({'title': $scope.newtodo, 'done': false, 'created': firebase.database.ServerValue.TIMESTAMP.toMillis() })
               $scope.newtodo = ''
           };

             $scope.clearCompleted = function(){
              $scope.todos.forEach(function(item, index) {
               console.log(item, index)
                if (item.done) {
                 $scope.todos.$remove(index);
               };
             });
           };


         }]);
 })();
