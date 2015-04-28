describe('noCAPTCHA directive', function (){
  beforeEach(module('noCAPTCHA'));

  describe('reset', function (){
    var element;
    var scope;
    var innerScope;
    var control;
    var key = 'aaa';

    beforeEach(function (done){
      inject(function ($rootScope, $compile, googleGrecaptcha){
        scope = $rootScope.$new();
        scope.key = key;

        element = angular.element('<no-captcha site-key="key" g-recaptcha-response="gRecaptchaResponse" control="control"></no-captcha>');
        $compile(element)(scope);

        innerScope = element.isolateScope();

        scope.$digest();

        googleGrecaptcha.then(function (){
          done();
        });
      })
    });

    it('should reset gRecaptchaResponse value', function(done){
      scope.control.reset();

      // hack: wait for angular digest to be ready
      setTimeout(function(){
        expect(scope.gRecaptchaResponse).to.equal(null);
        done();
      });
    });
  });
});
