'use strict'

const {assign} = require('lodash')
const should = require('should')

const serializer = require('../../core/schema/serializer')

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
      'type'
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
            carbon: 90
          })

          const serialized = serializer(fixture)
          const _category = singularCategory[category]
          should(serialized).have.property(`${_category} size`)
          should(serialized).have.property(`${_category} type`)
          should(serialized).have.property(`${_category} carbon`)
        })
      })
    })
  })
})
