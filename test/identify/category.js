'use strict'

const should = require('should')

const category = require('../../core/identify/category')

describe('identify » category', function () {
  it('multiple detection', function () {
    const str = 'Vela Neilpryde Hellcat 6,7. Mastil Rdm 430 Y Botavara North'
    const { data, output } = category(str)
    should(data).be.eql(['sails', 'masts', 'booms'])
    should(output).be.equal(' Neilpryde Hellcat 6,7.  Rdm 430 Y  North')
  })

  describe('keywords', function () {
    describe('fins', function () {
      ;[
        'aleta',
        'aletas',
        'aleron',
        'fin',
        'fins',
        'quilla',
        'quillas'
      ].forEach(function (keyword) {
        it(keyword, function () {
          const { data } = category(keyword)
          should(data).be.eql(['fins'])
        })
      })
    })

    describe('masts', function () {
      ;['mástil', 'mástiles', 'mastil', 'mastiles', 'mast'].forEach(function (
        keyword
      ) {
        it(keyword, function () {
          const { data } = category(keyword)
          should(data).be.eql(['masts'])
        })
      })
    })

    describe('booms', function () {
      ;['boom', 'booms', 'botavara', 'botavaras'].forEach(function (keyword) {
        it(keyword, function () {
          const { data } = category(keyword)
          should(data).be.eql(['booms'])
        })
      })
    })

    describe('sails', function () {
      ;['vela', 'velas'].forEach(function (keyword) {
        it(keyword, function () {
          const { data } = category(keyword)
          should(data).be.eql(['sails'])
        })
      })
    })

    describe('boards', function () {
      ;['tabla', 'tablas'].forEach(function (keyword) {
        it(keyword, function () {
          const { data } = category(keyword)
          should(data).be.eql(['boards'])
        })
      })
    })

    describe('others', function () {
      ;['manivela', 'starboard'].forEach(function (keyword) {
        it(keyword, function () {
          const { data } = category(keyword)
          should(data).be.eql(['others'])
        })
      })
    })
  })
})
