/**
 * @file: SelectDialogBox.class.js
 * @version: V6 Beta
 * @description: 搜索语法中可含有关键字“|”和“(空格)”，分别表示“或”和“与”，且或的优先级大于与。中间通过空格分开。
 * @since: JSDK3 V1.6.0
 * @support: IE6+, Firefox 5+, Chrome 14+, Safari 5+, Opera 11.11+
 * @author: liu denggao
 * @created: 2011.10.12
 * @modified: 2012.5.9
 * @mail: mestime@tom.com 
 * @homepage: http://www.wunmei.com.cn
 ***************************************/

$package("js.ui");

/**
 * SelectDialogBox Class of public
 * @created: 2011.10.12
 * @modified: 2011.10.12
 */
js.ui.SelectDialogBox=function(){}

var _$class = js.ui.SelectDialogBox;

with(_$class){
	$name="SelectDialogBox";
	$extends("Object");
	_$class._styleLib={
		"std" : Engine.runtimeEnvironment.getResPath("js.ui")
					+"/SelectDialogBox/"+(Browser.Engine.trident&&document.compatMode!="CSS1Compat"?"std.IE.css":"std.css")
	}
	_$class._styleSkin="std";
	
	//:method--------------------------------------------
	
	/**
	 * method show(sURL,vArguments,oOptions,oFeatures,fnCallBack)
	 * @para oDspTexts:
		{
			title:
			tips:
			category:
			view:
			data:
			result:
			memo: 
			button: {
				OK: optional
				Cancel: optional
			}
		}
	 * @para oPara:
		{
			opener: Object. current window object.
			icon: Object. name and image url.
			isMultiple: Boolean, is allow multiple value. default is false.
			hasCategory: Boolean, view data if has category. default is false.
			hasChildItem: Boolean, view data list item if has child item. The property added since version 3.0. default is false.
			hasChildData: Boolean,view data list item if has child data. default is false.
			defaultCategory: String, default category item.
			pathSeparator: path separator. use when has child item.
			cateDspMode: Number, default is 0. Display mode of category: 0, collapse; 1, tile
			viewDspMode: Number, default is 0. Display mode of view: 0, tile; 1, tree
			dspData: Boolean, is display data area.
			dspResult: Boolean, is display result area.
		}
	 * @para oViewData: OptionValues
	 * @para vValues: 
	 * @para fnGetItemData: fnGetItemData(category,path,item,index)
		(1)when: hasChildItem=true
			return: array=[vData,aChildren]. eg. "["",["abc","def"]]", "[["andy","rain"],{text: abc, value: a}]"
				1)vData: item data. Maybe array or string.
				2)aChildren: array or other.
		(2)when: hasChildItem=false
			return: array or other, as item data. eg. "["liu","zhang|z","li"]", ""liudenggao|ldg""
	 * @para fnCallBack: fnCallBack(wDialog,vReturnValue)
	 */
	addMethod(true,true,"show",function(oDspTexts,oPara,oViewData,vValues,fnGetItemData,fnCallBack){
		var _minCellWidth=100;
		var _minHeight=50;
		var pageName=(Global.Browser.Platform.ios?"index_for_ipad.htm":"index.htm")
							+"?seq="+(new js.lang.natives.Date()).getMilliseconds();
		oPara.opener=window;
		if(!oPara.icon){
			oPara.icon={}
		}
		if(oPara.cateDspMode==undefined){
			oPara.cateDspMode=0;
		}
		if(oPara.viewDspMode==undefined){
			oPara.viewDspMode=0;
		}
		//-----------
		if(Global.Browser.Platform.ios){
			pageName="index_for_ipad.htm";
		}else if(oPara.viewDspMode==0){
			if(Global.Browser.Engine.trident&&Global.Browser.Engine.version<=3){
				pageName="index_for_IE.htm";
			}else{
				pageName="index.htm";
			}
		}else {
			if(Global.Browser.Engine.trident&&Global.Browser.Engine.version<=3){
				pageName="index_tree_for_IE.htm";
			}else{
				pageName="index_tree.htm";
			}
		}
		pageName+="?seq="+(new js.lang.natives.Date()).getMilliseconds();
		var ret=window.$showModalDialog(
				Engine.runtimeEnvironment.getResPath("js.ui")+"/SelectDialogBox/"+pageName
				,{
					engineDir: Engine.runtimeEnvironment.getRootPath(),
					opener: window,
					oDspTexts: function(){
						if(!oDspTexts.button){
							oDspTexts.button={
								OK: "OK",
								Cancel: "Cancel"
							}
						}
						return oDspTexts;
					}(),
					oPara: oPara,
					oViewData: oViewData,
					vValues: vValues,
					fnGetItemData: fnGetItemData
				},"dialogWidth=650px;dialogHeight=450px;status:no",
			fnCallBack);
		return ret;
	});
	addMethod(true,true,"addStyleSkin",function(sName,sPath){
		this._styleLib[sName]=sPath;
	});	
}

