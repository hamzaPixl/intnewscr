News Module ---------------------------

--models

Thes differents models define which format will be used to store data.


--config.json

This file content all dependencies that the module need.
It contains services and confuration definitions.
The configuration definition is used to check the configuration value.
The services are used in the Buisness file.

--Main.js

This file contains the configuration of all routes for the module.
The weather module repspond only for theses routes.

The request that can be send are : 

- /weather
        method: 'GET'
        response: {"id":"2017-03-08","created":1489049070584,"ttl":14400,"model":"weather","date":"2017-03-08","day":"Wednesday","max":"10","min":"8","precip":"","description":"Cloudy"}


All response are in JSON format.


--Buisness.js

This is the file wo content the logic buisness.
It calls differents external API to get result and give it to the user.

We use the weather library more info on this link : https://www.npmjs.com/package/weather-js

--Controller.js

This is the controller , he forward the request to the repository
or the buisness if no data are stored.