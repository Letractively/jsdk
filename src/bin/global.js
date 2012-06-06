
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
 * @version: 1.0
 * @author: liu denggao
 * @created: 2007
 * @modified: 2012.3.29
 **************************/

"_xmlHttp": Engine.getLoader().getXMLHttpRequest(),
"_xmlDom" : Engine.getLoader().getXMLDOMDocument(),
"_xmlParser" : Engine.getLoader().getXMLDOMParser(),

/**
 * @created: 2012.3.22
 * @modified: 2012.3.22
 */
"is": function(obj,type){
	var toString = Object.prototype.toString,undefined; 
	return (type === "Null" && obj === null) || 
		(type === "Undefined" && obj === undefined ) || 
		toString.call(obj).slice(8,-1) === type; 
},
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
 * @created: 2011.12.28
 */
"isDate": function(value,isSensitive){
	if(typeof(value)=="object"){
		if(value instanceof Date){
			return true;
		}else if(value instanceof String){
			return !isSensitive&&!isNaN(new Date(value.replace(/-/g,"/").replace(/\./g,"/")));
		}
	}else if(typeof(value)=="string"){
		return !isSensitive&&!isNaN(new Date(value.replace(/-/g,"/").replace(/\./g,"/")));
	}else{
		return false;
	}
},
/**
 * Message Box
 * @call: messageBox(sMessage[,iButtons[,sTitle]])
 */
"messageBox" : function(sMessage, iButtons, sTitle){
	alert(sMessage);

},
/**
 * @created: 2011.6.2
 */
"globalizing" : function(sObjName,fnFilter,isOverwrite,isContainsAll){
	var obj=eval(sObjName);
	var __items__=[];
	if(typeof(obj) == 'object'){
		for(var p in obj) {
			if((isContainsAll?true:obj.hasOwnProperty(p))
				&&p!="prototype"&&p.indexOf("_")<0){
				if(typeof(fnFilter)=="function"){
					if(!fnFilter(p)) continue;
				}
				if(isOverwrite){
					__items__[__items__.length]="var "+p
							+"=function(){ return "+sObjName+"."+p+".apply("+sObjName+",arguments); };";
				}else{
					__items__[__items__.length]="if(typeof("+p+")==\"undefined\") { "+"var "+p
							+"=function(){ return "+sObjName+"."+p+".apply("+sObjName+",arguments); }; }";
				}
			}
		}
	}
	return __items__.join("");
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
},
"$try" : function(){
	for (var i = 0, l = arguments.length; i < l; i++){
		try {
			return arguments[i]();
		} catch(e){}
	}
	return undefined;
},
/**
 * synchronized sleep script executing function
 * max wait 1 second.
 * @date: 2010.1.14
 */
"$sleep" : function(timeout){
	var startDate=new Date();
	timeout=Number(timeout);
	while((new Date())-startDate<Math.min(timeout,1000));
},
/**
 * synchronized wait a condition
 * @date: 2010.1.14
 */
"$wait" : function(iTimeout,fnFlag){
	var startDate=new Date();
	var flag=false;
	iTimeout=Number(iTimeout);
	if(typeof(fnFlag)!="function") return;
	while((new Date())-startDate<Math.min(iTimeout,1000)){
		if(flag=!!fnFlag()) break;
	}
	return flag;
},
/**
 * @created: 2011.6.2
 */
"obj": function(obj,clazz){
	var namespace=this;
	var values1=["string","number","boolean"];
	var values2=[String,Number,Boolean,Date,Array];
	var values2a=["String","Number","Boolean","Date","Array"];
	var typename=typeof(obj);
	if(obj==undefined) return;
	for(var i=0;i<values1.length;i++){
		if(values1[i]==typename){
			clazz=namespace[values2a[i]];
			return new clazz(obj);
		}
	}
	if(typename=="object"){
		var i=0;
		for(;i<4;i++){
			if(obj instanceof values2[i]){
				clazz=namespace[values2a[i]];
				return new clazz(obj);
			}
		}
		for(;i<values2.length;i++){
			if(obj instanceof values2[i]){
				clazz=namespace[values2a[i]];
				return clazz.newInstanceFrom(obj);
			}
		}
		if(typeof(clazz)=="function"){
			return clazz.newInstanceFrom(obj);
		}
	}
	return obj;
},
/**
 * @since: JSDK3 V1.8.1
 * @created: 2012.3.23
 * @invoke: 
 *	(1)extend(target,source)
 *	(2)extend(isDeep,target,source)
 */
"extend": function(){
	var argLen=arguments.length;
	var isDeep=false,target={},source;
	if(argLen==2){
		target=arguments[1],source=arguments[2];
	}else if(argLen==3&&this.is(arguments[0],"Boolean")){
		isDeep=arguments[0],target=arguments[1],source=arguments[2];
	}else{
		return;
	}
	if(!isDeep){
		for(var key in source) { 
			target[key] = copy; 
		}
	}else{
		for(var key in source) { 
			var copy = source[key]; 
			if(target === copy) continue;	// Prevent never-ending loop
			if(this.is(copy,"Object")){ 
				target[key] = arguments.callee.call(this,target[key] || {}, copy); 
			}else if(this.is(copy,"Array")){ 
				target[key] = arguments.callee.call(this,target[key] || [], copy); 
			}else{ 
				target[key] = copy; 
			} 
		} 
	}
	return target; 
}
,

/**
 * global function for id
 * @file: function.id.js
 * @author: liu denggao
 * @created: 2012.05.14
 * @modified: 2012.05.14
 **************************/

/**
 * output id number
 * @description 
 * @invoke 
 * @para iTimelyOptions: -1, only datetime; 0, universal; 1, normal; 2, timely
 * @para iLen: length of id.
 *		(1)8: for normal or timely
 *		(2)9: for normal or timely
 *		(3)10: for normal or timely
 *		(4)11: for normal or timely
 *		(5)16: only for universal
 *		(6)32: only for universal
 * @return
 * @author liudenggao
 * @origCreated 2010.12.26
 * @created 2012.05.14
 */
"newId": function(iTimelyOptions,iLen){
	var date=new Date();
	var iYear=date.getFullYear(); 
	var iCentYear=iYear%100;
	var iCent=iYear-iCentYear;
	var iMonth=date.getMonth()+1;
	var iDay=date.getDate();
	var iHour=date.getHours();
	var iMinute=date.getMinutes();
	var iSecond=date.getSeconds();
	var iMilliseconds=date.getMilliseconds();

	var retValue="";

	switch(iTimelyOptions){
		case 0:			//universal
			iLen=iLen||16;
			switch(iLen){
				case 16:		//16\u4f4d\u5341\u516d\u8fdb\u5236=HEX(4(\u4e16\u7eaa\u5e74\u6708\u65e5)+7(\u65f6\u5206\u79d2\u6beb\u79d2)+5(\u968f\u673a\u6570))
					var dtStart=new Date(iCent,0,1);
					var iDate=Math.floor((date-dtStart)/(1000*60*60*24))+1;
					var sDate=[].fill("0",4).concat(iDate.toString(16)).join("").slice(-4);
					var iTime=iHour*60*60*1000+iMinute*60*1000+iSecond*1000+iMilliseconds;
					var sTime=[].fill("0",7).concat(iTime.toString(16)).join("").slice(-7);
					var sRandom=[].fill("0",5).concat(Math.random().toString(16).replace(".","")).join("").slice(-5);
					retValue=sDate+sTime+sRandom;
					break;
				case 32:		//32\u4f4d\u5341\u8fdb\u5236=DEC(8(\u5e74\u6708\u65e5)+9(\u65f6\u5206\u79d2\u6beb\u79d2)+15(\u968f\u673a\u6570))
					var sDate=[("0000"+iYear).slice(-4),("00"+iMonth).slice(-2),("00"+iDay).slice(-2)].join("");
					var sTime=[("00"+iHour).slice(-2),("00"+iMinute).slice(-2),("00"+iSecond).slice(-2)
							,("000"+iMilliseconds).slice(-3)].join("");
					var sRandom=[].fill("0",15).concat(Math.random().toString().replace(".","")).join("").slice(-15);
					retValue=sDate+sTime+sRandom;
					break;
			}
			break;
		case 1:			//normal	
			iLen=iLen||11;
			switch(iLen){
				case 8:		//8\u4f4d\u4e09\u5341\u516d\u8fdb\u5236=BIN(25(\u6708\u65e5\u65f6\u5206\u79d2)+16(\u968f\u673a\u6570))
					var dtStart=new Date(iYear,0,1,0,0,0,0);
					var iTime=Date.computeTime(date-dtStart,"ms","s");
					var sTime=[].fill("0",25).concat(iTime.toString(2)).join("").slice(-25);
					var sRandom=[].fill("0",16).concat(Math.random().toString(2)).join("").slice(-16);
					var sBin=sTime+sRandom;
					retValue=[].fill("0",8).concat(parseInt(sBin,2).toString(36)).join("").slice(-8);
					break;
				case 9:		//9\u4f4d\u4e09\u5341\u516d\u8fdb\u5236=BIN(25(\u6708\u65e5\u65f6\u5206\u79d2)+21(\u968f\u673a\u6570))
					var dtStart=new Date(iYear,0,1,0,0,0,0);
					var iTime=Date.computeTime(date-dtStart,"ms","s");
					var sTime=[].fill("0",25).concat(iTime.toString(2)).join("").slice(-25);
					var sRandom=[].fill("0",21).concat(Math.random().toString(2)).join("").slice(-21);
					var sBin=sTime+sRandom;
					retValue=[].fill("0",9).concat(parseInt(sBin,2).toString(36)).join("").slice(-9);
					break;
				case 10:	//10\u4f4d\u4e09\u5341\u516d\u8fdb\u5236=BIN(32(\u5e74\u6708\u65e5\u65f6\u5206\u79d2)+19(\u968f\u673a\u6570))
					var dtStart=new Date(iCent,0,1,0,0,0,0);
					var iTime=Date.computeTime(date-dtStart,"ms","s");
					var sTime=[].fill("0",32).concat(iTime.toString(2)).join("").slice(-32);
					var sRandom=[].fill("0",19).concat(Math.random().toString(2)).join("").slice(-19);
					var sBin=sTime+sRandom;
					retValue=[].fill("0",10).concat(parseInt(sBin,2).toString(36)).join("").slice(-10);
					break;
				case 11:	//11\u4f4d\u4e09\u5341\u516d\u8fdb\u5236=BIN(32(\u5e74\u6708\u65e5\u65f6\u5206\u79d2)+24(\u968f\u673a\u6570))
					var dtStart=new Date(iCent,0,1,0,0,0,0);
					var iTime=Date.computeTime(date-dtStart,"ms","s");
					var sTime=[].fill("0",32).concat(iTime.toString(2)).join("").slice(-32);
					var sRandom=[].fill("0",24).concat(Math.random().toString(2)).join("").slice(-24);
					var sBin=sTime+sRandom;
					retValue=[].fill("0",11).concat(parseInt(sBin,2).toString(36)).join("").slice(-11);
					break;
			}
			break;
		case 2:			//timely
			iLen=iLen==undefined?11:iLen;
			switch(iLen){
				case 8:		//8\u4f4d\u4e09\u5341\u516d\u8fdb\u5236=BIN(27(\u65f6\u5206\u79d2\u6beb\u79d2)+14(\u968f\u673a\u6570))
					var dtStart=new Date(iYear,date.getMonth(),iDay,0,0,0,0);
					var iTime=date-dtStart;
					var sTime=[].fill("0",27).concat(iTime.toString(2)).join("").slice(-27);
					var sRandom=[].fill("0",14).concat(Math.random().toString(2)).join("").slice(-14);
					var sBin=sTime+sRandom;
					retValue=[].fill("0",8).concat(parseInt(sBin,2).toString(36)).join("").slice(-8);
					break;
				case 9:		//9\u4f4d\u4e09\u5341\u516d\u8fdb\u5236=BIN(27(\u65f6\u5206\u79d2\u6beb\u79d2)+19(\u968f\u673a\u6570))
					var dtStart=new Date(iYear,date.getMonth(),iDay,0,0,0,0);
					var iTime=date-dtStart;
					var sTime=[].fill("0",27).concat(iTime.toString(2)).join("").slice(-27);
					var sRandom=[].fill("0",19).concat(Math.random().toString(2)).join("").slice(-19);
					var sBin=sTime+sRandom;
					retValue=[].fill("0",9).concat(parseInt(sBin,2).toString(36)).join("").slice(-9);
					break;
				case 10:	//10\u4f4d\u4e09\u5341\u516d\u8fdb\u5236=BIN(32(\u65e5\u65f6\u5206\u79d2\u6beb\u79d2)+19(\u968f\u673a\u6570))
					var dtStart=new Date(iYear,date.getMonth(),1,0,0,0,0);
					var iTime=date-dtStart;
					var sTime=[].fill("0",32).concat(iTime.toString(2)).join("").slice(-32);
					var sRandom=[].fill("0",19).concat(Math.random().toString(2)).join("").slice(-19);
					var sBin=sTime+sRandom;
					retValue=[].fill("0",10).concat(parseInt(sBin,2).toString(36)).join("").slice(-10);
					break;
				case 11:	//11\u4f4d\u4e09\u5341\u516d\u8fdb\u5236=BIN(32(\u65e5\u65f6\u5206\u79d2\u6beb\u79d2)+24(\u968f\u673a\u6570))
					var dtStart=new Date(iYear,date.getMonth(),1,0,0,0,0);
					var iTime=date-dtStart;
					var sTime=[].fill("0",32).concat(iTime.toString(2)).join("").slice(-32);
					var sRandom=[].fill("0",24).concat(Math.random().toString(2)).join("").slice(-24);
					var sBin=sTime+sRandom;
					retValue=[].fill("0",11).concat(parseInt(sBin,2).toString(36)).join("").slice(-11);
					break;
			}
			break;
		default:
			var sDate=[("0000"+iYear).slice(-4),("00"+iMonth).slice(-2),("00"+iDay).slice(-2)].join("");
			var sTime=[("00"+iHour).slice(-2),("00"+iMinute).slice(-2),("00"+iSecond).slice(-2)
							,("000"+iMilliseconds).slice(-3)].join("");
			retValue=sDate+sTime;
	}
	return retValue.toUpperCase();
},
"newUnid": function(iBits){
	iBits=iBits||16;
	var aValues=[];
	for(var i=0;i<iBits;i++){
		aValues[i]=Math.floor(Math.random()*16.0).toString(16).toUpperCase();
	} 
	return aValues.join("");
},
"newGuid": function(){
	return [S4(),S4(),"-",S4(),"-",S4(),"-",S4(),"-",S4(),S4(),S4()].join("");   
	function S4(){   
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);   
	}
}

,

/**
 * global function for URI(Uniform Resource Identifier)
 * @file: function.js
 * @author: liu denggao
 * @created: 2011.7.27
 * @modified: 2011.11.16
 **************************/

/**
 * get full path of 'sUrlPath' on current path 'sCurPath'
 * @para sSep: can only as a char 
 * @created: 2011.7.27
 * @modified: 2011.11.16
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
 * @created 2011.7.27
 * @modified 2011.11.16
 */
"getURIRelPath" : function(sCurPath,sUriFullPath,sSep){
	sCurPath=sCurPath.replace(new RegExp("\\"+sSep+"+$"),"");
	sSep=sSep?sSep:"/";
	var aCurPaths=sCurPath.split(sSep);
	var aUriPaths=sUriFullPath.split(sSep);
	var iRelUpLevel=0,aRelUpPaths=[],aRelDownPaths=[];
	if(aCurPaths[0]==""){	//is absolute path
		iRelUpLevel=aCurPaths.length-1;
		aRelDownPaths=aUriPaths.slice(1);
	}else{
		for(var i=0;i<aCurPaths.length;i++){
			if(aCurPaths[i]=="."){
				aCurPaths.splice(i,1);
				i--;
			}
		}
		for(var i=0;i<aUriPaths.length;i++){
			if(aUriPaths[i]=="."){
				aUriPaths.splice(i,1);
				i--;
			}
		}
		if((aCurPaths[0]==".."||aUriPaths[0]=="..")&&(aCurPaths[0]!=aUriPaths[0])){
			return "";		//can not reach.
		}
		aCurPaths.unshift(".");
		aUriPaths.unshift(".");
	}
	for(var i=aCurPaths.length-1;i>=0;i--){
		if(aUriPaths.join(sSep).toLowerCase().indexOf(
			aCurPaths.slice(0,i+1).join(sSep).toLowerCase()+sSep)==0){
			iRelUpLevel=aCurPaths.length-1-i;
			aRelDownPaths=aUriPaths.slice(i+1);
			break;
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
 * global function for parser
 * @file: function.parser.js
 * @version: V1.0
 * @author: liu denggao
 * @created: 2011.8.20
 * @modified: 2011.9.9
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
 * @created: 2011.9.8
 */
"xml2json" : function(xml) {
 
	// Create the return object
	var obj = {};
 
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}
 
	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes[i];
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = this.xml2json(item);
			} else {
				if (!(obj[nodeName] instanceof Array)) {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(this.xml2json(item));
			}
		}
	}
	return obj;
}

,

/**
 * global function for charset
 * @file: function.charset.js
 * @version: V0.1
 * @since: JSDK3 V1.5.4
 * @author: liu denggao
 * @created: 2011.9.7
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
	var _xmlDom=Engine.getLoader().getXMLDOMDocument();
	var _xmlParser=Engine.getLoader().getXMLDOMParser();
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
 * global function for ajax
 * @file: function.ajax.js
 * @version: V2.1 beta
 * @author: liu denggao
 * @created: 2011.7.26
 * @modified: 2012.03.16
 **************************/

/**
 *  ajax
 * @since: JSDK3 V1.7.7
 * @invoke: 
 *		(1)ajax(url[,settings])
 *		(2)ajax(settings)
 * @para settings:
 *		.type: default: 'GET'. Can is 'GET' or 'POST'
 *		.xhr: XMLHttpRequest
 *		.url:
 *		.data:
 *		.cache: default: true
 *		.async: default: true
 *		.contentType:	default: 'application/x-www-form-urlencoded'
 *		.mimeType: 
 *		.charset: charset of response
 *		.context: 
 *		.complete: callback function on success or error. usage:
 *			complete(xhr,textStatus)
 *		.success: callback function on success. usage: 
 *			success(data,textStatus,xhr)
 *		.error: callback functon on error. usage:
 *			error(xhr,textStatus,errorThrown)
 *		.convert: charset convert program. usage:
 *			convert(bstr)
 *		.dataType: bin,text,json,xml
 * @description: 
 * @author: liudenggao
 * @created: 2012.3.9
 * @modified: 2012.3.16
 */
"ajax": function(){
	var loader=Engine.getLoader();
	var global;
	var _xmlHttp=loader.getXMLHttpRequest();
	var _xmlDom=loader.getXMLDOMDocument();
	var _xmlParser=loader.getXMLDOMParser();
	function get(settings,xmlHttp,url,data){
		if(data){
			if(typeof(data)=="object"){
				data=serialize(data,"PRMT");
			}
			url+=(url.match(/\?/) ? "&" : "?") + data;
		}
		xmlHttp.open("GET", url, settings.async);
		if(xmlHttp.overrideMimeType) { //Firefox
			xmlHttp.overrideMimeType(settings.mimeType+(settings.charset?("; charset="+settings.charset):"")); 
		}
		if(data){
			xmlHttp.setRequestHeader("Content-Type", settings.contentType);
			data=null;
		}
		if(!settings.cache){
			xmlHttp.setRequestHeader("Pragma","no-cache");
			xmlHttp.setRequestHeader("If-Modified-Since","0");
		}
		if(settings.async){
			xmlHttp.onreadystatechange=function(){
				onReadyStateChange(settings,xmlHttp);
			};
			xmlHttp.send(null);
		}else{
			xmlHttp.send(null);
			return onReadyStateChange(settings,xmlHttp);
		}
	}
	function post(settings,xmlHttp,url,data){
		if(data){
			if(typeof(data)=="object"){
				data=serialize(data,"PRMT");
			}
		}
		xmlHttp.open("POST", url, settings.async);
		if(xmlHttp.overrideMimeType) { //Firefox
			xmlHttp.overrideMimeType(settings.mimeType+(settings.charset?("; charset="+settings.charset):"")); 
		}
		xmlHttp.setRequestHeader("Content-Type", settings.contentType);
		if(settings.async){
			xmlHttp.onreadystatechange=function(){
				onReadyStateChange(settings,xmlHttp);
			};
			xmlHttp.send(data);
		}else{
			xmlHttp.send(data);
			return onReadyStateChange(settings,xmlHttp);
		}
	}
	function onReadyStateChange(settings,xmlHttp){
		var content="";
		if(xmlHttp.readyState == 4) {	//data receive completed
		   //200 return OK of request status
		   if(xmlHttp.status == 200) {
				try{
					content=getOnReady(xmlHttp,settings.dataType,settings.charset,settings.convert);
					settings.complete.call(settings.context,xmlHttp,"");
					settings.success.call(settings.context,content,"",xmlHttp);
					return content;
				}catch(e){
				}
		   }else if(xmlHttp.status == 0
				&&!xmlHttp.getAllResponseHeaders()){
				try{
					content=getOnReady(xmlHttp,settings.dataType,settings.charset,settings.convert);
					settings.complete.call(settings.context,xmlHttp,"");
					settings.success.call(settings.context,content,"",xmlHttp);
					return content;
				}catch(e){
				}
		   }else{
				return settings.error(xmlHttp,"","get resource error !");
		   }
		}
	}
	function getOnReady(xmlHttp,sFormat,sCharset,fpConvert){
		var contentType=xmlHttp.getResponseHeader("Content-Type").split(";")[0];
		switch(sFormat.toLowerCase()){
			case "text":
				return getTextOnReady(xmlHttp,sCharset,fpConvert);
			case "xml":
				var xml;
				try{
					var _xmlDom=loader.getXMLDOMDocument();
					if(contentType=="text/xml"||contentType=="application/xml"||xmlHttp.overrideMimeType){
						xml=xmlHttp.responseXML;
					}else if(contentType==""||contentType=="application/octet_stream"){
						if(_xmlDom){
							_xmlDom.loadXML(getTextOnReady(xmlHttp,sCharset,fpConvert)
									.replace(/^[\s\r\n]*/g, '').replace(/<![^<|>]*>/g,""));
							xml=_xmlDom;
						}else{
							xml=_xmlParser.parseFromString(xmlHttp.responseText,"text/xml");
						}
					}else if(contentType.split("/")[0]=="text"){
						if(_xmlDom){
							_xmlDom.loadXML(getTextOnReady(xmlHttp,sCharset,fpConvert)
									.replace(/^[\s\r\n]*/g, '').replace(/<![^<|>]*>/g,""));
							xml=_xmlDom;
						}else{
							xml=_xmlParser.parseFromString(xmlHttp.responseText,"text/xml");
						}
					}
					if(xml&&xml.documentElement
						&&xml.documentElement.nodeName.toLowerCase()!="parsererror") 
						return xml;
				}catch(e){
				}
				return null;
			case "json":
				try{
					var func=new Function("return("+getTextOnReady(xmlHttp,sCharset,fpConvert)+");");
				}catch(e){
				}
				return !!func?func():func;
			default:
				return xmlHttp.responseBody;
		}
	}
	function getTextOnReady(xmlHttp,sCharset,fpConvert){
		var origCharset=global.obj(xmlHttp.getResponseHeader("Content-Type")).right(";").right("charset=").valueOf();
		if(!xmlHttp.overrideMimeType&&!origCharset&&sCharset
			&&typeof(fpConvert)=="function"){
			return fpConvert(global.bin2str(xmlHttp.responseBody));
		}
		return xmlHttp.responseText;
	}
	function serialize(obj,dataType){
		dataType=dataType||"JSON";
		switch(dataType.toUpperCase()){
			case "JSON":
				//to do...
				break;
			case "PRMT":
				var values=[];
				for(var key in obj){
					if(obj.hasOwnProperty(key))
						values[values.length]=encodeURIComponent(key)+"="+encodeURIComponent(obj[key].toString());
				}
				return values.join("&");
		}
	}
	return function(arg1,arg2){
		if(!global) global=Engine.getApp();
		var settings={
			type: "GET",
			xhr: _xmlHttp,
			url: "",
			data: "",
			cache: true,
			async: true,
			charset: "",
			mimeType: "",
			contentType: 'application/x-www-form-urlencoded',
			context: null,
			complete: function(xhr,textStatus){
			
			},
			success: function(data,textStatus,xhr){
			
			},
			error: function(xhr, textStatus, errorThrown){
			
			},
			convert: null,
			dataType: "bin"
		};	
		var settings1;
		if(arg1&&!(arg1 instanceof String)){
			settings1=arg1;
		}else if(arg2){
			settings1=arg2;
		}
		for(var key in settings1){
			if(settings1.hasOwnProperty(key)){
				settings[key]=settings1[key];
			}
		}
		if(arg1 instanceof String){
			settings.url=arg1;
		}
		if(settings.async){
			settings.xhr=loader.getXMLHttpRequest();
		}
		if(!settings.mimeType){
			switch(settings.dataType.toLowerCase()){
				case "bin":
					settings.mimeType="application/octet_stream";break;
				case "text":
					settings.mimeType="text/plain";break;
				case "json":
					settings.mimeType="text/plain";break;
				case "xml":
					settings.mimeType="text/xml";break;
				default:
					settings.mimeType="application/octet_stream";break;
			}
		}
		settings.context=settings;
		if(settings.type=="GET"){
			return get(settings,settings.xhr,settings.url,settings.data);
		}else if(settings.type=="POST"){
			return post(settings,settings.xhr,settings.url,settings.data);
		}
	}
}(),

/**
 * get
 * @since: JSDK3 V1.2.4
 * @author: liudenggao
 * @created: 2011.6.23
 * @modified: 2012.03.16
 * @log: solve an problem caused by multiple asynchronous operations.
 */
"get": function(sUrl,vData,isCache,fpCallBack,sDataType,sCharset,fpConvert){
	var settings={
		type: "GET",
		url: sUrl,
		data: vData,
		cache: isCache,
		async: !!fpCallBack,
		charset: sCharset
	};
	if(typeof(fpCallBack)=="function"){
		settings.success=fpCallBack;
	}
	if(sDataType){
		settings.dataType=sDataType;
	}
	if(typeof(fpConvert)=="function"){
		settings.convert=fpConvert;
	}
	return Engine.getApp().ajax(settings);
},

/**
 *  post
 * @since: JSDK3 V1.7.7
 * @author: liudenggao
 * @created: 2012.3.9
 * @modified: 2012.3.9
 */
"post": function(sUrl,vData,fpCallBack,sDataType){
	var settings={
		type: "POST",
		url: sUrl,
		data: vData,
		async: !!fpCallBack
	};
	if(typeof(fpCallBack)=="function"){
		settings.success=fpCallBack;
	}
	if(sDataType){
		settings.dataType=sDataType;
	}
	return Engine.getApp().ajax(settings);
}

,

/**
 * global function for document
 * @file: function.dom.js
 * @version: V2.1
 * @author: liu denggao
 * @created: 2011.07.01
 * @modified: 2012.2.6
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
							var elements1=[],elements2=[];
							for(var i=0,iLen=elements.length;i<iLen;i++){
								element=elements[i];
								if(element.nodeName.charAt(0)=="#") continue;
								if(element.getAttribute("name")&&element.getAttribute("name").toLowerCase()==id.toLowerCase()){
									elements1[elements1.length]=element;
								}
								if(!elements2.length&&element.getAttribute("id")==id){
									elements2=[element];
								}
							}
							return elements1.length?elements1:elements2;
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