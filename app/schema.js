const Joi = require('joi')

const DEFAULT_LIMIT = 500

/**
 * Joi schema for latitude coordinate
 * @type {object}
 */
const latitudeSchema = Joi
  .number()
  .min(-90)
  .max(90)

/**
 * Joi schema for longitude coordinate
 * @type {object}
 */
const longitudeSchema = Joi
  .number()
  .min(-180)
  .max(180)

/**
 * Joi schema for validating query string of food truck list endpoint
 * @type {object}
 */
module.exports = Joi
  .object({
    limit: Joi
      .number()
      .integer()
      .min(1)
      .max(500)
      .default(DEFAULT_LIMIT),

    neLatitude: latitudeSchema,
    neLongitude: longitudeSchema,
    swLatitude: latitudeSchema,
    swLongitude: longitudeSchema
  })
  .and('neLatitude', 'neLongitude', 'swLatitude', 'swLongitude')
