'use strict'

const { get } = require('lodash')
const should = require('should')

const log = {
  warn: () => {}
}

const boom = require('../../../core/identify/boom')(log)

describe('identify » bom » type', function () {
  it('carbon', function () {
    const str = 'Botavara Aeron 200/250 carbono'
    const { data, output } = boom(str)
    should(get(data, 'type')).be.equal('carbon')
    should(get(data, 'category')).be.equal('booms')
    should(output.includes('carbon')).be.false()
  })

  it('aluminium (non carbon)', function () {
    const str = 'Botavara Aeron 200/250'
    const { data, output } = boom(str)
    should(get(data, 'type')).be.equal('aluminium')
    should(get(data, 'category')).be.equal('booms')
    should(output.includes('aluminium')).be.false()
  })

  describe('special vendor', function () {
    it('X9 → carbon', function () {
      const str = 'Neilpryde X9 2013'
      const { data, output } = boom(str)
      should(get(data, 'type')).be.equal('carbon')
      should(get(data, 'category')).be.equal('booms')
      should(output.includes('carbon')).be.false()
    })
  })
})
