'use strict';

app
  .service('LocalBusinessUserProvider', function ($resource, $q, apiService, apiToken, utilService) {

    var createdLocalBusinessUser;

    this.resetPassword = function (email) {
      var deferred = $q.defer();
      var AdminUserResource = $resource(apiService + '/localbusinessusers/password/reset', {'email': email}, {
        get: {
          method: 'POST',
          isArray: false
        }
      });
      AdminUserResource.get({'email': email}, function (result) {
        deferred.resolve(result);
        console.log('password reset: ' + result);
      }, function (err) {
        console.error('check your server connection');
        deferred.reject(err);
      });
      return deferred.promise;
    };

    this.updateLocalBusinessUser = function (localBusinessUser) {
      console.log('localBusinessUser to be updated: ' + JSON.stringify(localBusinessUser));
      var LocalBusinessUserResource = $resource(apiService + '/localbusinessusers/:id', {id: '@id'}, {
        update: {
          method: 'PUT',
          headers: {token: utilService.apiToken()}
        }
      });
      LocalBusinessUserResource.update({id: localBusinessUser.id}, localBusinessUser);
    };

    this.getUserById = function (id) {
      var deferred = $q.defer();
      var LocalBusinessUserResource = $resource(apiService + '/localbusinessusers/:id', {id: '@id'}, {
        get: {
          method: 'GET',
          headers: {token: utilService.apiToken()},
          isArray: false
        }
      });
      LocalBusinessUserResource.get({id: id}, function (result) {
        deferred.resolve(result);
      }, function (err) {
        console.error(err);
        deferred.reject(err);
      });
      return deferred.promise;
    };
  });
