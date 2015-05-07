'use strict';

angular
  .module('noCAPTCHA', [])
  .service('googleGrecaptcha', [
    '$q',
    '$window',
    '$document',
    '$rootScope',
    function googleGrecaptchaService($q, $window, $document, $rootScope){
      var deferred = $q.defer();

      $window.recaptchaOnloadCallback = function (){
        $rootScope.$apply(function (){
          deferred.resolve();
        });
      };

      var s = $document[0].createElement('script');
      s.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnloadCallback&render=explicit';
      $document[0].body.appendChild(s);

      return deferred.promise;
    }])
  .provider('noCAPTCHA', function noCaptchaProvider(){
    var siteKey,
      theme;

    this.setSiteKey = function (_siteKey){
      siteKey = _siteKey;
    };

    this.setTheme = function (_theme){
      theme = _theme;
    };

    this.$get = [function noCaptchaFactory(){
      return {
        theme: theme,
        siteKey: siteKey
      }
    }];
  })
  .directive('noCaptcha', [
    'noCAPTCHA',
    'googleGrecaptcha',
    function (noCaptcha, googleGrecaptcha){
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

          if(!grecaptchaCreateParameters.sitekey) {
            throw new Error('Site Key is required');
          }

          googleGrecaptcha.then(function (){
            widgetId = grecaptcha.render(
              element[0],
              grecaptchaCreateParameters
            );
            control.reset = function (){
              grecaptcha.reset(widgetId);
              scope.gRecaptchaResponse = null;
            };
          });

          scope.$on('$destroy', function (){
            grecaptcha.reset(widgetId);
            removePLSContainers();
          });
        }
      };
    }]);
