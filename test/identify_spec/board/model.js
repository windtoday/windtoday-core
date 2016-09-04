'use strict'

const should = require('should')
const { get } = require('lodash')

module.exports = function (identify) {
  describe('model', function () {
    it('not detect', function () {
      const model = get(identify.board(''), 'model')
      should(model).be.undefined()
    })

    it('detect', function () {
      [
        'starboard futura'
      ].forEach(function (title) {
        const model = get(identify.board(title), 'model')
        model.should.be.equal('Futura')
      })
    })
  })
}
