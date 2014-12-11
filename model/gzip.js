/**
 * Created by Jainik on 11/27/2014.
 */
var dbOperations = require('./db-operations')
    , repository = require("../data/repository")
    , proxy = require('../servers/loadbalancer-server');

var model =  {
    setGzip: function(value) {
        //if(repository.gzip != value) {
            repository.gzip = value;
            dbOperations.setGzip(value);
            if(value == "true")
                proxy.setGzipCompression();
            else
                proxy.removeGzipCompression();
        //}
    },

    getGzip: function(){
        return repository.gzip;
    }
};



module.exports = model;