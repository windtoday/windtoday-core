'use strict'

const { get } = require('lodash')
const should = require('should')

const year = require('../../core/identify/year')

describe('identify » year', function () {
  it('not detect', function () {
    ;[''].forEach(function (str) {
      const { data, output } = year(str)
      should(get(data, 'year')).be.undefined()
      should(output.includes('2011')).be.false()
    })
  })

  it('detect', function () {
    const { data, output } = year('Vendo Loft Blade 7,8 2011 200€')
    should(get(data, 'year')).be.equal(2011)
    should(output.includes('2011')).be.false()
  })
})
