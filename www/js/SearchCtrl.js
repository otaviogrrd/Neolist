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
    var contacts = GenericLocalDaoService.get("contacts");
    if(contacts == null)
    {
        SearchService.getAll().then(function(response){
        if(response.status == 200)
        {

          GenericLocalDaoService.save("contacts",response.data)
          $scope.list = response.data;

        }else{
          $scope.list = GenericLocalDaoService.get("contacts");
        }
      })
    }else{
      $scope.list = contacts;
    }
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

  $scope.setIcon = function(category)
  {
    var icons = {
      1:"ion-ios-information",
      2:"ion-android-walk",
      3:"ion-ios-people",
      4:"ion-ios-home",
      5:"ion-ios-medkit",
      6:"ion-ios-medical",
      7:"ion-bonfire"
    };
    var cat = parseInt(category);

    return (!angular.isUndefined(icons[cat])) ? icons[cat] : icons[7];

  }
});