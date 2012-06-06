

;(function(window){
/*----- loader ----- */
var loader={};
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

/*----- jsdk ----- */
var Global={

/**************************
 * keyset scan code
 * @file: key.js
 * @author: liu denggao
 * @date: 2007-2011.06.02
 **************************/

KEY_F1			: 112,
KEY_F2			: 113,
KEY_F3			: 114,
KEY_F4			: 115,
KEY_F5			: 116,
KEY_F6			: 117,
KEY_F7			: 118,
KEY_F8			: 119,
KEY_F9			: 120,
KEY_F10			: 121,
KEY_F11			: 122,
KEY_F12			: 123,
KEY_Enter		: 13,
KEY_Backspace	: 8,
KEY_Insert		: 45,
KEY_Delete		: 46,
KEY_Space		: 32,
KEY_Home		: 36,
KEY_End			: 35,
KEY_PageUp		: 33,
KEY_PageDown	: 34,
KEY_Up			: 38,
KEY_Down		: 40,
KEY_Left		: 37,
KEY_Right		: 39,
KEY_NUM_Min		: 48,
KEY_NUM_Max		: 57,
KEY_LET_Min		: 65,
KEY_LET_Max		: 90,
KEY_LET_FST		: 65,
KEY_LET_LST		: 90,
KEY_MIN_Min		: 96,
KEY_MIN_Max		: 105
,

/**
 * global function
 * @file: function.js
 * @author: liu denggao
 * @created: 2011.11.03
 * @modified: 2011.11.03
 **************************/

"_xmlHttp": loader.getXMLHttpRequest(),
"_xmlDom" : loader.getXMLDOMDocument(),
"_xmlParser" : loader.getXMLDOMParser(),

/**
 * @modified: 2011.6.2
 */
"isArray" : function(value){
	if(value instanceof Array){
		return true;
	}else if(Object.prototype.toString.apply(value) === '[object Array]'){
		return true;
	}else{
		return false;
	}
},
/**
 * @created: 2011.6.2
 */
"isEmpty" : function(value){
	if(!this.isArray(value)){
		switch(typeof(value)){
			case "undefined":
				return true;
			case "string":
				return value=="";
			case "number":
				return false;
			case "boolean":
				return false;
			case "object":
				if(value instanceof String){
					return value=="";
				}else if(value instanceof Array){
					return value.length==0;
				}else{
					return value==null;
				}
		}
	}else if(value.length==0){
		return true;
	}else{
		return false;
	}
},
/**
 * @created: 2011.6.2
 */
"isNumber" : function(value,isSensitive){
	if(typeof(value)=="object"){
		if(value instanceof Number){
			return true;
		}else if(value instanceof String){
			return !isSensitive&&value!=""&&!isNaN(value);
		}
	}else if(typeof(value)=="number"){
		return true;
	}else{
		return !isSensitive&&value!=""&&!isNaN(value);
	}
},
/**
 * @created: 2011.6.2
 */
"globalEval" : function(code,host){
	var external=host||this.Engine.getExternal();
	if ( code ) {
		( external.execScript || function( code ) {
			external[ "eval" ].call( external, code );
		} )( code );
	}
},
"attempt" : function(){
	for (var i = 0, l = arguments.length; i < l; i++){
		try {
			return arguments[i]();
		} catch(e){}
	}
	return undefined;
}
,

/**
 * global function for URI(Uniform Resource Identifier)
 * @file: function.js
 * @author: liu denggao
 * @created: 2011.7.27
 * @modified: 2011.11.02
 **************************/

/**
 * @created: 2011.7.27
 * @para sSep: can only as a char
 */
"getURIFullPath" : function(sCurPath,sUriPath,sSep){
	sCurPath=sCurPath.replace(new RegExp("\\"+sSep+"+$"),"");
	sSep=sSep?sSep:"/";
	var aValues=sUriPath.split(sSep);
	if(sUriPath==""){
		return sCurPath;
	}else if(aValues[0]==""){
		return sUriPath;
	}else if(aValues[0].indexOf(":")>=0){		//is full path
		return sUriPath;
	}else if(aValues[0]=="."){
		return arguments.callee(sCurPath,aValues.slice(1).join(sSep),sSep);
	}else if(aValues[0]==".."){
		if(sCurPath.indexOf(sSep)>=0){
			return arguments.callee(sCurPath.slice(0,sCurPath.lastIndexOf(sSep))
				,aValues.slice(1).join(sSep),sSep);
		}else{
			return arguments.callee(sCurPath,aValues.slice(1).join(sSep),sSep);
		}
	}else{
		return [sCurPath,sUriPath].join(sSep);
	}
},

/**
 * Get relative path
 * @description: not support cross query
 * @para sTargetPath: query by mode that is first up and down
 * @date 2010.1.29
 */
"getURIRelPath" : function(sCurFullPath,sTargetPath,sSep){
	sSep=sSep?sSep:"/";
	var aCurPaths=sCurFullPath.split(sSep);
	var aTarPaths=sTargetPath.split(sSep);
	var iTarUpLevel=0,iTarDownLevel=0;
	var iRelUpLevel=0,aRelUpPaths=[],aRelDownPaths=[];
	if(aTarPaths[0]==""){	//is absolute path
		iRelUpLevel=aTarPaths.length-1;
		aRelDownPaths=aCurPaths.slice(1);
	}else{
		for(var i=0;i<aTarPaths.length;i++){
			if(aTarPaths[i]==".") continue;
			else if(aTarPaths[i]==".."){
				iTarUpLevel++;
			}else{
				iTarDownLevel++;
			}
		}
		iRelUpLevel=iTarDownLevel;
		//down
		for(var i=0,j=aCurPaths.length-iTarUpLevel;i<iTarUpLevel;i++){
			aRelDownPaths[i]=aCurPaths[j++];
		}
	}
	//up
	for(var i=0;i<iRelUpLevel;i++){
		aRelUpPaths[i]="..";
	}

	return [].concat(aRelUpPaths,aRelDownPaths).join(sSep);
},
/**
 * get parameter of url
 * @created: 2011.11.02
 * @modified: 2011.11.02
 */
"getURIPrmt" : function(sPrmts,sName){
	sPrmts=(sPrmts.toString().match(/^[^?]*[?]?([^?#]+)[#]?/)||[null,""]).pop();
	var items=sPrmts?sPrmts.split("&"):[];
	for(var i=0,j=0;i<items.length;i++){
		if(items[i]=="") continue;
		var sName1=decodeURIComponent(items[i].split("=")[0]);
		if(sName1.toLowerCase()==sName.toLowerCase()){
			return decodeURIComponent(items[i].right("=")); 
		}
	}
}

,

/**
 * global function for parser for lite edition
 * @file: function.parser.js
 * @version: V1.0
 * @author: liu denggao
 * @created: 2011.11.03
 * @modified: 2011.11.03
 **************************/

/**
 * @created: 2011.8.20
 */
"parseJSON": function(data){
	try{
		var func=new Function("return("+data+");");
	}catch(e){
	}
	return !!func?func():func;
},
/**
 * @created: 2011.8.20
 */
"parseXML": function(data){
	if(this._xmlDom){
		this._xmlDom.loadXML(data.replace(/^[\s\r\n]*/g, '').replace(/<![^<|>]*>/g,""));
		return this._xmlDom;
	}else{
		return this._xmlParser.parseFromString(data,"text/xml");
	}
},

/**
 * global function for charset for lite edition
 * @file: function.charset.js
 * @version: V0.1
 * @since: JSDK3 V1.5.4
 * @author: liu denggao
 * @created: 2011.11.03
 **************************/

/**
 * convert wide string of utf16 of type to byte string of utf8 of type.
 * @since: JSDK3 V1.5.4
 * @created: 2011.9.7
 */
"utf16to8" : function(str) {
	var out, i, len, c;

	out = "";
	len = str.length;
	for(i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
		}
	}
	return out;
},
/**
 * convert byte string of utf8 of type to wide string of utf16 of type.
 * @since: JSDK3 V1.5.4
 * @created: 2011.9.7
 */
"utf8to16" : function(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
		 c = str.charCodeAt(i++);
		 switch(c >> 4){ 
		   case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
		     // 0xxxxxxx
		     out += str.charAt(i-1);
		     break;
		   case 12: case 13:
		     // 110x xxxx   10xx xxxx
		     char2 = str.charCodeAt(i++);
		     out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
		     break;
		   case 14:
		     // 1110 xxxx  10xx xxxx  10xx xxxx
		     char2 = str.charCodeAt(i++);
		     char3 = str.charCodeAt(i++);
		     out += String.fromCharCode(((c & 0x0F) << 12) |
		        ((char2 & 0x3F) << 6) |
		        ((char3 & 0x3F) << 0));
		     break;
		 }
	}

    return out;
},
/**
 * convert binary to 'BSTR' type
 */
"bin2str" : function(bin){
	var hex_str=this.bin2hex(bin);
	var ret_str="";
	for(var i=0;i<hex_str.length;i+=2){
		ret_str+=String.fromCharCode(parseInt("0x"+hex_str.charAt(i)+hex_str.charAt(i+1)));
	}
	return ret_str;
},
/**
 * convert binary to hex string
 * only support for IE
 */
"bin2hex" : function(bin){
	var _xmlDom=loader.getXMLDOMDocument();
	var _xmlParser=loader.getXMLDOMParser();
	var xml=null;
	var node=null;
	if(_xmlDom){
		xml=_xmlDom;
	}else{
		xml=_xmlParser.parseFromString("","text/xml");
	}
	node=xml.createElement("root");
	node.dataType = "bin.hex";
	node.nodeTypedValue=bin;
	return node.text||node.textContent;
},
"str2hex" : function(s){
	var v,i, f = 0, a = [];  
	s += '';
	f = s.length;  

	for (i = 0; i<f; i++) {  
		a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");  
	}  
	  
	return a.join('');
}

,

/**
 * global function for ajax for lite edition
 * @file: function.ajax.js
 * @version: V1.5.2
 * @author: liu denggao
 * @created: 2011.11.03
 * @modified: 2011.11.03
 **************************/

/**
 * @since: JSDK3 V1.2.4
 * @author: liudenggao
 * @created: 2011.6.23
 * @modified: 2011.11.03
 * @log: solve an problem caused by multiple asynchronous operations.
 */
"get": function(){
	var global;
	var ajax={
		_xmlHttp: loader.getXMLHttpRequest(),
		_xmlDom: loader.getXMLDOMDocument(),
		_xmlParser: loader.getXMLDOMParser(),
		_isCache: true,
		get: function(sUrl,vData,isCache,fpCallBack,sFormat,sCharset,fpConvert){
			if(isCache==undefined) isCache=this._isCache;
			if (vData){
				if(typeof(vData)=="object"){
					vData=this.serialize(vData,"PRMT");
				}
				sUrl+=(sUrl.match(/\?/) ? "&" : "?") + vData;
			}
			var isAsyn=!!fpCallBack;
			var xmlHttp=isAsyn? loader.getXMLHttpRequest(): this._xmlHttp;
			xmlHttp.open("GET", sUrl, isAsyn);
			if(xmlHttp.overrideMimeType) { //Firefox
				switch(sFormat){
					case "Text":
						xmlHttp.overrideMimeType("text/plain"+(sCharset?("; charset="+sCharset):"")); 
						break;
					case "XML":
						xmlHttp.overrideMimeType("text/xml"+(sCharset?("; charset="+sCharset):"")); 
						break;
					default:
						xmlHttp.overrideMimeType("application/octet_stream"+(sCharset?("; charset="+sCharset):"")); 
				}
			}
			if (vData){
				xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				vData=null;
			}			
			if(!isCache){
				xmlHttp.setRequestHeader("Pragma","no-cache");
				xmlHttp.setRequestHeader("If-Modified-Since","0");
			}			
			if(isAsyn){
				var thisObj=this;
				xmlHttp.onreadystatechange=function(){
					if(xmlHttp.readyState == 4) {	//data receive completed
					   //200 return OK of request status 
					   if(xmlHttp.status == 200) {
							fpCallBack(thisObj.getOnReady(xmlHttp,sFormat,sCharset,fpConvert));
					   }else if(xmlHttp.status == 0
							&&!xmlHttp.getAllResponseHeaders()){
							fpCallBack(thisObj.getOnReady(xmlHttp,sFormat,sCharset,fpConvert));
					   }else{
							throw "get resource error !";
							return;
					   }
					}
				}
				xmlHttp.send(vData);
			}else{
				xmlHttp.send(vData);
				if(xmlHttp.readyState == 4) {	//data receive completed
				   //200 return OK of request status
				   if(xmlHttp.status == 200) {
						return this.getOnReady(xmlHttp,sFormat,sCharset,fpConvert);
				   }else if(xmlHttp.status == 0
						&&!xmlHttp.getAllResponseHeaders()){
						return this.getOnReady(xmlHttp,sFormat,sCharset,fpConvert);
				   }else{
						throw "get resource error !";
						return;
				   }
				}
			}
		},				
		getOnReady : function(xmlHttp,sFormat,sCharset,fpConvert){
			var contentType=xmlHttp.getResponseHeader("Content-Type").split(";")[0];
			if(sFormat=="Text"){
				return this.getTextOnReady(xmlHttp,sCharset,fpConvert);
			}else if(sFormat=="XML"){
				var xml;
				try{
					if(contentType=="text/xml"||contentType=="application/xml"||xmlHttp.overrideMimeType){
						xml=xmlHttp.responseXML;
					}else if(contentType==""||contentType=="application/octet_stream"){
						if(this._xmlDom){
							this._xmlDom.loadXML(this.getTextOnReady(xmlHttp,sCharset,fpConvert)
									.replace(/^[\s\r\n]*/g, '').replace(/<![^<|>]*>/g,""));
							xml=this._xmlDom;
						}else{
							xml=this._xmlParser.parseFromString(xmlHttp.responseText,"text/xml");
						}
					}else if(contentType.split("/")[0]=="text"){
						if(this._xmlDom){
							this._xmlDom.loadXML(this.getTextOnReady(xmlHttp,sCharset,fpConvert)
									.replace(/^[\s\r\n]*/g, '').replace(/<![^<|>]*>/g,""));
							xml=this._xmlDom;
						}else{
							xml=this._xmlParser.parseFromString(xmlHttp.responseText,"text/xml");
						}
					}
					if(xml&&xml.documentElement
						&&xml.documentElement.nodeName.toLowerCase()!="parsererror") 
						return xml;
				}catch(e){
				}
				return null;
			}else if(sFormat=="JSON"){
				try{
					var func=new Function("return("+this.getTextOnReady(xmlHttp,sCharset,fpConvert)+");");
				}catch(e){
				}
				return !!func?func():func;
			}else{
				return xmlHttp.responseBody;
			}
		},
		getTextOnReady: function(xmlHttp,sCharset,fpConvert){
			var origCharset=String(xmlHttp.getResponseHeader("Content-Type")).right(";").right("charset=").valueOf();
			if(!sCharset||xmlHttp.overrideMimeType){
				return xmlHttp.responseText;
			}else if(!origCharset&&sCharset){
				if(typeof(fpConvert)=="function"){
					return fpConvert(global.bin2str(xmlHttp.responseBody));
				}else{
					//no fixed
					return xmlHttp.responseText;
				}
			}else{
				return xmlHttp.responseText;
			}
		},
		serialize : function(obj,sFormat){
			switch(sFormat){
				case undefined:
				case "JSON":
					//to do...
					break;
				case "PRMT":
					var values=[];
					for(var key in obj){
						values[values.length]=encodeURIComponent(key)+"="+encodeURIComponent(obj[key].toString());
					}
					return values.join("&");
			}
		}
	}
	return function(sUrl,vData,isCache,fpCallBack,sFormat,sCharset,fpConvert){
		if(!global) global=Global;
		return ajax.get(sUrl,vData,isCache,fpCallBack,sFormat,sCharset,fpConvert);
	}
}(),

/**
 * global function for document
 * @file: function.dom.js
 * @version: V2.0
 * @author: liu denggao
 * @created: 2011.07.01
 * @modified: 2011.10.19
 **************************/

"dom": function(value,obj){
	var element=null;
	var elements=[];
	var className="";
	obj=obj||document;
	switch(typeof(value)){
		case "undefined":
			break;
		case "string":
			var selector=value;
			//syntax format of element selector: [tag][.class1[.class2[...]]][#id[#]]
			var regElementSel=/^([^\*\.\#\[\]]*)((?:\.[^\*\.\#\[\]]+)*)(#[^\*\.\#\[\]]+[\#]?)*$/;
			//syntax format of element selector: [tag][name='value']
			var regAttribSel=/^([^\*\.\#\[\]]*)\[([^\*\.\#\!\*\^\$\[\]\=]+)(([\!|\^|\$]?\=)\'([^\*\'\"\[\]]+)\')?\]$/;
			var matchs=null;
			if(selector==""){
				return null;
			}else if(selector=="*"){
				return obj.getElementsByTagName("*");
			}else if(matchs=selector.match(regElementSel)){
				if(!matchs[1]&&!matchs[2]&&matchs[3]&&obj==document){
					if(matchs[3].slice(-1)=="#"){
						elements=document.getElementsByName(matchs[3].slice(1,-1));
						if(elements.length) return elements;
					}
					element=document.getElementById(matchs[3].slice(1));
					return element?[element]:[];
				}else{
					elements=obj.getElementsByTagName(matchs[1]||"*");
					var elements1=[];
					if(matchs[2]){
						var aClassNames=matchs[2].slice(1).split(".");
						for(var i=0;i<aClassNames.length;i++){
							for(var j=0,jLen=elements.length;j<jLen;j++){
								element=elements[j];
								className=element.getAttribute("class")||element.getAttribute("className");
								if(element.nodeName.charAt(0)=="#") continue;
								if(className&&className.toLowerCase()==aClassNames[i].toLowerCase()){
									elements1[elements1.length]=element;
								}
							}
							elements=elements1;
						}
						
					}
					if(matchs[3]){
						var isFindAll=matchs[3].slice(-1)=="#";
						var id=matchs[3].match(/\#([^#]+)\#?/)[1];
						if(!isFindAll){
							for(var i=0,iLen=elements.length;i<iLen;i++){
								element=elements[i];
								if(element.nodeName.charAt(0)=="#") continue;
								if(element.getAttribute("id")==id){
									return [element];
								}
							}	
						}else{
							var elements1=[];
							for(var i=0,iLen=elements.length;i<iLen;i++){
								element=elements[i];
								if(element.nodeName.charAt(0)=="#") continue;
								if(element.getAttribute("name")&&element.getAttribute("name").toLowerCase()==id.toLowerCase()){
									elements1[elements1.length]=element;
								}
							}
							return elements1;
						}
					}
					return elements;
				}
			}else if(matchs=selector.match(regAttribSel)){
				var tagName=matchs[1];
				var attrName=matchs[2];
				var operate=matchs[4];
				var attrValue=matchs[5];
				var attrValue1;
				var atIndex;
				var elements1=[];
				elements=obj.getElementsByTagName(tagName||"*");
				if(!attrName){
					return elements;
				}if(!attrValue){
					for(var i=0,iLen=elements.length;i<iLen;i++){
						element=elements[i];
						if(element.nodeName.charAt(0)=="#") continue;
						if(element.getAttribute("name")!=null){
							elements1[elements1.length]=element;
						}
					}
					return elements1;
				}else{
					for(var i=0,iLen=elements.length;i<iLen;i++){
						element=elements[i];
						if(element.nodeName.charAt(0)=="#") continue;						
						if(element.getAttribute(attrName)!=null){
							attrValue1=element.getAttribute(attrName).toString();
							switch(operate){
								case "=":
									if(attrValue1==attrValue){
										elements1[elements1.length]=element;
									}
									break;
								case "!=":
									if(attrValue1!=attrValue){
										elements1[elements1.length]=element;
									}
									break;
								case "*=":
									if(attrValue1.indexOf(attrValue)>=0){
										elements1[elements1.length]=element;
									}
									break;
								case "^=":
									if(attrValue1.indexOf(attrValue)==0){
										elements1[elements1.length]=element;
									}
									break;
								case "$=":
									atIndex=attrValue1.lastIndexOf(attrValue);
									if(atIndex>=0&&attrValue1.slice(atIndex)==attrValue){
										elements1[elements1.length]=element;
									}
									break;
							}
							
						}
					}
					return elements1;
				}
			}
			break;
	}
	return null;
}
};
var jsdk=window.jsdk=Global;
})(window);

