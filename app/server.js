const _ = require('lodash')
const Hapi = require('hapi')
const HapiError = require('hapi-error')
const HapiRequireHTTPS = require('hapi-require-https')
const config = require('./config')
const handler = require('./handler')
const schema = require('./schema')

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

const plugins = [HapiError]

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

  // Configure food trucks route

  server.route({
    method: 'GET',
    path: '/food-trucks',
    config: {
      validate: {
        query: schema
      }
    },
    handler
  })
})

module.exports = server
