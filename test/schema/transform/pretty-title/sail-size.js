'use strict'

const should = require('should')
const sailSize = require('../../../../core/schema/transform/pretty-title/sail-size')

const createCase = str => {
  const input = `Neilpryde Combat ${str}`
  return sailSize(input)
}

describe('schema » transform » pretty title » pretty sail size', function () {
  it('dont normalize if sail size is not detected', function () {
    const str = 'Starboard 120L Futura'
    const output = createCase(str)
    should(output).be.equal(str)
  })

  const expected = '4.7m'
  ;[
    '4 7',
    '4,7',
    '4\'7',
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
  ].forEach(function (str) {
    it(`${str} → 4.7m`, function () {
      const output = createCase(str)
      should(output).be.equal(`Neilpryde Combat ${expected}`)
    })
  })
})
