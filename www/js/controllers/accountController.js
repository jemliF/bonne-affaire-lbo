'use strict';

app.controller('AccountController', function ($scope, $localStorage, $stateParams, utilService, apiService, LocalBusinessUserProvider, ionicToast, $state, $ionicNavBarDelegate, ionicDatePicker) {
  utilService.loginCheck();
  $ionicNavBarDelegate.showBackButton(false);
  $scope.siteRoot = apiService;
  var user = _.clone($localStorage.localBusinessUser);
  var localBusinessUser = _.clone($localStorage.localBusinessUser);
  $scope.user = user;

  $scope.genders = [{
    id: 1,
    label: 'Male'
  }, {
    id: 2,
    label: 'Female'
  }];
  if (user.gender == true) {
    $scope.gender = {
      id: 1,
      label: 'Male'
    };

  } else {
    $scope.gender = {
      id: 2,
      label: 'Female'
    };
  }

  var ipObj1 = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      $scope.user.birthdate = new Date(val);
    },

    from: new Date(1930, 1, 1), //Optional
    to: new Date(), //Optional
    closeOnSelect: true,
  };
  $scope.passwordChange = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  };

  $scope.openDatePicker = function () {
    ionicDatePicker.openDatePicker(ipObj1);
  };


  var ipObj1 = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      $scope.user.birthdate = new Date(val);
    },
    /*disabledDates: [            //Optional
     new Date(2016, 2, 16),
     new Date(2015, 3, 16),
     new Date(2015, 4, 16),
     new Date(2015, 5, 16),
     new Date('Wednesday, August 12, 2015'),
     new Date("08-16-2016"),
     new Date(1439676000000)
     ],*/
    from: new Date(1930, 1, 1), //Optional
    to: new Date(), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.changePassword = function () {
    if ($scope.passwordChange.oldPassword !== user.password) {
      ionicToast.show('Please type a correct password', 'middle', false, 3000);
    } else if ($scope.passwordChange.newPassword !== $scope.passwordChange.newPasswordConfirm) {
      ionicToast.show('The new password and its confirmation should be similar', 'middle', false, 3000);
    }

  }

  $scope.fct = function(){
    //alert($scope.gender.label);
  }

  $scope.update = function () {

    //$scope.user.password = $scope.passwordChange.newPassword;
    //$scope.user.gender = ($scope.gender.label.id == 1);
    //alert($scope.gender.id == 1);
    //alert($scope.user.gender);
    LocalBusinessUserProvider.updateLocalBusinessUser($scope.user);
    $localStorage.localBusinessUser = _.clone($scope.user);
    ionicToast.show('Your account was updated successfully', 'middle', false, 3000);

  }

  $scope.updatePassword = function () {

    if ($scope.passwordChange.oldPassword !== localBusinessUser.password) {
      ionicToast.show('Please type a correct password', 'middle', false, 3000);
    } else if ($scope.passwordChange.newPassword !== $scope.passwordChange.newPasswordConfirm) {
      ionicToast.show('The new password and its confirmation should be similar', 'middle', false, 3000);
    } else {
      localBusinessUser.password = $scope.passwordChange.newPassword;
      LocalBusinessUserProvider.updateLocalBusinessUser(localBusinessUser);
      $localStorage.localBusinessUser = _.clone(localBusinessUser);
      ionicToast.show('Your password was updated successfully', 'middle', false, 3000);
      $scope.passwordChange = {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      };
    }
  }
});
