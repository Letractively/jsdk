/**
 * @since: JSDK3 V1.7.0
 * @created: 2011.9.28
 */
function(Engine,Global,rootHome){
	_jsre.loadClassLib("dom");
	$import("js.detect.shell.Browser");
	$import("js.dom.DOMWindow");
	$import("js.dom.DOMElement");
	$import("js.dom.HTML");
	$import("js.dom.HTMLElement");
	$import("js.dom.HTMLDocument");
	var window=_jsre._engine._external;
	var _browserDir=rootHome+"/";
	switch(Global.Browser.Engine.name){
		case "trident":
			_browserDir+="IE";
			break;
		case "gecko":
			_browserDir+="firefox";
			break;
		case "webkit":
			if(Global.Browser.Platform.name=="ios"){
				_browserDir+="ipad_safari";
			}else{
				_browserDir+="(webkit)";
			}
			break;
		case "presto":
			_browserDir+="opera";
			break;
	}
	try{
		eval("with(Global) {("+_jsre.getFileData(_browserDir+"/re.js")+")(_jsre._engine,Global.Browser,window,_browserDir);}");
	}catch(ex){
		_jsre.logger.log("JSDK Initialize "+Global.Browser.Engine.name+" engine browser environment fail.\nSource: "+ex.message||ex);	
	}
}