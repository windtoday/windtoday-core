'use strict'

const should = require('should')
const removePrice = require('../../../../../core/schema/transform/pretty-title/basic/remove-price')

describe('schema » transform » pretty title » remove price', function () {
  it('Mistral Syncro 280€ → Mistral Syncro', function () {
    const item = {title: 'Mistral Syncro 280€'}
    const output = removePrice(item)
    should(output).be.equal('Mistral Syncro')
  })
})
