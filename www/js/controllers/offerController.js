'use strict';

app
  .controller('OfferController', function ($scope, $localStorage, $stateParams, OfferProvider, utilService, apiService, ReservationProvider, ionicToast, $ionicModal, OfferViewProvider, $location, OfferRatingProvider, OfferFeedbackProvider, $ionicNavBarDelegate) {
    utilService.loginCheck();
    $ionicNavBarDelegate.showBackButton(false);
    var localBusiness = _.clone($localStorage.localBusinessUser.localBusiness);
    $scope.siteRoot = apiService;
    var offerId = $stateParams.offer;

    OfferProvider.getOfferById(offerId).then(function (offer) {
      var activeOffer = {};
      activeOffer.offer = offer;
      activeOffer.time = utilService.dateDifferenceDetailed(new Date(), offer.endDate);

      OfferProvider.getOfferMediaSupports(offer.id).then(function (offerMediaSupports) {
        activeOffer.mediaSupport = offerMediaSupports[0];
        activeOffer.mediaSupport2 = offerMediaSupports[1];


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
        //alert(angular.toJSON($scope.activeOffer));

      }, function (err) {
        console.error(angular.toJSON(err));
      });

    });

    //reservations
    ReservationProvider.getCountByOfferId(offerId).then(function (reservationsCount) {
      $scope.reservationsCount = reservationsCount;
    }, function (err) {
      console.error(angular.toJSON(err));
    });

    //offer ratings
    OfferRatingProvider.getByOfferId(offerId).then(function (ratings) {
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
      console.error(angular.toJSON(err));
    });

    //offer feedbacks
    OfferFeedbackProvider.getByOfferId(offerId).then(function (feedbacks) {
      $scope.feedbacks = feedbacks;
    }, function (err) {
      console.error(angular.toJSON(err));
    });
  });
