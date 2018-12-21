appControllers.controller('DetailCtrl', function($scope, $http, $state, $stateParams, $ionicActionSheet,SearchService, GenericLocalDaoService) {

  // console.log('here');

  $scope.detail = {};

   $scope.showActionsheet = function(type) {
    var titleText = null,
        buttons = null;

    if(type == 'email'){
      titleText = "Enviar um email";
      buttons = [
          { text: '<i class="icon ion-android-send"></i> Enviar' },
      ];
    }else{
      titleText = "Telefone";
      buttons = [
          { text: '<i class="icon ion-android-call"></i> Ligar' },
          { text: '<i class="icon ion-navicon-round"></i> Whatsapp' },
      ];
    }

    $ionicActionSheet.show({
        titleText: titleText,
        buttons: buttons,
        cancelText: 'Cancelar',
        cancel: function() {
          console.log('CANCELLED');
        },
        buttonClicked: function(index) {
          console.log('BUTTON CLICKED', index);
          return true;
        },
        destructiveButtonClicked: function() {
          console.log('DESTRUCT');
          return true;
        }
      });
  };

  function getData(){
    var data = SearchService.getById($stateParams.contactId);

    if(data instanceof Object){
      console.log(data);
      $scope.detail = data;
    }else{
      data.then(function(response){
        if(response.status == 200){
          $scope.detail = response.data[0];
        }
      })
    }
    // SearchService.getById($stateParams.contactId).then(function(response){
    //   if(response.status == 200){
    //     $scope.detail = response.data[0];
    //   }else{
    //     $scope.detail = GenericLocalDaoService.getById("contacts", $stateParams.contactId);
    //   }
    // })
  }


  $scope.$on('$ionicView.beforeEnter', function(){
    getData();
  })

});
