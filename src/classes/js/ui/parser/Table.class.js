/**
 * @file: Table.class.js
 * @version: V1.3 beta
 * @description: HTML表格解析器，解析原始表格数据生成HTML表格代码，用于生成静态的复合表格，比如典型的人员组织结构图。
 * @since: JSDK3 V1.8.1
 * @support: all browsers
 * @author: liu denggao
 * @created: 2012.4.1
 * @modified: 2012.4.5
 * @mail: mestime@tom.com 
 * @homepage: http://www.wunmei.com.cn
 ***************************************/

$package("js.ui.parser");
$import("js.ui.data.TableData");

/**
 * Table Class of public
 * @para database: TableData type
 * @created: 2012.3.27
 * @modified: 2012.3.27
 */
js.ui.parser.Table=function(database){
	this._database;
	this._Table(database);
}

var _$class = js.ui.parser.Table;
var _$proto = _$class.prototype;

with(_$class){
	$name="Table";
	$extends("Object");
	
	//:constructor--------------------------------------------

	prototype._Table=function(database){
		this._database=database;
	}

	//:property--------------------------------------------
	
	prototype.getDatabase=function(){
		return this._database;
	}
	
	//:method--------------------------------------------
	
	prototype.parse=function(){
		var data=this._database.getData();
		var html="",htmlTag="table",htmlAttribs="",htmlBody="";
		htmlAttribs=this._parseTagAttribs(this._database.getAttribsMap()[htmlTag],data.attribs&&data.attribs["table"]);
		if(data.arrangeMode=="row"){
			htmlBody=this._parseRowRange(data.data,true).join("");
		}else if(data.arrangeMode=="column"){
			htmlBody=this._parseColumnRange(data.data,true).join("");
		}	
		html="<"+[].concat(htmlTag,htmlAttribs).join(" ")+">"+htmlBody+"</"+htmlTag+">";
		
		return html;
	}
	prototype._parseRowRange=function(vData,isRootRow){
		var html="",htmlTag="",htmlAttribs={},htmlBody="";
		var rows=[],htmlRows=[];
		rows=Global.is(vData,"Object")&&vData.data||vData;
		for(var i=0;i<rows.length;i++){
			var row=rows[i];
			if(Global.is(row,"Object")){
				if(row.arrangeMode=="row"){
					htmlRows.append(this._parseRowRange(row,isRootRow));
				}else if(row.arrangeMode=="column"){
					htmlRows.append(this._parseColumnRange(row,false,isRootRow));
				}
			}else{
				htmlRows.push(this._parseRow(row,Global.is(vData,"Object")?vData.attribs:null,isRootRow));
			}
		}
		if(isRootRow&&Global.is(vData,"Object")&&vData.attribs&&vData.attribs["range"]){
			htmlTag=this._database.getTagsMap()["range"];
			htmlAttribs=this._parseTagAttribs(this._database.getAttribsMap()[htmlTag],vData.attribs["range"]);
			return html="<"+[].concat(htmlTag,htmlAttribs1).join(" ")+">"+htmlBody+"</"+htmlTag+">";
		}else{
			return htmlRows;
		}
	}
	/**
	 * @description:
	 * @return: 返回已解析的列元素HTML代码
	 */
	prototype._parseColumnRange=function(vData,isRootColumn,isRootRow){
		var columns=[],htmlColumns=[],htmlFullColumn=[];
		columns=Global.is(vData,"Object")&&vData.data||vData;
		for(var i=0;i<columns.length;i++){
			var column=columns[i];
			if(Global.is(column,"Object")){
				if(column.arrangeMode=="row"){
					htmlColumns.push(this._parseRowRange(column,false));
				}else if(column.arrangeMode=="column"){ 
					htmlColumns.push(this._parseColumnRange(column,isRootColumn,false));
				}
			}else{
				var colCells=column,htmlColumn=[];
				for(var k=0,k1=0;k<colCells.length;k++){
					htmlColumn.push(this._parseCell(colCells[k]
							,Global.is(vData,"Object")&&vData.attribs&&vData.attribs["column"]||null));
					var rowspan=colCells[k]&&colCells[k].rowspan||1;
					for(var k2=1;k2<rowspan;k2++){
						htmlColumn.push("");
					}
					k1+=rowspan;
				}
				htmlColumns.push(htmlColumn);
			}
		}
		htmlFullColumn=this._mergeColumns.apply(this,htmlColumns);
		if(isRootRow){ 
			var htmlTag=this._database.getTagsMap()["row"];
			var htmlAttribs=this._parseTagAttribs(this._database.getAttribsMap()[htmlTag]
					,"",Global.is(vData,"Object")&&vData.attribs&&vData.attribs["row"]||null);
			htmlFullColumn=htmlFullColumn.map(function(cell){
				return "<"+[].concat(htmlTag,htmlAttribs).join(" ")+">"+cell+"</"+htmlTag+">";
			});
		}
		return htmlFullColumn;
	}
	/**
	 * @description: 合并多个列，含有已解析过的HTML代码的列。
	 * @created: 2012.4.4
	 */
	prototype._mergeColumns=function(){
		var argsLen=arguments.length;
		var lens=[],rows=[],maxRows=0;
		for(var j=0;j<argsLen;j++){
			lens[j]=arguments[j].length;
		}
		maxRows=Math.max.apply(Math,lens);		
		for(var i=0;i<maxRows;i++){
			for(var j=0;j<argsLen;j++){
				rows[i]=i<rows.length?rows[i]:[];
				rows[i][rows[i].length]=i<arguments[j].length?arguments[j][i]:"";
			}
			rows[i]=rows[i].join("");
		}
		return rows;
	}	
	prototype._parseRow=function(vData,oCommAttribs,isRootRow){
		var html="",htmlTag="",htmlAttribs="",htmlBody="";
		htmlTag=this._database.getTagsMap()["row"];
		htmlBody=vData.map(function(cell){ 
			return this._parseCell(cell,oCommAttribs&&oCommAttribs[isRootRow?"column":"row"]||null);
		},this).join("");
		if(isRootRow){
			htmlAttribs=this._parseTagAttribs(this._database.getAttribsMap()[htmlTag]
					,"",oCommAttribs&&oCommAttribs["row"]||null);		
			html="<"+[].concat(htmlTag,htmlAttribs).join(" ")+">"+htmlBody+"</"+htmlTag+">";
		}else{
			html=htmlBody;
		}

		return html;
	}	
	/**
	 * @created: 2012.3.29
	 * @modified: 2012.4.4
	 */
	prototype._parseCell=function(vData,oCommAttribs){
		var htmlTag="",htmlAttribs=[],htmlBody="";
		htmlTag=oCommAttribs&&oCommAttribs.isHeader?"th":"td";
		htmlTag=vData&&Global.is(vData,"Object")&&vData.isHeader?"th":htmlTag;
		htmlBody=vData&&Global.is(vData,"Object")?vData.text:(""+vData);
		htmlBody=htmlBody||"&nbsp;";
		htmlAttribs=this._parseTagAttribs(this._database.getAttribsMap()["td"],vData,oCommAttribs);
		return "<"+[].concat(htmlTag,htmlAttribs).join(" ")+">"+htmlBody+"</"+htmlTag+">";
	}
	/**
	 * @created: 2012.3.29
	 * @modified: 2012.4.4
	 */
	prototype._parseTagAttribs=function(attribsMap,oAttribs,oCommAttribs){
		var htmlAttribs=[];
		var attribNames=[],tagAttribNames=[];
		var attribNames1=[],attribNames2=[];
		var attribValues1=[],attribValues2=[];
		for(var key in attribsMap){
			if(attribsMap.hasOwnProperty(key)){
				attribNames.push(key);
				tagAttribNames.push(attribsMap[key]);
			}
		}
		if(oAttribs&&Global.is(oAttribs,"Object")){
			attribNames2=attribNames.select(function(item){
				return !!oAttribs[item];
			});
			attribValues2=attribNames2.map(function(item){
				return oAttribs[item];
			});
		}
		if(oCommAttribs){
			attribNames1=attribNames.select(function(item){
				return !!oCommAttribs[item];
			});
			attribNames1=attribNames1.select(function(item){
				return !attribNames2.contains(item);
			});
			attribValues1=attribNames1.map(function(item){
				return oCommAttribs[item];
			});
		}
		htmlAttribs.append(attribNames1.map(function(sName,index){
			return attribsMap[sName]+"=\""+ attribValues1[index]+"\"";
		}),attribNames2.map(function(sName,index){
			return attribsMap[sName]+"=\""+ attribValues2[index]+"\"";
		}));
		/*
		htmlAttribs=[].concat(attribNames1,attribNames2).map(function(item){
			return "@"+attribsMap[item];
		}).associate([].concat(attribValues1,attribValues2));	
		*/
		return htmlAttribs;
	}
}

