'use strict'

const category = require('../../core/identify/category')

describe('identify » category', function () {
  describe('keywords', function () {
    describe('fins', function () {
      [
        'aleta',
        'aletas',
        'aleron',
        'fin',
        'fins',
        'quilla',
        'quillas'
      ].forEach(function (keyword) {
        it(keyword, function () {
          category.fins(keyword).should.be.true()
          category(keyword).should.be.equal('fins')
        })
      })
    })

    describe('masts', function () {
      [
        'mástil',
        'mástiles',
        'mastil',
        'mastiles',
        'mast'
      ].forEach(function (keyword) {
        it(keyword, function () {
          category.masts(keyword).should.be.true()
          category(keyword).should.be.equal('masts')
        })
      })
    })

    describe('booms', function () {
      [
        'boom',
        'booms',
        'botavara',
        'botavaras'
      ].forEach(function (keyword) {
        it(keyword, function () {
          category.booms(keyword).should.be.true()
          category(keyword).should.be.equal('booms')
        })
      })
    })

    describe('sails', function () {
      [
        'vela',
        'velas',
        'sail'
      ].forEach(function (keyword) {
        it(keyword, function () {
          category.sails(keyword).should.be.true()
          category(keyword).should.be.equal('sails')
        })
      })
    })

    describe('boards', function () {
      [
        'board',
        'boards',
        'tabla',
        'tablas'
      ].forEach(function (keyword) {
        it(keyword, function () {
          category.boards(keyword).should.be.true()
          category(keyword).should.be.equal('boards')
        })
      })
    })

    describe('others', function () {
      [
        'manivela',
        'starboard'
      ].forEach(function (keyword) {
        it(keyword, function () {
          category.sails(keyword).should.be.false()
          category(keyword).should.be.equal('others')
        })
      })
    })
  })
})
