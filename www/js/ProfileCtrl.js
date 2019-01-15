appControllers.controller('ProfileCtrl', function($scope, $rootScope, $http, $state, $ionicPopup, UserService, GenericLocalDaoService) {

	$scope.user = {};
	// $scope.viewdata = {};

	$scope.viewdata = {
		categories: [{
			id: 7,
			name: 'Brigadista'
		},
		{
			id: 6,
			name: 'Enfermeiro(a)'
		},
		{
			id: 5,
			name: 'Médico'
		},
		{
			id: 1,
			name: 'CNC-Brasília'
		},
		{
			id: 2,
			name: 'Peregrino(a)'
		},
		{
			id: 3,
			name: 'Responsável de Grupo'
		},
		{
			id: 4,
			name: 'Responsável pela Acolhida'
		}
		],
		languages: [{
			val: 'ar',
			name: 'Árabe'
		},
		{
			val: 'es',
			name: 'Espanhol'
		},
		{
			val: 'fr',
			name: 'Francês'
		},
		{
			val: 'in',
			name: 'Inglês'
		},
		{
			val: 'it',
			name: 'Italiano'
		},
		{
			val: 'pt',
			name: 'Português'
		},
		{
			val: 'ou',
			name: 'Outros'
		},
		],
		countries:{}
	}

	$scope.getdata = function(){
		var data = GenericLocalDaoService.get('userdata');
		$scope.countries();
		$scope.user = data[0];

		$scope.user.category = data[0].categoria;
		$scope.user.language = data[0].idioma;

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
			UserService.updateProfile($scope.user).then(function(response){
				if(response.status == 200){
					if(response.data == "ok"){
						var alert = $ionicPopup.alert({
							title: 'Sucesso',
							template: 'Cadastro atualizado com sucesso!'
						});

						var data = [];
						data.push($scope.user);

						GenericLocalDaoService.remove('userdata');
						UserService.getUpdatedProfile($scope.user.login).then(function(response)
						{
							if(response.status == 200){
								GenericLocalDaoService.remove("contacts");
								updateContacts();
								GenericLocalDaoService.save("userdata",response.data);	
							}
						});
					}else{
						var alert = $ionicPopup.alert({
							title: 'Ops!',
							template: 'Houve um problema para efetuar o seu cadastro, tente novamente'
						});
					}
				}
			});
		}
	}

	function updateContacts(){
		GenericLocalDaoService.remove("contacts");
    SearchService.getAll().then(function(response){
      if(response.status == 200)
      {
        GenericLocalDaoService.save("contacts",response.data)
      }
    })
    
	}

	$scope.$on('$ionicView.beforeEnter', function(){
		$scope.getdata();
	})


});