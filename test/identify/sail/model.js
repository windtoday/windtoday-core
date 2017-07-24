'use strict'

const { includes, get } = require('lodash')
const should = require('should')

const log = {
  warn: () => {}
}

const sail = require('../../../core/identify/sail')(log)

describe('identify » sail » model', function () {
  it('not detect', function () {
    ;[''].forEach(function (title) {
      const { data } = sail(title)
      should(get(data, 'category')).be.equal('sails')
    })
  })

  it('detect', function () {
    ;[
      'loftsails racing blade',
      'loft sails racingblade',
      'loft racing blade'
    ].forEach(function (title) {
      const { data, output } = sail(title)
      should(get(data, 'category')).be.equal('sails')
      should(get(data, 'model')).be.equal('Racing Blade')
      should(includes(output, 'racing')).be.false()
    })
  })
})
