'use strict'

const createStream = require('../../core/providers/facebook/stream')
const { first, keys } = require('lodash')
const should = require('should')

const CONST = {
  EXPECTED_FIELDS: [
    'title',
    'updatedAt',
    'url'
  ]
}

describe('provider » facebook', function () {
  describe('stream', function () {
    it(`${CONST.EXPECTED_FIELDS.toString()} are present`, function (done) {
      const stream = createStream()
      const buffer = []

      stream
        .on('data', function (data) {
          console.log('new item')
          console.log(data)
          buffer.push(data)
        })
        .on('end', function () {
          const item = first(buffer)
          const itemKey = keys(item)
          itemKey.should.be.eql(CONST.EXPECTED_FIELDS)
          done()
        })
    })
  })
})
