'use strict';

app.controller('ProfileController', function ($scope, $localStorage, $stateParams, utilService, apiService, $ionicNavBarDelegate) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;
  $ionicNavBarDelegate.showBackButton(false);

  $scope.localBusinessUser = $localStorage.localBusinessUser;
});
