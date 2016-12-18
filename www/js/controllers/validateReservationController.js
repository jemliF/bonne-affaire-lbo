'use strict';

app.controller('ValidateReservationController', function ($scope, $localStorage, utilService, $stateParams, apiService, $state, ionicToast, ReservationProvider, OfferProvider, OfferFeedbackProvider, OfferViewProvider, OfferRatingProvider, $ionicViewService) {
  utilService.loginCheck();
  $scope.siteRoot = apiService;
  var reservationId = $stateParams.reservation;


  ReservationProvider.getById(reservationId).then(function (reservation) {
    if (reservation.status == 'confirmed') {
      $scope.isConfirmed = true;
      ionicToast.show('Reservation already confirmed', 'middle', false, 8000);
    }else{
      $scope.isConfirmed = false;
    }

    $scope.reservation = reservation;
    //alert('reservation: ' + reservation.id);

    OfferProvider.getByReservation(reservationId).then(function (offer) {
      var activeOffer = {};
      activeOffer.offer = offer;
      activeOffer.time = utilService.dateDifferenceDetailed(new Date(), offer.endDate);
      //alert('offer: ' + angular.toJson(offer));

      OfferProvider.getOfferStatus(offer.id).then(function (status) {
        $scope.status = status;
        if (status !== 'Active') {
          alert('This offer is no longer available');
        }
        //alert('offer status: ' + status);
      }, function (err) {
        alert('Please check your internet connection');
        console.error(err);
      });

      OfferProvider.getOfferMediaSupports(offer.id).then(function (offerMediaSupports) {
        activeOffer.mediaSupport = offerMediaSupports[0];
        activeOffer.mediaSupport2 = offerMediaSupports[1];

        //alert('offer media support: ' + angular.toJson(offerMediaSupports));

        if (offerMediaSupports.length > 1) {
          $scope.mediaSupports = [
            {
              src: $scope.siteRoot + '/upload/assets/img/media-support/' + offerMediaSupports[0].fileName,
              sub: ''
            },
            {
              src: $scope.siteRoot + '/upload/assets/img/media-support/' + offerMediaSupports[1].fileName,
              sub: ''
            }
          ];
        } else {
          $scope.mediaSupports = [
            {
              src: $scope.siteRoot + '/upload/assets/img/media-support/' + offerMediaSupports[0].fileName,
              sub: ''
            }
          ];
        }
        $scope.activeOffer = activeOffer;

        //reservations
        ReservationProvider.getCountByOfferId(offer.id).then(function (reservationsCount) {
          $scope.reservationsCount = reservationsCount;
          //alert('reservation count: ' + reservationsCount);
        }, function (err) {
          alert('Please check your internet connection');
          console.error(err);
        });

        /*offer ratings
         OfferRatingProvider.getByOfferId(offer.id).then(function (ratings) {
         $scope.ratings = [];
         ratings.forEach(function (oneRating) {
         var rateObj = {};
         rateObj.rating = oneRating;
         var stars = [];
         for (var i = 0; i < oneRating.value; i++) {
         stars.push(i);
         }
         rateObj.stars = stars;

         $scope.ratings.push(rateObj);
         });

         }, function (err) {
         console.error(err);
         });*/

        /*offer feedbacks
         OfferFeedbackProvider.getByOfferId(offer.id).then(function (feedbacks) {
         $scope.feedbacks = feedbacks;
         }, function (err) {
         console.error(err);
         });*/


      }, function (err) {
        console.error(err);
      });

    });

  }, function (err) {
    alert('Please, check your internet connection');
  });

  $scope.confirmReservation = function () {
    $scope.reservation.status = 'confirmed';
    $scope.isConfirmed = true;
    $scope.reservation.offer = $scope.activeOffer.offer;
    ReservationProvider.update($scope.reservation);
  }

  $scope.goHome = function(){
    /*$ionicViewService.nextViewOptions({
      disableBack: true
    });*/
    $state.go('app.home');
  }
});
