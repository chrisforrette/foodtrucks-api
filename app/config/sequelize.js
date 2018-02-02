const logger = require('../logger')
const config = require('./index')

module.exports = {
  dialect: 'postgres',
  url: config.get('database_url'),
  logging: config.get('debug') ? logger.info : false,

  // Store migrations in "migrations" table in the database

  migrationStorage: 'sequelize',
  migrationStorageTableName: 'migrations',

  // Store seeds in "seeds" table in the database

  seederStorage: 'sequelize',
  seederStorageTableName: 'seeds'
}
