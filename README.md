# systemic-express
A [systemic](https://github.com/guidesmiths/systemic) set of components for making easier setting up systemic-based express applications. These components are:

- [app](lib/app.js)
- [default-middleware](lib/default-middleware.js)
- [server](lib/server.js)

## App

This component contains customizable express application configuration. The whole list of options can be found [here](https://expressjs.com/en/4x/api.html#app.settings.table). 

```javascript
const System = require ('systemic');
const app = require('systemic-express').app

new System()
    .configure({
        app: {
            // This is the default configuration
            etag: false,
            'x-powered-by': false,
        }
    })
    .add('app', app()).dependsOn('config')
```

## Default middleware

Provides two different middlewares that can be attached to the previously created application as root level middlewares. By default, this middlewares will log errors, but they can be easily overridden by passing a configuration object to the component as follows:

```javascript
const System = require ('systemic');
const app = require('systemic-express').app
const defaultMiddleware = require('systemic-express').defaultMiddleware

const routes = require('./lib/routes')

new System()
    .configure({
        app: {
            etag: false,
            'x-powered-by': false,
        },
        'middleware.default': {
            // Override default notFound error handler here    
            notFound(err, req, res, next) {
                // Do some not found error handling magic
            },
            // Override default generic error handler here
            error(err, req, res, next) {
                // Do some generic error handling magic
            }
        }
    })
    .add('app', app()).dependsOn('config')
    .add('routes', routes()).dependsOn('app')
    .add('middleware.default', defaultMiddleware()).dependsOn('routes', 'app')
```

## Server

This component makes easier to set up the express server that will expose your application. It accepts the same options as the [listen](https://expressjs.com/en/4x/api.html#app.listen) method: 

## Usage
```js
const System = require('systemic')
const server = require('systemic-express').server
const app = require('systemic-express').app
const defaultMiddleware = require('systemic-express').defaultMiddleware
const routes = require('./lib/routes')

new System()
    .configure({
        server: {
            // Default value
            host: '0.0.0.0',
            // Mandatory field
            port: 3000
        },
        app: {
            etag: true
        }
    })
    .add('app', app()).dependsOn('config')
    .add('routes', routes()).dependsOn('app')
    .add('middleware.default', defaultMiddleware()).dependsOn('routes', 'app')
    .add('server', server()).dependsOn('config', 'app', 'middleware.default')
    .start((err, components) => {
        // Do stuff with components
    })
```
