'use strict'

const should = require('should')

module.exports = function (identify) {
  describe('year', function () {
    it('not detect', function () {
      should(identify.year('')).be.undefined()
    })

    it('detect', function () {
      identify.year('Vendo Loft Blade 7,8 2011 - 200€').should.be.equal('2011')
    })
  })
}
