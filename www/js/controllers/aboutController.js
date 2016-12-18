'use strict';

app.controller('AboutController', function ($scope, $localStorage, utilService, $state, $ionicNavBarDelegate) {
  utilService.loginCheck();
  $ionicNavBarDelegate.showBackButton(false);
});
