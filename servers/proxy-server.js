var httpProxy = require('http-proxy'),
	express= require('express'),
	repository = require('../data/repository'),
	model = require('../model/proxy')

function proxy() {
	proxy = httpProxy.createProxyServer(),
	proxyApp = express();

	proxyApp.use(
	 	function (req, res) {
	 		setTimeout(function(){
				proxy.web(req,res,model.getProxyConfig());
			},model.getLatency());
		}
	);
	proxyApp.listen(3000);
}

module.exports = new proxy();