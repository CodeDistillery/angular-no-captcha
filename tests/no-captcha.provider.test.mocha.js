describe('noCAPTCHA provider', function() {
  var noCAPTCHAProvider, googleGrecaptchaProvider;

  beforeEach(function() {
    angular
      .module('dummyModule', function() {})
      .config(function(_noCAPTCHAProvider_, _googleGrecaptchaProvider_) {
        noCAPTCHAProvider = _noCAPTCHAProvider_;
        googleGrecaptchaProvider = _googleGrecaptchaProvider_;
      });

    module('noCAPTCHA', 'dummyModule');

    inject(function(){});
  });

  describe('set site key', function() {
    var testSiteKey = 'aaabbb';

    beforeEach(function() {
      noCAPTCHAProvider.setSiteKey(testSiteKey);
    });

    it('should remember the value', inject(['noCAPTCHA', function(noCAPTCHA) {
      expect(noCAPTCHA.siteKey).to.equal(testSiteKey);
    }]));
  });

  describe('set site size', function() {
    var testSize = 'compact';

    beforeEach(function() {
      noCAPTCHAProvider.setSize(testSize);
    });

    it('should remember the value', inject(['noCAPTCHA', function(noCAPTCHA) {
      expect(noCAPTCHA.size).to.equal(testSize);
    }]));
  });

  describe('set theme', function() {
    var theme = 'dark';

    beforeEach(function() {
      noCAPTCHAProvider.setTheme(theme);
    });

    it('should remember the value', inject(['noCAPTCHA', function(noCAPTCHA) {
      expect(noCAPTCHA.theme).to.equal(theme);
    }]));
  });

  describe('set language', function() {
    var language = 'en';

    beforeEach(function() {
      sinon.spy(googleGrecaptchaProvider, 'setLanguage');
      noCAPTCHAProvider.setLanguage(language);
    });

    it('should set googleGrecaptchaProvider language', function () {
      expect(googleGrecaptchaProvider.setLanguage).to.have.been.calledWith(language);
    });
  });
});
