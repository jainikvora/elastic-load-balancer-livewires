require('./servers/server-pool')
require('./servers/api-server')
require('./servers/loadbalancer-server').proxyLoadBalancer()
require('./util/mongodbUtil.js').createConnection()