'use strict'

const should = require('should')
const boardSize = require('../../../../core/schema/transform/pretty-title/board-size')

const createCase = title => boardSize({ title, 'board size': 120 })

describe('schema » transform » pretty title » board » size', function () {
  const expected = 'Starboard 120l Futura'
  ;[
    '120',
    '120 l',
    '120l',
    '120 litros',
    '120litros',
    '120 litres',
    '120litres'
  ].forEach(function (size) {
    const title = `Starboard ${size} Futura`
    it(`${title} → ${expected}`, function () {
      const output = createCase(title)
      should(output).be.equal(expected)
    })
  })
})
