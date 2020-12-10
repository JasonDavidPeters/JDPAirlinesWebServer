var fs = require('fs');	
var dir;
var global = require("../util/GlobalVars.js");

	function checkImage(url) {
		// check url for .css extension
		if (url != null && url.includes(".png") || url.includes(".jpg")) {
			var start = 0;
			var end = url.indexOf('.');
			dir = global.webDir+url;
			return true;
		} else {
			return false;
		}
		return false;
	}
	function loadImage(url) { // Take in a string url, return a readfilestream
		var imageFile;
		if (checkImage(url)) { // html is requesting local css in header but cannot find it at /css/...etc because thats not a server directory
			imageFile = fs.readFileSync(dir); // we find the directory of the css file and send it back to the html head
			return imageFile; // write the response to the request which is the html header <link>
		}
		return null;
	}
module.exports={checkImage, dir, loadImage};