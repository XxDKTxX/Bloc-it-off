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

             $scope.todos = todos

             $scope.addTodo = function(){
              $scope.todos.$add({'title': $scope.newtodo, 'done':false})
               $scope.newtodo = ''
           };

             $scope.clearCompleted = function(){
              $scope.todos.forEach(function(item, index) {
               console.log(item, index)
                if (item.done) {
                 $scope.todos.$remove(index);
               }
             })
           };
         }]);
 })();
