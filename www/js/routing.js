'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })

    .state('app.logout', {
      url: '/logout',
      views: {
        'menuContent': {
          templateUrl: 'templates/logout.html',
          controller: 'LogoutController'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileController'
        }
      }
    })

    .state('forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'templates/forgotpassword.html',
      controller: 'ForgotPasswordController'
    })

    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html',
          controller: 'HelpController'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'AboutController'
        }
      }
    })

    .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html',
          controller: 'AccountController'
        }
      }
    })

    .state('app.offer', {
      url: '/offers/:offer',
      views: {
        'menuContent': {
          templateUrl: 'templates/offer.html',
          controller: 'OfferController'
        }
      }
    })

    .state('app.validatereservation', {
      url: '/validatereservation/:reservation',
      views: {
        'menuContent': {
          templateUrl: 'templates/validatereservation.html',
          controller: 'ValidateReservationController'
        }
      }
    })

    .state('app.scanvoucher', {
      url: '/scanvoucher',
      views: {
        'menuContent': {
          templateUrl: 'templates/scanvoucher.html',
          controller: 'ScanVoucherController'
        }
      }
    })

    .state('app.expiredoffers', {
      url: '/expiredoffers',
      views: {
        'menuContent': {
          templateUrl: 'templates/expiredoffers.html',
          controller: 'ExpiredOffersController'
        }
      }
    })

    .state('app.liveoffers', {
      url: '/liveoffers',
      views: {
        'menuContent': {
          templateUrl: 'templates/liveoffers.html',
          controller: 'LiveOffersController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/liveoffers');
});
