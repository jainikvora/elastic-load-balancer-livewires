
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
* **Load distribution in round robin fashion**
* -Distribute the load accross servers using round robin algorithm
* **Gzip all the request and response**
* - Gzip property is used to compress the request and the response. This reduces the bandwidth and reduces the latency.
* **Added processing time to the response header**
* - X-HTTP-Processing-Time = value.
* **Added unique request id to for each request in response header**
* -Generate Unique Id for each request and set in the response header.
* -X-HTTP-request-id:"XYZ"
* **Foward requests to target**
* - forward incoming request to target servers.
* - eg: forward incoming request from Forward  server(port:8000) to Target Server(port:9000)
* **Latency Feature**
* - Implemented the feature to know how much is the delay when request is forwarded from one server to other server.
* **HealthCheck Feature**
* -Implemented the health check feature for loadbalancer.
* -It will continuously ping the server to see if it is up and running. If server response is failed , then loadbalancer discards that server. If the loadbalancer recieves a response from the server it will add the server in the cluster.
* **DataBackup:Using Mongodb**
* -Created a backup of all the servers in document oriented structure.
* -Maintained the backup of gzip, latency values.
* -Maintained the backup of the forward and target servers.
* **ErrorHandling**
* -While proxying a request, if any error is encountered it is handled so as to avoid failure of the application.


**UI**
*Integrated the UI with the backend process.
*Technologies used for UI: Jquery,Ajax,Bootstrap Css, Javascript,EJS.
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
