const Sequelize = require('sequelize')
const logger = require('../logger')
const config = require('../config')

/**
 * Sequelize database client
 */
module.exports = new Sequelize(
  config.get('database_url'),
  {
    dialect: 'postgres',
    logging: config.get('debug') ? logger.info : false,
    define: {
      underscored: true,
      createdAt: 'created',
      updatedAt: 'modified'
    }
  }
)
