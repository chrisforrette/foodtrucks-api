const sequelize = require('../clients/sequelize')

/**
 * Model object
 * @type {object}
 */
module.exports = {
  FoodTruck: sequelize.import('./food_truck')
}
