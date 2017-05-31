'use strict'

const should = require('should')
const prettyTitle = require('../../../../core/schema/transform/pretty-title')

describe('schema » transform » pretty title', function () {
  [
    {
      item: {
        title: '    Vendo Mistral  Syncro 2016 250€   ',
        price: 250,
        year: 2016
      },
      expected: 'Mistral Syncro 2016'
    },
    {
      item: {
        title: 'Starboard Futura 120 litros 2016 250€',
        price: 250,
        year: 2016,
        'board size': 120
      },
      expected: 'Starboard Futura 120L 2016'
    }
  ].forEach(function ({item, expected}) {
    const {title} = item
    it(`${title} → ${expected}`, function () {
      const output = prettyTitle(item)
      should(output).be.equal(expected)
    })
  })
})
