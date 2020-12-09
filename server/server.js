var http = require('http');
var PORT = 8080;
var fs = require('fs');
var css = require('./Css.js');
var route = require('./Routing.js');


function handleResponse(request, response) {
	var cssFile = css.loadCss(request.url);
	if (cssFile != null) {
		response.write(cssFile);
		response.end();
	}
	route.routeClient(request,response);
}
	/*
		Make a module that checks for css file extension
		and append the website directory before it
	*/
http.createServer(handleResponse).listen(PORT);