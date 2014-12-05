var httpProxy = require('http-proxy')
	, commonUtil = require('../util/common')
	, model = require('../model/loadbalancer')
	, connect = require('connect')
	, compression = require('compression')
	, dynamicMiddleware = require('../util/dynamic-middleware')
	, logger = require('../util/logger')
	, util = require('util')
	, colors = require('colors');

var proxyApp = connect(),
	dm = dynamicMiddleware(proxyApp, compression({
		threshold: model.getGzipThreshold()
	}));

var proxy = {

	proxyLoadBalancer : function () {

		  var log = ""
			, startTime = ""
			, proxy = httpProxy.createProxyServer();

		if(model.getGzip() == "true")
		dm.use();

		proxyApp.use(function (req, res) {
			
			var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			log += "RECEIVED REQUEST INFO :: Request origin : " + ip ;

			startTime = new Date().getTime();
			var targetServer = model.getFirstNode();
			model.setProxyConfig(targetServer);
			log+=  " , Request target : hostname => "+ targetServer.host + " , port => "+ targetServer.port;

			setTimeout(function(){
				proxy.web(req, res, model.getProxyConfig());
			},model.getLatency());

			model.addNode(targetServer);
		});

		proxyApp.listen(8021);
		util.puts('Load Balancer '.blue + 'started '.green.bold + 'on port '.blue + '8021 '.yellow);

		// Add processing time and request id after response is received from the target || "proxyRes" event
		proxy.on('proxyRes', function (proxyRes, req, res) {
			var requestId = commonUtil.generateRequestId()
			  , processingTime = commonUtil.getExecutionTime(startTime, new Date().getTime());
			
			res.setHeader('X-HTTP-request-id', requestId);
			res.setHeader('X-HTTP-Processing-Time', processingTime);

			log+= " , Request ID : "+ requestId +" , Processing Time : "+ processingTime + " ms";
			logger.info(log);
			log="";
		})

		proxy.on('error', function (err, req, res) {
			res.writeHead(500, {
				'Content-Type': 'text/plain'
			});
			res.end('Something went Wrong, we are working to get it fixed.');
		});

	},

	setGzipCompression: function() {
		dm.use();
	},

	removeGzipCompression: function() {
		dm.remove();
	}
};


module.exports = proxy;