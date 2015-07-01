describe('googleGrecaptcha provider', function (){
  beforeEach(module('noCAPTCHA'));

  var googleGrecaptcha;
  var $document;

  describe('default options', function (){
    beforeEach(function(){
      inject(function (_googleGrecaptcha_, _$document_){
        $document = _$document_;
        googleGrecaptcha = _googleGrecaptcha_;
      });
    });

    it('should add script element with correct url', function (){
      expect($document.find('body').html()).to.contain('<script type="application/javascript" src="https://www.google.com/recaptcha/api.js?onload=recaptchaOnloadCallback&amp;render=explicit"></script>');
    });

    it('should resolve promise', function (done){
      googleGrecaptcha.then(function (){
        done();
      });
    });
  });

  describe('with specific language', function (){
    beforeEach(function(){
      module(function(googleGrecaptchaProvider){
        googleGrecaptchaProvider.setLanguage('fi');
      });

      inject(function (_googleGrecaptcha_, _$document_){
        $document = _$document_;
        googleGrecaptcha = _googleGrecaptcha_;
      });
    });

    it('should add script element with correct url', function (){
      expect($document.find('body').html()).to.contain('<script type="application/javascript" src="https://www.google.com/recaptcha/api.js?onload=recaptchaOnloadCallback&amp;render=explicit&amp;hl=fi"></script>')
    });
  });
});
