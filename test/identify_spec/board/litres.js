'use strict'

const should = require('should')
const { get } = require('lodash')

module.exports = function (identify) {
  describe('litres', function () {
    it('not detection', function () {
      const litres = get(identify.board(''), 'litres')
      should(litres).be.undefined()
    })

    it('two digits', function () {
      ;[
        '84l',
        '84 l',
        '84 litros'
      ].forEach(function (boardLitres) {
        const litres = get(identify.board(boardLitres), 'litres')
        litres.should.be.equal(84)
      })
    })

    it('three digits', function () {
      ;[
        '105l',
        '105 l',
        '105 litros'
      ].forEach(function (boardLitres) {
        const litres = get(identify.board(boardLitres), 'litres')
        litres.should.be.equal(105)
      })
    })

    it('detech in a string that include numbers', function () {
      [
        'Se vende Bic Techno 283 152l',
        'Se vende Bic Techno 283 152 l',
        'Se vende Bic Techno 283 152 litros'
      ].forEach(function (str) {
        const litres = get(identify.board(str), 'litres')
        litres.should.be.equal(152)
      })
    })
  })
}
