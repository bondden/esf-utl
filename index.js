/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 25.05.2015.
 */

'use strict';
Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var clc = require('cli-color');
var fs = require('fs');

var Utl = (function () {
	function Utl() {
		_classCallCheck(this, Utl);
	}

	_createClass(Utl, null, [{
		key: 'getCurrentDateFmtFFS',

		/**
   * FFS = for file system
   * @return string: current Date-Time formatted like 0000-00-00_00-00-00
   */
		value: function getCurrentDateFmtFFS() {
			//add zero
			function aZ(v) {
				return v < 10 ? '0' + v : v;
			}

			var d = new Date();
			return d.getFullYear + '-' + aZ(d.getMonth() + 1) + '-' + aZ(d.getDate()) + '_' + aZ(d.getHours()) + '-' + aZ(d.getMinutes()) + '-' + aZ(d.getSeconds());
		}
	}, {
		key: 'absolutizePath',
		value: function absolutizePath(p) {
			var rel = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

			if (!path.isAbsolute(p)) {
				p = path.resolve(__dirname + rel + p).replace(/\\/ig, '/');
			}
			return p;
		}
	}, {
		key: 'styles',
		value: {
			'ne': clc.white,
			'er': clc.red,
			'ok': clc.green,
			'em': clc.yellow,
			'erb': clc.redBright,
			'sh': clc.whiteBright
		},
		enumerable: true
	}, {
		key: 'stripSlash',
		value: function value(pathName) {
			return pathName.replace(/\/+$/, '');
		},
		enumerable: true
	}, {
		key: 'logFilter',
		value: function value(s) {
			var censorNote = 'FILTERED',
			    censoredKeys = ['pass', 'password', 'userPass', 'userPassword', 'token'];

			for (var i = 0, l = censoredKeys.length; i < l; i++) {
				s = (s + '').replace(new RegExp('"' + censoredKeys[i] + '"\s*:\s*"([^"]+)"', "ig"), '"' + censoredKeys[i] + '":"' + censorNote + '"');
			}

			return s;
		},
		enumerable: true
	}, {
		key: 'log',
		value: function value() {
			var msg = arguments.length <= 0 || arguments[0] === undefined ? '\n' : arguments[0];
			var style = arguments.length <= 1 || arguments[1] === undefined ? 'ne' : arguments[1];
			var silent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

			//todo: transfer settings to log for a) defining a log file, b) setting logging on/off
			//if(!settings.log)return; //

			var H = this;
			var apx = false;

			//set console style style
			if (msg instanceof Error) {
				style = 'er';
				apx = '\n' + msg.stack;
			}

			//set log format
			if (typeof msg === 'object') {
				msg = JSON.stringify(msg);
				if (apx) {
					msg += apx;
				}
			}

			msg = Utl.logFilter(msg);

			var d = new Date();

			fs.appendFile('./d/utolog.log', d.toUTCString() + '\t' + msg + '\n', function (err) {
				if (err) throw err;
			});

			if (!silent) {
				console.log(H.styles[style]('\nuto.log: ' + msg));
			}
		},
		enumerable: true
	}]);

	return Utl;
})();

exports.Utl = Utl;
//# sourceMappingURL=.maps/index.es7.js.map