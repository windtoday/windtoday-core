'use strict'

const serializer = require('../../core/schema/serializer')

describe('schema » serializer', function () {
  it('convert size prop into specific category', function () {
    const fixture = {
      category: 'boards',
      size: 132,
      brand: 'F2',
      model: 'Stoke'
    }
    serializer(fixture).should.be.eql({
      category: 'boards',
      'board.size': 132,
      brand: 'F2',
      model: 'Stoke'
    })
  })
})
