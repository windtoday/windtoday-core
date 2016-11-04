'use strict'

const serializer = require('../../core/schema/serializer')
const {assign} = require('lodash')

const singularCategory = {
  boards: 'board',
  masts: 'mast',
  sails: 'sail',
  booms: 'boom',
  fins: 'fin'
}

describe('schema » serializer', function () {
  describe('convert prop into specific category', function () {
    ;[
      'size',
      'type',
      'carbon',
      'box'
    ].forEach(function (prop) {
      it(prop, function () {
        [
          'boards',
          'booms',
          'fins',
          'masts',
          'sails'
        ].forEach(function (category) {
          const fixture = assign({category}, {
            size: 132,
            type: 'sdm',
            carbon: 90,
            box: 'tuttle'
          })

          const serialized = serializer(fixture)
          const _category = singularCategory[category]
          serialized.should.have.property(`${_category}.size`)
          serialized.should.have.property(`${_category}.type`)
          serialized.should.have.property(`${_category}.carbon`)
          serialized.should.have.property(`${_category}.box`)
        })
      })
    })
  })
})
