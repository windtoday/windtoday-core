'use strict'

const should = require('should')

const { price, year, mast, sail } = require('../../core/identify')
const createFlow = require('../../core/identify/create-flow')
const createLogger = require('../../core/log')

describe('identify » create flow', function () {
  it('price and year', function () {
    const flow = createFlow([price, year])

    const { data, output } = flow('Vendo vela 2011 precio 260€')

    should(data).have.property('price', 260)
    should(data).have.property('year', 2011)
    should(output).be.equal('Vendo vela  precio ')
  })

  it('sail and mast', function () {
    const flow = createFlow([
      sail(createLogger('sail_brand_unidentify')),
      mast(createLogger('sail_brand_unidentify'))
    ])

    const str = 'Neilpryde Hellcat 6,7. Mastil Rdm 430 Y Botavara North'
    const { data, output } = flow(str)
    should(data).have.property('sail size', 6.7)
    should(data).have.property('mast size', 430)
    should(data.category).be.eql(['sails', 'masts'])
    should(data.brand).be.eql(['Neilpryde', 'North'])
    should(output).be.equal('  . Mastil   Y Botavara ')
  })
})
