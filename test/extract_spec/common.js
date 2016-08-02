'use strict'

var should = require('should')

module.exports = function (extract) {
  it('year', function () {
    should(extract.year('')).be.undefined()
    extract.year('Vendo Loft Blade 7,8 2011 - 200€').should.be.equal('2011')
  })
  it('price', function () {
    should(extract.price('')).be.undefined()

    ;['80e', '80 e', ' 80 e', '80 e ', ' 80 e '].forEach(function (price) {
      extract.price(price).should.be.equal('80€')
    })

    ;['150E', '150 E', ' 150 E', '150 E ', ' 150 E '].forEach(function (price) {
      extract.price(price).should.be.equal('150€')
    })

    ;['200€', '200 €', ' 200 €', ' 200 € ', '200 € '].forEach(function (price) {
      extract.price(price).should.be.equal('200€')
    })
  })
}
