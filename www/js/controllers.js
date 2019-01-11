appControllers
.controller('AppCtrl', function($scope, $rootScope,$ionicHistory, $ionicPopup, $state,$ionicModal, $timeout, $cordovaNetwork, UserService, GenericLocalDaoService) {

  $scope.logindata = {};

  document.addEventListener("deviceready", function () {

    $scope.network = $cordovaNetwork.getNetwork();
    $scope.isOnline = $cordovaNetwork.isOnline();
    $scope.$apply();
      // listen for Online event
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
        $scope.isOnline = true;
        $scope.network = $cordovaNetwork.getNetwork();
        $scope.updateContacts();
        $scope.$apply();
      })

      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        $scope.isOnline = false;
        $scope.network = $cordovaNetwork.getNetwork();
        $scope.$apply();
      })
    }, false);

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    UserService.login($scope.logindata).then(function(response){

      if(!angular.isUndefined(response.data[0].login)){
        if(response.data[0].login == null){
          var alert = $ionicPopup.alert({
            title: 'Ops',
            template: 'Usuário e/ou senha incorretos!'
          });
          alert.then(function(res) {
            login(); 
          });
        }else{

          UserService.getUpdatedProfile(response.data[0].login).then(function(response){
            if(response.status == 200){
              GenericLocalDaoService.save("userdata", response.data);
              var user = GenericLocalDaoService.get('userdata');

              if(!angular.isUndefined(user)){
                $rootScope.user = user[0];
              }

              $ionicHistory.clearHistory();
              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                historyRoot: true
              });

              $scope.closeLogin();
              $state.go('app.search');
            }
          })
        }
      }
    });
  };

  $scope.updateContacts = function(){
    SearchService.getAll().then(function(response){
      if(response.status == 200)
      {
        GenericLocalDaoService.remove("contacts");
        GenericLocalDaoService.save("contacts",response.data)
      }
    })
  }

  $scope.doLogout = function(){
    UserService.logout();
    $rootScope.user = {};
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      historyRoot: true
    });
    $state.go('app.search');
  }
});