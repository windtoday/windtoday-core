'use strict'

const should = require('should')
const { get } = require('lodash')

const log = require('../../core/log')('fin_unidentify')
const fin = require('../../core/identify/fin')(log)

describe('identify » fin', function () {
  describe('from fins directory', function () {
    it('category', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const { data } = fin(str)
      should(get(data, 'category')).be.equal('fins')
    })

    it('type', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const {data, output} = fin(str)
      should(get(data, 'type')).be.equal('Trim Box')
      should(output.includes('trim')).be.false()
    })

    it('brand', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const {data, output} = fin(str)
      should(get(data, 'brand')).be.equal('Select')
      should(output.includes('select')).be.false()
    })

    it('size', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const {data, output} = fin(str)
      should(get(data, 'size')).be.equal(46)
      should(output.includes('46')).be.false()
    })
  })

  describe('from accesories directory', function () {
    it('category', function () {
      const str = 'Vendo aleta NUEVA B3 46 trim box'
      const { data } = fin(str)
      should(get(data, 'category')).be.equal('fins')
    })

    it('type', function () {
      const str = 'Vendo aleta NUEVA B3 46 trim box'
      const {data, output} = fin(str)
      should(get(data, 'type')).be.equal('Trim Box')
      should(output.includes('trim')).be.false()
    })

    it('brand', function () {
      const str = 'Vendo aleta NUEVA B3 46 trim box'
      const {data, output} = fin(str)
      should(get(data, 'brand')).be.equal('B3')
      should(output.includes('select')).be.false()
    })

    it('size', function () {
      const str = 'Vendo aleta NUEVA B3 46 trim box'
      const {data, output} = fin(str)
      should(get(data, 'size')).be.equal(46)
      should(output.includes('46')).be.false()
    })
  })
})
