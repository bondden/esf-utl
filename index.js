/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 25.05.2015.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cc = require('cli-color'),
      fs = require('fs'),
      path = require('path'),
      os = require('os'),
      cirJsn = require('circular-json');

class Utl {

  static get logFile() {
    return path.resolve(`${ os.tmpdir() }/e.log`);
  }

  static get styles() {
    return {
      ne: cc.white,
      er: cc.red,
      ok: cc.green,
      em: cc.yellow,
      erb: cc.redBright,
      sh: cc.whiteBright,

      b: cc.blue,
      bb: cc.blueBright,
      y: cc.yellow,
      yb: cc.yellowBright,
      g: cc.green,
      gb: cc.greenBright,
      c: cc.cyan,
      cb: cc.cyanBright,
      m: cc.magenta,
      mb: cc.magentaBright,
      r: cc.red,
      rb: cc.redBright,
      w: cc.white,
      wb: cc.whiteBright
    };
  }

  /**
   * FFS = for file system
   * @return {string} - current Date-Time formatted like 0000-00-00_00-00-00
   */
  static getCurrentDateFmtFFS() {
    //add zero
    function aZ(v) {
      return v < 10 ? `0${ v }` : v;
    }

    let d = new Date();
    return d.getFullYear() + '-' + aZ(d.getMonth() + 1) + '-' + aZ(d.getDate()) + '_' + aZ(d.getHours()) + '-' + aZ(d.getMinutes()) + '-' + aZ(d.getSeconds());
  }

  /**
   * Returns current date, formatted for log()
   * @return {string} - formatted date
   */
  static getCurrentDateFmtLog() {
    let d = new Date();
    return d.toISOString().replace(/[a-z]+|\..+$/ig, ' ');
  }

  /**
   * Strips all contiguous slashes off the input end
   * @param {string} pathName    - string path
   * @return {XML|string|void|*} - input string without ending slashes 
   */
  static stripSlash(pathName) {
    return pathName.replace(/\/+$/, '');
  }

  /**
   * Transforms a path string to absolute relatively __dirname or dirname + additional `rel` path
   * @param {String} p - a path string to be transformed
   * @param {String} [rel] - additional relative path between the __dirname of context and `p`
   * @returns {String} - absolute path
   */
  static absolutizePath(p) {
    let rel = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    if (!path.isAbsolute(p)) {
      p = path.resolve(__dirname + rel + p).replace(/\\/ig, '/');
    }
    return p;
  }

  /**
   * Filters out sensitive information from log, using key names
   * @param {String} s - unfiltered string
   * @returns {*}      - filtered string
   */
  static logFilter(s) {

    const censorNote = 'FILTERED',
          censoredKeys = ['pass', 'password', 'userPass', 'userPassword', 'token'];

    s = (s + '').replace(new RegExp(`"(${ censoredKeys.join('|') })"[\s\t\r\n  ]*:[\s\t\r\n  ]*"([^"]+)"`, "ig"), `"$1":"${ censorNote }"`);

    return s;
  }

  /**
   * Asynchronously logs messages to file in os tmp folder and optionally to console
   * @param {string|any}  msg     - message
   * @param {string}      style   - style, one of Utl.styles
   * @param {boolean}     silent  - if true, don't output to stdout
   * @return {void}
   */
  static log() {
    let msg = arguments.length <= 0 || arguments[0] === undefined ? '\n' : arguments[0];
    let style = arguments.length <= 1 || arguments[1] === undefined ? 'ne' : arguments[1];
    let silent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];


    //todo: transfer settings to log for a) defining a log file, b) setting logging on/off
    //todo: clearLog method
    //if(!settings.log)return; //

    let apx = '';

    //set console style style
    if (msg instanceof Error) {
      style = 'er';
      apx = Utl.stringifyJSON(msg.stack);
    }

    //set log format
    if (typeof msg === 'object') {
      msg = Utl.stringifyJSON(msg);
      if (apx) {
        msg += apx;
      }
    }

    msg = Utl.logFilter(msg);

    let msgFmt = `${ Utl.getCurrentDateFmtLog() }:  ${ msg }`;

    fs.appendFile(Utl.logFile, msgFmt, e => {
      if (e) throw e;
    });

    if (!silent) {
      console.log(Utl.styles[style](`e: ${ msgFmt }`));
    }
  }

  /**
   * Universal ESF-projects-wide Promises error handler
   * @param {number|string} num - error number
   * @param {string}        msg - custom message
   * @param {Error}         err - custom error object
   * @param {function}      rej - Promise reject handler function
   * @param {boolean}       thr - throw: if true - then let throw the Error, set with above params
   * @returns {Error}           - error object
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
      sfx = `
        ${ err }
        ${ err.stack }
      `;
    }

    msg = `${ Error } ${ __filename } #${ num } ${ msg }: ${ sfx }`;

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
   * @returns {string|*} - capitalized string
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

  /**
   * Stringifies an object, stripping off circular structures
   * Wrapper over circular-json with preset ESF formatting style
   * @param {object|*} o - input data
   * @returns {string}   - stringified JSON
   */
  static stringifyJSON(o) {
    return cirJsn.stringify(o, null, '  ', '[Circular]');
  }

  /**
   * Alias of rejectingError
   * @param {number|string} num - error number
   * @param {string}        msg - custom message
   * @param {Error}         err - custom error object
   * @param {function}      rej - Promise reject handler function
   * @param {boolean}       thr - throw: if true - then let throw the Error, set with above params
   * @returns {Error}           - error object
   */
  static e() {
    let num = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    let msg = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    let err = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    let rej = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    let thr = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

    return Utl.rejectingError(num, msg, err, rej, thr);
  }

  /**
   * ALias of log
   * @param {string|any}  msg     - message
   * @param {string}      style   - style, one of Utl.styles
   * @param {boolean}     silent  - if true, don't output to stdout
   * @return {void}
   */
  static l() {
    let msg = arguments.length <= 0 || arguments[0] === undefined ? '\n' : arguments[0];
    let style = arguments.length <= 1 || arguments[1] === undefined ? 'ne' : arguments[1];
    let silent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    return Utl.log(msg, style, silent);
  }

}
exports.Utl = Utl;
//# sourceMappingURL=.maps/index.es7.js.map
