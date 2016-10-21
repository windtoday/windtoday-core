'use titleict'

require('should')
const createLog = require('../../core/log')
const mixin = require('../../core/identify/mixin')({
  sailLogger: createLog('mixin_sail_unidentify'),
  boardLogger: createLog('mixin_board_unidentify')
})

describe('identify » mixin', function () {
  describe('sails', function () {
    it('brand and model', function () {
      const title = 'vendo ga-sails vapor 11m 2015'
      mixin({title}).should.be.eql({
        size: 11,
        brand: 'Gaastra',
        category: 'sails',
        model: 'Vapor'
      })
    })
  })

  describe('board', function () {
    it('brand and model', function () {
      const title = 'vendo tabla f2 Stoke 132 litros rebajada a 300€'
      mixin({title}).should.be.eql({
        brand: 'F2',
        category: 'boards',
        model: 'Stoke',
        litres: 132
      })
    })
  })

  describe('others', function () {
    it('brand', function () {
      const title = 'Botavara Neilpryde X9 2013 180230'
      mixin({title}).should.be.eql({
        brand: 'Neilpryde',
        category: 'others'
      })
    })
  })
})
