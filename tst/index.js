/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 29.06.2015.
 */
'use strict';
require('babel/polyfill');

var
	assert   = require('chai').assert,
	cc       = require('cli-color'),
	path     = require('path'),

	App      = require('../index.js').Utl
;

suite('Utl Suit',function(){

	test('capitalize(s)',function(){

		var sInp='a-test string_for-TEST yes.abc.cde';
		var sExp='ATestStringForTestYesAbcCde';
		var sOut=App.capitalize(sInp);
		assert.equal(sOut,sExp,' should be '+sExp);

	});

});
