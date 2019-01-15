
appServices
.service('EventsService', function ($http, $filter, GenericLocalDaoService)
{

  var BASE_URL = "http://neolist.com.br/appweb/getEventosNeoList.php";

  this.getAll = function () {
    return $http.get(BASE_URL);
  }




});
