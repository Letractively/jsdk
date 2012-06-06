/**
 * Define JSDK Framework Loader for Specific APP
 * @file: loader.js
 * @description: 
 * @version: V1.17.20120313
 * @product: JSDK3
 * @support: IE6+、Firefox3+、Chrome13+、Safari5+、Opera11+
 * @invoke: <script src="/jsdk3x/loader.js"
 *			 [debug="false"] 
 *			 [cache="true"]
 *			 [develop="false"]
 *			 [appName="JSDK"]
 *			 [appMode="auto|main|sub|alone"]
 *			 [domain="domain"]
 *			 [locale="auto|(lang)|_byBrowser|_byUser|_bySystem"]
 *			 [environment="/service/environment.xml"]
 *			 [include="[mylib[.version]][;...]"]
 *		    ></script>
 * @author: liu denggao
 * @created: 2011.04.09
 * @modified: 2012.04.09
 * @mail: mestime@tom.com
 * @homepage: http://www.wunmei.com.cn
 * @opensource: http://jsdk.googlecode.com
 * @copyright: Copyright (C) 2007-2012 Rainforest Studio.
 ************************************************************/

/*@cc_on @*/
/*@if (!@__jsdk_loaded) @*/

(function(window,oEnviron){
try{
var document=window.document;
var loader=arguments.callee;
loader.name="JSDK3Loader";
loader.version="V1.17.20120313";
loader.getXMLHttpRequest=function () {
	// Create XMLHttpRequest Object
	var progId, progIds = ["MSXML2.XMLHTTP.6.0"
		, "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
	return function () {
		if (typeof(ActiveXObject)=="undefined") {
			return new XMLHttpRequest();
		} else if (progId != null) {
			return new ActiveXObject(progId);
		} else {
			for (var i = 0; i < progIds.length; i++) {
				try	{
					return new ActiveXObject(progId = progIds[i]);
				} catch (ex) {
					progId = null;
				}
			}
		}
	};
}();
loader.getXMLDOMDocument=function () {
	var progId, progIds = ["MSXML2.DOMDocument.6.0"
		, "MSXML2.DOMDocument", "Microsoft.XMLDOM"];
	return function () {
		if (typeof(ActiveXObject)=="undefined") {
			return null;
		} else if (progId != null) {
			return new ActiveXObject(progId);
		} else {
			for (var i = 0; i < progIds.length; i++) {
				try	{
					return new ActiveXObject(progId = progIds[i]);
				} catch (ex) {
					progId = null;
				}
			}
		}
	};
}();
loader.getXMLDOMParser=function () {
	return function(){
		if (typeof(ActiveXObject)=="undefined") {
			return new DOMParser();
		} else {
			return null;
		}
	}
}();
loader.getFileData=function(sFilePath,isNoCache){
	try{
		isNoCache=isNoCache==undefined?false:isNoCache;
		loader._xmlHttp.open("GET", sFilePath, false);
		if(loader._xmlHttp.overrideMimeType) {
			loader._xmlHttp.overrideMimeType("text/plain"); 
		}
		if(isNoCache){
			loader._xmlHttp.setRequestHeader("Pragma","no-cache");
			loader._xmlHttp.setRequestHeader("If-Modified-Since","0");
		}
		loader._xmlHttp.send(null);
		if(loader._xmlHttp.readyState == 4) {		//data accept complete
			if(loader._xmlHttp.status == 200) {	//return request ok
				return loader._xmlHttp.responseText;
			}else if(loader._xmlHttp.status == 0
				&&!loader._xmlHttp.getAllResponseHeaders()){	//request local
				return loader._xmlHttp.responseText;
			}
		}
	}catch(ex){
		throw "Get file error!\nfile: \""+sFilePath+"\" \ndata: "+ex.message||ex;
	}
}
loader.getTagAttribs=function(incAttribs){
	var elScript, oAttribs={};
	for(var scripts=document.getElementsByTagName("SCRIPT"),i=scripts.length-1;i>=0;i--){
		if(scripts[i].src.search(/^.*[\\|\/]jsdk_loader\.js$/i)>=0) {
			elScript=scripts[i]; break;
		}
	}
	if(!elScript) return null;
	for(var i=0;i<incAttribs.length;i++){
		oAttribs[incAttribs[i]]=elScript.getAttribute(incAttribs[i]);
	}
	oAttribs.text=elScript.text;
	return oAttribs;
}

if(oEnviron) loader.environ=oEnviron;
if(!loader.loadedCode) loader.loadedCode="";
if(!loader._xmlHttp) loader._xmlHttp=loader.getXMLHttpRequest();
if(!loader.loadedCode){
	if(!loader.environ){
		var environ=loader.getTagAttribs(["appName","appMode","domain","develop","debug","cache","locale","environment","include","src"]);
		loader.environ={
			develop : (/^(true|1)$/i).test(environ.develop||"false"),
			debug : (/^(true|1)$/i).test(environ.debug||"false"),
			cache : (/^(true|1)$/i).test(environ.cache||"true"),
			appName : environ.appName,
			appMode : environ.appMode,
			domain: environ.domain,
			locale : environ.locale,
			environment : environ.environment,
			include : environ.include?environ.include.split(";"):[],
			src : environ.src,
			text : environ.text
		};
	}else{
		if(loader.environ.debug==undefined) loader.environ.debug=false;
		if(loader.environ.cache==undefined) loader.environ.cache=true;
	} 
	var loader_path=loader.environ.src.match(/^(.*(?:\\|\/))([^(?:\\|\/)]+)$/)[1];
	var loader_config=eval("''||"+loader.getFileData(loader_path+"jsdk_config.json",true));
	var JSRE_Path=loader_path+loader_config.engine;
	loader.environ.src=JSRE_Path;
	if(!environ.debug&&loader_config.debug!=undefined){
		loader.environ.debug=loader_config.debug;
	}
	if(!environ.cache&&loader_config.cache!=undefined){
		loader.environ.cache=loader_config.cache;
	}
	if(!environ.appName&&loader_config.appName){
		loader.environ.appName=loader_config.appName;
	}
	if(!environ.appMode&&loader_config.appMode){
		loader.environ.appMode=loader_config.appMode;
	}
	switch(loader.environ.appMode){
		case "main":
			loader.loadedCode=loader.getFileData(JSRE_Path,!loader.environ.cache);
			break;
		case "sub": 
			if(this.parent&&this.parent!=this){
				loader.loadedCode=this.parent.__JSDK_Namespace__.Engine.getLoader().loadedCode;
				break;
			}else if(this.opener&&this.opener!=this){
				loader.loadedCode=this.opener.__JSDK_Namespace__.Engine.getLoader().loadedCode;
				break;
			}
			break;
		default:
			loader.loadedCode=loader.getFileData(JSRE_Path,!loader.environ.cache);
	}
}
loader.environ.location=window.location;
loader.environ.appFilePath=window.location.pathname;
loader.engine=new (eval("''||"+loader.loadedCode))(
	this,(this.parent&&this.parent!=this)?this.parent:(this.opener&&this.opener!=this?this.opener:null),loader.environ);
}catch(e){
if(!loader.environ||loader.environ.debug) alert(e.description);
}
})(window);

/*@set @__jsdk_loaded = true; @*/
/*@else @*/
/*@end @*/