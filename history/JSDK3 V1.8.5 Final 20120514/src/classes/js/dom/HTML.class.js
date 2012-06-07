/**
 * HTML Class
 * @file: HTML.class.js
 * @version: V0.8
 * @author: liu denggao 
 * @modified: 2012.04.19
 * @mail: mestime@tom.com
 * @homepage: http://www.wunmei.com.cn
 *******************************************/

$package("js.dom");

js.dom.HTML={}
var _$class=js.dom.HTML;

_$class.getScreenLeft=function(elObj){
	var left=window.screenLeft;
	for(var node=elObj;node&&typeof(node.offsetLeft)!="undefined";node=node.offsetParent){			
		left+=node.offsetLeft;
	}
	//减去滚动距离
	left-=document.body.scrollLeft;
	return left+2;
}
_$class.getScreenTop=function(elObj){
	var top=window.screenTop;
	var offset=0;
	for(var oWindow=window;;oWindow=oWindow.parent){
		if(oWindow.frameElement&&oWindow.frameElement.nodeName=="IFRAME"){
			offset+=this.getTopOnWindow(oWindow.frameElement);
		}
		if(oWindow==oWindow.parent) break;
	}	
	top-=offset;		//IE取screenTop的BUG,用此修正.
	for(var node=elObj;node&&typeof(node.offsetTop)!="undefined";node=node.offsetParent){			
		top+=node.offsetTop;
	}
	//减去滚动距离
	top-=document.body.scrollTop;
	return top+2;
}
_$class.getScreenRight=function(elObj){
	return this.getScreenLeft(elObj)+this.getWindowWidth(elObj)-1;
}
_$class.getScreenBottom=function(elObj){
	return this.getScreenTop(elObj)+this.getWindowHeight(elObj)-1;
}
_$class.getWindowWidth=function(elObj){
	var width=elObj.offsetWidth;
	return width;
}
_$class.getWindowHeight=function(elObj){
	var height=elObj.offsetHeight;
	return height;
}
/**
 * 获取页面的内容高度或最小内容高度(包括所有边距)
 * @description: 可用于外框架的自动高度调整
 */
_$class.getDocHeight=function(doc){
	if(Global.Browser.Engine.trident){
		if(doc.compatMode!="CSS1Compat"){
			return doc.body.scrollHeight;
		}else{
			//可支持IE6、IE7, 对于IE8+，必须压缩窗口使之出现滚动条才能正常获取
			return doc.documentElement.scrollHeight;
		}
	}else{
		//可完全支持Firefox 11+、Opea 11.61+
		//对于Chrome 19 支持标准模式，兼容模式下必须压缩窗口才能正常获取
		return doc.documentElement.offsetHeight;
	}
}
_$class.getLeftOnDoc=function(elObj){
	var retValue=0;
	for(;elObj;elObj=elObj.offsetParent){
		retValue+=elObj.offsetLeft;
	}
	return retValue;
}
_$class.getTopOnDoc=function(elObj){
	var retValue=0;
	for(;elObj;elObj=elObj.offsetParent){
		retValue+=elObj.offsetTop;
	}
	return retValue;
}
_$class.getRightOnDoc=function(elObj){
	return this.getLeftOnDoc(elObj)+this.getWindowWidth(elObj)-1;
}
_$class.getBottomOnDoc=function(elObj){
	return this.getTopOnDoc(elObj)+this.getWindowHeight(elObj)-1;
}
_$class.contains=function(elWrap,elChild){
	while(elChild && typeof(elChild.parentNode) != "undefined"){
		if(elWrap == elChild) return true;
		elChild = elChild.parentNode;
	}
	return false;
};

/**
 * set class name of style of html element
 * @param: 
 *	(1)elObj
 *	(2)iOptions: 0,添加；1,删除；2,更新；3,替换
 *	(3)className:
 *	(4)className1: 如果选项为"替换"，则必选
 * @update: 2009.11.11-2009.12.18
 */
_$class.setStyleClass=function(elObj,iOptions,className,className1){
	var aClasses=elObj.getAttribute("class").split(" ").trim();
	var index=aClasses.findElement(className,true);
	switch(iOptions){
		case undefined:
		case 0:		//add
			if(index>=0){
				return;
			}else{
				aClasses.addElement(className);
				elObj.className=aClasses.join(" ");
			}
			break;
		case 1:		//delete
			if(index>=0) { 
				aClasses.removeElement(index);
				elObj.className=aClasses.join(" ");
			}
			break;
		case 2:		//update
			if(index>=0) { 
				aClasses[index]=className;
				elObj.className=aClasses.join(" ");
			}else{
				aClasses.addElement(className);
				elObj.className=aClasses.join(" ");
			}
			break;
		case 3:		//replace
			if(index>=0){
				aClasses[index]=className1;
				elObj.className=aClasses.join(" ");
			}else if(aClasses.findElement(className1,true)<0){
				aClasses.addElement(className1);
				elObj.className=aClasses.join(" ");
			}
			break;
	}
}
/**
 * @created: 2011.9.13
 */
_$class.setInnerHTML=function(el,htmlCode){
	if(Browser.Engine.name=="trident") {  
		htmlCode = '<div style="display:none">for IE</div>' + htmlCode;  
		htmlCode = htmlCode.replace(/<script([^>]*)>/gi,'<script$1 defer>');  
		el.innerHTML = '';  
		el.innerHTML = htmlCode;  
		el.removeChild(el.firstChild);  
	} else {  
		var el_next = el.nextSibling;  
		var el_parent = el.parentNode;  
		el_parent.removeChild(el);  
		el.innerHTML = htmlCode;  
		if (el_next) {  
			el_parent.insertBefore(el, el_next);
		} else {  
		    el_parent.appendChild(el);  
		}  
	}
}
