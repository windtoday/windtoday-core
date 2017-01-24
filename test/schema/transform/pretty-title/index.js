'use strict'

require('should')
const prettyTitle = require('../../../../core/schema/transform/pretty-title')

describe('schema » transform » pretty title', function () {
  it('titleize', function () {
    const input = 'Vendo mistral Syncro - 280€'
    const output = prettyTitle(input)
    output.should.be.equal('Mistral Syncro')
  })

  it('whitespaces', function () {
    const input = '  Vendo  mistral  Syncro - 280€   '
    const output = prettyTitle(input)
    output.should.be.equal('Mistral Syncro')
  })
})
