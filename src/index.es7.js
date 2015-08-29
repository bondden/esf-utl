/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 25.05.2015.
 */

'use strict';
var clc=require('cli-color');
var fs=require('fs');

export class Utl{

	static styles={
		'ne':clc.white,
		'er':clc.red,
		'ok':clc.green,
		'em':clc.yellow,
		'erb':clc.redBright,
		'sh':clc.whiteBright
	};

	/**
	 * FFS = for file system
	 * @return string: current Date-Time formatted like 0000-00-00_00-00-00
	 */
	static getCurrentDateFmtFFS = function(){
		//add zero
		function aZ(v){
			return (v<10)?`0${v}`:v;
		}

		let d=new Date();
		return d.getFullYear()+'-'+aZ(d.getMonth()+1)+'-'+aZ(d.getDate())+'_'+aZ(d.getHours())+'-'+aZ(d.getMinutes())+'-'+aZ(d.getSeconds());
	};

	static stripSlash = function(pathName){
		return pathName.replace(/\/+$/,'');
	};

	static absolutizePath = function(p,rel=''){
		if(!path.isAbsolute(p)){
			p=path.resolve(__dirname+rel+p).replace(/\\/ig,'/');
		}
		return p;
	};

	static logFilter = function(s){
		var
			censorNote='FILTERED',
			censoredKeys=[
				'pass',
				'password',
				'userPass',
				'userPassword',
				'token'
			]
		;

		for(var i=0,l=censoredKeys.length;i<l;i++){
			s=(s+'').replace(
				new RegExp('"'+censoredKeys[i]+'"\s*:\s*"([^"]+)"',"ig"),
				'"'+censoredKeys[i]+'":"'+censorNote+'"'
			);
		}

		return s;
	};

	static log = function(msg='\n',style='ne',silent=false){

		//todo: transfer settings to log for a) defining a log file, b) setting logging on/off
		//if(!settings.log)return; //

		var H=this;
		var apx  =false;

		//set console style style
		if(msg instanceof Error){
			style='er';
			apx='\n'+msg.stack;
		}

		//set log format
		if(typeof msg === 'object'){
			msg=JSON.stringify(msg);
			if(apx){
				msg+=apx;
			}
		}

		msg=Utl.logFilter(msg);

		var d=new Date();

		fs.appendFile(
			path.resolve(os.tmpdir()+'/esf/esfmod.log'),
			d.toUTCString()+'\t'+msg+'\n',
			function(err){
				if(err) throw err;
			}
		);

		if(!silent){
			console.log(H.styles[style]('\nesfmod.log: '+msg));
		}

	};

}
