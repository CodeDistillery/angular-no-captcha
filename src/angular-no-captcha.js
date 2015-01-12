'use strict';

angular.module('noCAPTCHA', [])
	.service('googleGrecaptcha', ['$q', '$window', function GoogleGrecaptchaService($q, $window) {
		var deferred = $q.defer();

		$window.recaptchaOnloadCallback = function() {
			deferred.resolve();
		};

		var s = document.createElement('script');
		s.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnloadCallback&render=explicit';
		document.body.appendChild(s);

		return deferred.promise;
	}])
	.provider('noCAPTCHA', function NoCaptchaProvider() {
		var siteKey,
			theme,
			req;

		this.setSiteKey = function(_siteKey) {
			siteKey = _siteKey;
		};

		this.setTheme = function(_theme) {
			theme = _theme;
		};

		this.setReq = function(_req) {
			req = _req;
		};

		this.$get = [function NoCaptchaFactory() {
			return {
				theme: theme,
				siteKey: siteKey,
				req: req
			}
		}];
	})
	.directive('noCaptcha', ['noCAPTCHA', 'googleGrecaptcha', '$http', function(noCaptcha, googleGrecaptcha, $http) {
		return {
			restrict: 'EA',
			scope: {
				gRecaptchaSuccess: '=',
				siteKey: '@',
				theme: '@',
				control: '='
			},
			replace: true,
			link: function(scope, element) {
				var widgetId,
					grecaptchaCreateParameters,
					control = scope.control || {};

				grecaptchaCreateParameters = {
					sitekey: scope.siteKey || noCaptcha.siteKey,
					theme: scope.theme || noCaptcha.theme,
					callback: function(response) {
						noCaptcha.req.data = {responseString: response};
						
						$http(noCaptcha.req).
						success(function(data, status, headers, config) {
							scope.gRecaptchaSuccess = data.success;
						}).
						error(function(data, status, headers, config) {
							scope.gRecaptchaSuccess = false;
							console.log(data);
						})
					}
				};

				if (!grecaptchaCreateParameters.sitekey) {
					throw new Error('Site Key is required');
				}

				googleGrecaptcha.then(function() {
					widgetId = grecaptcha.render(
						element[0],
						grecaptchaCreateParameters
					);
					control.reset = function() {
						grecaptcha.reset(widgetId);
						scope.gRecaptchaSuccess = false;
					};
				});

				scope.$on('$destroy', function() {
					grecaptcha.reset(widgetId);
				});
			}
		};
	}]);