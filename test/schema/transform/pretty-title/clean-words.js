'use strict'

require('should')
const cleanWords = require('../../../../core/schema/transform/pretty-title/clean-words')

describe('schema » transform » pretty title » clean words', function () {
  const input = 'Vendo Mistral Syncro - 280€'
  const expected = 'Mistral Syncro 280€'

  it(`${input} → ${expected}`, function () {
    const output = cleanWords(input)
    output.should.be.equal(expected)
  })
})
