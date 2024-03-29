/**
 * @file DOMTemplate.js
 * @version 2.7.1
 * @author Liu Denggao
 * @created 2011.9.3
 * @modified 2012.4.26
 * @apply JSDK3 V1.8.0
 * @since JSDK3 V1.5.4
 */

$package("js.dom");


js.dom.DOMTemplate=function(sCode){
	this._processor;
	this._subs=[];
	this._subData=[];
	this._srcPath="";
	this._source;
	this._target;
	this._isOnsiteOutput=false;
	this._DOMTemplate(sCode);
};
var _$class=js.dom.DOMTemplate;
_$class.$name="DOMTemplate";
_$class.$extends("Object");
var _$proto=_$class.prototype;

//:constructor----------------

_$class.newInstanceWithUrl=function(sUrl,isCache){
	var tpl=new this();
	tpl._DOMTemplateFromUrl(sUrl,isCache);
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
_$proto._DOMTemplateFromUrl=function(sUrl,isCache){
	this._srcPath=sUrl;
	this._DOMTemplateFromCode(Global.get(sUrl,"",isCache||(isCache==undefined),"","Text"));
}
_$proto._DOMTemplateFromId=function(sId){
	var els=Global.dom("#"+sId);
	if(!els.length) throw "Element '"+sId+"' not found.";
	this._source=els[0];
	this._srcPath=els[0].getAttribute("src");
	this._DOMTemplateFromCode(els[0].text||els[0].value
		||(this._srcPath&&Global.get(this._srcPath,"",false,"","Text"))||"");
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
				var attribs=strs[i][1].trim().match(/(src|data)=\"([^\"]+)\"/g);
				if(!attribs) break;
				attribs.forEach(function(item,index,array){
					var values=item.match(/^([^\"]+)=\"([^\"]+)\"$/)||[null,"",""];
					attribs[values[1]]=values[2];
				},attribs);
				if(attribs.src){
					try{
						var srcTpl1=!this._srcPath?attribs.src:Global.getURIFullPath(this._srcPath.leftBack("/"),attribs.src,"/");
						var tpl1=this.getClass().newInstanceWithUrl(srcTpl1);
						if(!attribs.data){	//later parse
							this._subs.push(tpl1);
							codes.push(startOfHTML,"this._subs[\""+(this._subs.length-1)+"\"].parse(json)",endOfHTML);
						}else if(/\$\{[^\$\{\}]*\}/.test(attribs.data)){	//later parse
							this._subs.push(tpl1);
							codes.push(startOfHTML,"this._subs[\""+(this._subs.length-1)
									+"\"].parse("+attrib.data.match(/^\$\{([^\$\{\}]*)\}$/).pop()+")",endOfHTML);
						}else{	//implement parse
							try{
								var data=Global.get(!this._srcPath?attribs.data
										:Global.getURIFullPath(this._srcPath.leftBack("/"),attribs.data,"/"),"",false,"","JSON");
							}catch(e){
							}
							if(data) codes.push(startOfHTML,Global.obj(tpl1.parse(data)).serialize(),endOfHTML);
						}
						
					}catch(e){alert(e.description);
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
 * @invoke:
 *	(2)parse(tmpl,json[,vOutput[,fnInit]])
 *	(3)parse(htmlBlock)
 *	(4)parse(dataBlocks )
 *	(4)parse(htmlBlocks)
 * @since: v2.7
 * @created: 2012.4.19
 */
_$class.parse=function(){
	var argLen=arguments.length;
	if(argLen==1){
		if(Global.isArray(arguments[0])){
			if(Global.isArray(arguments[0].getFirst())){
				this._parseTmpls(arguments[0]);
			}else{
				this._parseBlocks(arguments[0]);
			}
		}else if(typeof(arguments[0])=="object"){
			this._parseBlock(arguments[0]);
		}
	}else if(argLen>1){
		this._parseTmpl.apply(this,arguments);
	}
}
_$class._parseTmpl=function(tmpl,json,vOutput,fnInit){
	if(typeof(tmpl)!="string"){
		//is obj
	}else if(tmpl.slice(0,1)=="#"){
		tmpl=this.newInstanceWithId(tmpl);
	}else{
		tmpl=this.newInstanceWithUrl(tmpl);
	}
	return tmpl.parse(tmpl,json,vOutput,fnInit);
}
_$class._parseTmpls=function(blocks){
	for(var i=0,iLen=blocks.length;i<iLen;i++){
		this._parse.apply(this,blocks[i]);
	}
}
/**
 * @para tagBlock: html data block for output, tag attributes: template,target,data,dataType
 */
_$class._parseBlock=function(tagBlock){
	var attribs=["template","target","data","dataType"];
	var para=attribs.associate(attribs.map(function(attribName){
		return tagBlock.getAttribute(attribName);
	}));
	para.text=tagBlock.text;
	if(!para.template||!para.data) return;
	if(para.template.slice(0,1)=="#"){
		var tmpl=this.newInstanceWithId(para.template.slice(1));
	}else{
		var tmpl=this.newInstanceWithUrl(para.template);
	}
	if(!para.target){
		tmpl.setIsOnsiteOutput(true);
		tmpl.setTarget(tagBlock);
	}else if(para.target.slice(0,1)=="#"){
		tmpl.setIsOnsiteOutput(true);
		tmpl.setTarget(Global.dom(para.target).getFirst());
	} 
	var func=para.text?Global.globalEval("(function(){return function(container){"+para.text+"};})()"):"";
	if(para.data.slice(0,1)=="$"){
		var data=Global.globalEval(para.data.middle("${","}",1)); 
		data=para.dataType=="xml"&&Global.xml2json(data)||data;
		tmpl.parse(data,"",func);
	}else{
		Global.get(para.data,"",false,function(data1){
			data1=para.dataType=="xml"&&Global.xml2json(data1)||data1;
			tmpl.parse(data1,"",func);
		},para.dataType||"json");
	}
}
_$class._parseBlocks=function(tagBlocks){
	for(var i=0,iLen=tagBlocks.length;i<iLen;i++){
		this._parseBlock(tagBlocks[i]);
	}
}
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
	}else {
		oOutput=this._target||this._source;
	}
	if(!oOutput){
		return sCode;
	}else if(this._isOnsiteOutput){
		var parser=document.createElement("div");
		var fragment = document.createDocumentFragment();
		parser.innerHTML=sCode;
		while (parser.firstChild) {
			fragment.appendChild(parser.firstChild);
		}
		oOutput.parentNode.replaceChild(fragment, oOutput);
	}else{
		oOutput.innerHTML=sCode;
	}
	if(typeof(fnInit)=="function"){
		fnInit(oOutput);
	}
	return sCode;
}

