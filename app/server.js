const _ = require('lodash')
const Hapi = require('hapi')
const HapiRequireHTTPS = require('hapi-require-https')
const config = require('./config')
const routes = require('./routes')

const server = new Hapi.Server()

const connectionConfig = {
  port: config.get('port'),
  router: {
    stripTrailingSlash: true
  },
  routes: {
    security: true,
    cors: true
  }
}

if (config.get('env') === 'development') {
  _.set(connectionConfig, 'routes.json.space', 2)
}

server.connection(connectionConfig)

// Configure plugins

const plugins = []

// Require HTTPS for staging and production environments

if (_.includes(['production', 'staging'], config.get('env'))) {
  plugins.push({ register: HapiRequireHTTPS })
}

// Configure Sentry, if present

if (config.get('sentry_dsn')) {
  plugins.push({
    register: require('hapi-raven'),
    options: {
      dsn: config.get('sentry_dsn')
    }
  })
}

// Register plugins

server.register(plugins, function (err) {
  if (err) {
    throw new Error('Error registering plugins')
  }

  server.route(routes)
})

module.exports = server
