appControllers.controller('SearchCtrl', function($scope, $http, SearchService, GenericLocalDaoService) {

  // console.log('here');

  $scope.list = [];
  $scope.term = null;
  $scope.searchfield = {};
  $scope.listAll = [];

  $scope.categories = [
    { id:null, name:'Todos' },
    { id:7, name:'Brigadista' },
    { id:6, name:'Enfermeiro(a)' },
    { id:5, name:'Médico' },
    { id:1, name:'CNC-Brasília' },
    { id:2, name:'Peregrino(a)' },
    { id:3, name:'Responsável de Grupo' },
    { id:4, name:'Responsável pela Acolhida' }
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
    $scope.list = SearchService.searchBy($scope.searchfield);

    
    // console.log(response);
   // SearchService.searchBy($scope.searchfield).then(function(response){
   //  console.log(response);
   // })
   // $scope.listAll = $scope.list;

   // var filterList = _.where($scope.listAll, $scope.searchfield);

   // $scope.list = filterList;

    // if($scope.searchfield.term == ""){
    //   $scope.list = GenericLocalDaoService.get("contacts");
    // }

    // if(!angular.isUndefined($scope.searchfield.category)){

    //   $scope.list = GenericLocalDaoService.getByKey('contacts',"categoria",$scope.searchfield.category);

    // }

    // if(!angular.isUndefined($scope.searchfield.term))
    // {
    //   var searchObject = $scope.list;
    //   var response = [];

    //   angular.forEach(searchObject, function(key, value)
    //   {
    //     if(!angular.isUndefined(searchObject[value]))
    //     {
    //       var itemName = searchObject[value].nome.toLowerCase();

    //       if(itemName.search($scope.searchfield.term.toLowerCase()) >= 0)
    //       {
    //         response.push(searchObject[value]);
    //       }
    //     }
    //   })
    //   $scope.list = toObject(response)
    // }


    

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