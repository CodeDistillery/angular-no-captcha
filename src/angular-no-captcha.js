'use strict';

angular.module('noCAPTCHA', [])
  .service('googleGrecaptcha', ['$q', '$window', '$document', function GoogleGrecaptchaService($q, $window, $document) {
    var deferred = $q.defer();

    $window.recaptchaOnloadCallback = function () {
      deferred.resolve();
    };

    var s = $document[0].createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnloadCallback&render=explicit';
    $document[0].body.appendChild(s);

    return deferred.promise;
  }])
  .provider('noCAPTCHA', function NoCaptchaProvider() {
    var siteKey,
      theme;

    this.setSiteKey = function(_siteKey){
      siteKey = _siteKey;
    };

    this.setTheme = function(_theme){
      theme = _theme;
    };

    this.$get = [function NoCaptchaFactory() {
      return {
        theme: theme,
        siteKey: siteKey
      }
    }];
  })
  .directive('noCaptcha', ['noCAPTCHA','googleGrecaptcha', function(noCaptcha, googleGrecaptcha){
    return {
      restrict:'EA',
      scope: {
        gRecaptchaResponse:'=',
        siteKey:'@',
        theme:'@',
        control:'=',
        expiredCallback: '='
      },
      replace: true,
      link: function(scope, element) {
        scope.control = scope.control || {};
        
        var widgetId,
          grecaptchaCreateParameters,
          control = scope.control;

        grecaptchaCreateParameters = {
          sitekey: scope.siteKey || noCaptcha.siteKey,
          theme: scope.theme || noCaptcha.theme,
          callback: function(r){
            scope.$apply(function(){
              scope.gRecaptchaResponse = r;
            });
          },
          'expired-callback': function () {
            if (scope.expiredCallback && typeof (scope.expiredCallback) === 'function') {
              scope.$apply(function () {
                scope.expiredCallback();
              });
            }
          }
        };

        if(!grecaptchaCreateParameters.sitekey){
          throw new Error('Site Key is required');
        }

        googleGrecaptcha.then(function(){
          widgetId = grecaptcha.render(
            element[0],
            grecaptchaCreateParameters
          );
          control.reset = function(){
            grecaptcha.reset(widgetId);
            scope.gRecaptchaResponse = null;
          };
        });

        scope.$on('$destroy', function(){
          grecaptcha.reset(widgetId);
        });
      }
    };
  }]);
