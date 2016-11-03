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
  describe('convert size prop into specific category', function () {
    [
      'boards',
      'booms',
      'fins',
      'masts',
      'sails'
    ].forEach(function (category) {
      it(category, function () {
        const fixture = assign({category}, {
          size: 132,
          brand: 'F2',
          model: 'Stoke'
        })

        const serialized = serializer(fixture)
        const _category = singularCategory[category]
        serialized.should.have.property(`${_category}.size`)
      })
    })
  })
})
