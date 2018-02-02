const { assert } = require('chai')
const server = require('./server')

describe('Server', function () {
  it('should be defined', function (done) {
    assert.isDefined(server)
    done()
  })
})
