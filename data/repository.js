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
			    "menu_index" : "4",
			    "menu_name" : "View Node Status" ,
			    "menu_url" : "/loadbalancer/showallservers"
			},

            {"menu_location" : "left",
                "menu_index" : "1",
                "menu_name" : "Add Node" ,
                "menu_url" : "/loadbalancer/nodes/add"
            },

            {"menu_location" : "left",
                "menu_index" : "2",
                "menu_name" : "Remove Node" ,
                "menu_url" : "/loadbalancer/nodes/delete"
            },
            
            {
                "menu_location" : "left",
                "menu_index" : "7",
                "menu_name" : "Healthcheck" ,
                "menu_url" : "/healthcheck"
            },

            {"menu_location" : "left",
                "menu_index" : "3",
                "menu_name" : "Gzip" ,
                "menu_url" : "/loadbalancer/gzip/threshold"
            },            

            {
                "menu_location" : "left",
                "menu_index" : "5",
                "menu_name" : "Forward Node" ,
                "menu_url" : "/loadbalancer/forward"
            },

            {
                "menu_location" : "left",
                "menu_index" : "6",
                "menu_name" : "Latency" ,
                "menu_url" : "/loadbalancer/latency"
            }                       

        ],


    this.user = [{
        "username" : "admin",
        "password" : "admin"
    }],
    
    this.aboutUs = [
    {
    	
    	"path" : "../images/jainik.jpg",
    	"name" : "Jainik Vora",
    	"currentWork" : "Graduate Student at San Jose State University",
    	"someInfo" : "<font style='color:black'><b>Study</b><br>Bachelors of Technology in Computer Engineering<br><b>Experience</b><br>SYSTEMS ENGINEER at TATA CONSULTANCY SERVICES<font>",
    	"linkedinurl" : "https://www.linkedin.com/pub/jainik-vora/25/323/694"
    	
    },
    
    {
    	
    	"path" : "../images/jvalant.jpg",
    	"name" : "Jvalant Patel",
    	"currentWork" : "Graduate Student at San Jose State University",
    	"someInfo" : "<font style='color:black'><b>Study</b><br>Bachelors of Technology in Computer Engineering<br><b>Experience</b><br>SYSTEMS ENGINEER at TATA CONSULTANCY SERVICES<font>",
    	"linkedinurl" : "https://www.linkedin.com/pub/jvalant-patel/74/441/365"
    	
    },
    
    {
    	
    	"path" : "../images/utsav.jpg",
    	"name" : "Utsav Kansara",
    	"currentWork" : "Graduate Student at San Jose State University",
    	"someInfo" : "<font style='color:black'><b>Study</b><br>Bachelors of Technology in Computer Engineering<br><b>Experience</b><br>SOFTWARE ENGINEER at TATA CONSULTANCY SERVICES<font>",
    	"linkedinurl" : "https://www.linkedin.com/pub/utsav-kansara/41/400/472/"
    	
    },
    
    {
    	
    	"path" : "../images/prajakta.jpg",
    	"name" : "Prajakta Naik",
    	"currentWork" : "Graduate Student at San Jose State University",
    	"someInfo" : "<font style='color:black'><b>Study</b><br>Bachelors of Technology in Computer Engineering<br><b>Experience</b><br>WEB DEVELOPER at RAKUTEN<font>",
    	"linkedinurl" : "https://www.linkedin.com/pub/prajakta-naik/49/27b/249"
    	
    },
    
    {
    	
    	"path" : "../images/fareen.jpg",
    	"name" : "Fareen Magdum",
    	"currentWork" : "Graduate Student at San Jose State University",
    	"someInfo" : "<font style='color:black'><b>Study</b><br>Bachelors of Engineering<br><b>Experience</b><br>JUNIOR ASSOCIATE at SYNECHRON<font>",
    	"linkedinurl" : "https://www.linkedin.com/pub/fareen-magdum/47/245/286"
    	
    }
    
    
    
    
    
    
    ]
}

module.exports = new AddressRepo();