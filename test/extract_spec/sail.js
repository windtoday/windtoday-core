'use strict'

/* global describe, it */

var should = require('should')

module.exports = function (extract) {
  describe('sails', function () {
    it('brand with model', function () {
      [
        'loftsails racing blade',
        'loft sails racingblade',
        'loft blade',
        'loft racing blade'
      ].forEach(function (title) {
        extract.sail(title).should.be.eql({
          name: 'Loft Sails',
          model: 'Racing Blade'
        })
      })
    })

    it('size', function () {
      should(extract.sail.size('')).be.undefined()
      ;[
        '7.0',
        '7,0',
        "7'0",
        '7.0m',
        '7,0m',
        "7'0m"
      ].forEach(function (sailSize) {
        extract.sail.size(sailSize).should.be.equal('7.0')
      })
    })
  })
}
