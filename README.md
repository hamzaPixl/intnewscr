# INTNEWSCR

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/hamzaPixl/intnewscr/blob/devlop/LICENSE)
[![GitHub ast commit](https://img.shields.io/github/last-commit/google/skia.svg)](https://github.com/hamzaPixl/intnewscr/commits/devlop)
[![Travis](https://img.shields.io/appveyor/ci/gruntjs/grunt.svg)](https://travis-ci.org/hamzaPixl/intnewscr#)

# Author

Hamza Mounir

# Description

  [INTNEWSCR](https://hamzapixl.github.io/intnewscr/)

# Install

  **Clone the repository**

  ```zsh
    $ git clone https://github.com/hamzaPixl/intnewscr.git
  ```

  **Install differents packages**

  First of all we have to install all dependencies that you need.

  If you have an error on installing the dependencies, delete the `package-lock.json` first.

  ```zsh
    $ npm i
  ```

# Config

  Make sure that you copy the ``config/local.template`` into ``config/local.js`` and define your own values.

# Create the Database

  Install Docker first.

  Open a terminal and run the Docker script in the root of the repository :

  ```zsh
    $ docker-compose up
  ```

# Tests

  When you want to run the test you have to setup the ``test.js`` and ``integration.js`` config files.

1.  ``Unit tests``

    It's a good way to see if your code is correct. Unit tests are in the source of the product. All tests files have the same pattern for the file name : ``example.spec.js``.

    To run all tests, it's as simple as :
    ```zsh
      $ cd ./server
      $ npm run test
    ```

2.  ``Integration tests``

    We use the integrations tests to see if the full flow is correct.
    So with theses tests we act as a client of the API.
    All integration tests files have the same pattern for the file name  : ``example.integration.js``.

    Make sure that the config file for integration tests is correct.

    To run the integration tests, don't forget to start the server in a stub mode.

    To run all tests, it's as simple as :
    ```zsh
      $ cd ./server
      $ npm run test-integration
    ```

# Postman

  You have to your disposition a collection that you can import on postman to call the API. You will find it in ``./postman.json``. Just import in on postamn and you can test the requests. The API must to be running.

# Widget

  A widget is define as a part of the application. It defines some *`routes`* that gives some information. Let's explain with an example.

  We are going to create a `news` widget. It will allows us to call the API and retrieve the informations of today.

  ## Creation

  Let's start.

  ```zsh
    $ cd ./server/widgets
    $ mkdir news
  ```
  We just created the folder that will contains the widget. We have to reference it in `./server/widgets/index.js`.

  ```javascript
    const news = require('./news');

    module.exports = {
      news,
    };
  ```

  Now in the widget we have to export what the server needs from all widgets. We define two things :

    - Path
    - Routes

  ```zsh
    $ cd ./server/widgets/news
    $ touch index.js
  ```
  ```javascript
    const controllers = require('./controllers');

    module.exports = {
      path: '/news',
      controllers,
    };
  ```

  You see that we exports the folder controllers. It contains the router for this widget. It will be used by the main server to expose them to the public API.

  Now we need to add this routes to the server. Open the file `./server/controllers/index.js` and add your widget.

  ```javascript
    const express = require('express');
    const widgets = require('../widgets');

    const router = express.Router();

    // news widget
    router.use(widgets.news.path, widgets.news.controllers);

    module.exports = router;
  ```
  As a part of the application a widget need some configuration. You can simply add a section to the config file that you use. Assume the fact that you have follow this file, you may have a local config file. Open it and add a section for `news` widget.

  ```javascript
    const config = {
      env: 'local',
      defaultTimezone: 'Europe/Brussels',
      country: 'BE',
      port: 3000,
      secret: 'secret-intnewscr-local',
      mongo: 'mongodb://localhost:27017/intnewscr',
      server: {
        http: 'http://localhost:3000',
      },
      services: {
        news: {
          stub: true,
          ttl: 86400,
          extras: {
            sources: ['rtl'],
          },
        },
      },
    };

    module.exports = config;
  ```

  The `stub` flag define if you want to have mock response on the call or not.

  The `ttl` flag define when the data will be deleted.

  The `extras` object is for all configuration variables that a widget need and its not generic for all.

  This is the basic structure of a widget.

  ```zsh
    |-- controllers
      |-- mappers
      |-- public
      |-- validators
      |-- index.js
    |-- domain
      |-- factories
      |-- models
      |-- repositories
    |-- infrastructure
    |-- services
    |-- tests
      |-- integration-tests
  ```

  ## Stub

  Remember the stub flag on the config file ? Of course, if its true, no request in external mode will be done. We will use the `mocks` object to return a defined value.

  Running in a stub mode allows you to avoid the database layer. In the services folder of the widget you can define the following folder : `__mocks__`

  See how it used in an existing widget.

  ## Documentation

  Each Widget contains some files for the documentation, to make it easier to understand.

  First one : the goal of the widget, a simple `README.md`.

  Second one : the routes documentation as a swagger file `[widgetName]Api.yml`.

  ## Tests

  Tests are there to avoid failure or regression in a widget. Make sure that all things that you devlopped is going well.

  ### Unit tests

  For example this file named `example.js` the file for the unit tests need to be `example.spec.js`.

  File : **`example.js`**

  ```javascript
    const News = require('../models/News');

    function createFromPayload(payload) {
      if (!payload) {
        return null;
      }

      return new News({
        source: payload.source,
        link: payload.link,
        content: payload.content,
        title: payload.title,
      });
    }

    module.exports = {
      createFromPayload,
    };
  ```

  File : **`example.spec.js`**

  ```javascript
    const newsFactory = require('./newsFactory');

    describe('INT NEWS SCREEN - NEWS - factory - newsFactory', () => {
      it('should create a valid instance', () => {
        const payload = {
          source: 'source',
          link: 'link',
          content: 'content',
          title: 'title',
        };
        const news = newsFactory.createFromPayload(payload);
        expect(news).toBeDefined();
        expect(news.source).toBe(payload.source);
        expect(news.link).toBe(payload.link);
        expect(news.content).toBe(payload.content);
        expect(news.title).toBe(payload.title);
      });
      it('should create a valid instance with empty payload', () => {
        const news = newsFactory.createFromPayload({});
        expect(news).toBeDefined();
        expect(news).toMatchObject({});
      });
      it('should create nothing if no payload', () => {
        const news = newsFactory.createFromPayload(null);
        expect(news).toBeNull();
      });
    });
  ```

  ### Integration tests

  In the folder `tests/integration-tests` you can define tests for your end to end test, with an API call and so on.

  It's something like :

  ```javascript
    const request = require('superagent');
    const config = require('config');
    const news = require('../../services/__mocks__/news.json');
    const newsMapper = require('../../controllers/mappers/newsMapper');

    describe('INT NEWS SCREEN - NEWS - integration tests - newsController', () => {
      test('Get news for valid source', (done) => {
        request.get(`${config.get('server.http')}/news/rtl`)
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.body).toBeDefined();
            expect(res.body.length).toBe(2);
            expect(res.body).toMatchObject(newsMapper.map(news));
            done();
          });
      });
      test('Get news with invalid source', (done) => {
        request.get(`${config.get('server.http')}/news/kkk`)
          .end((err, res) => {
            expect(err).toBeDefined();
            expect(res.body.status).toBe(400);
            expect(res.body.name).toBe('ValidationError');
            expect(res.body.code).toBe('JSON-SCHEMA');
            done();
          });
      });
      test('Get news with no source', (done) => {
        request.get(`${config.get('server.http')}/news`)
          .end((err, res) => {
            expect(err).toBeDefined();
            expect(res.body.status).toBe(404);
            expect(res.body.name).toBe('NotFoundError');
            done();
          });
      });
    });
  ```
