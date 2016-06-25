/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 25.05.2015.
 */

'use strict';
var
  clc =require('cli-color'),
  fs  =require('fs'),
  path=require('path'),
  os  =require('os')
;

export class Utl {

  static styles={
    'ne': clc.white,
    'er': clc.red,
    'ok': clc.green,
    'em': clc.yellow,
    'erb':clc.redBright,
    'sh': clc.whiteBright,

    'b':  clc.blue,
    'bb': clc.blueBright,
    'y':  clc.yellow,
    'yb': clc.yellowBright,
    'g':  clc.green,
    'gb': clc.greenBright,
    'c':  clc.cyan,
    'cb': clc.cyanBright,
    'm':  clc.magenta,
    'mb': clc.magentaBright,
    'r':  clc.red,
    'rb': clc.redBright,
    'w':  clc.white,
    'wb': clc.whiteBright
  };

  /**
   * FFS = for file system
   * @return string: current Date-Time formatted like 0000-00-00_00-00-00
   */
  static getCurrentDateFmtFFS=function(){
    //add zero
    function aZ(v){
      return (v<10)?`0${v}`:v;
    }

    let d=new Date();
    return d.getFullYear()+'-'+aZ(d.getMonth()+1)+'-'+aZ(d.getDate())+'_'+aZ(d.getHours())+'-'+aZ(d.getMinutes())+'-'+aZ(d.getSeconds());
  };

  static stripSlash=function(pathName){
    return pathName.replace(/\/+$/,'');
  };

	/**
	 * Transforms a path string to absolute relatively __dirname or dirname + additional `rel` path
	 * @param {String} p - a path string to be transformed
	 * @param {String} [rel] - additional relative path between the __dirname of context and `p`
	 * @returns {String} - absolute path
   */
  static absolutizePath=function(p,rel=''){
    if(!path.isAbsolute(p)){
      p=path.resolve(__dirname+rel+p).replace(/\\/ig,'/');
    }
    return p;
  };

	/**
	 * Filters out sensitive information from log, using key names
	 * @param {String} s
	 * @returns {*}
   */
  static logFilter=function(s){
    var
      censorNote  ='FILTERED',
      censoredKeys=[
        'pass',
        'password',
        'userPass',
        'userPassword',
        'token'
      ]
    ;

    for(var i=0,l=censoredKeys.length; i<l; i++){
      s=(s+'').replace(
        new RegExp('"'+censoredKeys[i]+'"\s*:\s*"([^"]+)"',"ig"),
        '"'+censoredKeys[i]+'":"'+censorNote+'"'
      );
    }

    return s;
  };

  static log=function(msg='\n',style='ne',silent=false){

    //todo: transfer settings to log for a) defining a log file, b) setting logging on/off
    //todo: clearLog method
    //if(!settings.log)return; //

    var apx=false;

    //set console style style
    if(msg instanceof Error){
      style='er';
      apx  ='\n'+msg.stack;
    }

    //set log format
    if(typeof msg==='object'){
      msg=JSON.stringify(msg,null,'\t');
      if(apx){
        msg+=apx;
      }
    }

    msg=Utl.logFilter(msg);

    var d=new Date();

    fs.appendFile(
      path.resolve(os.tmpdir()+'/esfmod.log'),
      d.toUTCString()+'\t'+msg+'\n',
      function(err){
        if(err) throw err;
      }
    );

    if(!silent){
      console.log(Utl.styles[style]('\nesfmod.log: '+msg));
    }

  };

	/**
	 * Universal ESF-projects-wide Promises error handler
	 * @param {number|string} num - error number
	 * @param {string}        msg - custom message
	 * @param {Error}         err - custom error object
	 * @param {function}      rej - Promise reject handler function
	 * @param {boolean}       thr - throw: if true - then let throw the Error, set with above params
	 * @returns {Error}
   */
  static rejectingError(
    num = 0,
    msg = '',
    err = null,
    rej = null,
    thr = false
  ){

    if(msg){
      msg=': '+msg+'\n';
    }else{
      msg='\n';
    }

    let sfx='';
    if(err){
      sfx=JSON.stringify(err,null,'\t')+'\n'+JSON.stringify(err.stack,null,'\t');
    }

    msg='Error '+__filename+' #'+num+' '+msg+': '+sfx;

    Utl.log(msg,'er');

    err=new Error(msg);

    if(rej){
      rej(err);
    }

    if(thr){
      throw err;
    }

    return err;

  }

	/**
	 * Capitalizes the first letter of a string
	 * @param {string} s - a string
	 * @returns {string|*}
   */
  static capitalize(s){
    s=s.toLowerCase();
    let a=s.split(/[^a-zA-Z0-9]+/g);
    a=a.map((v)=>{
      let aa=v.split('');
      aa[0]=aa[0].toUpperCase();
      return aa.join('');
    });
    s=a.join('');
    return s;
  }

}
