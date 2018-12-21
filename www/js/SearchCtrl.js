appControllers.controller('SearchCtrl', function($scope, $http, SearchService, GenericLocalDaoService) {

  // console.log('here');

  $scope.list = [];
  $scope.term = null;

  $scope.categories = [
  {
    id:null,
    name:'Todos'
  },
  {
    id:7,
    name:'Brigadista'
  },
  {
    id:6,
    name:'Enfermeiro(a)'
  },
  {
    id:5,
    name:'Médico'
  },
  {
    id:1,
    name:'Monitor'
  },
  {
    id:2,
    name:'Peregrino(a)'
  },
  {
    id:3,
    name:'Responsável de Grupo'
  },
  {
    id:4,
    name:'Responsável pela Acolhida'
  }
  ];

  function getData(){
    SearchService.getAll().then(function(response){
      if(response.status == 200){

        GenericLocalDaoService.save("contacts",response.data)
        $scope.list = response.data;

      }else{
        $scope.list = GenericLocalDaoService.get("contacts");
      }
    })

    console.log($scope.list);
  }

  $scope.search = function()
  {

    var list = [];

    if(!angular.isUndefined($scope.search.category)){
      list.push(GenericLocalDaoService.getByKey('contacts',"categoria",$scope.search.category));
    }

    if(!angular.isUndefined($scope.search.term))
    {
      var searchObject = '';

      if(list.length == 0){
        searchObject = GenericLocalDaoService.get("contacts");
      }else{
        searchObject = list;
      }

      angular.forEach(searchObject, function(key, value)
      {
        if(!angular.isUndefined(searchObject[value].nome))
        {
          var itemName = searchObject[value].nome.toLowerCase();

          if(itemName.search($scope.search.term.toLowerCase()) >= 0)
          {
            list.push(searchObject[value]);
          }
        }
      })
    }

    $scope.list = {};


    $scope.list = toObject(list)




    // console.log();
    // $scope.list = list;

    // console.log(list);

  }

  function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
  }

  $scope.$on('$ionicView.beforeEnter', function(){
    getData();
  })


// FUNÇÃO QUE GERA ICONES NA LISTA
  // ::::::::::  FIZ ESSA FUNÇÃO TOSCA PARA FAZER APARECER OS ICONES, POR FAVOR ALGUÉM PODE MELHORAR???

  $scope.MudaIcone = function(NomeIcon){
    var NomeClass;

    if(NomeIcon == "Responsável de Grupo"){
      NomeClass = "ion-ios-people";
    }else if(NomeIcon == "Responsável pela Acolhida"){
      NomeClass = "ion-ios-home";
    }else if(NomeIcon == "Peregrino(a)"){
      NomeClass = "ion-android-walk";
    }else if(NomeIcon == "Brigadista"){
      NomeClass = "ion-bonfire";
    }else if(NomeIcon == "Enfermeiro(a)"){
      NomeClass = "ion-ios-medical";
    }else if(NomeIcon == "Médico"){
      NomeClass = "ion-ios-medkit";
    }else if(NomeIcon == "Monitor"){
      NomeClass = "ion-ios-information";
    }else{
      NomeClass = "ion-happy";
    }

    return NomeClass;
  }

// ---------- FIM DA FUNÇÃO QUE GERA ICONES NA LISTA

});