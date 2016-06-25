/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 25.05.2015.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clc = require('cli-color'),
    fs = require('fs'),
    path = require('path'),
    os = require('os');

class Utl {

  /**
   * Universal ESF-projects-wide Promises error handler
   * @param {number|string} num - error number
   * @param {string}        msg - custom message
   * @param {Error}         err - custom error object
   * @param {function}      rej - Promise reject handler function
   * @param {boolean}       thr - throw: if true - then let throw the Error, set with above params
   * @returns {Error}
    */


  /**
   * Filters out sensitive information from log, using key names
   * @param {String} s
   * @returns {*}
    */
  static rejectingError() {
    let num = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    let msg = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    let err = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    let rej = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    let thr = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];


    if (msg) {
      msg = ': ' + msg + '\n';
    } else {
      msg = '\n';
    }

    let sfx = '';
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

  /**
   * Capitalizes the first letter of a string
   * @param {string} s - a string
   * @returns {string|*}
    */


  /**
   * Transforms a path string to absolute relatively __dirname or dirname + additional `rel` path
   * @param {String} p - a path string to be transformed
   * @param {String} [rel] - additional relative path between the __dirname of context and `p`
   * @returns {String} - absolute path
    */


  /**
   * FFS = for file system
   * @return string: current Date-Time formatted like 0000-00-00_00-00-00
   */
  static capitalize(s) {
    s = s.toLowerCase();
    let a = s.split(/[^a-zA-Z0-9]+/g);
    a = a.map(v => {
      let aa = v.split('');
      aa[0] = aa[0].toUpperCase();
      return aa.join('');
    });
    s = a.join('');
    return s;
  }

}
exports.Utl = Utl;
Utl.styles = {
  'ne': clc.white,
  'er': clc.red,
  'ok': clc.green,
  'em': clc.yellow,
  'erb': clc.redBright,
  'sh': clc.whiteBright,

  'b': clc.blue,
  'bb': clc.blueBright,
  'y': clc.yellow,
  'yb': clc.yellowBright,
  'g': clc.green,
  'gb': clc.greenBright,
  'c': clc.cyan,
  'cb': clc.cyanBright,
  'm': clc.magenta,
  'mb': clc.magentaBright,
  'r': clc.red,
  'rb': clc.redBright,
  'w': clc.white,
  'wb': clc.whiteBright
};

Utl.getCurrentDateFmtFFS = function () {
  //add zero
  function aZ(v) {
    return v < 10 ? `0${ v }` : v;
  }

  let d = new Date();
  return d.getFullYear() + '-' + aZ(d.getMonth() + 1) + '-' + aZ(d.getDate()) + '_' + aZ(d.getHours()) + '-' + aZ(d.getMinutes()) + '-' + aZ(d.getSeconds());
};

Utl.stripSlash = function (pathName) {
  return pathName.replace(/\/+$/, '');
};

Utl.absolutizePath = function (p) {
  let rel = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  if (!path.isAbsolute(p)) {
    p = path.resolve(__dirname + rel + p).replace(/\\/ig, '/');
  }
  return p;
};

Utl.logFilter = function (s) {
  var censorNote = 'FILTERED',
      censoredKeys = ['pass', 'password', 'userPass', 'userPassword', 'token'];

  for (var i = 0, l = censoredKeys.length; i < l; i++) {
    s = (s + '').replace(new RegExp('"' + censoredKeys[i] + '"\s*:\s*"([^"]+)"', "ig"), '"' + censoredKeys[i] + '":"' + censorNote + '"');
  }

  return s;
};

Utl.log = function () {
  let msg = arguments.length <= 0 || arguments[0] === undefined ? '\n' : arguments[0];
  let style = arguments.length <= 1 || arguments[1] === undefined ? 'ne' : arguments[1];
  let silent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];


  //todo: transfer settings to log for a) defining a log file, b) setting logging on/off
  //todo: clearLog method
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
};
//# sourceMappingURL=.maps/index.es7.js.map
