'use strict'

const should = require('should')
const removePrice = require('../../../../core/schema/transform/pretty-title/remove-price')

describe('schema » transform » pretty title » remove price', function () {
  it('Mistral Syncro 280€ → Mistral Syncro', function () {
    const str = 'Mistral Syncro 280€'
    const output = removePrice(str)
    should(output).be.equal('Mistral Syncro')
  })
})
