(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: ServerFinder', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.core'));

    var ServerFinder;

    beforeEach(inject(function($injector){

      ServerFinder = $injector.get('ServerFinder');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
