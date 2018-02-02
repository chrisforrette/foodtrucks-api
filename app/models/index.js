const sequelize = require('../clients/sequelize')

// Build model object

const models = {
  // sequelize.import()
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
