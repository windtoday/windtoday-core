'use strict'

const should = require('should')
const condenseWhiteSpace = require('../../../../core/schema/transform/pretty-title/condene-white-space')

describe('schema » transform » pretty title » condense white space', function () {
  describe('basic', function () {
    it('    Mistral  Syncro     → Mistral  Syncro', function () {
      const item = {title: '    Mistral  Syncro    '}
      const output = condenseWhiteSpace(item)
      should(output).be.equal('Mistral Syncro')
    })
  })
})
