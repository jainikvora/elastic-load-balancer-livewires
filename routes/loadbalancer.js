var express = require('express')
	, router = express.Router()
	, model = require('../model/loadbalancer')
	, gzipModel = require('../model/gzip');

router.route('/nodes/:action')
	.post(function(req,res){
		var action = req.params.action;
		var address = req.body;

		if(action === "add")
		 {
			if(!model.checkNodeExists(address)) 
			{
				model.addNode(address);
				res.status(200).json({'message':'success'});
			}
			 else
			{
				res.status(200).json({'message':'failure','description':'Given node already exists in the repository '})
			}
			
		} else if(action === "delete")
		 {
			if(model.checkNodeExists(address)) 
			{
				model.deleteNode(address);
				res.status(200).json({'message':'success'});
			} 
			else
			 {
				res.status(200).json({'message':'failure','description':'Given node not found in the repository'}); 
			}

		} 
		else
		 {
			res.status(400).json({'message':'error','description':'The action requested  cannot be performed'});
		    req.on('error', function(e) 
		    {
              console.log(' There exists some problem with request: ' + e.message);
            });
		}

	

	});

	function error(err, req, res, next) {
  
       console.error(err.stack);

  
          res.send(500);
       }

router.route('/nodes')
	.get(function(req,res)
	{
		
		res.status(200).json({'message':'success','data':{'nodes':model.getNodes()}});
	    res.on('error', function(e)
	     {
        console.log("Got error: " + e.message);
     });

	});
	

router.route('/gzip/threshold/:value')
	.post(function(req,res){
		if(req.params.value)
	    {
		model.updateGzipThreshold(req.params.value);

		console.log("New Threshold Value: "+ req.params.value);
		res.status(200).json({'message':'success'});
	   }

	   else

	   {
	   	res.status(400).json({'message':'error','description':'The action requested cannot be performed'});
	   	req.on('error', function(e) 
	   	{
              console.log('There exists some problem with request: ' + e.message);

         });

	   }
	});


router.route('/gzip/threshold')
	.get(function(req,res)
	{
		res.status(200).json({'message':'success','data': {'threshold-val':model.getGzipThreshold()}});
		res.on('error', function(e) 
		{
        console.log("Error : " + e.message);
     });

	});

router.route('/gzip')
	.get(function(req,res)
	{
		res.status(200).json({'message':'success','data': {'gzip-enabled':model.getGzip()}});
		res.on('error', function(e) 
		{
        console.log("Error : " + e.message);
     });

	});

router.route('/gzip/:value')
	.post(function(req,res){
			gzipModel.setGzip(req.params.value);
		console.log("Gzip value: "+ req.params.value);
		res.status(200).json({'message':'success'});
		
	});


router.route('/forward/:action')
.post(function(req,res){
	var address = req.body;
	var action = req.params.action;
	if(action=="set"){	
		if(address)
		 {			
				model.updateForward(address);
				res.status(200).json({'message':'success'});			
			
		} 
		else
		 {
			res.status(400).json({'message':'error'},{'description':'Sorry! action cannot be performed'});
			req.on('error', function(e)
			 {
              console.log('There is a problem with request: ' + e.message);
            });
		}
	
	}else if(action=="remove")
	{

		if(address)
		{

			model.deleteForward();
			res.status(200).json({'message':'success'});			
		}
		 else 
		 {
			res.status(400).json({'message':'success'},{'description':'Sorry! action  cannot be performed'});		 
		}
		
	}
	else 
	{
		res.status(400).json({'message':'error','description':'Sorry! action  cannot be performed '});
		req.on('error', function(e) 
		{
              console.log('There is a problem with request: ' + e.message);
            });
	}
		
});

router.route('/forward')
.get(function(req, res) {
	res.status(200).json({'message':'success','data':model.getForward()});
     res.on('error', function(e) 
     {
        console.log("Error : " + e.message);
     });
	

});




router.route('/latency/:value')
.post(function(req,res){
	if(req.params.value) {
		model.updateLatency(req.params.value);
		res.status(200).json({'message':'success'});
	} 
	else
	 {
		res.status(400).json({'message':'error'},{'description':'Sorry action  cannot be performed'});
		res.on('error', function(e) 
		{
        console.log("Error : " + e.message);
     });
	}
});

router.route('/latency')
.get(function(req,res){
	res.status(200).json({'message':'success','data':{'latency-val':model.getLatency()}});

    res.on('error', function(e)
     {
        console.log("Error : " + e.message);
     });
});

module.exports = router