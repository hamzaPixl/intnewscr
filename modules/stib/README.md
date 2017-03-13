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
The new module repspond only for theses routes.

The request that can be send are : 

- /line
        method: 'GET'
        query : {
                line : 'number'
        }
        reqponse : [ { destination: 'BEAULIEU', indice: 17, line: '01\'' },
  { destination: 'BEAULIEU', indice: 17, line: '17\'' },
  { destination: 'HEILIGENBORRE', indice: 17, line: '05\'' },
  { destination: 'HEILIGENBORRE', indice: 17, line: '18\'' } ]


All response are in JSON format.


--Buisness.js

This is the file wo content the logic buisness.
It calls differents external API to get result and give it to the user.

For the lines : http://m.stib.be/stop.php?lang=fr&line=17&stop=4351&iti=2
                http://m.stib.be/stop.php?lang=fr&line=94&stop=5452&iti=2
                http://m.stib.be/stop.php?lang=fr&line=94&stop=5422&iti=2
                http://m.stib.be/stop.php?lang=fr&line=17&stop=4351&iti=2
                http://m.stib.be/stop.php?lang=fr&line=17&stop=4349&iti=2

--Controller.js

This is the controller , he forward the request to the repository
or the buisness if no data are stored.