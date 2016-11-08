'use strict'

require('should')
const { get } = require('lodash')
const log = require('../../../core/log')('board_brand_unidentify')
const board = require('../../../core/identify/board')(log)

describe('identify » board » brand', function () {
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
      'starboard'
    ].forEach(function (str) {
      const {data, output} = board(str)
      get(data, 'category').should.be.equal('boards')
      get(data, 'brand').should.be.equal('Starboard')
      output.includes('starboard').should.be.false()
    })
  })
})
