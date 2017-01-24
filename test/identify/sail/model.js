'use strict'

require('should')
const { includes, get } = require('lodash')
const log = require('../../../core/log')('sail_model_unidentify')
const sail = require('../../../core/identify/sail')(log)

describe('identify » sail » model', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (title) {
      const {data} = sail(title)
      get(data, 'category').should.be.equal('sails')
    })
  })

  it('detect', function () {
    [
      'loftsails racing blade',
      'loft sails racingblade',
      'loft racing blade'
    ].forEach(function (title) {
      const {data, output} = sail(title)
      get(data, 'category').should.be.equal('sails')
      get(data, 'model').should.be.equal('Racing Blade')
      includes(output, 'racing').should.be.false()
    })
  })
})
