'use strict';

app.controller('LoginController', function ($scope, $localStorage, utilService, $http, apiService, $state, ionicToast) {

  utilService.connectedCheck();

  $scope.email = '';
  $scope.password = '';

  $scope.login = function (email, password) {

    if (email.length == 0 || password.length == 0) {
      ionicToast.show('Please provide valid email and password.', 'middle', false, 3000);
    } else {
      $http.get(apiService + '/localbusinessusers/login?email=' + email + "&password=" + password)
        .success(function successCallback(data, status, headersGetter, config) {
          var token = headersGetter("token");
          $localStorage.token = _.clone(token);

          var loginCheck = data;

          if (loginCheck !== null) {
            console.log('true');
            var localBusinessUser = loginCheck;
            $localStorage.localBusinessUser = _.clone(localBusinessUser);

            $state.go('app.liveoffers');
          }
        }).error(function errorCallback(response, status) {
        ionicToast.show('Check your internet connection', 'middle', false, 3000);
        if (status == 403) {
          ionicToast.show('Wrong credentials! please provide valid email and password.', 'middle', false, 3000);
          console.error('Login issue: please provide a valid credentials');
        }
      });
    }


  }

});
