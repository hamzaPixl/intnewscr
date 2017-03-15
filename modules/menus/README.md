Menus Module ---------------------------

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

- /menus
        method: 'GET'
        query : {
            'source' : 'baraoupe'
        }
        response: [{"id":"Lundi","created":1489588951768,"ttl":14400,"model":"menus","source":"barasoupe","suggestion":"Sauce poulet et boursin","soupe":"Minestrone vert & Bettes"},{"id":"Mardi","created":1489588951769,"ttl":14400,"model":"menus","source":"barasoupe","suggestion":"Sauce poireaux","soupe":"Panais et patates douces & Pourpiers d’hiver"},{"id":"Jeudi","created":1489588951769,"ttl":14400,"model":"menus","source":"barasoupe","suggestion":"Sauce tomate, lard et curry","soupe":"Brocolis et boursin & Pois cassés"},{"id":"Vendredi","created":1489588951769,"ttl":14400,"model":"menus","source":"barasoupe","suggestion":"Sauce arrabiatta","soupe":"Navets et parmesan & Butternuts"}]

All response are in JSON format.


--Buisness.js

This is the file wo content the logic buisness.
It calls differents external API to get result and give it to the user.

To get The bar à soupe information we use this website : http://la-passerelle.eu/lebarasoupe/commander/

--Controller.js

This is the controller , he forward the request to the repository
or the buisness if no data are stored.