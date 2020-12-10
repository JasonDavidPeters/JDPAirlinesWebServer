var fs = require('fs');	
var dir;
var global = require("../util/GlobalVars.js");

	function checkCss(url) {
		// check url for .css extension
		if (url != null && url.includes(".css")) {
			var start = 0;
			var end = url.indexOf('.');
			dir = global.webDir+url;
			return true;
		} else {
			return false;
		}
		return false;
	}
	function loadCss(url) { // Take in a string url, return a readfilestream
		var cssFile;
		if (checkCss(url)) { // html is requesting local css in header but cannot find it at /css/...etc because thats not a server directory
			cssFile = fs.readFileSync(dir); // we find the directory of the css file and send it back to the html head
			return cssFile; // write the response to the request which is the html header <link>
		}
		return null;
	}
module.exports={checkCss, loadCss};