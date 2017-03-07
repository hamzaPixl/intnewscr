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

- /trafic
        method: 'GET'

- /news
        method: 'GET',
        query: {
            source: 'string',
            language: 'string',
        }
        response : {"content":"Staatssecretaris voor Asiel en Migratie Theo Francken (N-VA) noemt de beslissing van het Europese hof om vast te houden aan de bestaande interpretatie van de visumregels 'een goede zaak'. 'We werken verder aan een streng maar rechtvaardig migratiebeleid', zegt hij in een eerste reactie.","id":"http://www.standaard.be/cnt/dmf20170307_02766835","created":1488895437043,"title":"Francken: 'Strijd was gestreden, maar gezond verstand heeft gezegevierd'","date":"Tue, 07 Mar 2017 12:16:00 +0100","link":"http://www.standaard.be/cnt/dmf20170307_02766835","ttl":14400,"model":"news","language":"nl","source":"belnl"}

- /newsapi
        method: 'GET',
        query: {
            source: 'string',
        }
        response : {"content":"It looks like AWS, Amazon's cloud computing arm, has made another acquisition to add more productivity tools for its customers beyond basic cloud-computing..","id":"https://techcrunch.com/2017/03/06/amazons-aws-buys-thinkbox-software-maker-of-tools-for-creative-professionals/","created":1488895345234,"title":"Amazon’s AWS buys Thinkbox Software, maker of tools for creative professionals","date":"2017-03-06T20:56:14Z","link":"https://techcrunch.com/2017/03/06/amazons-aws-buys-thinkbox-software-maker-of-tools-for-creative-professionals/","ttl":14400,"model":"news","language":"en","source":"techcrunch"}


All response are in JSON format.


--Buisness.js

This is the file wo content the logic buisness.
It calls differents external API to get result and give it to the user.

For news there are 2 rss :  - http://feeds.feedburner.com/Rtlinfos-ALaUne
                            - http://www.standaard.be/rss/section/1f2838d4-99ea-49f0-9102-138784c7ea7c

For trafic there is 1 rss : - http://trafiroutes.wallonie.be/trafiroutes/Evenements_FR.rss

For Other news this API is user : - https://newsapi.org/

--Controller.js

This is the controller , he forward the request to the repository
or the buisness if no data are stored.