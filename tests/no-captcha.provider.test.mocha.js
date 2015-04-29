describe('noCAPTCHA provider', function() {
  var noCAPTCHAProvider;

  beforeEach(function() {
    angular
      .module('dummyModule', function() {})
      .config(['noCAPTCHAProvider', function(provider) {
        noCAPTCHAProvider = provider;
      }]);

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

  describe('set theme', function() {
    var theme = 'dark';

    beforeEach(function() {
      noCAPTCHAProvider.setTheme(theme);
    });

    it('should remember the value', inject(['noCAPTCHA', function(noCAPTCHA) {
      expect(noCAPTCHA.theme).to.equal(theme);
    }]));
  });
});
