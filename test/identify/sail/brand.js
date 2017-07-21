'use strict'

const should = require('should')
const { get } = require('lodash')

const log = require('../../../core/log')('sail_brand_unidentify')
const sail = require('../../../core/identify/sail')(log)

describe('identify » sail » brand', function () {
  it('not detect', function () {
    ;[''].forEach(function (str) {
      const { data } = sail(str)
      should(get(data, 'category')).be.equal('sails')
    })
  })

  it('detect', function () {
    ;[
      'loftsails racing blade',
      'loft sails racingblade',
      'loft racing blade'
    ].forEach(function (str) {
      const { data, output } = sail(str)
      should(get(data, 'category')).be.equal('sails')
      should(get(data, 'brand')).be.equal('Loft')
      should(output.includes('loft')).be.false()
    })
  })
})
