'use strict'

const { get } = require('lodash')
const should = require('should')

const log = require('../../../core/log')('mast_unidentify')
const boom = require('../../../core/identify/boom')(log)

describe('identify » boom', function () {
  describe('from sails directory', function () {
    it('category', function () {
      const str = 'Northsails Red Boom 2014 150'
      const {data} = boom(str)
      should(get(data, 'category')).be.equal('booms')
    })

    it('brand', function () {
      const str = 'Northsails Red Boom 2014 150'
      const {data, output} = boom(str)
      should(get(data, 'brand')).be.equal('North')
      should(output.includes('North')).be.false()
    })
  })

  describe('from accesories directory', function () {
    it('category', function () {
      const str = 'Chinook Red Boom 2014 150'
      const {data} = boom(str)
      should(get(data, 'category')).be.equal('booms')
    })

    it('brand', function () {
      const str = 'Chinook Red Boom 2014 150'
      const {data, output} = boom(str)
      should(get(data, 'brand')).be.equal('Chinook')
      should(output.includes('Chinook')).be.false()
    })
  })
})
