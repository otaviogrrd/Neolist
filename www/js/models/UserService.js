
appServices
  .service('UserService', function ($http, $filter)
  {

    var BASE_URL = "http://neolist.com.br/appweb";

    this.insert = function(data){

        return $http.post(BASE_URL + "/insertUsuariosNeoList.php",
            "nome=" + data.nome +
            "&username=" + data.username +
            "&senha=" + data.senha +
            "&idioma=" + data.idioma +
            "&email=" + data.email +
            "&telefone=" + data.phone +
            "&telefone2=" + data.phone2 +
            "&pais=" + data.country +
            "&cidade=" + data.city +
            "&estado=" + data.state +
            "&categoria=" + data.category,{
              headers: {
                'Authorization': undefined,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            });
    };

    this.getAll = function () {
        return $http.get(BASE_URL);
    }


    this.getById = function(contactId){
      return $http.get("http://neolist.com.br/appweb/getDetalheContatoNeoList.php",{
        params: { id: contactId }
      });

    }



  });
