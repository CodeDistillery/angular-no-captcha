angular-no-captcha
==================

Angular.JS wrapper from Google's No CAPTCHA reCAPTCHA

## Prerequisites

1. Sign up for an API key at [https://www.google.com/recaptcha/admin#createsite](https://www.google.com/recaptcha/admin#createsite).

2. Check documentation for No CAPTCHA reCAPTCHA at [https://developers.google.com/recaptcha/intro](https://developers.google.com/recaptcha/intro).

## Usage

1. Install package via bower
    ```
    $ bower install angular-no-captcha
    ```

1. Add Googles reCAPTCHA script to html
    ```html
    <script src='https://www.google.com/recaptcha/api.js'></script>
    ```

1. Include noCAPTCHA script
    ```html
    <script src="angular-no-captcha.js"></script>
    ```

1. Add module dependency to your angular module
    ```javascript
    var app = angular.module('myApp', ['noCAPTCHA']);
    ```

1. Finally add noCaptcha element to your form
    ```html
    <no-captcha
        g-recaptcha-response="gRecaptchaResponse"
        theme='light'
        site-key="<your site key>">
    </no-captcha>
    ```

