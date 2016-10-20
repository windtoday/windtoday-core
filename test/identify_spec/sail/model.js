'use strict'

require('should')
const { get } = require('lodash')
const log = require('../../../core/log')('sail_model_unidentify')
const sail = require('../../../core/identify/sail')(log)

describe('identify » sail » model', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (title) {
      const sailDetected = sail({title})
      get(sailDetected, 'category').should.be.equal('sails')
    })
  })

  it('detect', function () {
    [
      'loftsails racing blade',
      'loft sails racingblade',
      'loft racing blade'
    ].forEach(function (title) {
      const sailDetected = sail({title})
      get(sailDetected, 'category').should.be.equal('sails')
      get(sailDetected, 'model').should.be.equal('Racing Blade')
    })
  })
})
