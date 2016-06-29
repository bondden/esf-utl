/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 29.06.2015.
 */
'use strict';

const
  assert=require('chai').assert,
  App   =require('../index.js').Utl
  ;

suite('Utl Suit',()=>{

  test('capitalize(s)',()=>{

    let
      sInp='a-test string_for-TEST yes.abc.cde',
      sExp='ATestStringForTestYesAbcCde'
      ;

    let sOut=App.capitalize(sInp);
    assert.equal(sOut,sExp,' should be '+sExp);

  });

  test('stringifyJSON(o)',()=>{

    let 
      oInp={k:'v'},
      sExp=`{
  "k": "v",
  "H": "[Circular]"
}`
      ;
    oInp.H=oInp;

    let sOut=App.stringifyJSON(oInp);
    assert.equal(sOut,sExp,' should be '+sExp);

  });

});
