const _ = require('lodash')
const { assert } = require('chai')
const sinon = require('sinon')
const faker = require('faker')
const rewire = require('rewire')
const models = require('./models')

const handler = rewire('./handler')

describe('Handler', function () {
  it('should serve a list of food trucks', function () {
    const data = {
      count: 500,
      rows: _.times(3, () => {
        return models.FoodTruck.build({
          id: faker.random.number(),
          name: faker.random.words(),
          facility_type: 'Truck',
          status: 'APPROVED',
          food_items: faker.random.words(),
          days_hours: faker.random.words(),
          address: faker.address.streetAddress(),
          latitude: faker.address.latitude(),
          longitude: faker.address.longitude()
        })
      })
    }

    const request = {
      query: {
        limit: 50
      }
    }
    const response = sinon.stub()
    const mockModels = {
      FoodTruck: {
        findAndCount: sinon.stub().resolves(data)
      }
    }

    const revert = handler.__set__({ models: mockModels })

    return handler(request, response)
      .then(() => {
        const responseData = response.getCall(0).args[0]
        sinon.assert.calledOnce(response)
        assert.deepEqual(responseData.meta, {
          rows: 3,
          page: 1,
          pages: 10,
          total: 500
        })
        assert.lengthOf(responseData.data, 3)

        responseData.data.forEach(row => {
          assert.equal(row.type, 'food-trucks')
          assert.hasAnyKeys(row, 'id')
          assert.hasAllKeys(row.attributes, [
            'name',
            'facility_type',
            'status',
            'food_items',
            'days_hours',
            'address',
            'latitude',
            'longitude'
          ])
        })

        revert()
      })
  })
})
