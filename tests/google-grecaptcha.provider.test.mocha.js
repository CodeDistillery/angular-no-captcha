describe('googleGrecaptcha provider', function (){
  beforeEach(module('noCAPTCHA'));

  var googleGrecaptcha;

  beforeEach(inject(function (_googleGrecaptcha_){
    googleGrecaptcha = _googleGrecaptcha_;
  }));

  describe('return promise', function (){
    it('should resolve promise', function (done){
      googleGrecaptcha.then(function (){
        done();
      });
    });
  });
});
