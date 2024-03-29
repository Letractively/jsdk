/**
 * Detect browser
 * @file Browser.js
 * @version 1.5
 * @since JSDK3
 * @modifier Liu Denggao
 * @created 2010.6.23
 * @added 2011.5.24
 * @modified 2011.9.21
 */

$package("js.detect.shell");

js.detect.shell.Browser=new function(){
	var Browser=this;
	var ua = navigator.userAgent.toLowerCase(),
		platform = navigator.platform.toLowerCase(),
		UA = ua.match(/(opera|ie|firefox|chrome|maxthon|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
		UA_Engine = ua.match(/(trident|gecko|webkit|presto)[\s\/:]([\w\d\.]+)?/) || [null, 'unknown', 0],
		mode = UA[1] == 'ie' && document.documentMode;
	this.name=(UA[1] == 'version') ? UA[3] : UA[1];
	this.version= mode || parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]);
	this.fullVersion= mode || ((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]);
	this.Platform={
		name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
	};
	this.Engine={ name: UA_Engine[1], version: 0, fullVersion: UA_Engine[2]};
	this.Request = function(){
		return $try(function(){
			return new XMLHttpRequest();
		}, function(){
			return new ActiveXObject('MSXML2.XMLHTTP');
		}, function(){
			return new ActiveXObject('Microsoft.XMLHTTP');
		});
	};
	this.Features={
		xhr: !!(this.Request()),
		xpath: !!(document.evaluate),
		air: !!(window.runtime), 
		query: !!(document.querySelector),
		json: !!(window.JSON)
	};	
	this.Supports={
		modalDialog: !!window.showModalDialog,
		modelessDialog: !!window.showModelessDialog		
	}
	this.Plugins={
		"Flash" : (function(){
			var version = ($try(function(){
				return navigator.plugins['Shockwave Flash'].description;
			}, function(){
				return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
			}) || '0 r0').match(/\d+/g);
			return {
				version: parseFloat(version[0] || '0.' + version[1]) || 0,
				build: parseFloat(version[2]) || 0
			};
		})()
	};
	this.exec = function(window,text){
		if (!text) return text;
		if (window.execScript){
			window.execScript(text);
		} else {
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.text = text;
			window.document.head.appendChild(script);
			window.document.head.removeChild(script);
		}
		return text;
	};
	//-------
	this[Browser.name] = true;
	this[Browser.name + parseFloat(Browser.version)] = true;
	this.Platform[Browser.Platform.name] = true;
	{
		var setEngine = function(name, version){
			Browser.Engine.name = name;
			Browser.Engine[name] = true;
			Browser.Engine[name + parseFloat(version)] = true;
			Browser.Engine.version = parseFloat(version);
			Browser.Engine.fullVersion = version.toString();
		};
		if (Browser.Platform.ios) Browser.Platform.ipod = true;
		if (Browser.ie){
			if(Browser.Engine.name=="unknown") Browser.Engine.name = "trident";
			switch (Browser.version){
				case 6: Browser.Engine.fullVersion="3";break;
				case 7: Browser.Engine.fullVersion="3.1";break;
			}			
		}else if (Browser.firefox){
			if(Browser.Engine.name=="unknown") Browser.Engine.name = "gecko";
			Browser.Engine.fullVersion=(ua.match(/\(.*?[\s\b]*rv\:([\d\.]+)[\s\b]*.*\)/) || [null,"0"])[1];
		}else if (Browser.safari || Browser.chrome){
			if(Browser.Engine.name=="unknown")  Browser.Engine.name = "webkit";
		}else if (Browser.opera){
			if(Browser.Engine.name=="unknown") Browser.Engine.name = "presto";
		}else if (Browser.name == 'unknown'){
			switch ((ua.match(/(?:webkit|khtml|gecko)/) || [])[0]){
				case 'webkit':
				case 'khtml':
					Browser.Engine.name = "webkit";
					break;
				case 'gecko':
					Browser.Engine.name = "gecko";
			}
		}
		setEngine(Browser.Engine.name,Browser.Engine.fullVersion);
	}
}
