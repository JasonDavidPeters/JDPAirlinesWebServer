var http = require('http');
var PORT = 8080;
var fs = require('fs');
var css = require('./load/Css.js');
var image = require('./load/Image.js');
var route = require('./Routing.js');
var global= require('./util/GlobalVars.js');

function handleResponse(request, response) {
	console.log(request.url);
	console.log(global.webDir);
	
	var cssFile = css.loadCss(request.url);
	if (cssFile != null) {
		response.write(cssFile);
		response.end();
	}
	if ((imageFile = image.loadImage(request.url)) != null) {
		response.write(imageFile);
		response.end();
	}
	route.routeClient(request,response);
}
	/*
		Make a module that checks for css file extension
		and append the website directory before it
	*/
http.createServer(handleResponse).listen(PORT);