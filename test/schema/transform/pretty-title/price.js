'use strict'

const should = require('should')
const prettyPrice = require('../../../../core/schema/transform/pretty-title/price')

describe('schema » transform » pretty title » remove price', function () {
  it('Mistral Syncro 280€ → Mistral Syncro', function () {
    const item = {title: 'Mistral Syncro 280€'}
    const output = prettyPrice(item)
    should(output).be.equal('Mistral Syncro')
  })
})
