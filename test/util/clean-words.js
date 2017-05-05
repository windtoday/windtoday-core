'use strict'

const should = require('should')
const cleanTitleWords = require('../../core/util/clean-words')

describe('core » util » clean title words', function () {
  describe('words', function () {
    [
      'aleta',
      'aletas',
      'board',
      'boards',
      'boom',
      'booms',
      'botavara',
      'botavaras',
      'de',
      'del',
      'fin',
      'fins',
      'mastil',
      'mástil',
      'mastiles',
      'mástiles',
      'new',
      'nuevo',
      'tabla',
      'tablas',
      'vela',
      'velas',
      'vendo',
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
    describe('-', function () {
      it('in the beginning', function () {
        const input = '- Blacklabel Series Ns-60 (ht) Sdm'
        const expected = 'Blacklabel Series Ns-60 (ht) Sdm'
        const output = cleanTitleWords(input)
        should(output).be.equal(expected)
      })

      it('in the middle', function () {
        const input = 'Mistral Syncro - €280'
        const expected = 'Mistral Syncro €280'
        const output = cleanTitleWords(input)
        should(output).be.equal(expected)
      })

      it('repetition', function () {
        const input = 'SIMMER -------- 5.7 ---- 150€'
        const expected = 'SIMMER 5.7 150€'
        const output = cleanTitleWords(input)
        should(output).be.equal(expected)
      })

      it('after a point', function () {
        const input = 'Mistral Syncro .- €280'
        const expected = 'Mistral Syncro €280'
        const output = cleanTitleWords(input)
        should(output).be.equal(expected)
      })
    })
  })
})
