angular-no-captcha
==================

Angular.JS wrapper for Google's No CAPTCHA reCAPTCHA. See demo at [http://codedistillery.github.io/angular-no-captcha/](http://codedistillery.github.io/angular-no-captcha/)

## Prerequisites

1. Sign up for an API key at [https://www.google.com/recaptcha/admin#createsite](https://www.google.com/recaptcha/admin#createsite).

1. Check documentation for No CAPTCHA reCAPTCHA at [https://developers.google.com/recaptcha/intro](https://developers.google.com/recaptcha/intro).

## Usage

1. Install package via bower and save it as a project dependency
    ```
    $ bower install angular-no-captcha --save
    ````

1. Include noCAPTCHA script
    ```html
    <script src="src/angular-no-captcha.js"></script>
    ```

1. Add module dependency to your angular module
    ```javascript
    var app = angular.module('myApp', ['noCAPTCHA']);
    ```

1. (IMPORTANT) Set the request method,endpoint,headers to your backend page for user's response verification.
	(See [https://developers.google.com/recaptcha/docs/verify](there) for details).
	The result of verification (true or false) will be bind into g-recaptcha-success expression.
    ```javascript
    angular.module('myApp')
      .config(['noCAPTCHAProvider', function (noCaptchaProvider) {
	  	noCaptchaProvider.setReq({
			method: 'POST',
			url: '/recaptcha'
		});
      }
    ]);
    ```

1. (Optional step) Set default options for noCAPTCHA 
    ```javascript
    angular.module('myApp')
      .config(['noCAPTCHAProvider', function (noCaptchaProvider) {
	  	noCaptchaProvider.setReq({
			method: 'POST',
			url: '/recaptcha'
		});
        noCaptchaProvider.setSiteKey('<your site key>');
        noCaptchaProvider.setTheme('dark');
      }
    ]);
    ```
    
1. Add noCaptcha element to your form
    ```html
    <no-captcha
        g-recaptcha-success="verificated"
        theme='light'
        control="noCaptchaControl"
        site-key="<your site key>">
    </no-captcha>
    ```
	
1. Enable/disable submit button according to the g-recaptcha-success state
	```html
	<button ng-disable="!verificated">Submit</button>
	```

## no-captcha element parameters

| Param                | Type                   | Details                                                            |
|----------------------|------------------------|--------------------------------------------------------------------|
| g-recaptcha-success | Expression             | Bind reCAPTCHA verification response                                      |
| theme                | String {light \| dark} | Optional. The color theme of the widget. Can be set also in config |
| site-key             | String                 | Optional. Your site key. Can be set also in config                 |
| control              | Expression             | Optional. Object where reset-function will be injected             |

