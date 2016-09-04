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
        '84',
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
        '105',
        '105l',
        '105 l',
        '105 litros'
      ].forEach(function (boardLitres) {
        const litres = get(identify.board(boardLitres), 'litres')
        litres.should.be.equal(105)
      })
    })
  })
}
