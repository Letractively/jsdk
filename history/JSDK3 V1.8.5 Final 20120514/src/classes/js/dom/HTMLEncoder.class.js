/**
 * @file HTMLEncoder.js
 * @author Liu Denggao
 * @date 2009.11.03-2010.3.13
 * @version 1.0
 * @since JSDK3 V0.1
 */

$package("js.dom");

js.dom.HTMLEncoder=function(){};
var _$class=js.dom.HTMLEncoder;

_$class.encodeNodeAttrib=function (str){
	var sSpecial="&\"'<>";
	var aTarget=["&#38;","&#34;","&#39;","&#60;","&#62;"];
	var ret=str;
	for(var i=0;i<sSpecial.length;i++){
		//ret=eval('ret.replace(/'+sSpecial.charAt(i)+'/g,aTarget[i])');
		ret=ret.replace(new RegExp(sSpecial.charAt(i),"g"),aTarget[i]);
	}
	return ret;
}
_$class.encodeNodeData=function(str){
	var sSpecial="&<>";
	var aTarget=["&#38;","&#60;","&#62;"];
	var ret=str;
	for(var i=0;i<sSpecial.length;i++){
		//ret=eval('ret.replace(/'+sSpecial.charAt(i)+'/g,aTarget[i])');
		ret=ret.replace(new RegExp(sSpecial.charAt(i),"g"),aTarget[i]);
	}
	return ret;
}