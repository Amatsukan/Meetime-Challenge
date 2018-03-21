const Pipedrive = require('pipedrive');
const fetch = require('node-fetch');
var pipedrive_con = {}

getAllPersons = function(res){
    if( pipedrive_con.Persons == undefined ){
        res.status(500).send({error: 'please read the documentation to know how to configure the pipedrive token'})
        return;
    }

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
        //req.body.key = "6bfe3419d960e014c55a637083114cdf177e3da0" minha chave

        if( req.body.key == undefined ){
            res.status(400).send({error: 'Invalid key'})
            return;
        }

        fetch( 'https://companydomain.pipedrive.com/v1/persons?api_token='+req.body.key ).then( response => response.json().then( json => {
                if(json.success == true){
                    pipedrive_con = new Pipedrive.Client( req.body.key, { strictMode: true } );
                    res.status(200).send({status: "ok"})
                }else{
                    pipedrive_con = {}
                    res.status(404).send({error:"key not found"})
                }
            } ).catch({
                function(response){
                    res.status(400).send({error: 'Invalid key'})
                }
            })
        ).catch({
            function(response){
                res.status(400).send({error: 'Invalid key'})
            }
        })
	    	
    },

    getClients: function(req, res){

        if( pipedrive_con == {} ){
            res.status(500).send({error: 'please read the documentation to know how to configure the pipedrive token'})
            return;
        }

        getAllPersons(res)
    },

    pipedrive: pipedrive_con
};