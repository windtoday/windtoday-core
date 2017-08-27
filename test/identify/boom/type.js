'use strict'

const { get } = require('lodash')
const should = require('should')

const log = {
  warn: () => {}
}

const boom = require('../../../core/identify/boom')(log)

describe('identify » bom » type', function () {
  it('carbon', function () {
    const str = 'Aeron 200/250 carbono'
    const { data, output } = boom(str)
    should(get(data, 'type')).be.equal('carbon')
    should(get(data, 'category')).be.equal('booms')
    should(output).be.equal(' /250 ')
  })

  it('aluminium (non carbon)', function () {
    const str = 'Botavara Aeron 200/250'
    const { data, output } = boom(str)
    should(get(data, 'type')).be.equal('aluminium')
    should(get(data, 'category')).be.equal('booms')
    should(output.includes('aluminium')).be.false()
  })

  describe('special vendors', function () {
    ;[
      { str: 'NEILPRYDE X9 BOOM 140 €839', type: 'carbon' },
      { str: 'SEVERNE SAILS ENIGMA BOOM 140 €879', type: 'carbon' },
      { str: 'NORTHSAILS PLATINUM RACE 240 €1140', type: 'carbon' },
      { str: 'NORTHSAILS GOLD SERIES RS 170 €369', type: 'carbon' }
    ].forEach(({ str, type }) => {
      it(`${str} → carbon`, function () {
        const { data, output } = boom(str)
        should(get(data, 'type')).be.equal(type)
        should(get(data, 'category')).be.equal('booms')
        should(output.includes('carbon')).be.false()
      })
    })
  })
})
