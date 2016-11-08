'use strict'

require('should')
const { get } = require('lodash')
const log = require('../../../core/log')('board_brand_unidentify')
const board = require('../../../core/identify/board')(log)

describe('identify » board » model', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      const {data} = board(str)
      get(data, 'category').should.be.equal('boards')
    })
  })

  it('detect', function () {
    [
      'starboard futura'
    ].forEach(function (str) {
      const {data, output} = board(str)
      get(data, 'category').should.be.equal('boards')
      get(data, 'model').should.be.equal('Futura')
      output.includes('futura').should.be.false()
    })
  })
})
