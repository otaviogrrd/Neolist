appServices
.service('SearchService', function ($http, $filter, GenericLocalDaoService)
{

  var BASE_URL = "http://neolist.com.br/appweb/getContatosNeoList.php";

  this.getAll = function () {
    return $http.get(BASE_URL);
  }

  this.searchBy = function(fields){
   var data = GenericLocalDaoService.get('contacts'),
   list = [];

   if(fields.nome)
   {
    angular.forEach(data, function(value,key)
    {
      var compareName = value.nome.toLowerCase(),
      searchName = fields.nome.toLowerCase();
      if(compareName.indexOf(searchName) !== -1)
      {
        list.push(value);
      }
    })


  }else{
    list = data;
  }

  if(fields.categoria){
    list = _.where(list, {categoria: fields.categoria});
  }

  return list;

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
