'use strict';

angular
  .module('noCAPTCHA', [])
  .directive('noCaptcha', function(){
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
            parameters;

        parameters = {
          sitekey: scope.siteKey,
          callback: function(r){
            scope.$apply(function(){
              scope.gRecaptchaResponse = r;
            });
          }
        };

        if(scope.theme){
          parameters.theme = scope.theme;
        }

        grecaptcha.render(
          element[0],
          parameters
        );

        scope.$on('$destroy', function(){
          grecaptcha.reset(widgetId);
        });
      }
    };
  });
