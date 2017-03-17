Facebook Module ---------------------------

--models

Thes differents models define which format will be used to store data.
It is use to save the token , this module will be used only by admin or in core. No interacto between this module
and the Front end.

--config.json

This file content all dependencies that the module need.
It contains services and confuration definitions.
The configuration definition is used to check the configuration value.
The services are used in the Buisness file.

--Main.js

This file contains the configuration of all routes for the module.
The new module repspond only for theses routes.

The request that can be send are : 

- /token
        method: 'GET'

All response are in JSON format.


--Buisness.js

This is the file wo content the logic buisness.
It calls differents external API to get result and give it to the user.

We use the API Graph from facebook 
to retrieve the acces data we use the device login from facebook

--Controller.js

This is the controller , he forward the request to the repository
or the buisness if no data are stored.

The Facebook module use env in process to set the client Token and the App id.