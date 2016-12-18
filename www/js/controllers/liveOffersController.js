'use strict';

app.controller('LiveOffersController', function ($scope, $localStorage, utilService, $http, apiService, $state, ionicToast, $ionicLoading, OfferProvider, $ionicNavBarDelegate, $location, ReservationProvider) {
  //utilService.loginCheck();

  if ($localStorage.localBusinessUser === null || $localStorage.token === null) {
    $state.go('login');
  } else {
    var localBusiness = _.clone($localStorage.localBusinessUser.localBusiness);
    $ionicNavBarDelegate.showBackButton(false);
    $ionicLoading.show({
      content: 'Loading offers...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
      duration: 1000
    });
    $scope.siteRoot = apiService;

    OfferProvider.getActiveOffersByLocalBusiness(localBusiness.id).then(function (offers) {
      $scope.activeOffers = [];
      offers.forEach(function (offer) {
        var activeOffer = {};
        activeOffer.offer = offer;
        activeOffer.time = utilService.dateDifferenceDetailed(new Date(), offer.endDate);

        ReservationProvider.getCountByOfferId(offer.id).then(function (reservationsCount) {
          activeOffer.reservationsCount = reservationsCount;
        }, function (err) {
          console.error(err);
        });

        OfferProvider.getOfferMediaSupports(offer.id).then(function (offerMediaSupports) {
          activeOffer.mediaSupport = offerMediaSupports[0];
        }, function (err) {
          console.error(err);
        });
        $scope.activeOffers.push(activeOffer);
      });
      $ionicLoading.hide();
    }, function (err) {
      alert('Please check your internet connection');
      console.error(err);
    });
  }

  var load = function () {
    OfferProvider.getActiveOffersByLocalBusiness(localBusiness.id).then(function (offers) {
      $scope.activeOffers = [];
      offers.forEach(function (offer) {
        var activeOffer = {};
        activeOffer.offer = offer;
        activeOffer.time = utilService.dateDifferenceDetailed(new Date(), offer.endDate);

        ReservationProvider.getCountByOfferId(offer.id).then(function (reservationsCount) {
          activeOffer.reservationsCount = reservationsCount;
        }, function (err) {
          console.error(err);
        });

        OfferProvider.getOfferMediaSupports(offer.id).then(function (offerMediaSupports) {
          activeOffer.mediaSupport = offerMediaSupports[0];
        }, function (err) {
          console.error(err);
        });
        $scope.activeOffers.push(activeOffer);
      });
      $scope.$broadcast('scroll.refreshComplete');
    }, function (err) {
      alert('Please check your internet connection');
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
