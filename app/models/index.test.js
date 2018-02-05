const { assert } = require('chai')
const models = require('./index')

describe('Models', function () {
  it('should have a FoodTruck model defined', function (done) {
    assert.isDefined(models.FoodTruck)
    done()
  })
})
