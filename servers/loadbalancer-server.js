var httpProxy = require('http-proxy'),
	http = require('http'),
	commonUtil = require('../util/common'),
	model = require('../model/loadbalancer');

function proxyLoadBalancer() {

	var	startTime = "",
		proxy = httpProxy.createProxyServer();
	http.createServer( function (req, res) {
			startTime = new Date().getTime();
			// On each request, get the first location from the list...
			var target = { target: model.getFirstNode() };

			// ...then proxy to the server whose 'turn' it is...
			console.log('balancing request to: ', target);
			proxy.web(req, res, target);

			// ...and then the server you just used becomes the last item in the list.
			model.addNode(target.target);
		}
	).listen(8021);

	// Add processing time and request id after response is received from the target || "proxyRes" event
	proxy.on('proxyRes', function(proxyRes, req, res) {
		res.setHeader('X-HTTP-request-id', commonUtil.generateRequestId());
		res.setHeader('X-HTTP-Processing-Time', commonUtil.getExecutionTime(startTime,new Date().getTime()));
	})

}

module.exports = new proxyLoadBalancer();