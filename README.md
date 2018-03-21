* BACKEND API ROUTES DOCUMENTATION:
    + {HOST}/api/token
        - Method:POST 
            + Description: set pipedrive key to use API. If you do not configure this option this API will always return status 500
                * BodyRequest: 
                    ```json
                    {
                        "key"  : { Pipedrive token : string }
                    }
                    ```
                * Status:
                    * 200 success
                    * 404 pipedrive token not found
    * {HOST}/api/car 
        - Method:POST
            + Description 1: save new car
                * BodyRequest: json object
                ```json
                {
                    "personId"  : { Pipedrive client id : int },
                    "model"     : { Car model : string },
                    "age"       : { Car age : x => { x > 0 && x < 30 } },
                    "color"     : { Car color : x => { x == 'verde' or x == 'branco' or x == 'preto' }}
                }
                ```
                * Status:
                    * 200 success
                    * 404 pipedrive client not found
                    * 400 car information[age|color] is invalid
                    * 500 pipedrive token not configured

            + Description 2: edit a car, wwhen the "carId" key exists, the POST method works in a car editing mode, not in the creation of a new one. 
                * BodyRequest:  json object
                ```json
                {
                    "CarId"     : { Id of an existing car : int },
                    "personId"  : { Pipedrive client },
                    "model"     : { Car model : string },
                    "age"       : { Car age : x => { x > 0 && x < 30 } },
                    "color"     : { Car color : x => { x == 'verde' or x == 'branco' or x == 'preto' }}
                }
                ```
                * Status:
                    * 200 success
                    * 404 pipedrive client or car not found
                    * 400 car information[age|color] is invalid or car is undefined
                    * 500 pipedrive token not configured

        - Method:GET 
            + Description: get a car
                * BodyRequest:  json object
                ```json
                {
                    "CarId"     : { Id of an existing car : int }
                }
                ```
                * Status:
                    * Status:
                    * 200 success
                    * 404 car not found
                    * 500 pipedrive token not configured

        - Method:DELETE 
            + Description: delete a car
                * BodyRequest:  json object
                ```json
                {
                    "CarId"     : { Id of an existing car : int }
                }
                ```
                * Status:
                    * 200 success
                    * 404 car not found
                    * 500 pipedrive token not configured

    + {HOST}/api/cars
        - Method:GET 
            + Description: gets the entire list of registered cars 
                * BodyResponse: json list of cars
                ```json
                
                [ 
                    {
                        "CarId"     : { Id of this car : int },
                        "personId"  : { Car owner : int },
                        "model"     : { Car model : string },
                        "age"       : { Car age : x => { x > 0 && x < 30 } },
                        "color"     : { Car color : x => { x == 'verde' or x == 'branco' or x == 'preto' }}
                    },
                  ...NEXT...
                ]

                ```
                * Status:
                    * 200 success
                    * 500 pipedrive token not configured

    + {HOST}/api/clients
        - Method:GET 
            + Description: delete a car
                * BodyRequest: json object with list of clients
                    ```json
                    { 
                        "clients" : [
                            { "name" : { client name : string } , "id" : { client pipedrive id : int } },
                            {...}
                        ]
                    }
                    ```
                * Status:
                    * 200 success
                    * 500 pipedrive token not configured
                    
