/**
 * @created: 2011.9.28
 */
function(Engine,Browser,window,rootHome){
	_jsre._ce.addNamespace("global",{STR_NewLine:"\n"},true);
	_jsre.globalEval(rootHome+"/patch/patch-IE.js"));
	_jsre.globalEval(rootHome+"/patch/iscroll.js"));
	js.dom.DOMWindow.applyInstance(window,"copy",true);
	js.dom.HTMLDocument.applyInstance(window.document,"copy",true);
}