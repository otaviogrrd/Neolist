appControllers.controller('ProfileCtrl', function($scope, $rootScope, $http, $state, $ionicPopup, UserService, GenericLocalDaoService) {

	$scope.user = {};
	$scope.viewdata = {};

	$scope.getdata = function(){
		// console.log('here');
		var data = GenericLocalDaoService.get('userdata');
		$scope.countries();
		$scope.user = data[0];
	}

	$scope.countries = function() {
		$http.get('./js/models/country.json').then(function(response) {
			$scope.viewdata.countries = response.data;
		});
	}

	$scope.editUser = function(form){
		if (angular.isDefined(form) && !form.$valid) {
			angular.forEach(form.$error.required, function (field) {
				field.$setDirty();
				field.$setTouched();
			});

		}else{
			UserService.insert($scope.register).then(function(response){
				if(response.status == 200){

					if(response.data == 'user exists'){
						var alert = $ionicPopup.alert({
							title: 'Usuário já cadastrado!',
							template: 'Você já tem cadastro no app'
						});
						alert.then(function(res) {
							login();
						});
					}

					if(response.data == 'ok'){
						var alert = $ionicPopup.alert({
							title: 'Sucesso',
							template: 'Cadastro realizado com sucesso!'
						});
						alert.then(function(res) {
							login();
						});
					}

					if(response.data == 'erro'){
						var alert = $ionicPopup.alert({
							title: 'Ops!',
							template: 'Houve um problema para efetuar o seu cadastro, tente novamente'
						});

					}
				}
			});
		}
	}

	$scope.$on('$ionicView.beforeEnter', function(){
		$scope.getdata();
	})


});