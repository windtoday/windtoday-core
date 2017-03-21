'use strict'

const log = require('../../../core/log')('mast_unidentify')
const boom = require('../../../core/identify/boom')(log)
const { get } = require('lodash')

describe('identify » boom', function () {
  it('category', function () {
    const str = 'Northsails Red Boom 2014 150'
    const {data} = boom(str)
    get(data, 'category').should.be.equal('booms')
  })

  it('brand', function () {
    const str = 'Northsails Red Boom 2014 150'
    const {data, output} = boom(str)
    get(data, 'brand').should.be.equal('North')
    output.includes('North').should.be.false()
  })
})