/**
 * @file: HTMLForm.class.js
 * @version: V1.5 beta
 * @since: JSDK3 V1.6.0
 * @support: IE6+, Firefox 5+, Chrome 14+, Safari 5+, Opera 11.11+
 * @author: liu denggao
 * @created: 2011.9.22
 * @modified: 2012.2.28
 * @mail: mestime@tom.com 
 * @homepage: http://www.wunmei.com.cn
 ***************************************/
 
$package("js.dom");

js.dom.HTMLForm=function(){};

var _$class=js.dom.HTMLForm;
_$class.$extends("Object");
var _$proto=_$class.prototype;

/**
 * @modified: 2011.5.11
 */
_$proto.checkForm=function(){
	return this.checkElements(this.getAllElements(),true);
}
/**
 * @created: 2011.5.11
 * @modified: 2011.12.28
 */
_$proto.checkItem=function(sName,enableExpValid){
	var elements;
	if(this._elements){
		elements=this._elements[sName]?[this._elements[sName]]:[];
	}else{
		elements=Global.dom("#"+sName+"#",this);
	}
	return this.checkElements(elements,enableExpValid);
}
/**
 * @created: 2011.5.11
 * @modified: 2012.2.7
 */
_$proto.checkElements=function(elements,enableExpValid){
	var aElements=[];
	for(var i=0;i<elements.length;i++){
		var obj=elements[i];
		var sName=obj.name||obj.id;
		if(!sName||!this.hasItem(sName)) continue;
		if(obj.type=="hidden") continue;
		aElements.push(obj);
	}
	elements=aElements;
	//检测基本匹配
	for(var i=0;i<elements.length;i++){
		var obj=elements[i];
		var sName=obj.name||obj.id;
		var vValue=this.getItemValue(sName);
		//检测是否已填写
		if(typeof(obj.allowEmpty)=="boolean"&&!obj.allowEmpty){
			if((!Global.isArray(vValue)&&vValue=="")
				||(Global.isArray(vValue)&&vValue.join("")=="")){
				if(obj.unfilledPrompt) alert(obj.unfilledPrompt);
				else alert("请选择或输入\""+obj.label+"\"!");
				try{this.getElement(sName).focus();}catch(e){}
				return false;
			}
		}
		//检测类型是否匹配
		switch(obj.dataType){
			case "Text":
				break;
			case "Number":
				if(isNaN(vValue)) {
					alert("您输入的\""+obj.label+"\"不是数字！");
					this.clearItemValue(sName);
					try{this.getElement(sName).focus();}catch(e){}
					return false;
				}
				break;
			case "Date":
				if(isNaN(new Global.js.lang.natives.Date(vValue.replace(/-/g,"/").replace(/\./g,"/")))){
					alert("您输入的\""+obj.label+"\"不是日期！");
					this.clearItemValue(sName);
					try{this.getElement(sName).focus();}catch(e){}
					return false;
				}
				break;
		}
	}
	//检测大小是否匹配
	for(var i=0;i<elements.length;i++){
		var obj=elements[i];
		var sName=obj.name||obj.id;
		var vValue=this.getItemValue(sName);
		//检测大小是否匹配
		if(Global.isEmpty(vValue)){
			//none---
		}else if((obj.minValue==""||obj.minValue==undefined)
			&&(obj.maxValue==""||obj.maxValue==undefined)){
			//none---
		}else{
			switch(obj.dataType){
				case "Text":
					if(!Global.isArray(vValue)){
						if ((obj.maxValue==""||obj.maxValue==undefined)&&vValue.length<obj.minValue){
							if(obj.unmatchedPrompt) alert(obj.unmatchedPrompt);
							else alert("您输入的\""+obj.label+"\"文本字数不能少于"+obj.minValue+"个!");
							try{this.getElement(sName).focus();}catch(e){}
							return false;
						}else if((obj.minValue==""||obj.minValue==undefined)&&vValue.length>obj.maxValue){
							if(obj.unmatchedPrompt) alert(obj.unmatchedPrompt);
							else alert("您输入的\""+obj.label+"\"文本字数不能多于"+obj.maxValue+"个!");
							try{this.getElement(sName).focus();}catch(e){}
							return false;
						}
					}else{
						if ((obj.maxValue==""||obj.maxValue==undefined)&&vValue.length<obj.minValue){
							if(obj.unmatchedPrompt) alert(obj.unmatchedPrompt);
							else alert("您至少要选择"+obj.minValue+"个\""+obj.label+"\"!");
							try{this.getElement(sName).focus();}catch(e){}
							return false;
						}else if((obj.minValue==""||obj.minValue==undefined)&&vValue.length>obj.maxValue){
							if(obj.unmatchedPrompt) alert(obj.unmatchedPrompt);
							else alert("您至多能选择"+obj.maxValue+"个\""+obj.label+"\"!");
							try{this.getElement(sName).focus();}catch(e){}
							return false;
						}
					}
					break;
				case "Number":
					var iValue=Global.js.lang.natives.Number(vValue);
					var minValue=obj.minValue;
					var maxValue=obj.maxValue;
					if (!Global.isEmpty(minValue)){
						if(typeof(minValue)=="string"&&minValue.indexOf("->#")==0){
							var fromValue=this.getItemValue(minValue.rightBack("->#"));
							if(!Global.isEmpty(fromValue)) minValue=Global.js.lang.natives.Number(fromValue);
							else minValue=undefined;
						}else if(Global.isNumber(minValue)){
							minValue=Global.js.lang.natives.Number(minValue);
						}
						if(Global.isNumber(minValue)&&iValue<minValue){
							if(obj.unmatchedPrompt) alert(obj.unmatchedPrompt);
							else alert("您输入的\""+obj.label+"\"不能小于"+minValue+"!");
							try{this.getElement(sName).focus();}catch(e){}
							return false;
						}
					}
					if(!Global.isEmpty(maxValue)){
						if(typeof(maxValue)=="string"&&maxValue.indexOf("->#")==0){
							var toValue=this.getItemValue(maxValue.rightBack("->#"));
							if(!Global.isEmpty(toValue)) maxValue=Global.js.lang.natives.Number(toValue);
							else maxValue=undefined;
						}else if(Global.isNumber(maxValue)){
							maxValue=Global.js.lang.natives.Number(maxValue);
						}
						if(Global.isNumber(maxValue)&&iValue>maxValue){
							if(obj.unmatchedPrompt) alert(obj.unmatchedPrompt);
							else alert("您输入的\""+obj.label+"\"不能大于"+maxValue+"!");
							try{this.getElement(sName).focus();}catch(e){}
							return false;
						}
					}
					break;
				case "Date":
					var dtValue=new Global.js.lang.natives.Date(vValue.replace(/-/g,"/").replace(/\./g,"/"));
					var sMinValue=obj.minValue;
					var minValue=obj.minValue;
					var sMaxValue=obj.maxValue;
					var maxValue=obj.maxValue;
					if (!Global.isEmpty(minValue)){
						if(typeof(minValue)=="string"&&minValue.indexOf("->#")==0){
							var sMinValue=this.getItemValue(minValue.rightBack("->#"));
							if(!Global.isEmpty(sMinValue)) minValue=new Global.js.lang.natives.Date(sMinValue.replace(/-/g,"/").replace(/\./g,"/"));
							else minValue=undefined;
						}else if(Global.isDate(minValue)){
							if(typeof(minValue)=="string") 
								minValue=new Global.js.lang.natives.Date(minValue.replace(/-/g,"/").replace(/\./g,"/"));
						}
						if(Global.isDate(minValue)&&dtValue<minValue){
							if(obj.unmatchedPrompt) alert(obj.unmatchedPrompt);
							else alert("您输入的\""+obj.label+"\"不能早于\""+sMinValue+"\"!");
							try{this.getElement(sName).focus();}catch(e){}
							return false;
						}
					}
					if(!Global.isEmpty(maxValue)){
						if(typeof(maxValue)=="string"&&maxValue.indexOf("->#")==0){
							var sMaxValue=this.getItemValue(maxValue.rightBack("->#"));
							if(!Global.isEmpty(sMaxValue)) maxValue=new Global.js.lang.natives.Date(sMaxValue.replace(/-/g,"/").replace(/\./g,"/"));
							else maxValue=undefined;
						}else if(Global.isDate(maxValue)){
							if(typeof(maxValue)=="string") 
								maxValue=new Global.js.lang.natives.Date(maxValue.replace(/-/g,"/").replace(/\./g,"/"));
						}
						if(Global.isDate(maxValue)&&dtValue>maxValue){
							if(obj.unmatchedPrompt) alert(obj.unmatchedPrompt);
							else alert("您输入的\""+obj.label+"\"不能晚于\""+sMaxValue+"\"!");
							try{this.getElement(sName).focus();}catch(e){}
							return false;
						}
					}
					break;
			}
		}
	}	
	//检测校验函数
	if(!enableExpValid) return true;
	for(var i=0;i<elements.length;i++){
		var obj=elements[i];
		var sName=obj.name||obj.id;
		var vValue=this.getItemValue(sName);
		//检测校验函数
		if(typeof(obj.onEvents)=="object"){
			if(typeof(obj.onEvents.onValidate)=="function"){
				if(!obj.onEvents.onValidate.apply(obj)){
					try{this.getElement(sName).focus();}catch(e){}
					return false;
				}
			}
		}
	}
	return true;
}
/**
 * @para values: 
 *		(1)[[name,label,dataType,allowEmpty[,unfilledPrompt,onEvents[,minValue,maxValue,unmatchedPrompt]]]]
 *		(2)[{name:$name, label:$label, dataType:$dataType, allowEmpty:$allowEmpty, ...}]
 *		(3)para onEvents: onValidate,onBlur,onEnter
 * @created: 2011.12.28
 * @modified: 2011.12.28
 */
_$proto.setAllItems=function(values){
	var elements=[];
	for(var i=0;i<values.length;i++){
		var element=values[i];
		if(Global.isArray(element)){
			elements[i]={
				"parentForm": this,
				"name": element[0],
				"label": element[1],
				"dataType": element[2],
				"allowEmpty": element[3],
				"unfilledPrompt": element.length>4?element[4]:"",
				"onEvents": element.length>5?element[5]:{},
				"minValue": element.length>6?element[6]:"",
				"maxValue": element.length>7?element[7]:"",
				"unmatchedPrompt": element.length>8?element[8]:""
			}
		}else if(typeof(values[i])=="object"){
			elements["parentForm"]=this;
			elements[i]=values[i];
		}
		elements[elements[i].name]=elements[i];
		var actualElements=Global.dom("#"+elements[i].name+"#");
		for(var j=0,jLen=actualElements.length;j<jLen;j++){
			var actualElement=actualElements[j];
			var sEventName="";
			if(Browser.Engine.trident){
				sEventName="onpropertychange";
			}else{
				switch(actualElement.tagName){
					case "INPUT":
						switch(actualElement.type){
							case "text":
							case "password":
								sEventName="oninput";
								break;
							case "hidden":
								break;
							case "radio":
							case "checkbox":
								sEventName="onchange";
								break;
						}
						break;
					case "TEXTAREA":
						sEventName="oninput";
						break;
					case "SELECT":
						sEventName="onchange";
						break;
				}
			}
			switch(sEventName){
				case "onpropertychange":
					actualElement.attachEvent("onpropertychange",(function(){
						var actualElement=actualElements[j];
						return function(event){
							if(!event) event=window.event;
							actualElement.form.__onElementPropertyChange({ 
								srcElement: actualElement,
								propertyName: event.propertyName,
								result:{srcElement: actualElement}
							});
						}
					})());
					break;
				case "oninput":
					actualElement.attachEvent("oninput",(function(){
						var actualElement=actualElements[j];
						return function(event){
							if(!event) event=window.event;
							actualElement.form.__onElementInput({ 
								srcElement: actualElement,
								result:{srcElement: actualElement}
							});
						}
					})());
					break;
				case "onchange":
					actualElement.attachEvent("onchange",(function(){
						var actualElement=actualElements[j];
						return function(event){
							if(!event) event=window.event;
							actualElement.form.__onElementChange({ 
								srcElement: actualElement,
								result:{srcElement: actualElement}
							});
						}
					})());
					break;
			}
		}
	}
	this._elements=elements;
}
/** 
 * @para iOptions: 
 * @created: 2011.12.28
 * @modified: 2011.12.28
 */
_$proto.getAllItems=function(iOptions,isContainsHidden){
	var retValues=[];
	var elements=this._elements||this.elements;;
	for(var i=0,len=elements.length;i<len;i++){
		var obj=elements[i];
		var sName=obj.name||obj.id;
		if(!sName) continue;
		if(obj.type=="hidden"&&!isContainsHidden) continue;
		retValues[retValues.length]=sName;
	}
	return retValues.unique();
}
/**
 * @description: get form detail element
 * @created: 2011.12.28
 */
_$proto.getAllElements=function(){
	return this._elements||this.elements;
}
/**
 * @created: 2011.12.28
 */
_$proto.getElement=function(sName){
	var elements=Global.dom("#"+sName+"#",this);
	if(!elements.length){
		return null;
	}else{
		return elements[0];
	}
}
/**
 * @created: 2011.12.28
 */
_$proto.getItem=function(sName){
	if(this._elements){
		return this._elements[sName]||null;
	}else{
		return this.getElement(sName);
	}
}
_$proto.hasItem=function(sName){
	return !!Global.dom("#"+sName+"#",this).length;
}
_$proto.getAllRequiredItems=function(iOptions,maxResults){
	var retValues=[],elements=this.getAllElements();
	maxResults=maxResults==undefined?0:maxResults;
	for(var i=0,len=elements.length;i<len;i++){
		var obj=elements[i];
		var sName=obj.name||obj.id;
		if(!sName) continue;
		if(obj.type=="hidden") continue;
		if(typeof(obj.allowEmpty)=="boolean"&&!obj.allowEmpty){
			switch(iOptions){
				case 0:
					retValues[retValues.length]=sName;
					break;
				case 1:
					if(this.getItemValue(sName)==""){
						retValues[retValues.length]=sName;
					}
					break;
				case 2:
					if(this.getItemValue(sName)){
						retValues[retValues.length]=sName;
					}
					break;
			}
		}
	}
	return retValues.unique();
}
/*
 * 日期：2009.04.16
 * 参数：iOptions
 *	(1)0,所有可选项
 *	(2)1,所有未填写的可选项
 *  (3)2,所有已填写的可选项
 */
_$proto.getAllOptionalItems=function(iOptions){
	var retValues=[],elements=this.getAllElements();
	for(var i=0,len=elements.length;i<len;i++){
		var obj=elements[i];
		var sName=obj.name||obj.id;
		if(!sName) continue;
		if(typeof(obj.allowEmpty)=="undefined"||obj.allowEmpty){
			switch(iOptions){
				case 0:
					retValues[retValues.length]=sName;
					break;
				case 1:
					if(this.getItemValue(sName)==""){
						retValues[retValues.length]=sName;
					}
					break;
				case 2:
					if(this.getItemValue(sName)){
						retValues[retValues.length]=sName;
					}
					break;
			}
		}
	}
	return retValues.unique();
}
_$proto.getItemValue=function(sName){
	var objs=Global.dom("#"+sName+"#",this);
	var retValues=[];
	if(!objs.length){
		return "";
	}else if(objs.length==1){
		var obj=objs[0];
		if(!obj.length){
			switch(obj.tagName){
				case "INPUT":
					switch(obj.type){
						case "radio":
						case "checkbox":
							if(obj.checked) return obj.value;
							else return "";
						default:
							return obj.value;
					}
				case "SPAN":	//simulation
					return obj.getAttribute("value")||"";
				default:
					return obj.value;
			}
		}else {	
			switch(obj.tagName){
				case "SELECT":
					if(obj.multiple){
						for(var i=0;i<obj.length;i++){
							var obj=obj.options[i];
							if(obj.selected) retValues[retValues.length]=obj.value;
						}
						return retValues;
					}else{
						return obj.value;
					}
					break;
				default:
					throw new Error(1,"No support!");
			}
		}
	}else{
		switch(objs[0].tagName){
			case "INPUT":
				switch(objs[0].type){
					case "text":
					case "hidden":
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							retValues[retValues.length]=obj.value;
						}
						break;
					case "radio":
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							if(obj.checked){
								return obj.value;
							}
						}
						break;
					case "checkbox"	:
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							if(obj.checked) retValues[retValues.length]=obj.value;
						}
						break;
					default:
						throw new Error(1,"获取表单项值错误!该功能不支持类型为\""+objs[0].type+"\"的元素!");
				}
				break;
			default:
				throw new Error(1,"获取表单项值错误!标识为\""+sName+"\"的文档元素并不唯一!");
		}
	}
	return retValues;
}
_$proto.getItemDefaultValue=function(sName){
	var objs=Global.dom("#"+sName+"#",this);
	var retValues=[];
	if(!objs){
		return "";
	}else if(objs.length==1){	
		var obj=objs[0];
		switch(obj.tagName){
			case "INPUT":
				switch(obj.type){
					case "text":
					case "hidden":
					case "password":
						return obj.defaultValue;
					case "radio":
					case "checkbox"	:
						if(obj.defaultChecked) {
							return obj.defaultValue;
						}else{
							return ""
						}
						break;
					default:
						return "";
				}
				break;
			case "SELECT":
				if(obj.multiple){
					for(var i=0;i<obj.length;i++){
					    var oItem=obj.options[i];
						if(oItem.defaultSelected) retValues[retValues.length]=oItem.value;
					}
					if(retValues.length) return retValues;
			    }else{
					for(var i=0;i<obj.length;i++){
					    var oItem=obj.options[i];
						if(oItem.defaultSelected) return oItem.value;
					}
			    }
				if(obj.length) return obj.options[0].value;
				return "";
				break;
			case "TEXTAREA":
				return obj.defaultValue;
				break;
			case "SPAN":		//simulation
				return obj.getAttribute("defaultValue")||"";
			default:
				return "";
		}
	}else{
		switch(objs[0].tagName){
			case "INPUT":
				switch(objs[0].type){
					case "text":
					case "hidden":
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							retValues[retValues.length]=obj.defaultValue;
						}
						break;
					case "radio":
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							if(obj.defaultChecked){
								return obj.defaultValue;
							}
						}
						return "";
						break;
					case "checkbox"	:
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							if(obj.defaultChecked) retValues[retValues.length]=obj.defaultValue;
						}
						return "";
						break;
					default:
						return "";
				}
				break;
			default:
				return "";
		}
	}
	return retValues;
}
/**
 * 设置表单项的当前值或默认值
 * @author: liu denggao
 * @created: 2011.4.22
 * @param iOptions: 0,设置默认值; 1,设置当前值
 */
_$proto.setItemValue=function(iOptions,sName,vValue){
	var objs=Global.dom("#"+sName+"#",this);
	if(!objs){
		return false;
	}else if(objs.length==1){	
		var obj=objs[0];
		switch(obj.tagName){
			case "INPUT":
				switch(obj.type){
					case "text":
						if(iOptions==0){
							obj.defaultValue=Global.isArray(vValue)?vValue.join(obj.separator||obj.getAttribute("separator")||";"):vValue;
						}else if(iOptions==1){
							obj.value=Global.isArray(vValue)?vValue.join(obj.separator||obj.getAttribute("separator")||";"):vValue;
						}
						break;
					case "password":
						if(iOptions==0){
							obj.defaultValue=Global.isArray(vValue)?vValue.join(";"):vValue;
						}else if(iOptions==1){
							obj.value=Global.isArray(vValue)?vValue.join(";"):vValue;
						}
						break;
					case "radio":
					case "checkbox":
						if(iOptions==0){
							//defaultValue与value是同一个值，不能对defaultValue进行赋值
							if(obj.defaultValue.equal(vValue)){
								obj.defaultChecked=true;
							}
						}else if(iOptions==1){
							if(obj.value==vValue) {
								obj.checked=true;
							}else{
								return false;
							}
						}
						break;
				}
				break;
			case "SELECT":
				if(obj.multiple){
					for(var i=0;i<obj.length;i++){
						var oItem=obj.options[i];
						if(iOptions==0){
							if(oItem.value.equal(vValue)){
								oItem.defaultSelected=true;
							}else{
								oItem.defaultSelected=false;
							}
						}else if(iOptions==1){
							if(oItem.value.equal(vValue)){
								oItem.selected=true;
								break;
							}
						}
					}
					if(retValues.length) return retValues;
				}else{
					for(var i=0;i<obj.length;i++){
						var oItem=obj.options[i];
						if(iOptions==0){
							if(oItem.value.equal(vValue)){
								oItem.defaultSelected=true;
							}else{
								oItem.defaultSelected=false;
							}
						}else if(iOptions==1){
							if(oItem.value.equal(vValue)){
								oItem.selected=true;
								break;
							}
						}
					}
				}
				break;
			case "TEXTAREA":			
				if(iOptions==0){
					obj.defaultValue=Global.isArray(vValue)?vValue.join(obj.separator||obj.getAttribute("separator")||";"):vValue;
				}else if(iOptions==1){
					obj.value=Global.isArray(vValue)?vValue.join(obj.separator||obj.getAttribute("separator")||";"):vValue;
				}
			case "SPAN":	//simulation
				if(iOptions==0){
					obj.setAttribute("defaultValue",vValue);
				}else if(iOptions==1){
					obj.setAttribute("value",vValue);
				}
				break;
		}
	}else{
		switch(objs[0].tagName){
			case "INPUT":
				switch(objs[0].type){
					case "text":
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							if(iOptions==0){
								if(Global.isArray(vValue)){									
									obj.defaultValue=i<vValue.length?vValue[i]:"";
								}else if(i==0){
									obj.defaultValue=vValue;	
								}else{
									obj.defaultValue="";
								}
							}else if(iOptions==1){
								if(Global.isArray(vValue)){									
									obj.value=i<vValue.length?vValue[i]:"";
								}else if(i==0){
									obj.value=vValue;	
								}else{
									obj.value="";
								}
							}
						}
						break;
					case "radio":
					case "checkbox"	:
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							if(iOptions==0){
								if(obj.defaultValue.equal(vValue)){
									obj.defaultChecked=true;
								}else{
									obj.defaultChecked=false;
								}
							}else if(iOptions==1){
								if(obj.value.equal(vValue)){
									obj.checked=true;
								}else{
									obj.checked=false;
								}
							}
						}
						break;
				}
				break;
		}
	}
	return true;
}
_$proto.selectItemAllValue=function(sName,isSelect){
	var objs=Global.dom("#"+sName+"#",this);
	var retValues=[];
	if(!objs){
		return;
	}else if(objs.length==1){	
		var obj=objs[0];
		switch(obj.tagName){
			case "SELECT":
				if(obj.multiple){
					for(var i=0;i<obj.length;i++){
					    var oItem=obj.options[i];
						oItem.selected=isSelect==undefined?true:isSelect;
					}
			    }else if(isSelect==false){
					for(var i=0;i<obj.length;i++){
					    var oItem=obj.options[i];
						oItem.selected=false;
					}
				}
		}
	}else{
		switch(objs[0].tagName){
			case "INPUT":
				switch(objs[0].type){
					case "radio":
						if(isSelect!=false) break;
					case "checkbox"	:
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							obj.checked=isSelect==undefined?true:isSelect;
						}
				}
		}
	}
	return;
}
_$proto.clearItemValue=function(sName){
	var objs=Global.dom("#"+sName+"#",this);
	var retValues=[];
	if(!objs){
		return;
	}else if(objs.length==1){	
		var obj=objs[0];
		switch(obj.tagName){
			case "INPUT":
				switch(obj.type){
					case "text":
					case "hidden":
					case "password":
						obj.value="";
						break;
					case "radio":
					case "checkbox"	:
						obj.checked=false;
						break;
					default:
						return;
				}
				break;
			case "SELECT":
				for(var i=0;i<obj.length;i++){
					var oItem=obj.options[i];
					oItem.selected=false;
				}
				break;
			case "TEXTAREA":
				obj.value="";
				break;
			case "SPAN":	//simulation
				obj.setAttribute("value","");
				break;
			default:
				return "";
		}
	}else{
		switch(objs[0].tagName){
			case "INPUT":
				switch(objs[0].type){
					case "text":
					case "hidden":
					case "password":
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							obj.value="";
						}
						break;
					case "radio":
					case "checkbox"	:
						for(var i=0;i<objs.length;i++){
							var obj=objs[i];
							obj.checked=false;
						}
						break;
					default:
						return;
				}
				break;
			default:
				return;
		}
	}
	return ;
}

//:event------------------------

_$proto._onItemValueChange=function(oEvent){
	var sName=oEvent.result.srcElement.name;
	if(!sName) return;
	var item=this.getItem(sName);
	this.__onElementValueChange(oEvent);
	if(this.onItemValueChange) this.onItemValueChange({
		result: {
			fromElement: oEvent.result.srcElement,
			fromItem: item
		}
	});	
}
//for IE
_$proto.__onElementPropertyChange=function(oEvent){
	var element=oEvent.srcElement;
	try{
		switch(oEvent.propertyName){
			case "value":
				if(element.type=="hidden") break;
				this._onItemValueChange(oEvent);
				break;
			case "checked":
				if(element.type=="radio"){
					var objs=Global.dom("#"+element.name+"#",element.form);
					if(objs.length<=1){
						//---
					}else{
						if(!element.checked) return;	//如果不是单选组中的第一个，则退出
					}
					this._onItemValueChange(oEvent);
				}else if(element.type=="checkbox"){
					this._onItemValueChange(oEvent);
				}
				break;
		}
	}catch(e){
	}
}
//oninput event of element for non IE
_$proto.__onElementInput=function(oEvent){
	var element=oEvent.srcElement;
	try{
		this._onItemValueChange(oEvent);
	}catch(e){
	}
}
//onchange event of element for non IE
_$proto.__onElementChange=function(oEvent){
	var element=oEvent.srcElement;
	try{
		this._onItemValueChange(oEvent);
	}catch(e){
	}
}
//custom event for element
_$proto.__onElementValueChange=function(oEvent){
	var item=this.getItem(oEvent.result.srcElement.name);
	if(item&&item.onEvents.onValueChange){
		item.onEvents.onValueChange.call(item,oEvent);
	}
}
