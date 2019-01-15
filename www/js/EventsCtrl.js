appControllers.controller('EventsCtrl', function($scope,$rootScope, $http, GenericLocalDaoService, EventsService) {

  // console.log('here');

  $scope.list = [];
  $scope.term = null;

  function getData(){
    console.log('here');
    var contacts = GenericLocalDaoService.get("events");
    if(contacts == null)
    {
        EventsService.getAll().then(function(response){
        if(response.status == 200)
        {

          GenericLocalDaoService.save("events",response.data)
          $scope.list = response.data;

        }else{
          $scope.list = GenericLocalDaoService.get("events");
        }
      })
    }else{
      $scope.list = contacts;
    }
  }

  $scope.isPast = function(event){
    var date = moment(event.data_inicial),
        now = moment();

    if(now > date){
      return 'past';
    }else{
      return 'future';
    }
  }

  $scope.viewOnMap = function(lat, lng)
  {
    var strCords = lat + ',' + lng;
    document.location.href = "http://maps.google.com/maps?q="+ strCords;
  }

  $scope.$on('$ionicView.beforeEnter', function(){
    getData();
  })
});