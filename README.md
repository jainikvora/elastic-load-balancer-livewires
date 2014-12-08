
## Developed by: ##
* Jainikkumar Vora
* Jvalant Patel
* Utsav Kansara
* Prajakta Naik
* Fareen Magdum

## Project Definition:##
Extended [Node.js HTTP Proxy](https://github.com/nodejitsu/node-http-proxy) by implementing simple proxy as well as elastic load balancer on top of it. Built REST API on top of it to expose and configure the server via RESTful APIs.

### Implemented below features: ###

* **Elastic Load Balancer**
* **Load distribution in round robin fashion**

 -Distribute the load accross servers using round robin algorithm

* **Gzip all the request and response**

 -Gzip property is used to compress the request and the response. This reduces the bandwidth and reduces the latency. This feature is enabled on comparison with a threshold value.

* **Computes the processing time for each request **
- The processing time for each request is calculated and returned in the response header in the following format:
-X-HTTP-Processing-Time = value.

* **Generation of an unique request id to for each request **

 -Generates an Unique Id for each request and sets it in the response header in the following format.
 -X-HTTP-request-id:"XYZ".

* **Forward requests to target**
 -All the incoming requests are forwarded to target servers.
 -eg: forward incoming request from Forward  server(port:8000) to Target Server(port:9000)

* **Latency Feature**
-Calculates the latency(delay) when request is forwarded from one server to the other server
* **HealthCheck Feature**
 -Implemented the health check feature for loadbalancer.
 -It will continuously ping the server to see if it is up and running. Based on the comparison of the response with the threshold value valid servers are added to and invalid servers are discarded from the server pool.

* **DataBackup:Using Mongodb**

 -Created a backup of all the servers in document oriented structure.
 -Maintained the backup of gzip, latency values.
 -Maintained the backup of the forward and target servers.

* **ErrorHandling**

 -While proxying a request, if any error is encountered it is handled so as to avoid failure of the application.

**User Interface**
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
