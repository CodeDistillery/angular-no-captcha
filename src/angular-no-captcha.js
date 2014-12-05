'use strict';

angular.module('noCAPTCHA', [])
  .provider('noCaptcha', function NoCaptchaProvider() {
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
  .directive('noCaptcha', ['noCaptchaProvider', function(noCaptchaProvider){
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
          sitekey: scope.siteKey || noCaptchaProvider.siteKey,
          theme: scope.theme || noCaptchaProvider.theme,
          callback: function(r){
            scope.$apply(function(){
              scope.gRecaptchaResponse = r;
            });
          }
        };

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
