const Pipedrive = require('pipedrive');
var pipedrive_con = new Pipedrive.Client('6bfe3419d960e014c55a637083114cdf177e3da0', { strictMode: true });


getAllPersons = function(res){
    pipedrive_con.Persons.getAll({}, function(err, persons) {
        if (err) throw err;

    	personArr = []

		for (var i=0 ; i < persons.length; i++) {
			personArr.push({"name":persons[i].name, "id":persons[i].id});
		}

		response =  {"clients": personArr};
        res.json( response )
        res.status(200)
	});
}

	
module.exports = {

    postKey : function(req, res){
    	fetch( 'https://companydomain.pipedrive.com/v1/persons?api_token='+req.body.key ).then( response => {
            if(response.success == true){
                pipedrive_con = new Pipedrive.Client( req.body.key, { strictMode: true } );
                res.status(200)
            }else{
                res.status(404).send({error:"key not found"})
            }
        },
        //onError
        function(response){
            res.status(400).send({error: 'Invalid key'})
        })
	    	
    },
    getClients: function(req, res){
        getAllPersons(res)
    },
    pipedrive: pipedrive_con
};