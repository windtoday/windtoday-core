'use strict'

const log = require('../../core/log')('fin_unidentify')
const fin = require('../../core/identify/fin')(log)
const { get } = require('lodash')

describe('identify » fin', function () {
  describe('from fins directory', function () {
    it('category', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const { data } = fin(str)
      get(data, 'category').should.be.equal('fins')
    })

    it('type', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const {data, output} = fin(str)
      get(data, 'type').should.be.equal('Trim Box')
      output.includes('trim').should.be.false()
    })

    it('brand', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const {data, output} = fin(str)
      get(data, 'brand').should.be.equal('Select')
      output.includes('select').should.be.false()
    })

    it('size', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const {data, output} = fin(str)
      get(data, 'size').should.be.equal(46)
      output.includes('46').should.be.false()
    })
  })

  describe('from accesories directory', function () {
    it('category', function () {
      const str = 'Vendo aleta NUEVA B3 46 trim box'
      const { data } = fin(str)
      get(data, 'category').should.be.equal('fins')
    })

    it('type', function () {
      const str = 'Vendo aleta NUEVA B3 46 trim box'
      const {data, output} = fin(str)
      get(data, 'type').should.be.equal('Trim Box')
      output.includes('trim').should.be.false()
    })

    it('brand', function () {
      const str = 'Vendo aleta NUEVA B3 46 trim box'
      const {data, output} = fin(str)
      get(data, 'brand').should.be.equal('B3')
      output.includes('select').should.be.false()
    })

    it('size', function () {
      const str = 'Vendo aleta NUEVA B3 46 trim box'
      const {data, output} = fin(str)
      get(data, 'size').should.be.equal(46)
      output.includes('46').should.be.false()
    })
  })
})
