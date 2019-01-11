appControllers.controller('DetailCtrl', function($scope, $rootScope, $http, $state, $stateParams, $ionicActionSheet,SearchService, GenericLocalDaoService) {

  // console.log('here');

  $scope.detail = {};

   $scope.showActionsheet = function(type, phone) {
    var titleText = null,
        buttons = null;

    if(type == 'email'){
      titleText = "Enviar um email";
      buttons = [
          { text: '<i class="icon ion-android-mail"></i> Escrever e-mail' },
      ];
    }else{
      titleText = "Telefone";
      buttons = [
          { text: '<i class="icon ion-android-call"></i> Ligar' },
          { text: '<i class="icon ion-social-whatsapp"></i> Whatsapp' },
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
          $scope.registerButtonClick(type,index, phone);
          
          return true;
        },
        destructiveButtonClicked: function() {
          console.log('DESTRUCT');
          return true;
        }
      });
  };

  $scope.registerButtonClick = function(type, index, phone)
  {
    if(type == 'email')
    {
       document.location.href = 'mailto:' + $scope.detail.email;
    }

    if(type == 'phone'){

      var phoneSend = (phone == 1) ? $scope.detail.telefone : $scope.detail.telefone2;
      if(index == 0){
        document.location.href = 'tel:' + phoneSend;
      }else{
        document.location.href = 'https://wa.me/"'+phoneSend.replace(' ','')+'"?text='+encodeURI('Olá ' + $scope.detail.nome + ', te encontrei no app NeoList');

        // document.location.href = "whatsapp://send?text=Olá '"+$scope.detail.nome+", te encontreo no app NeoList'&phone="+phoneSend;
        // document.location.href = 'http://api.whatsapp.com/send?phone=' + phoneSend + '&text=Olá ' + $scope.detail.nome + ', te encontrei no app NeoList.';
      }
 
    }
  }


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
