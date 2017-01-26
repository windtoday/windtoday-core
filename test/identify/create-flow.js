'use strict'

const createFlow = require('../../core/identify/create-flow')
const price = require('../../core/identify/price')
const year = require('../../core/identify/year')
const mast = require('../../core/identify/mast')
const sail = require('../../core/identify/sail')
const createLogger = require('../../core/log')

describe('identify » create flow', function () {
  it('price and year', function () {
    const flow = createFlow([
      price,
      year
    ])

    const {data, output} = flow('Vendo vela 2011 precio 260€')

    data.should.have.property('price', 260)
    data.should.have.property('year', 2011)
    output.should.be.equal('Vendo vela  precio ')
  })

  it('sail and mast', function () {
    const flow = createFlow([
      sail(createLogger('sail_brand_unidentify')),
      mast(createLogger('sail_brand_unidentify'))
    ])

    const str = 'Neilpryde Hellcat 6,7. Mastil Rdm 430 Y Botavara North'
    const {data, output} = flow(str)
    data.should.have.property('sail size', 6.7)
    data.should.have.property('mast size', 430)
    output.should.be.equal('  . Mastil   Y Botavara North')
  })
})
