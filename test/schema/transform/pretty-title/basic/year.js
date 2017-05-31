'use strict'

const should = require('should')

const prettyYear = require('../../../../../core/schema/transform/pretty-title/basic/pretty-year')

describe('schema » transform » pretty title » pretty year', function () {
  it('do nothing if year is not detected', function () {
    const item = {title: 'Starboard Futura 120L'}
    const output = prettyYear(item)
    should(output).be.equal(item.title)
  })

  describe('move year at the end', function () {
    const output = 'Starboard Futura 120L 2016'
    ;[
      '2016 Starboard Futura 120L',
      'Starboard 2016 Futura 120L',
      'Starboard Futura 2016 120L',
      'Starboard Futura 120L 2016'
    ].forEach(str => {
      it(`${str} → ${output}`, () => {
        const item = {title: str, year: 2016}
        const output = prettyYear(item)
        should(output).be.equal('Starboard Futura 120L 2016')
      })
    })
  })
})
