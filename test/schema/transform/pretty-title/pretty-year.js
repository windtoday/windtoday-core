'use strict'

require('should')
const prettyYear = require('../../../../core/schema/transform/pretty-title/pretty-year')

describe('schema » transform » pretty title » pretty year', function () {
  it('do nothing if year is not detected', function () {
    const input = 'Starboard Futura 120L'
    const output = prettyYear(input)
    output.should.be.equal(input)
  })

  describe('move year at the end', function () {
    const output = 'Starboard Futura 120L 2016'
    ;[
      '2016 Starboard Futura 120L',
      'Starboard 2016 Futura 120L',
      'Starboard Futura 2016 120L',
      'Starboard Futura 120L 2016'
    ].forEach(input => {
      it(`${input} → ${output}`, () => {
        const output = prettyYear(input)
        output.should.be.equal('Starboard Futura 120L 2016')
      })
    })
  })
})
