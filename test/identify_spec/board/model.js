'use strict'

const should = require('should')
const { get } = require('lodash')
const log = require('../../../core/log')('board_brand_unidentify')
const board = require('../../../core/identify/board')(log)

describe('identify » board » model', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (title) {
      const boardDetected = board({title})
      get(boardDetected, 'category').should.be.equal('boards')
    })
  })

  it('detect', function () {
    [
      'starboard futura'
    ].forEach(function (title) {
      const boardDetected = board({title})
      get(boardDetected, 'category').should.be.equal('boards')
      get(boardDetected, 'model').should.be.equal('Futura')
    })
  })
})
