
appServices
.service('UserService', function ($http, $filter, GenericLocalDaoService)
{

  var BASE_URL = "http://neolist.com.br/appweb";

  this.insert = function(data){

    return $http.post(BASE_URL + "/insertUsuariosNeoList.php",
      "nome=" + data.nome +
      "&username=" + data.login +
      "&senha=" + data.password +
      "&idioma=" + data.language +
      "&email=" + data.email +
      "&telefone=" + data.phone +
      "&telefone2=" + data.phone2 +
      "&pais=" + data.country +
      "&cidade=" + data.city +
      "&estado=" + data.state +
      "&categoria=" + data.category,
      {
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
    return $http.get(BASE_URL + "/getDetalheContatoNeoList.php",{
      params: { id: contactId }
    });

  }

  this.findMe = function(email)
  {
    var data = GenericLocalDaoService.get('contacts'), 
    me = _.where(data, {email: email});

    return (me != "") ? me : {};

  }


  this.login = function(data)
  {
    return $http.get(BASE_URL + '/getLoginNeoList.php',{
      params:{
        username:data.username,
        senha:data.password
      }
    });
  }

  this.logout = function(){
    return GenericLocalDaoService.remove('userdata');
  }

  this.updateProfile = function(login, data){

    return $http.get(BASE_URL + '/getDetalhesAlteracao.php',{
      params:{
        id:login
      }
    });
  }



});
