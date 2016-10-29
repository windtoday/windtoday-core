'use strict'

const log = require('../../core/log')('fin_unidentify')
const fin = require('../../core/identify/fin')(log)
const { get, template } = require('lodash')

describe('identify » fin', function () {
  it('category', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const finDetected = fin(str)
    get(finDetected, 'category').should.be.equal('fins')
  })

  it('type', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const finDetected = fin(str)
    get(finDetected, 'type').should.be.equal('Trim Box')
  })

  it('brand', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const finDetected = fin(str)
    get(finDetected, 'brand').should.be.equal('Select')
  })

  it('size', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const finDetected = fin(str)
    get(finDetected, 'size').should.be.equal(46)
  })
})
