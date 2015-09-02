/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 25.05.2015.
 */

'use strict';
Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var clc = require('cli-color'),
    fs = require('fs'),
    path = require('path'),
    os = require('os');

var Utl = (function () {
	function Utl() {
		_classCallCheck(this, Utl);
	}

	_createClass(Utl, null, [{
		key: 'rejectingError',
		value: function rejectingError() {
			var num = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var msg = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
			var err = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
			var rej = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
			var thr = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

			if (msg) {
				msg = ': ' + msg + '\n';
			} else {
				msg = '\n';
			}

			var sfx = '';
			if (err) {
				sfx = JSON.stringify(err, null, '\t') + '\n' + JSON.stringify(err.stack, null, '\t');
			}

			msg = 'Error ' + __filename + ' #' + num + ' ' + msg + ': ' + sfx;

			Utl.log(msg, 'er');

			err = new Error(msg);

			if (rej) {
				rej(err);
			}

			if (thr) {
				throw err;
			}

			return err;
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

		/**
   * FFS = for file system
   * @return string: current Date-Time formatted like 0000-00-00_00-00-00
   */
		enumerable: true
	}, {
		key: 'getCurrentDateFmtFFS',
		value: function value() {
			//add zero
			function aZ(v) {
				return v < 10 ? '0' + v : v;
			}

			var d = new Date();
			return d.getFullYear() + '-' + aZ(d.getMonth() + 1) + '-' + aZ(d.getDate()) + '_' + aZ(d.getHours()) + '-' + aZ(d.getMinutes()) + '-' + aZ(d.getSeconds());
		},
		enumerable: true
	}, {
		key: 'stripSlash',
		value: function value(pathName) {
			return pathName.replace(/\/+$/, '');
		},
		enumerable: true
	}, {
		key: 'absolutizePath',
		value: function value(p) {
			var rel = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

			if (!path.isAbsolute(p)) {
				p = path.resolve(__dirname + rel + p).replace(/\\/ig, '/');
			}
			return p;
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

			var apx = false;

			//set console style style
			if (msg instanceof Error) {
				style = 'er';
				apx = '\n' + msg.stack;
			}

			//set log format
			if (typeof msg === 'object') {
				msg = JSON.stringify(msg, null, '\t');
				if (apx) {
					msg += apx;
				}
			}

			msg = Utl.logFilter(msg);

			var d = new Date();

			fs.appendFile(path.resolve(os.tmpdir() + '/esfmod.log'), d.toUTCString() + '\t' + msg + '\n', function (err) {
				if (err) throw err;
			});

			if (!silent) {
				console.log(Utl.styles[style]('\nesfmod.log: ' + msg));
			}
		},
		enumerable: true
	}]);

	return Utl;
})();

exports.Utl = Utl;
//# sourceMappingURL=.maps/index.es7.js.map