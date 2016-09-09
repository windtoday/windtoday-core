'use strict'

const should = require('should')
const year = require('../../core/identify/year')

describe('identify » year', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      should(year(str)).be.undefined()
    })
  })

  it('detect', function () {
    year('Vendo Loft Blade 7,8 2011 - 200€').should.be.equal(2011)
  })
})
