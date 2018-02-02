const winston = require('winston')
const Sentry = require('winston-raven-sentry')
const config = require('./config')

let transports = []

if (config.get('env') !== 'test') {
  transports = [
    new winston.transports.Console({
      level: 'silly',
      colorize: true,
      prettyPrint: true
    })
  ]

  // Sentry

  if (config.get('sentry_dsn')) {
    transports.push(new Sentry({
      patchGlobal: true, // Catch all uncaught errors
      level: 'error',
      dsn: config.get('sentry_dsn')
    }))
  }
}

module.exports = new winston.Logger({ transports })
