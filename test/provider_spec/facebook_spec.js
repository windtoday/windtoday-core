'use strict'

const createStream = require('../../core/providers/facebook/stream')
const { first, keys, noop } = require('lodash')
require('should')

const isTesting = process.env.NODE_ENV === 'test'
const logger = isTesting ? noop : console.log

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
        .on('data', (item) => {
          buffer.push(item)
          logger(item)
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
