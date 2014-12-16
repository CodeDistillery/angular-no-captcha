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

1. (Optional step) Set default options for noCAPTCHA 
    ```javascript
    angular.module('myApp')
      .config(['noCAPTCHAProvider', function (noCaptchaProvider) {
        noCaptchaProvider.setSiteKey('<your site key>');
        noCaptchaProvider.setTheme('dark');
      }
    ]);
    ```
    
1. Finally add noCaptcha element to your form
    ```html
    <no-captcha
        g-recaptcha-response="gRecaptchaResponse"
        theme='light'
        control="noCaptchaControl"
        site-key="<your site key>">
    </no-captcha>
    ```

## no-captcha element parameters

| Param                | Type                   | Details                                                            |
|----------------------|------------------------|--------------------------------------------------------------------|
| g-recaptcha-response | Expression             | Bind reCAPTCHA response token                                      |
| theme                | String {light \| dark} | Optional. The color theme of the widget. Can be set also in config |
| site-key             | String                 | Optional. Your site key. Can be set also in config                 |
| control              | Expression             | Optional. Object where reset-function will be injected             |

