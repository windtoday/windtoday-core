'use strict'

const should = require('should')
const prettyTitle = require('../../../../core/schema/transform/pretty-title')

describe('schema » transform » pretty title', function () {
  it('    Vendo Mistral  Syncro 2016 250€    → Mistral Syncro 2016', function () {
    const item = {
      title: '    Vendo Mistral  Syncro 2016 250€   ',
      price: 250,
      year: 2016
    }
    const output = prettyTitle(item)
    should(output).be.equal('Mistral Syncro 2016')
  })
})
