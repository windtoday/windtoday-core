'use strict'

const should = require('should')
const prettyTitle = require('../../../../core/schema/transform/pretty-title')

describe('schema » transform » pretty title', function () {
  it('whitespaces', function () {
    const input = '  Vendo  Mistral  Syncro - 280€   '
    const output = prettyTitle(input)
    should(output).be.equal('Mistral Syncro')
  })
})
