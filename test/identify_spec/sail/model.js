'use strict'

var should = require('should')
var lodash = require('lodash')

module.exports = function (extract) {
  describe('model', function () {
    it('not detect', function () {
      var model = lodash.get(extract.sail(''), 'model')
      should(model).be.undefined()
    })

    it('detect', function () {
      [
        'loftsails racing blade',
        'loft sails racingblade',
        'loft racing blade'
      ].forEach(function (title) {
        var model = lodash.get(extract.sail(title), 'model')
        model.should.be.equal('Racing Blade')
      })
    })
  })
}
