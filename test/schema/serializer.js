'use strict'

const { assign } = require('lodash')
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
    ;['size', 'type', 'carbon', 'size type', 'carbon range'].forEach(function (
      prop
    ) {
      it(prop, function () {
        ;['boards', 'booms', 'fins', 'masts', 'sails'].forEach(function (
          category
        ) {
          const fixture = assign(
            { category },
            {
              size: 132,
              type: 'sdm',
              carbon: 90,
              'size range': '100cm to 200cm',
              'carbon range': 'C60 to C70'
            }
          )

          const serialized = serializer(fixture)
          const _category = singularCategory[category]
          should(serialized).have.property(`${_category} size`)
          should(serialized).have.property(`${_category} size range`)
          should(serialized).have.property(`${_category} type`)
          should(serialized).have.property(`${_category} carbon`)
          should(serialized).have.property(`${_category} carbon range`)
        })
      })
    })
  })
})
