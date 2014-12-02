var httpProxy = require('http-proxy')
	, commonUtil = require('../util/common')
	, model = require('../model/loadbalancer')
	, connect = require('connect')
	, compression = require('compression')
	, dynamicMiddleware = require('../util/dynamic-middleware');

var proxyApp = connect(),
	dm = dynamicMiddleware(proxyApp, compression({
		threshold: model.getGzipThreshold()
	}));

var proxy = {

	proxyLoadBalancer : function () {

		var startTime = ""
			, proxy = httpProxy.createProxyServer();


		if(model.getGzip() == "true")
		dm.use();

		proxyApp.use(function (req, res) {
				//start time is initialized here...
				startTime = new Date().getTime();
																
				var targetServer = model.getFirstNode();												
				model.setProxyConfig(targetServer);
				console.log('balancing request to --> ', model.getProxyConfig());												 								
				setTimeout(function(){
					proxy.web(req, res, model.getProxyConfig());
				},model.getLatency());
				
				// ...and then the server you just used becomes the last item in the list.
				model.addNode(targetServer);
													
		});

		proxyApp.listen(8021);

		// Add processing time and request id after response is received from the target || "proxyRes" event
		proxy.on('proxyRes', function (proxyRes, req, res) {
			res.setHeader('X-HTTP-request-id', commonUtil.generateRequestId());
			res.setHeader('X-HTTP-Processing-Time', commonUtil.getExecutionTime(startTime, new Date().getTime()));
		})

	},

	setGzipCompression: function() {
		dm.use();
	},

	removeGzipCompression: function() {
		dm.remove();
	}
};


module.exports = proxy;