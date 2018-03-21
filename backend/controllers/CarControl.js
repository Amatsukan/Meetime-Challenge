var pipedrive_con = require('../controllers/Pipedrive.js');
var validColors = ["preto","branco","verde"];

var cars = [];

validateCar = function(car, errorMsg){
	var colorOk = false;

	for (var i=0; i<validColors.length; i++) {
		if( car.color == validColors[i] )
			colorOk = true;
	};

	if(!colorOk){
		errorMsg.str = "only black, green or white cars are accepted. Values: [\"preto\",\"branco\",\"verde\"]"
	}

	var ageOk = car.age < 30;
	if(!ageOk){
		errorMsg.str = "only cars under the age of 30 are allowed"
	}

	return colorOk && ageOk;
}

saveOrEditCar = function(car, errorMsg){
	if( validateCar(car, errorMsg)){
        if( car.editId != undefined ){
            if(car.editId in cars){
                cars[ car.editId ] = car;
            }
            else{
                errorMsg.str = "There is no car with carId="+car.editId
                return false;
            }
        }
        else{
            lastCar = cars.slice(-1).pop()
            if(lastCar == undefined)
                car.carId = 0
            else{
                lastId = lastCar.carId
                car.carId = ++lastId
            }

		    cars[car.carId]=car;
        }
        return true;
    } else{
        return false;
    }
};

module.exports = {

    getCar : function(req, res){
        
        if( pipedrive_con.pipedrive == {} ){
            res.status(500).send({error: 'please read the documentation to know how to configure the pipedrive token'})
            return;
        }

        carId = req.query['id']
    	if( carId == undefined ){
    		res.status(400).send({Error: "invalid car id"})
            return
    	}else if( carId in cars ){
    		res.json( cars[carId] ).status(200)
            return
    	}else{
	    	res.status(404).send({error: 'Inexistent car'})
            return
        }
    },

    getCars : function(req, res){
        res.status(200)
    	res.json(cars);
    },

    postCar : function(req, res){
        if( pipedrive_con.pipedrive == {} ){
            res.status(500).send({error: 'please read the documentation to know how to configure the pipedrive token'})
            return;
        }

        pipedrive_con.pipedrive.Persons.getAll({}, function(err, persons) {
        	var errorMsg = { str : "" };
        	var validPerson = false;
            var o = 0
            for (var i=0 ; i < persons.length; i++) {
                if (req.body.personId == persons[i].id)
                    validPerson = true;
            }
        	if( !validPerson ){
                res.status(404).send({error: "The is no personId="+req.body.personId+" in database"})
            }
            else if( saveOrEditCar( req.body, errorMsg ) ){
            	res.status(200).send({status: "ok"})
            }else{
                console.log(errorMsg)
            	res.status(400).send({error: errorMsg.str})
            }
        })
    },

    deleteCar : function(req, res){
        if( pipedrive_con.pipedrive == {} ){
            res.status(500).send({error: 'please read the documentation to know how to configure the pipedrive token'})
            return;
        }
        if( req.body.carId in cars[req.body.carId] && car.carId != undefined ){
    		delete cars[req.body.carId]
    		res.status(200)
    	}else
	    	res.status(404).send({error: 'there is no car whit id='+req.body.carId})
    }
}


