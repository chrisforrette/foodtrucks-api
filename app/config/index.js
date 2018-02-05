// Try to load .env file to set environment variables

require('dotenv').config()

const convict = require('convict')

/**
 * Default/base configuration settings
 */
module.exports = convict({
  env: {
    doc: 'The current application environment',
    format: ['production', 'staging', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },

  port: {
    doc: 'Port to run application on',
    format: 'port',
    default: 3001,
    env: 'PORT'
  },

  api_url: {
    doc: 'URL of this application',
    format: String,
    default: '',
    env: 'API_URL'
  },

  app_url: {
    doc: 'URL of the complementary frontend Javascript application',
    format: String,
    default: '',
    env: 'APP_URL'
  },

  concurrency: {
    doc: 'Web concurrency, used to determine the number of workers in a cluster',
    format: Number,
    default: 1,
    env: 'WEB_CONCURRENCY'
  },

  debug: {
    doc: 'Whether debugging is on or off',
    format: Boolean,
    default: true,
    env: 'DEBUG'
  },

  database_url: {
    doc: 'Database connection string',
    format: String,
    default: null,
    env: 'DATABASE_URL'
  },

  // Sentry

  sentry_dsn: {
    doc: 'The Sentry DSN for Sentry logging',
    format: String,
    env: 'SENTRY_DSN',
    default: ''
  }
})
