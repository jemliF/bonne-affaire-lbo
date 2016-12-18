'use strict';

app.controller('ExpiredOffersController', function ($scope, $localStorage, utilService, $http, apiService, $state, ionicToast, $ionicLoading, OfferProvider, ReservationProvider) {
  utilService.loginCheck();
  var localBusiness = _.clone($localStorage.localBusinessUser.localBusiness);

  $ionicLoading.show({
    content: 'Loading offers...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 1000
  });
  $scope.siteRoot = apiService;

  OfferProvider.getExpiredOffersByLocalBusiness(localBusiness.id).then(function (offers) {
    $scope.expiredOffers = [];
    offers.forEach(function (offer) {
      var expiredOffer = {};
      expiredOffer.offer = offer;

      ReservationProvider.getCountByOfferId(offer.id).then(function (reservationsCount) {
        expiredOffer.reservationsCount = reservationsCount;
      }, function (err) {
        console.error(err);
      });

      OfferProvider.getOfferMediaSupports(offer.id).then(function (offerMediaSupports) {
        expiredOffer.mediaSupport = offerMediaSupports[0];
      }, function (err) {
        console.error(err);
      });
      $scope.expiredOffers.push(expiredOffer);
    });
    $ionicLoading.hide();
  }, function (err) {
    alert('Please check your internet connection');
    console.error(err);
  });

  var load = function () {
    OfferProvider.getExpiredOffersByLocalBusiness(localBusiness.id).then(function (offers) {
      $scope.expiredOffers = [];
      offers.forEach(function (offer) {
        var expiredOffer = {};
        expiredOffer.offer = offer;

        ReservationProvider.getCountByOfferId(offer.id).then(function (reservationsCount) {
          expiredOffer.reservationsCount = reservationsCount;
        }, function (err) {
          console.error(err);
        });

        OfferProvider.getOfferMediaSupports(offer.id).then(function (offerMediaSupports) {
          expiredOffer.mediaSupport = offerMediaSupports[0];
        }, function (err) {
          console.error(err);
        });
        $scope.expiredOffers.push(expiredOffer);
      });
      $scope.$broadcast('scroll.refreshComplete');
    }, function (err) {
      $scope.$broadcast('scroll.refreshComplete');
      console.error(err);
    });
  }

  $scope.doRefresh = function () {
    load();
  }

  $scope.offerClick = function (offer) {
    $location.path('#/app/offers/' + offer.offer.id);
  }
});
