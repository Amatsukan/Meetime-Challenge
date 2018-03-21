API ROUTES:
 * {HOST}/api/car 
 	- Method:POST 
 		Description1: save new car 
 		BodyRequest: 
		{
			"personId"	: { Pipedrive client id },
			"model"		: { Car model : string },
			"age"		: { Car age : x => { x > 0 && x < 30 } },
			"color"		: { Car color : x => { x == 'verde' or x == 'branco' or x == 'preto' }}
		}

		Description2: edit car, wwhen the "carId" key exists, the POST method works in a car editing mode, not in the creation of a new one. 
 		BodyRequest: 
		{
			"CarId" 	: { Id of an existing car : int },
			"personId" 	: { Pipedrive client id },
			"model" 	: { Car model : string },
			"age" 		: { Car age : x => { x > 0 && x < 30 } },
			"color" 	: { Car color : x => { x == 'verde' or x == 'branco' or x == 'preto' }}
		}
	- Method:GET 
 		Description: save new car 
 		BodyRequest: 
		{
			"personId": { Pipedrive client id },
			"model": { Car model : string },
			"age": { Car age : x => { x > 0 && x < 30 } },
			"color": { Car color : x => { x == 'verde' or x == 'branco' or x == 'preto' }}
		}
	- Method:DELETE 
 		Description: save new car 
 		BodyRequest: 
		{
			"personId": { Pipedrive client id },
			"model": { Car model : string },
			"age": { Car age : x => { x > 0 && x < 30 } },
			"color": { Car color : x => { x == 'verde' or x == 'branco' or x == 'preto' }}
		}




 router.route('/car').get(car_con.getCar)
	.post(car_con.postCar)
    .delete(car_con.deleteCar);

router.route('/cars').get(car_con.getCars);

router.route('/token').post(pipedrive_con.postKey);
router.route('/clients').get(pipedrive_con.getClients);
