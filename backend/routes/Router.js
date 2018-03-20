var express = require('express');
var pipedrive_con = require('../controllers/Pipedrive.js');
var car_con = require('../controllers/CarControl.js');

var router = express.Router();

router.route('/car').get(car_con.getCar)
	.post(car_con.postCar)
    .delete(car_con.deleteCar);

router.route('/cars').get(car_con.getCars);

router.route('/token').post(pipedrive_con.postKey);
router.route('/clients').get(pipedrive_con.getClients);


module.exports=router