'use strict'

const createFlow = require('../../core/identify/create-flow')
const log = require('../../core/log')
const price = require('../../core/identify/price')
const year = require('../../core/identify/year')
const mast = require('../../core/identify/mast')(log('test'))
const sail = require('../../core/identify/sail')(log('test'))

describe('identify » create flow', function () {
  it('price and year', function () {
    const flow = createFlow({
      identifiers: [
        {fn: price, name: 'price'},
        {fn: year, name: 'year'}
      ]
    })

    const {data, output} = flow('Vendo vela 2011 precio 260€')

    data.should.have.property('price', 260)
    data.should.have.property('year', 2011)
    output.should.be.equal('Vendo vela  precio ')
  })

  it('sail and mast', function () {
    const flow = createFlow({
      identifiers: [
        {fn: sail, name: 'sail'},
        {fn: mast, name: 'mast'}
      ]
    })

    const str = 'Neilpryde Hellcat 6,7. Mastil Rdm 430 Y Botavara North'
    const {data, output} = flow(str)

    data.should.have.property('sail.size', 6.7)
    data.should.have.property('mast.size', 430)
    output.should.be.equal('  . Mastil   Y Botavara North')
  })
})
