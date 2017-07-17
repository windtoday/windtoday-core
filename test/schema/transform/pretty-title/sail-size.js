'use strict'

const should = require('should')
const sailSize = require('../../../../core/schema/transform/pretty-title/sail-size')

describe('schema » transform » pretty title » pretty sail size', function () {
  it('dont prettify if sails size is not detected', function () {
    const expected = 'Starboard Futura'
    const output = sailSize({ title: expected })
    should(output).be.equal(expected)
  })

  const expected = 'Starboard 4.7m Futura'
  ;[
    '4 7',
    '4,7',
    "4'7",
    '4.7',
    '4.7m',
    '4.7 m',
    '4.7',
    '4,7',
    "4'7",
    '4´7',
    '4 7m',
    '4,7m',
    "4'7m",
    '4´7m',
    '4 7 m',
    '4.7 m',
    '4,7 m',
    "4'7 m",
    '4´7 m'
  ].forEach(function (size) {
    const title = `Starboard ${size} Futura`
    it(`${title} → ${expected}`, function () {
      const output = sailSize({ title, 'sail size': 4.7 })
      should(output).be.equal(expected)
    })
  })
})
