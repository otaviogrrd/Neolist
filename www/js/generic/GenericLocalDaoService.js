/**
 * Created by renatoprobst on 18/03/17.
 */

 appServices
 .service('GenericLocalDaoService', function ($http) {


  var isUndefinedOrNull = function(variable) {
    return angular.isUndefined(variable) || variable === null;
  }

  this.save = function (key, value) {

    window.localStorage.setItem(key, JSON.stringify(value));

    return value;
  };
  this.get = function (key) {

    var value = window.localStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  };
    // remove entire key, not just value from list
    this.remove = function (key) {

      window.localStorage.removeItem(key);
    };
    this.getAll = function (key) {

      var values = window.localStorage.getItem(key);
      values = isUndefinedOrNull(values) ? [] : JSON.parse(values);

      return values;
    };
    this.getById = function (key, id) {

      var values = window.localStorage.getItem(key);
      values = isUndefinedOrNull(values) ? [] : values;
      values = JSON.parse(values);

      for (var x = 0; x <= values.length; x++) {
        var item = values[x];

        if(!angular.isUndefined(item['id']) && item['id'] == id) {
          return item;
        }
      }

      return null;
    };

    this.getByKey = function(entity, key, value){
      var values = window.localStorage.getItem(entity);
      values = isUndefinedOrNull(values) ? [] : values;
      values = JSON.parse(values);

      var response = [];

      for (var x = 0; x <= values.length; x++) {
        var item = values[x];

        if(!angular.isUndefined(item)){
          if(!angular.isUndefined(item[key]) && item[key] == value) {
            response.push(item)
          }
        }
      }

      // console.log(response);

      return response[0];

    };


    this.add = function (key, object) {
      var values = window.localStorage.getItem(key);
      values = isUndefinedOrNull(values) ? [] : JSON.parse(values);

      values.push(object);

      this.save(key, values);
    };
    this.edit = function (key, id, object) {
      var oldObject = this.getById(key, id);

      if (isUndefinedOrNull(oldObject)) {
        return false;
      }
      else {
        var values = window.localStorage.getItem(key);
        for (var x = 0; x <= values.length; x++) {
          var item = values[x];

          if(!angular.isUndefined(item['id']) && item['id'] == id) {
            values[x] = object;
            this.save(key, values);
            return true;
          }
        }

        return false;
      }
    };



  })
 ;
