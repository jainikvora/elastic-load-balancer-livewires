var httpProxy = require('http-proxy'),
	express= require('express'),
	commonUtil = require('../util/common'),
	compression = require('compression'),
	model = require('../model/loadbalancer');

function proxyLoadBalancer() {

var	startTime = "",
	proxy = httpProxy.createProxyServer(),
	proxyApp = express();

	proxyApp.use(compression({
		threshold: model.getGzipThreshold()
	}))

	proxyApp.use(
		// function to write response headers - processing time, request id
		function (req, res, next) {
		    res.oldWriteHead = res.writeHead;

		  	res.writeHead = function(statusCode, headers) {
			    res.setHeader('X-HTTP-request-id', commonUtil.generateRequestId());
			    res.setHeader('X-HTTP-Processing-Time', commonUtil.getExecutionTime(startTime,new Date().getTime()));
		    res.oldWriteHead(statusCode, headers);
			}

		    next();
	 	}, 
	 	function (req, res) {
			startTime = new Date().getTime();
			// On each request, get the first location from the list...
			var target = { target: model.getFirstNode() };

			// ...then proxy to the server whose 'turn' it is...
			console.log('balancing request to: ', target);
			proxy.web(req, res, target);

			// ...and then the server you just used becomes the last item in the list.
			model.addNode(target.target);
		}
	);

	proxyApp.listen(8021);

}

module.exports = new proxyLoadBalancer();