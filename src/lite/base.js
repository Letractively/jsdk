/** 
 * JavaScript Native Language Basic Extras 
 * @file: base.js 
 * @version: V2.0 
 * @author: liu denggao 
 * @mail: mestime@tom.com 
 * @home: http://www.wunmei.com.cn 
 * @date: 2007-2011.11.03 
 * @update: 
 ************************************************/ 


/**
 * String of base
 * @file: base.String.js
 * @version: V0.1
 * @author: liu denggao
 * @created: 2011.9.21
 **************************/

/**
 * \u5b57\u7b26\u4e32\u6574\u7406\uff0c\u5254\u9664\u5b57\u7b26\u4e32\u4e2d\u9996\u5c3e\u4e0a\u7684\u7a7a\u5b57\u7b26
 * @date: -2010.6.18
 */
String.prototype.trim=function(){
	return this.replace(/^\s+|\s+$/g, '');
}
/**
 * @date: 2010.6.18
 */
String.prototype.clean=function(){
	return this.replace(/\s+/g, ' ').trim();
}
/**
 * \u5b57\u7b26\u4e32\u53cd\u5411
 * @modified: 2011.8.1
 */
String.prototype.reverse=function(){	
	return this.split("").reverse().join("");
}
/**
 *
 * @modified 2010.11.09
 */
String.prototype.left=function(subString){
	switch(typeof(subString)){
		case "string":
			var intAt=this.indexOf(subString);
			if(intAt<=0) return("");
			return this.slice(0,intAt);
		case "number":
			var iLen=subString;
			return this.slice(0,iLen);
		default:
			return "";
	}
}
/**
 *
 * @created 2010.11.09
 */
String.prototype.leftBack=function(subString){
	var intAt=this.lastIndexOf(subString);
	if(intAt<=0) return("");
	return this.slice(0,intAt);
}
/**
 *
 * @modified 2011.7.25
 */
String.prototype.middle=function(startStr,endStr,iOptions){
	iOptions=iOptions==undefined?0:iOptions;
	switch(iOptions){
		case 0:	//\u5de6
			var startIndex=this.indexOf(startStr);
			var endIndex=this.indexOf(endStr,startIndex+1);
			break;
		case 1: //\u6700\u5927
			var startIndex=this.indexOf(startStr);
			var endIndex=this.lastIndexOf(endStr);
			break;
		case 2:	//\u53f3
			var endIndex=this.lastIndexOf(endStr);
			var startIndex=this.lastIndexOf(startStr,endIndex-1);
			break;
	}
	if(startIndex<0||endIndex<0) return "";
	if(startIndex>=endIndex) return "";
	return this.slice(startIndex+startStr.length,endIndex);
}
/**
 *
 * @modified 2010.11.09
 */
String.prototype.right=function(subString){
	switch(typeof(subString)){
		case "string":
			var intAt=this.indexOf(subString);
			if(intAt<0) return("");
			return this.slice(intAt+subString.length);
		case "number":
			var iLen=subString;
			return this.slice(this.length-iLen);
		default:
			return "";
	}
}
/**
 * @modified 2010.11.09
 */
String.prototype.rightBack=function(subString){
	var intAt=this.lastIndexOf(subString);
	if(intAt<0) return("");
	return this.slice(intAt+subString.length);
}
/**
 * @created 2010.11.11
 */
String.prototype.hasAscii=function(){
	var reg=/[\x00-\xff]+/gi;
	return reg.test(this);
}
/**
 * @created 2011.1.26
 */
String.prototype.hasNonAscii=function(){
	var reg=/[^\x00-\xff]+/gi;
	return reg.test(this);
}
/**
 * @created 2011.01.26
 */
String.prototype.getAsciiCount=function(){
	return this.replace(/[^\x00-\xff]*/g,"").length;
}
/**
 * @created 2011.01.26
 */
String.prototype.getNonAsciiCount=function(){
	return this.replace(/[\x00-\xff]*/g,"").length;
}
String.prototype.equal=function(vStrings,isNoCase){
	if(!arguments.length) return false;
	isNoCase=isNoCase==null?false:isNoCase;
	if(vStrings instanceof Array){
		for(var i=0;i<vStrings.length;i++){
			if(isNoCase&&(this.toLowerCase()==vStrings[i].toLowerCase())) {
				return true;
			}else if(!isNoCase&&(this.toString()==vStrings[i])) {
				return true;
			}
		}
	}else{
		return this.toLowerCase()==vStrings.toLowerCase();
	}
	return false;
}
String.prototype.serialize=function(){
	return ("\""+this.toString().replace(/\\/g,"\\\\").replace(/\"/g,"\\\"")
		.replace(/\n/g,"\\n").replace(/\r/g,"\\r")
		.replace(/([^\x00-\xff])/g,function($1){
			return "\\u"+($1).charCodeAt(0).toString(16).slice(-4);
		})+"\"");
}

/**
 * Number of base
 * @file: base.Number.js
 * @version: V0.1
 * @author: liu denggao
 * @created: 2011.9.21
 **************************/

/**
 * \u5728\u4e00\u4e2a\u8303\u56f4\u4e2d\u7684\u533a\u57df
 * @return 
 *	(1)iOptions=0:  -1, n<min; 0, n>=min&&n<=max; 1, n>max;
 *	(2)iOptions=1:  -1, n<=min; 0, n>min&&n<max; 1, n>=max;
 * @created 2010.8.2
 * @modified 2010.11.10
 */
Number.prototype.atAround=function(min,max,iOptions){
	if(typeof(min)!="number"||typeof(max)!="number"||min>max){
		throw new Error(1000,"Parameter of method 'atAround' of class 'Number' is invalid!");
	}
	iOptions=iOptions==undefined?0:iOptions;
	switch(iOptions){
		case 0:
			if(this<min){
				return -1;
			}else if(this>=min&&this<=max){
				return 0;
			}else if(this>max){
				return 1;
			}
			break;
		case 1:
			if(this<=min){
				return -1;
			}else if(this>min&&this<max){
				return 0;
			}else if(this>=max){
				return 1;
			}
			break;
	}
	throw new Error(1000,"Method 'atAround' of class 'Number' run error!");
}
/**
 * \u662f\u5426\u5728\u4e00\u4e2a\u8303\u56f4\u5185
 * @return 
 * @created 2010.11.10
 * @modified 2010.11.10
 */
Number.prototype.isWithin=function(min,max){
	if(typeof(min)!="number"||typeof(max)!="number"||min>max){
		throw new Error(1000,"Parameter of method 'atAround' of class 'Number' is invalid!");
	}
	if(this>=min&&this<=max) return true;
	else return false;
}
/**
 * \u662f\u5426\u5728\u4e00\u4e2a\u8303\u56f4\u5916
 * @return 
 * @created 2010.11.10
 * @modified 2010.11.10
 */
Number.prototype.isWithout=function(min,max){
	if(typeof(min)!="number"||typeof(max)!="number"||min>max){
		throw new Error(1000,"Parameter of method 'atAround' of class 'Number' is invalid!");
	}
	if(this>=min&&this<=max) return false;
	else return true;
}

/**
 * Date of base
 * @file: base.Date.js
 * @version: V0.1
 * @author: liu denggao
 * @created: 2011.9.21
 **************************/


/**
 * \u8ba1\u7b97\u65f6\u95f4
 * @para vValueType
 *		(1)0|h
 *		(2)1|m
 *		(3)2|s
 *		(4)3|ms
 *		(5)4|time
 * @para iValue
 * @para vOptions
 *		(1)0|h:
 *		(2)1|m:
 *		(3)2|s:
 *		(4)3|ms:
 *		(5)4|hh:mm:ss:ms:
 * @return
 * @author denggao liu
 * @date 2009.12.02-2009.12.03
 */
Date.computeTime=function(vValueType,iValue,vOptions){
	var iValueType;
	var iOptions;
	switch(vValueType.toString().toLowerCase()){
		case "0":
		case "h":
			iValueType=0;
			break;
		case "1":
		case "m":
			iValueType=1;
			break;
		case "2":
		case "s":
			iValueType=2;
			break;
		case "3":
		case "ms":
			iValueType=3;
			break;
		case "4":
		case "time":
			iValueType=4;
			break;
		default:
			iValueType=4;
	}
	switch(vOptions.toString().toLowerCase()){
		case "0":
		case "h":
			iOptions=0;
			break;
		case "1":
		case "m":
			iOptions=1;
			break;
		case "2":
		case "s":
			iOptions=2;
			break;
		case "3":
		case "ms":
			iOptions=3;
			break;
		case "4":
		case "hh:mm:ss:ms":
			iOptions=4;
			break;
		default:
			iOptions=4;
	}
	if(iValueType<=2){
		return (
			iOptions<=2?Math.floor(iValue*Math.pow(60,iOptions-iValueType))
			:iOptions==3?Math.floor(iValue*Math.pow(60,2-iValueType)*1000)
			:[Math.floor(iValue*Math.pow(60,-iValueType))
				,Math.floor((iValue=iValue%Math.pow(60,iValueType))*Math.pow(60,1-iValueType))
				,Math.floor((iValue=iValue%Math.pow(60,-(1-iValueType)))*Math.pow(60,2-iValueType))
				,0
			]
		);
	}else if(iValueType==3){
		return (
			iOptions<=2?Math.floor(iValue*Math.pow(60,iOptions-2)*Math.pow(1000,-1))
			:iOptions==3?iValue
			:[Math.floor(iValue*Math.pow(60,-2)*Math.pow(1000,-1))
				,Math.floor((iValue=iValue%(Math.pow(60,2)*Math.pow(1000,1)))*Math.pow(60,-1)*Math.pow(1000,-1))
				,Math.floor((iValue=iValue%(Math.pow(60,1)*Math.pow(1000,1)))*Math.pow(60,0)*Math.pow(1000,-1))
				,iValue%Math.pow(1000,1)
			]
		);
	}else{
		var iHour=iValue.getHours();
		var iMinute=iValue.getMinutes();
		var iSecond=iValue.getSeconds();
		var iMilliseconds=iValue.getMilliseconds();
		return (
			iOptions==0?iHour
			:iOptions==1?(iHour*60+iMinute)
			:iOptions==2?(iHour*60*60+iMinute*60+iSecond)
			:iOptions==3?((iHour*60*60+iMinute*60+iSecond)*1000+iMilliseconds)
			:[iHour,iMinute,iSecond,iMilliseconds]
		);
	}
}

/**
 * Array of base
 * @file: base.Array.js
 * @version: V0.3
 * @author: liu denggao
 * @created: 2011.9.21
 * @modified: 2011.11.03
 **************************/

/**
 * \u529f\u80fd\uff1a\u589e\u52a0\u5355\u4e2a\u5143\u7d20
 * \u63cf\u8ff0\uff1a
 * \u53c2\u6570\uff1a
 *  (1)vValue
 *  (2)isKeepOnly: \u53ef\u9009\uff0c\u662f\u5426\u4fdd\u6301\u552f\u4e00\u6027\uff0c\u9ed8\u8ba4\u4e3a\u5426
 *		1)true:   \u5728\u589e\u52a0\u8be5\u5143\u7d20\u524d\uff0c\u5148\u5224\u65ad\u8be5\u5143\u7d20\u662f\u5426\u5df2\u5b58\u5728\u4e8e\u8be5\u6570\u7ec4\u4e2d\uff0c\u5982\u679c\u662f\u5219\u4e0d\u7528\u6dfb\u52a0\uff0c\u5426\u5219\u5219\u6dfb\u52a0\u3002
 *		2)false:  \u5728\u589e\u52a0\u8be5\u5143\u7d20\u65f6\uff0c\u4e0d\u7528\u5224\u65ad\u8be5\u5143\u7d20\u662f\u5426\u5df2\u5b58\u5728\u4e8e\u8be5\u6570\u7ec4\u4e2d
 *  (3)isNoCase:  \u662f\u5426\u4e0d\u533a\u5206\u5927\u5c0f\u5199,\u9ed8\u8ba4\u4e3a\u5426
 * \u65e5\u671f\uff1a2009.07.18
 * @modified: 2010.11.10
 */
Array.prototype.addElement=function(vValue,isKeepOnly,isNoCase){
	var index=this.findElement(vValue,isNoCase);
	if(isKeepOnly&&index>=0) return;
	else this[this.length]=vValue;
	return vValue;
}
/**
 * \u589e\u52a0\u4efb\u610f\u591a\u4e2a\u5143\u7d20
 * @return: return the array
 * @created: 2010.01.04
 */
Array.prototype.addElements=function(){
	for(var i=0,l=arguments.length;i<l;i++){
		this[this.length]=arguments[i];
	}
	return this;
}
/**
 * \u8fde\u63a5\u5143\u7d20\u8ddfArray.concat()\u65b9\u6cd5\u5dee\u4e0d\u591a\uff0c\u53ea\u4e0d\u8fc7\u662f\u4e0d\u4ee5\u65b0\u6570\u7ec4\u51fa\u73b0
 * @return: return the array
 * @created: 2010.11.10
 */
Array.prototype.appendElements=function(){
	var aValues=[].concat.apply(this,arguments);
	for(var i=0;i<aValues.length;i++){
		this[this.length]=aValues[i];
	}
	return this;
}
/**
 * \u8fde\u63a5\u5143\u7d20\u8ddfArray.concat()\u65b9\u6cd5\u5dee\u4e0d\u591a\uff0c\u53ea\u4e0d\u8fc7\u662f\u4e0d\u4ee5\u65b0\u6570\u7ec4\u51fa\u73b0
 * @return: return the array
 * @modified: 2010.11.10
 */
Array.prototype.concatElements=function(){
	var aValues=[].concat.apply(this,arguments);
	for(var i=0;i<aValues.length;i++){
		this[this.length]=aValues[i];
	}
	return this;
}
/**
 * insert new element to specified position of array
 */
Array.prototype.insertElement=function(newElement,tarIndex){
	if(tarIndex==null) return this[this.length]=newElement;
	if(tarIndex<0||tarIndex>this.length) return newElement;
	var aSplitter1=this.slice(tarIndex);
	this[tarIndex]=newElement;
	for(var i=0;i<aSplitter1.length;i++){
		this[tarIndex+1+i]=aSplitter1[i];
	}
	return newElement;
}
/**
 * \u79fb\u52a8\u5143\u7d20\u5230\u6307\u5b9a\u7684\u76ee\u6807\u4f4d\u7f6e(\u6839\u636e\u504f\u79fb\u91cf)
 * @return 
 * @modified 2010.11.10
 */
Array.prototype.moveElement=function(srcIndex,iOffset){
	if(srcIndex<0) return;
	if(srcIndex>this.length) return;
	if((srcIndex+iOffset)<0) return;
	if((srcIndex+iOffset)>=this.length) return;
	//****
	for(var i=0;i<Math.abs(iOffset);i++){
		this.swapElement(srcIndex+(iOffset>0?i:-i),srcIndex+(iOffset>0?i+1:-i-1));
	}
	return this[srcIndex];
}
/**
 * \u79fb\u52a8\u5143\u7d20\u5230\u6307\u5b9a\u7684\u76ee\u6807\u4f4d\u7f6e(\u6839\u636e\u76ee\u6807\u7d22\u5f15)
 * @return 
 * @modified 2010.11.10
 */
Array.prototype.moveElementTo=function(srcIndex,tarIndex){
	return this.moveElement(srcIndex,tarIndex-srcIndex);
}
/**
 * \u4ea4\u6362\u5143\u7d20
 * @modified 2010.11.09
 */
Array.prototype.swapElement=function(srcIndex,tarIndex){
	if(srcIndex==tarIndex) return;
	if(srcIndex<0||srcIndex>=this.length) return;
	if(tarIndex<0||tarIndex>=this.length) return;
	var element=this[tarIndex];
	this[tarIndex]=this[srcIndex];
	this[srcIndex]=element;
	
	return this;
}
/**
 * @function: find element in array
 * @description: thought search speed
 * @para vKey: search key
 * @para isNoCase:	if no differentiate character case. optional, default as false
 * @para isContains: if search element that contains the key. optional, default as false
 * @created: 2009.03.29
 * @modified: 2009.07.22
 */
Array.prototype.findElement=function(vKey,isNoCase,isContains){
	var typeName=typeof(vKey);
	if(typeName!="string"){
		for(var i=0;i<this.length;i++){
			if((typeof(this[i])==typeof(vKey))&&(this[i]==vKey)){
				return i;
			}
		}
	}else if(isNoCase&&isContains){
		for(var i=0;i<this.length;i++){
			if((typeof(this[i])==typeof(vKey))&&(this[i].toLowerCase().indexOf(vKey.toLowerCase())>=0)){
				return i;
			}
		}
	}else if(isNoCase){
		for(var i=0;i<this.length;i++){
			if((typeof(this[i])==typeof(vKey))&&(this[i].toLowerCase()==vKey.toLowerCase())){
				return i;
			}
		}
	}else if(isContains){
		for(var i=0;i<this.length;i++){
			if((typeof(this[i])==typeof(vKey))&&(this[i].indexOf(vKey)>=0)){
				return i;
			}
		}	
	}else{
		for(var i=0;i<this.length;i++){
			if((typeof(this[i])==typeof(vKey))&&(this[i]==vKey)){
				return i;
			}
		}
	}
	return -1;
}
/**
 * remove element of array by index
 * @return element
 * @modified 2010.11.09
 */
Array.prototype.removeElement=function(index){
	return this.splice(index,1);
}
/**
 * clear empty array
 * @return array
 */
Array.prototype.clear=function(){
	this.splice(0,this.length);
	return this;
}
/**
 * @created: 2010.11.6
 */
Array.prototype.indexOf=function(item,startIndex) { 
	var n=this.length;
	var i=startIndex==null?0:(startIndex<0?Math.max(0,n+startIndex):startIndex); 
	for(; i < n; i++){
		if(i in this && this[i] === item) return i; 
	}
	return -1;
}
/**
 * @created: 2010.11.6
 */
Array.prototype.lastIndexOf=function(item,startIndex){ 
	var n=this.length;
	var i=startIndex==null?(n-1):startIndex;
	if(startIndex<0){
		i=Math.max(0,n-1+startIndex);
	}else if(startIndex>n-1){
		i=n-1;
	}
	for(;i>=0;i--){
		if(i in this && this[i] === item) return i; 
	}
	return -1;
}
/**
 * @function: is contains specified element
 * @modified: 2010.11.09
 */
Array.prototype.isContains=function(item){
	for(var i=0;i<this.length;i++){
		if(this[i]===item){
			return true;
		}
	}
	return false;
}
/**
 * @function: isSingleType
 * @notice: \u6ce8\u610f,\u5982\u679c\u7c7b\u578b\u4e3aobject,\u5219\u53ef\u80fd\u4e0d\u80fd\u51c6\u786e\u5224\u65ad
 * @para isCaseBase: \u662f\u5426\u533a\u5206\u57fa\u672c\u7c7b\u578b\u7684\u503c\u548c\u5bf9\u8c61,\u9ed8\u8ba4\u4e0d\u533a\u5206,\u4f8b\u5982\uff1a\u201d"123"\u201d\u548c\u201cnew String("123")\u201d
 * @para isCaseObject: \u662f\u5426\u533a\u5206\u5bf9\u8c61\u7c7b\u578b\uff0c\u9ed8\u8ba4\u533a\u5206
 * @author: liu denggao
 * @created: 2009.12.08
 */
Array.prototype.isSingleType=function(isCaseBase,isCaseObject){
	isCaseBase=isCaseBase==undefined?false:isCaseBase;
	isCaseObject=isCaseObject==undefined?true:isCaseObject;
	
	var sType="";
	if(isCaseObject){
		if(!this.length){
			sType="";
		}else if(!isCaseBase){
			sType=this[0].constructor||typeof(this[0]);
		}else if(typeof(this[0])=="object"){
			sType=this[0].constructor||typeof(this[0]);
		}else{
			sType=typeof(this[0]);
		}
		for(var i=1;i<this.length;i++){
			var sType1="";
			if(!isCaseBase){
				sType1=this[i].constructor||typeof(this[i]);
			}else if(typeof(this[i])=="object"){
				sType1=this[i].constructor||typeof(this[i]);
			}else{
				sType1=typeof(this[i]);
			}
			if(sType!=sType1) return false;
		}
	}else{
		if(!this.length){
			sType="";
		}else if(!isCaseBase){
			sType=Object.prototype.toString.apply(this[0]);
		}else if(typeof(this[0])=="object"){
			sType=Object.prototype.toString.apply(this[0]);
		}else{
			sType=typeof(this[0]);
		}
		for(var i=1;i<this.length;i++){
			var sType1="";
			if(!isCaseBase){
				sType1=Object.prototype.toString.apply(this[i]);
			}else if(typeof(this[i])=="object"){
				sType1=Object.prototype.toString.apply(this[i]);
			}else{
				sType1=typeof(this[i]);
			}
			if(sType!=sType1) return false;
		}
	}
	return true;
}
/**
 * @created: 2009.12.2
 * @modified: 2010.11.09
 */
Array.prototype.isSingleValue=function(){
	var vValue=!this.length?"":this[0];
	for(var i=0;i<this.length;i++){
		if(vValue!==this[i]) return false;
	}
	return true;
}
/**
 * is equal
 * @modified: 2010.11.7
 */
Array.prototype.equal=function(otherArray){
	if(this.length!=otherArray.length) return false;
	for(var i=0;i<this.length;i++){
		if(this[i]!==otherArray[i]) return false;
	}
	return true;
}
/**
 * fill array with one value
 * @para vValue
 * @para isAutoExpand
 * @para iStartIndex
 * @para iLength
 * @created 2010.05.08
 */
Array.prototype.fill=function(vValue,isAutoExpand,iStartIndex,iLength){
	isAutoExpand=isAutoExpand==undefined?true:isAutoExpand;
	iStartIndex=iStartIndex==undefined?0:iStartIndex;
	iLength=iLength==undefined?this.length:iLength;
	if(!isAutoExpand){
		if(iStartIndex<0||iStartIndex>=this.length||iLength<0) return this;
		var iEndIndex=Math.min(this.length,iStartIndex+iLength)-1;
	}else{
		var iEndIndex=iStartIndex+iLength-1;
	}
	for(var i=iStartIndex;i<=iEndIndex;i++){
		this[i]=vValue;
	}
	return this;
}
/**
 * @function\uff1a\u6e05\u7406\u5783\u573e
 * @description\uff1a\u6e05\u7a7a\u5185\u5bb9\u4e3a\u7a7a\u7684\u6570\u7ec4\u5143\u7d20,\u89c4\u5219\u4e3a: 
 *			(1)undefined
 *			(2)null
 *			(3)""
 * @created\uff1a2009.07.18
 */	
Array.prototype.trim=function(){
	var array=[];
	for(var i=0,j=0;i<this.length;i++){
		if(this[i]==undefined||this[i]==null||this[i]==""){
			continue
		}else{
			array[j++]=this[i];
		}
	}
	for(var i=0;i<array.length;i++){
		this[i]=array[i];
	}
	for(var i=0,len=this.length-array.length;i<len;i++){
		this.pop();
	}
	return this;
}
/**
 * @created: 2009.4.16
 */
Array.prototype.unique=function(){
	var array=[];
	for(var i=this.length-1;i>=0;i--){
		var item=this[i];
		var flag=0;
		for(var j=i-1;j>=0;j--){
			var item1=this[j];
			if(typeof(item)==typeof(item1)&&item==item1){
				flag=1;
				break;
			}
		}
		if(!flag){
			array[array.length]=item;
		}
	}
	array.reverse();
	var newLength=array.length;
	if(this.length==newLength) return this;
	for(var i=0;i<array.length;i++){
		this[i]=array[i];
	}
	for(var i=0,len=this.length-newLength;i<len;i++){
		this.pop();
	}
	return this;
}
/**
 * @function: join all elements  of array as a string by separator
 * @description: \u7528\u5206\u9694\u7b26\u8fde\u63a5\u6570\u7ec4\u4e3a\u5355\u4e00\u5b57\u7b26\u4e32\uff0c\u5f53\u5206\u9694\u7b26\u4e3a\u6570\u7ec4\u65f6\uff0c\u5206\u522b\u586b\u8865\u5230\u5bf9\u5e94\u7684\u4f4d\u7f6e\u3002
 * 			\u4f8b\u5982\uff1a[22,52,48,999].joinAsStr(["\u65f6","\u5206","\u79d2","\u6beb\u79d2"]) -> "22\u65f652\u520648\u79d2999\u6beb\u79d2"
 *			\u3001[22,52,48,999].joinAsStr(["\u65f6","\u5206","\u79d2","\u6beb\u79d2"],1) -> "\u65f622\u520652\u79d248\u6beb\u79d2999"
 *			\u3001[0,52,48,0].joinAsStr(["\u65f6","\u5206","\u79d2","\u6beb\u79d2"],0,[0]) -> "52\u520648\u79d2"
 
 * @para vSeparator:
 * @para iAlign: 0, this on left, separator on right; 1, this on right, separator on left
 * @para vTrims: any value or array.\u672c\u6570\u7ec4\u7684\u9996\u5c3e\u5143\u7d20\u7b26\u5408\u8fd9\u4e2a\u503c\u7684\u5c06\u88ab\u5220\u9664\u3002
 * @author: liu denggao
 * @created: 2009.12.03
 * @modified: 2010.11.12
 */	
Array.prototype.joinAsStr=function(vSeparator,iAlign,vTrims){
	iAlign=iAlign==undefined?0:iAlign;	
	var aTrims=[];
	if(Object.prototype.toString.apply(vTrims) === '[object Array]'){
		aTrims=vTrims;
	}else{
		aTrims=[vTrims];
	}
	if(Object.prototype.toString.apply(vSeparator) !== '[object Array]'){
		return this.join(vSeparator);
	}else{
		var aValues=[];
		if(iAlign==0){
			for(var i=0,k=0;i<this.length;i++){
				if(!aTrims.isContains(this[i])){
					aValues[k++]=this[i];
					aValues[k++]=vSeparator[Math.min(i,this.length-1,vSeparator.length-1)];
				}
			}
		}else{
			for(var i=0,k=0;i<this.length;i++){
				if(!aTrims.isContains(this[i])){
					aValues[k++]=vSeparator[Math.min(i,this.length-1,vSeparator.length-1)];
					aValues[k++]=this[i];
				}
			}
		}
		return aValues.join("");	
	}
}
/**
 * select elements
 * @para fn: fnProcess(item,index,array)
 * @created: 2010.11.7
 */
Array.prototype.select=function(fn){
	var array=[];
	for(var i=0,j=0,len=this.length;i<len;i++){
		if(fn(this[i],i,this)){
			array[j++]=this[i];
		}
	}
	return array;
}
/**
 * @function: forEach
 * @para fn: fnProcess(item,index,array)
 * @para thisObj:
 * @created: 2010.11.7
 */
Array.prototype.forEach=function(fn,thisObj){
	for(var i=0,len=this.length;i<len;i++){
		fn.call(thisObj, this[i], i, this);
	}
}
/**
 * @para fn:  fnProcess(item,index,array)
 * @created: 2011.10.28
 */
Array.prototype.toNewArray=function(fn){
	var array=[];
	for(var i=0;i<this.length;i++){
		if(typeof(fn)=="function"){
			array[array.length]=fn(this[i],i,this);
		}else{
			array[array.length]=this[i];
		}
	}
	return array;
}