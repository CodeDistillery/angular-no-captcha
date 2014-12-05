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
        theme:'@'
      },
      replace: true,
      link: function(scope, element){
        var widgetId,
            grecaptchaCreateParameters;

        grecaptchaCreateParameters = {
          sitekey: scope.siteKey || noCaptcha.siteKey,
          theme: scope.theme || noCaptcha.theme,
          callback: function(r){
            scope.$apply(function(){
              scope.gRecaptchaResponse = r;
            });
          }
        };
        if(!grecaptchaCreateParameters.siteKey){
          return throw 'Site Key is required';
        }
        grecaptcha.render(
          element[0],
          grecaptchaCreateParameters
        );

        scope.$on('$destroy', function(){
          grecaptcha.reset(widgetId);
        });
      }
    };
  }]);
