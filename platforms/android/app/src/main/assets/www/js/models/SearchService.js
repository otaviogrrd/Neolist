/**
 * Created by renatoprobst on 18/03/17.
 */

appServices
  .service('SearchService', function ($http, $filter)
  {

    var BASE_URL = "http://neolist.com.br/appweb/getContatosNeoList.php";

    this.getAll = function () {
        return $http.get(BASE_URL);
    }


    this.getById = function(contactId){
      return $http.get("http://neolist.com.br/appweb/getDetalheContatoNeoList.php",{
        params: { id: contactId }
      });

    }



  });
