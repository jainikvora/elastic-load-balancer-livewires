function AddressRepo() {
	this.addresses = [];

	this.gzipThreshold = 0;

	this.gzip = "true";

	this.proxyConfig = [];

	this.latency = 0;

    this.healthCheckConfig = {};

    this.healthCheckInfo = [];

    this.menu =
        [

            {"menu_location" : "left",
                "menu_index" : "1",
                "menu_name" : "Add Node" ,
                "menu_url" : "/loadbalancer/nodes/add"
            },

            {"menu_location" : "left",
                "menu_index" : "2",
                "menu_name" : "Delete Node" ,
                "menu_url" : "/loadbalancer/nodes/delete"
            },

            {"menu_location" : "left",
                "menu_index" : "3",
                "menu_name" : "Set Gzip" ,
                "menu_url" : "/loadbalancer/gzip/threshold"
            },

            {"menu_location" : "left",
                "menu_index" : "4",
                "menu_name" : "View Nodes" ,
                "menu_url" : "/loadbalancer/showallservers"
            },

            {
                "menu_location" : "left",
                "menu_index" : "5",
                "menu_name" : "Set Forward" ,
                "menu_url" : "/loadbalancer/forward"
            },

            {
                "menu_location" : "left",
                "menu_index" : "6",
                "menu_name" : "Set Latency" ,
                "menu_url" : "/loadbalancer/latency"
            },
            
            {
                "menu_location" : "left",
                "menu_index" : "7",
                "menu_name" : "Healthcheck" ,
                "menu_url" : "/healthcheck"
            }

        ],


    this.user = [{
        "username" : "admin",
        "password" : "admin"
    }]
}

module.exports = new AddressRepo();