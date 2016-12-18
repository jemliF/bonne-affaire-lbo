'use strict';

app.controller('LogoutController', function ($localStorage, utilService, $location, $state) {

  $localStorage.localBusinessUser = null;
  $localStorage.token = null;
  $location.path('login');
});
