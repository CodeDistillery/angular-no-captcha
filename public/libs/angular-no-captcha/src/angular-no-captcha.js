'use strict';

angular.module('noCAPTCHA', [])
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
  .directive('noCaptcha', ['noCAPTCHA', function(noCaptcha){
    return {
      restrict:'EA',
      scope: {
        gRecaptchaResponse:'=',
        siteKey:'@',
        theme:'@',
        control:'='
      },
      replace: true,
      link: function(scope, element) {
        var widgetId,
            grecaptchaCreateParameters,
            control = scope.control || {};

        grecaptchaCreateParameters = {
          sitekey: scope.siteKey || noCaptcha.siteKey,
          theme: scope.theme || noCaptcha.theme,
          callback: function(r){
            scope.$apply(function(){
              scope.gRecaptchaResponse = r;
            });
          }
        };

        if(!grecaptchaCreateParameters.sitekey){
          throw new Error('Site Key is required');
        }

        widgetId = grecaptcha.render(
          element[0],
          grecaptchaCreateParameters
        );

        control.reset = function(){
          grecaptcha.reset(widgetId);
          scope.gRecaptchaResponse = null;
        };

        scope.$on('$destroy', function(){
          grecaptcha.reset(widgetId);
        });
      }
    };
  }]);
