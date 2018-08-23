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

          $stateProvider

             .state('history', {
                 url: '/taskhistory',
                 controller: 'todoController',
                 templateUrl: '/templates/history.html'
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

            $scope.getHistory = function(todo){
              if (todo.done == true || $scope.currentTime - $scope.weekMs >=  todo.created ) {
                return true;
            };
          };

             $scope.todos = todos
             $scope.addTodo = function(){
              $scope.todos.$add({'title': $scope.newtodo, 'done': false, 'priority': $scope.priority, 'created': $scope.currentTime })
              $scope.newtodo = ''
           };

           $scope.taskDone = function(todo) {
               if (todo.done == true) {
                    return firebase.database().ref(todos).child(todo).update(todo.done == true)
            };
          };

           //   $scope.clearCompleted = function(){
           //    $scope.todos.forEach(function(item, index) {
           //     console.log(item, index)
           //      if (item.done) {
           //       $scope.todos.$remove(index);
           //     };
           //   });
           // };
        }]);
    })();
