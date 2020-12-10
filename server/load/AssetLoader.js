var fs = require('fs');	
var dir;
var global = require("../util/GlobalVars.js");

	function checkFileExtension(url) {
		if (url != null && url.includes(".")) {
			var start = 0;
			var end = url.indexOf('.');
			dir = global.webDir+url;
			return true;
		} else {
			return false;
		}
		return false;
	}
	function loadFile(url) { // Take in a string url, return a readfilestream
		var file;
		if (checkFileExtension(url)) { // html is requesting local css in header but cannot find it at /css/...etc because thats not a server directory
			file = fs.readFileSync(dir, null, function(error, data) {
				if (error)  {
					console.log('Error loading file');
					return null; 
				}
			}); // we find the directory of the css file and send it back to the html head
			return file;
			//return file; // write the response to the request which is the html header <link>
		}
		return null;
	}
module.exports={checkFileExtension, loadFile};