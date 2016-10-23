'use strict'

const category = require('../../core/identify/category')

describe('identify » category', function () {
  describe('fins', function () {
    describe('keywords', function () {
      describe('truthy', function () {
        [
          'aleta',
          'fin',
          'quilla'
        ].forEach(function (keyword) {
          it(keyword, function () {
            category.fins(keyword).should.be.true()
          })
        })
      })
    })
  })

  describe('masts', function () {
    describe('keywords', function () {
      describe('truthy', function () {
        [
          'mástil',
          'mastil',
          'mast'
        ].forEach(function (keyword) {
          it(keyword, function () {
            category.masts(keyword).should.be.true()
          })
        })
      })
    })
  })

  describe('booms', function () {
    describe('keywords', function () {
      describe('truthy', function () {
        [
          'boom',
          'botavara'
        ].forEach(function (keyword) {
          it(keyword, function () {
            category.booms(keyword).should.be.true()
          })
        })
      })
    })
  })

  describe('sails', function () {
    describe('keywords', function () {
      describe('truthy', function () {
        [
          'vela',
          'sails'
        ].forEach(function (keyword) {
          it(keyword, function () {
            category.sails(keyword).should.be.true()
          })
        })
      })

      describe('falsy', function () {
        [
          'manivela'
        ].forEach(function (keyword) {
          it(keyword, function () {
            category.sails(keyword).should.be.false()
          })
        })
      })
    })
  })

  describe('boards', function () {
    describe('keywords', function () {
      describe('truthy', function () {
        [
          'board',
          'tabla'
        ].forEach(function (keyword) {
          it(keyword, function () {
            category.boards(keyword).should.be.true()
          })
        })
      })

      describe('falsy', function () {
        [
          'starboard'
        ].forEach(function (keyword) {
          it(keyword, function () {
            category.boards(keyword).should.be.false()
          })
        })
      })
    })
  })
})
