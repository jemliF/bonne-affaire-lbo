var app = angular.module('lbo', ['ionic', 'starter.controllers', 'ngCordova', 'ngResource', 'ngStorage', 'ion-gallery', 'ionic-toast', 'ionic-datepicker'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

app.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
});

app.config(function (ionicDatePickerProvider) {
  var datePickerObj = {
    inputDate: new Date(),
    setLabel: 'Confirm',
    todayLabel: 'Today',
    closeLabel: 'Close',
    mondayFirst: true,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(1930, 1, 1),
    to: new Date(new Date()),
    showTodayButton: false,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: true,
    disableWeekdays: [],
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
});

app.config(function (ionGalleryConfigProvider) {
  ionGalleryConfigProvider.setGalleryConfig({
    action_label: 'Close',
    toggle: false,
    row_size: 2,
    fixed_row_size: true
  });
});

