/**
 * Created by Jainik on 11/27/2014.
 */
proxy = require('../servers/loadbalancer-server');

var model =  {
    setGzip: function(value) {
        if(repository.gzip != value)
        {
            repository.gzip = value;
            console.log(value);
            if(value == "true")
                proxy.setGzipCompression();
            else
                proxy.removeGzipCompression();
        }
    }
};

module.exports = model;