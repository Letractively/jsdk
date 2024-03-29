/**
 * Detect Operate System for current runtime environment
 * @file OS.js
 * @version 1.0
 * @since JSDK3 
 * @author Liu Denggao
 * @created 2010.06.23
 * @added 2011.5.23
 */

$package("js.detect.shell");

js.detect.shell.OS=new function() {
	var sUserAgent = navigator.userAgent;
	var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
	var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC");
	var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
	var isWin98 = isWinNT4 = isWin2K = isWinME = isWinXP = isWin2K3 = false;
	var isWinVista = isWin7 = false;
	var isSunOS = false;

	if(isWin){
		isWin98 = sUserAgent.indexOf("Win98") > -1 || sUserAgent.indexOf("Windows 98") > -1;
		isWinME = sUserAgent.indexOf("Win 9x 4.90") > -1 || sUserAgent.indexOf("Windows ME") > -1;
		isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
		isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
		isWin2K3 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
		isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
		isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;		
	}

	if(isUnix){
		isSunOS = sUserAgent.indexOf("SunOS") > -1;
	}

	this.isWin=isWin;
	this.isWin98=isWin98;
	this.isWinME=isWinME;
	this.isWin2K=isWin2K;
	this.isWinXP=isWinXP;
	this.isWin2K3=isWin2K3;
	this.isWinVista=isWinVista;
	this.isWin7=isWin7;
	this.isMac=isMac;
	this.isUnix=isUnix;
	this.isSunOS=isSunOS;
}

