const _ = require('lodash')
const { Serializer } = require('jsonapi-serializer')
let models = require('./models')

const DEFAULT_LIMIT = 50

const PUBLIC_FIELDS = [
  'name',
  'facility_type',
  'status',
  'food_items',
  'days_hours',
  'address',
  'latitude',
  'longitude'
]

/**
 * JSON API serializer for outputting Food Truck data for the API
 * @type {object}
 */
const foodTruckSerializer = new Serializer('food-truck', {
  keyForAttribute: 'snake_case',
  attributes: PUBLIC_FIELDS
})

/**
 * Request handler
 * @param  {object} request  Request object
 * @param  {object} response Response object
 * @return {Promise}
 */
module.exports = (request, response) => models.FoodTruck
  .findAndCount({
    where: { status: 'APPROVED' },
    limit: DEFAULT_LIMIT
  })
  .then(({ rows, count }) => response({
    meta: {
      rows: rows.length,
      page: 1,
      pages: Math.ceil(parseFloat(count) / parseFloat(DEFAULT_LIMIT)),
      total: count
    },
    ...foodTruckSerializer.serialize(_.invokeMap(rows, 'toJSON'))
  }))
