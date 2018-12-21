appControllers.controller('RegisterCtrl', function($scope, $http, $state, UserService) {

    $scope.register = {};
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
                name: 'Monitor'
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




    $scope.countries = function() {
        $http.get('./js/models/country.json').then(function(response) {
            $scope.viewdata.countries = response.data;
        });
    }

    $scope.countries();

    $scope.registerUser = function(form){
        // UserService.insert($scope.register);
        if (angular.isDefined(form) && !form.$valid) {
            angular.forEach(form.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
            });

        }else{
            UserService.insert($scope.register);
        }
      // console.log($scope.register);
    }



    


});