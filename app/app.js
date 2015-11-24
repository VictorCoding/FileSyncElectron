var fs = require('fs');
var clipboard = require('clipboard');
  
angular
      .module('FileSync', ['ngMaterial', 'ui.router'])
      .constant('FIREBASEREF', function(){
        return new Firebase('https://filesync.firebaseio.com');
      })
      .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: '/Components/Home/home.html'            
          })
          .state('write', {
            url: '/write',
            templateUrl: '/Components/Write/write.html',
            controller: 'WriteCtrl as w'
          })
          .state('diff', {
            url: '/diff',
            templateUrl: '/Components/Diff/Diff.html',
            controller: 'DiffCtrl as diff'
          });
      });