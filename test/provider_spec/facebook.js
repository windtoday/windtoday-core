'use strict'

const should = require('should')
const fetch = require('../../core/providers/facebook/fetch')
const { first, includes, keys } = require('lodash')

const CONST = {
  EXPECTED_FIELDS: [
    'title',
    'updatedAt',
    'provider',
    'url'
  ]
}

describe('provider » facebook', function () {
  describe('fetch', function () {
    it(`${CONST.EXPECTED_FIELDS.toString()} are present`, function (done) {
      fetch(function (err, items) {
        should(err).be.null()
        const item = first(items)
        const itemKey = keys(item)
        itemKey.should.be.eql(CONST.EXPECTED_FIELDS)
        done()
      })
    })
  })
})
