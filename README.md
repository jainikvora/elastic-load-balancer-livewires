
## Developed by: ##
* Jainikkumar Vora
* Jvalant Patel
* Utsav Kansara
* Prajakta Naik
* Fareen Magdum

## Project Definition:##
Extended [Node.js HTTP Proxy](https://github.com/nodejitsu/node-http-proxy) by implementing simple proxy as well as elastic load balancer on top of it. Built REST API on top of it to expose and configure the server via RESTful APIs.

### Implemented below features: ###
* **Simple Proxy**
* Forward all incoming request to a target
* Add latency
* **Elastic Load Balancer**
* Load distribution in round robin fashion
* Gzip all the request and response
* Added processing time to the response header
* Added unique request id to for each request in response header

**Version : 1.0**

### How do I setup the application? ###

* Download the code
* Go to the repository and execute below commands
```
#!node.js
$ npm install
$ node app.js
```
###Dependencies###
* [http-proxy](https://github.com/nodejitsu/node-http-proxy)
* [express](http://expressjs.com/)
* [cuid](https://github.com/ericelliott/cuid)
* [body-parser](https://github.com/expressjs/body-parser)
* [compression](https://github.com/expressjs/compression)
