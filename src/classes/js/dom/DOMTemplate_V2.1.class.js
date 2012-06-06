/**
 * @file DOMTemplate.js
 * @version 2.1
 * @author Liu Denggao
 * @created 2011.9.3
 * @modified 2011.9.22
 * @since JSDK3 V1.5.4
 */

$package("js.dom");
js.dom.DOMTemplate=function(sCode){
	this._processor;
	this._subs=[];
	this._source;
	this._srcPath="";
	this._target;
	this._isOnsiteOutput=false;
	this._DOMTemplate(sCode);
};
var _$class=js.dom.DOMTemplate;
_$class.$name="DOMTemplate";
_$class.$extends("Object");
var _$proto=_$class.prototype;

//:constructor----------------

_$class.newInstanceWithUrl=function(sUrl){
	var tpl=new this();
	tpl._DOMTemplateFromUrl(sUrl);
	return tpl;
}
_$class.newInstanceWithId=function(sId){
	var tpl=new this();
	tpl._DOMTemplateFromId(sId);
	return tpl;
}
_$proto._DOMTemplate=function(sCode){
	if(!sCode) return;
	this._DOMTemplateFromCode(sCode);
}
_$proto._DOMTemplateFromUrl=function(sUrl){
	this._srcPath=sUrl;
	this._DOMTemplateFromCode(Global.get(sUrl,"",false,"","Text"));
}
_$proto._DOMTemplateFromId=function(sId){
	var els=Global.dom("#"+sId);
	if(!els.length) throw "Element '"+sId+"' not found.";
	this._source=els[0];
	this._srcPath=els[0].getAttribute("src");
	this._DOMTemplateFromCode(els[0].text||els[0].value
		||(els[0].getAttribute("src")&&Global.get(els[0].getAttribute("src"),"",false,"","Text"))||"");
}
_$proto._DOMTemplateFromCode=function(sCode){
	var codes=[];
	var strs=Global.obj(sCode).xsplit("group",["<%#","%>","<%=","%>","<%","%>","${","}","<!--#include","-->"]);
	var startOfHTML = "\t__views.push(";
    var endOfHTML = ");\n";
	for(var i=0,iLen=strs.length;i<iLen;i++){
		switch(strs[i][0]){
			case "":
				codes.push(startOfHTML,Global.obj(strs[i][1]).serialize(),endOfHTML);
				break;
			case "<%#%>":
				//process comment
				break;
			case "<%=%>":
				//process variante
				codes.push(startOfHTML,strs[i][1],endOfHTML);
				break;
			case "<%%>":
				//process script
				codes.push(strs[i][1]);
				break;
			case "${}":
				codes.push(startOfHTML,strs[i][1],endOfHTML);
				break;
			case "<!--#include-->":		//路径为相对本模版的路径
				var src=(strs[i][1].trim().match(/^src=\"([^\"]+)\"$/)||[null,""]).pop();
				if(src){
					try{
						src=Global.getURIFullPath((this._srcPath||document.location.pathname).leftBack("/"),src,"/");
						var tpl1=this.getClass().newInstanceWithUrl(src,"",false,"","Text");
						this._subs.push(tpl1);
						codes.push(startOfHTML,"this._subs[\""+(this._subs.length-1)+"\"].parse(json)",endOfHTML);
					}catch(e){
					}
				}
				break;
		}
	}
	this._processor=new Function("json", "var __views = [];\n with(json){"+codes.join("") + '};return __views.join("");');
}

//:property-------------------------

_$proto.getTarget=function(){
	return this._target;
}
_$proto.setTarget=function(value){
	this._target=value;
}
_$proto.getIsOnsiteOutput=function(){
	return this._isOnsiteOutput;
}
_$proto.setIsOnsiteOutput=function(value){
	this._isOnsiteOutput=value;
}

//:method--------------------------

/**
 * @para fnInit: fnInit(container)
 */
_$proto.parse=function(json,vOutput,fnInit){
	var sCode=this._processor(json||{});
	var oOutput;
	if(vOutput){
		if(typeof(vOutput)=="string"){
			oOutput=Global.dom("#"+vOutput)[0];
		}else{
			oOutput=vOutput;
		}
		oOutput.innerHTML=sCode;
		if(typeof(fnInit)=="function"){
			fnInit(oOutput);
		}
	}else if(this._isOnsiteOutput){
		if(this._source) {
			var parser=document.createElement("div");
			var fragment = document.createDocumentFragment();
			parser.innerHTML=sCode;
			while (parser.firstChild) {
				fragment.appendChild(parser.firstChild);
			}
			this._source.parentNode.replaceChild(fragment, this._source);
			if(typeof(fnInit)=="function"){
				fnInit(fragment);
			}
		}
	}else if(this._target){
		this._target.innerHTML=sCode;
		if(typeof(fnInit)=="function"){
			fnInit(oOutput);
		}
	}else{
		return sCode;
	}
}

