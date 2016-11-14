'use strict'

const createFlow = require('../../core/identify/create-flow')
const price = require('../../core/identify/price')
const year = require('../../core/identify/year')

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
})
