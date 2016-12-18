'use strict';

app.controller('ScanVoucherController', function ($scope, $localStorage, utilService, $http, apiService, $location, ionicToast, $cordovaBarcodeScanner, ReservationProvider, OfferProvider, LocalBusinessProvider, $state, $ionicPlatform) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;
  //alert('ScanVoucherController');
  document.addEventListener("deviceready", function () {
    $cordovaBarcodeScanner
      .scan()
      .then(function (barcodeData) {
        // Success! Barcode data is here
        //alert('Barcode data is here');

        if (isNaN(barcodeData.text)) {
          //alert('Invalid voucher!');
          ionicToast.show('Invalid voucher!', 'middle', false, 3000);
          $location.path('/app/liveoffers');
        } else {
          var reservationId = parseInt(barcodeData.text);
          //alert('It is a number');
          if (reservationId > 0) {
            ReservationProvider.getById(reservationId).then(function (reservation) {
              //alert('reservation: ' + JSON.stringify(reservation));
              if (reservation.id > 0) {
                OfferProvider.getByReservation(reservation.id).then(function (offer) {
                  //alert('offer: ' + JSON.stringify(offer));
                  OfferProvider.getLocalBusinessByOfferId(offer.id).then(function (localBusiness) {
                    //alert('localBusiness: ' + JSON.stringify(localBusiness));
                    if (localBusiness.id !== $localStorage.localBusinessUser.localBusiness.id) {
                      //alert('Invalid voucher!');
                      ionicToast.show('Invalid voucher!', 'middle', false, 3000);
                      $location.path('/app/liveoffers');
                    } else {
                      $location.path('/app/validatereservation/' + reservationId);
                    }
                  }, function (err) {
                    alert('Please, check your internet connection');
                  });
                }, function (err) {
                  alert('Please, check your internet connection');
                });

              } else {
                ionicToast.show('Invalid voucher!', 'middle', false, 3000);
                $location.path('/app/liveoffers');
              }
            }, function (err) {
              alert('Please, check your internet connection');
            });
          }
        }

        //$location.path('/app/validatereservation/' + reservationId);
      }, function (error) {
        alert('Unable to read this QR-Code!');
      });

  }, false);

  $ionicPlatform.onHardwareBackButton(function () {
    //$location.path('/app/liveoffers');
    $state.go('/app/liveoffers');
  });

});
