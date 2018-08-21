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

            //  $scope.dateFilter = function(todo){
            //     if (todo.created == 1534807668513 ) {
            //       return true;
            //   };
            // };


             // $scope.shouldShow = function(todo) {
             //   if (todo.shouldShow === true || todo.shouldShow === undefined) {
             //     return true
             //   } else {
             //     return false
             //   }
             // }
             //
             // $scope.hideTodo = function(todo) {
             //   todo.shouldShow = false
             // }

             $scope.todos = todos

             $scope.addTodo = function(){
              $scope.todos.$add({'title': $scope.newtodo, 'done': false, 'created': firebase.database.ServerValue.TIMESTAMP })
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


 // .filter("weekFilter", function(){
 //   return function(input,optionalParam1, optionalParam2){
 //
 //     var output;
 //       // custom code here...
 //     return output;
 //   };
 // });
