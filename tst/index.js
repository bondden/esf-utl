/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 29.06.2015.
 */
'use strict';

var
  assert=require('chai').assert,
  App   =require('../index.js').Utl
  ;

suite('Utl Suit',()=>{

  test('capitalize(s)',()=>{

    var sInp='a-test string_for-TEST yes.abc.cde';
    var sExp='ATestStringForTestYesAbcCde';
    var sOut=App.capitalize(sInp);
    assert.equal(sOut,sExp,' should be '+sExp);

  });

});
