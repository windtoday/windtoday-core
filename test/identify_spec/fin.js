'use strict'

const log = require('../../core/log')('fin_unidentify')
const fin = require('../../core/identify/fin')(log)
const { get } = require('lodash')

describe('identify » fin', function () {
  it('category', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const finDetected = fin(str)
    get(finDetected, 'category').should.be.equal('fins')
  })

  it('box', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const finDetected = fin(str)
    get(finDetected, 'box').should.be.equal('Trim Box')
  })

  it('brand', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const finDetected = fin(str)
    get(finDetected, 'brand').should.be.equal('Select')
  })

  it('size', function () {
    [
      'Vendo aleta NUEVA Select 46 trim box',
      'Aletas Varias Tuttle Box 100€ y 85€ medida 46',
      'Aletas Varias Tuttle Box 85e medida 46',
      'Aletas Varias Tuttle Box 85E medida 46',
      'Aletas Varias Tuttle Box €85 medida 46'
    ].forEach(function (str) {
      const finDetected = fin(str)
      get(finDetected, 'size').should.be.equal(46)
    })
  })
})
