'use strict';

angular
  .module('noCAPTCHA', [])
  .provider('googleGrecaptcha', function googleGrecaptchaProvider(){
    var language;

    this.setLanguage = function (_language){
      language = _language;
    };

    this.$get = [
      '$q',
      '$window',
      '$document',
      '$rootScope',
      function googleGrecaptchaFactory($q, $window, $document, $rootScope){
        var deferred = $q.defer();

        $window.recaptchaOnloadCallback = function (){
          $rootScope.$apply(function (){
            deferred.resolve();
          });
        };

        var s = $document[0].createElement('script');
        var src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnloadCallback&render=explicit';
        s.type = 'application/javascript';

        if (language) {
          src += '&hl=' + language;
        }
        s.src = src;
        $document[0].body.appendChild(s);

        return deferred.promise;
    }];
  })
  .provider('noCAPTCHA', [
    'googleGrecaptchaProvider',
    function noCaptchaProvider(googleGrecaptchaProvider){
      var siteKey,
        size,
        theme;

      this.setSiteKey = function (_siteKey){
        siteKey = _siteKey;
      };

      this.setSize = function (_size){
        size = _size;
      };

      this.setTheme = function (_theme){
        theme = _theme;
      };

      this.setLanguage = function (language){
        googleGrecaptchaProvider.setLanguage(language);
      };

      this.$get = function noCaptchaFactory(){
        return {
          theme: theme,
          siteKey: siteKey,
          size: size
        };
      };
  }])
  .directive('noCaptcha', [
    'noCAPTCHA',
    'googleGrecaptcha',
    '$document',
    '$window',
    function (noCaptcha, googleGrecaptcha, $document, $window){
      /**
       * Removes all .pls-container elements
       *
       * This is a dirty workaround for fixing reCAPTCHAs bug
       * which leaves obsolete elements that causes errors
       * when closing dialogues or changing pages
       *
       * This will be removed as soon as Google fixes the bug
       *
       * Discussion: https://groups.google.com/forum/#!topic/recaptcha/miaW9qdVIgA
       */
      var removePLSContainers = function(){
        // remove pls-containers
        var plsContainers = $document[0].getElementsByClassName('pls-container');
        for(var i = 0; i < plsContainers.length; i++){
          var parent = plsContainers[i].parentNode;
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
          }
        }
      };

      return {
        restrict: 'EA',
        scope: {
          gRecaptchaResponse: '=',
          siteKey: '@',
          stoken: '@',
          size: '@',
          theme: '@',
          control: '=?',
          expiredCallback: '=?'
        },
        replace: true,
        link: function (scope, element){
          scope.control = scope.control || {};

          var widgetId;
          var grecaptchaCreateParameters;
          var control = scope.control;

          grecaptchaCreateParameters = {
            sitekey: scope.siteKey || noCaptcha.siteKey,
            size: scope.size || noCaptcha.size,
            theme: scope.theme || noCaptcha.theme,
            callback: function (r){
              scope.$apply(function (){
                scope.gRecaptchaResponse = r;
              });
            },
            'expired-callback': function (){
              if(scope.expiredCallback && typeof (scope.expiredCallback) === 'function') {
                scope.$apply(function (){
                  scope.expiredCallback();
                });
              }
            }
          };

          if (scope.stoken) {
            grecaptchaCreateParameters.stoken = scope.stoken;
          }

          if(!grecaptchaCreateParameters.sitekey) {
            throw new Error('Site Key is required');
          }

          googleGrecaptcha.then(function (){
            widgetId = $window.grecaptcha.render(
              element[0],
              grecaptchaCreateParameters
            );
            control.reset = function (){
              $window.grecaptcha.reset(widgetId);
              scope.gRecaptchaResponse = null;
            };
          });

          scope.$on('$destroy', function (){
            if($window.grecaptcha) {
              $window.grecaptcha.reset(widgetId);
            }
            removePLSContainers();
          });
        }
      };
    }]);
