'use strict'

const should = require('should')
const cleanWords = require('../../../../core/schema/transform/pretty-title/clean-words')

describe('schema » transform » pretty title » clean words', function () {
  it('vendo', function () {
    const input = 'Vendo Mistral Syncro'
    const expected = 'Mistral Syncro'
    const output = cleanWords(input)
    should(output).be.equal(expected)
  })

  it('-', function () {
    const input = 'Mistral Syncro - €280'
    const expected = 'Mistral Syncro €280'
    const output = cleanWords(input)
    should(output).be.equal(expected)
  })

  it('.-', function () {
    const input = 'Mistral Syncro .- €280'
    const expected = 'Mistral Syncro €280'
    const output = cleanWords(input)
    should(output).be.equal(expected)
  })

  it('----', function () {
    const input = 'SIMMER -------- 5.7 ---- 150€'
    const expected = 'SIMMER 5.7 150€'
    const output = cleanWords(input)
    should(output).be.equal(expected)
  })

  it('de', function () {
    const input = 'Gaastra Nitro 3 de 9.8'
    const expected = 'Gaastra Nitro 3 9.8'
    const output = cleanWords(input)
    should(output).be.equal(expected)
  })

  it('del', function () {
    const input = 'Gaastra Nitro 3 del 2011'
    const expected = 'Gaastra Nitro 3 2011'
    const output = cleanWords(input)
    should(output).be.equal(expected)
  })
})
