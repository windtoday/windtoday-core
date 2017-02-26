'use strict'

const should = require('should')
const cleanTitleWords = require('../../core/util/clean-words')

describe('core » util » clean title words', function () {
  describe('words', function () {
    [
      'aleta',
      'tabla',
      'tablas',
      'board',
      'boards',
      'aletas',
      'botavara',
      'botavaras',
      'boom',
      'booms',
      'de',
      'del',
      'fin',
      'fins',
      'vela',
      'velas',
      'vendo',
      'mástil',
      'mástiles',
      'mastil',
      'mastiles',
      'windsurf',
      'windsurfing'
    ].forEach(function (word) {
      it(word, function () {
        const input = `${word} Mistral Syncro switch${word}`
        const expected = `Mistral Syncro switch${word}`
        const output = cleanTitleWords(input)
        should(output).be.equal(expected)
      })
    })
  })

  describe('non words', function () {
    it('-', function () {
      const input = 'Mistral Syncro - €280'
      const expected = 'Mistral Syncro €280'
      const output = cleanTitleWords(input)
      should(output).be.equal(expected)
    })

    it('.-', function () {
      const input = 'Mistral Syncro .- €280'
      const expected = 'Mistral Syncro €280'
      const output = cleanTitleWords(input)
      should(output).be.equal(expected)
    })

    it('----', function () {
      const input = 'SIMMER -------- 5.7 ---- 150€'
      const expected = 'SIMMER 5.7 150€'
      const output = cleanTitleWords(input)
      should(output).be.equal(expected)
    })
  })
})
