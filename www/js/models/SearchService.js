appServices
  .service('SearchService', function ($http, $filter, GenericLocalDaoService)
  {

    var BASE_URL = "http://neolist.com.br/appweb/getContatosNeoList.php";

    this.getAll = function () {
        return $http.get(BASE_URL);
    }


    this.getById = function(contactId){
      var storageContact = GenericLocalDaoService.getById("contacts", contactId);

      if(!angular.isUndefined(storageContact)){
        return storageContact;
      }else{
        return $http.get("http://neolist.com.br/appweb/getDetalheContatoNeoList.php",{
          params: { id: contactId }
        });
      }

     

    }



  });
