'use strict'

const serializer = require('../../core/db/serializer')

describe('db', function () {
  it('serializer', function () {
    const fixture = {
      category: 'boards',
      size: 132,
      brand: 'F2',
      model: 'Stoke'
    }
    serializer(fixture).should.be.eql({
      category: 'boards',
      'boards.size': 132,
      brand: 'F2',
      model: 'Stoke'
    })
  })
})
