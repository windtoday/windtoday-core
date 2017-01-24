'use strict'

require('should')
const boardSize = require('../../../../core/schema/transform/pretty-title/pretty-board-size')

const createCase = (str, cb) => {
  const input = `Starboard ${str} Futura`
  return boardSize(input)
}

describe('schema » transform » pretty title » pretty board size', function () {
  const expected = '120L'

  ;[
    '120 l',
    '120l',
    '120 litros',
    '120litros',
    '120 litres',
    '120litres'
  ].forEach(function (str) {
    it(`${str} → 120L`, function () {
      const output = createCase(str)
      output.should.be.equal(`Starboard ${expected} Futura`)
    })
  })
})
