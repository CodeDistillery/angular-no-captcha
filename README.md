angular-no-captcha
==================

[![Join the chat at https://gitter.im/CodeDistillery/angular-no-captcha](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CodeDistillery/angular-no-captcha?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

## no-captcha parameters

| Param                | Type                       | Details                                                                                                                                               |
|----------------------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| g-recaptcha-response | Expression                 | Bind reCAPTCHA response token                                                                                                                         |
| theme                | String {light \| dark}     | Optional. The color theme of the widget. Can be set also in config                                                                                    |
| size                 | String {normal \| compact} | Optional. The size of the widget. Can be set also in config                                                                                           |
| site-key             | String                     | Optional. Your site key. Can be set also in config                                                                                                    |
| stoken               | String                     | Optional. Your [secure token](https://developers.google.com/recaptcha/docs/secure_token). Can **only** be set in your element.                        |
| language             | String                     | Optional. Forces the widget to render in a specific [language](https://developers.google.com/recaptcha/docs/language). Can **only** be set in config. |
| control              | Expression                 | Optional. Object where reset-function will be injected                                                                                                |
| expired-callback     | Expression                 | Optional. Callback for expired event                                                                                                                  |

## Example

1. Add your ```API key``` to ```example/index.html```
1. Run Server ```$ node example/server.js```

## Developing

### Tests

```$ npm test```

### Release

Release task builds the project and releases a new version to GitHub

You must set the environment variable ```GITHUB_ACCESS_TOKEN=<your-token>```

```$ grunt release[:patch | :minor | :major]```
