const sequelize = require('../clients/sequelize')

// Build model object

const models = {
  FoodTruck: sequelize.import('./food_truck')
}

// Apply relationships

Object
  .keys(models)
  .forEach(function (modelName) {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models)
    }
  })

module.exports = models
