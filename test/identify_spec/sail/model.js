'use strict'

const should = require('should')
const { get } = require('lodash')

module.exports = function (identify) {
  describe('model', function () {
    it('not detect', function () {
      const model = get(identify.sail(''), 'model')
      should(model).be.undefined()
    })

    it('detect', function () {
      [
        'loftsails racing blade',
        'loft sails racingblade',
        'loft racing blade'
      ].forEach(function (title) {
        const model = get(identify.sail(title), 'model')
        model.should.be.equal('Racing Blade')
      })
    })
  })
}
