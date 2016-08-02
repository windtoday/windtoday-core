'use strict'

var should = require('should')

module.exports = function (extract) {
  describe('year', function () {
    it('not detect', function () {
      should(extract.year('')).be.undefined()
    })

    it('detect', function () {
      extract.year('Vendo Loft Blade 7,8 2011 - 200€').should.be.equal('2011')
    })
  })
}
