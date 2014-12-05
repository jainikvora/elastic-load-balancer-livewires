var http = require('http'),
	util = require('util'),
	logger = require('../util/logger');


function serverRepository() {
	http.createServer(function (req, res) {
		logger.debug("request served by localhost:8000")
		res.writeHead(200, { 'Content-Type': 'text/plain' });
	    res.write('request served by localhost:8000'+ '\n' + JSON.stringify(req.headers, true, 2));
	    res.end();
	}).listen(8000);

	http.createServer(function (req, res) {
		logger.debug("request served by localhost:8001")
	    res.writeHead(200, { 'Content-Type': 'text/plain' });
	    res.write('request served by localhost:8001'+ '\n' + JSON.stringify(req.headers, true, 2));
	    res.end();
	}).listen(8001);	


	//
	// Target Http Server
	//
	http.createServer(function (req, res) {
	  util.puts('target is:9006 ' + req.url);
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.write('request successfully proxied to:9006 ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
	  res.end();
	}).listen(9006);

	//
	// Target Http Server
	//
	http.createServer(function (req, res) {
	  util.puts('target is:9007 ' + req.url);
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.write('request successfully proxied to:9007 ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
	  res.end();
	}).listen(9007);

	//
	// Target Http Forwarding Server
	//
	http.createServer(function (req, res) {
	  util.puts('forward is 9000' + req.url);
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.write('request successfully forwarded to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
	  res.end();
	}).listen(9000);

	//
	// Target Http Forwarding Server
	//
	http.createServer(function (req, res) {
	  util.puts('forward is 9002' + req.url);
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.write('request successfully forwarded to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
	  res.end();
	}).listen(9002);

	//
	// Target Http Forwarding Server
	//
	http.createServer(function (req, res) {
	  util.puts('forward is 9003' + req.url);
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.write('request successfully forwarded to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
	  res.end();
	}).listen(9003);




}

module.exports = new serverRepository();