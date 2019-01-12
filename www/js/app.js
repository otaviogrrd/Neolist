angular.module('neolist', ['ionic', 'neolist.controllers','neolist.services','ngCordova'])

.run(function($ionicPlatform, GenericLocalDaoService, $rootScope) {
  $ionicPlatform.ready(function() {

     if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
     }

    function userLogged(){
      var user = GenericLocalDaoService.get('userdata');
      if(!angular.isUndefined(user) && user != null){
        $rootScope.user = user[0];
      }
    }
    
    userLogged();

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('');


  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        controller:'SearchCtrl',
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.detail',{
    url:'/detail/:contactId',
    views:{
      'menuContent':{
        controller:'DetailCtrl',
        templateUrl:'templates/detail.html'
      }
    }
  })

  .state('app.login',{
    url:'/login',
    views:{
      'menuContent':{
        controller:'LoginCtrl',
        templateUrl:'templates/loginview.html'
      }
    }
  })

  .state('app.about',{
    url:'/about',
    views:{
      'menuContent':{
        templateUrl: 'templates/about.html'
      }
    }
  })

  .state('app.editprofile',{
    url:'/editprofile',
    views:{
      'menuContent':{
        controller:'ProfileCtrl',
        templateUrl: 'templates/profile.html'
      }
    }
  })

  .state('app.logout',{
    url:'/logout',
    views:{
      'menuContent':{
        controller:'LogoutCtrl'
      }
    }
  })

  .state('app.register',{
    url:'/register',
    views:{
      'menuContent':{
        controller:'RegisterCtrl',
        templateUrl: 'templates/register.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
