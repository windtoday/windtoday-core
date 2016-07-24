'use strict'

var should = require('should')

module.exports = function (extract) {
  it('year', function () {
    should(extract.year('')).be.undefined()
    extract.year('Vendo Loft Blade 7,8 2011 - 200€').should.be.equal('2011')
  })
  it('price', function () {
    should(extract.price('')).be.undefined()
    extract.price('Vendo Loft Blade 7,8 2011 - 200€').should.be.equal('200€')
  })
}
