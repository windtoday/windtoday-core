'use strict'

const year = require('../../core/identify/year')
const { get } = require('lodash')
const should = require('should')

describe('identify » year', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      const {data, output} = year(str)
      should(get(data, 'year')).be.undefined()
      output.includes('2011').should.be.false()
    })
  })

  it('detect', function () {
    const {data, output} = year('Vendo Loft Blade 7,8 2011 200€')
    should(get(data, 'year')).be.equal(2011)
    output.includes('2011').should.be.false()
  })
})
