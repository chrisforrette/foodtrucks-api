const _ = require('lodash')
const { Serializer } = require('jsonapi-serializer')
let models = require('./models')

const DEFAULT_LIMIT = 50

/**
 * JSON API serializer for outputting Food Truck data for the API
 * @type {object}
 */
const foodTruckSerializer = new Serializer('food-truck', {
  keyForAttribute: 'snake_case',
  attributes: [
    'name',
    'facility_type',
    'status',
    'food_items',
    'days_hours',
    'address',
    'latitude',
    'longitude'
  ]
})

/**
 * Request handler
 * @param  {object} request  Request object
 * @param  {object} response Response object
 * @return {Promise}
 */
const handler = (request, response) => models.FoodTruck
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

module.exports = [{
  method: 'GET',
  path: '/food-trucks',
  handler
}]
