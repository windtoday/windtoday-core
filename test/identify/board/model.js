'use strict'

const { get } = require('lodash')
const should = require('should')

const log = require('../../../core/log')('board_brand_unidentify')
const board = require('../../../core/identify/board')(log)

describe('identify » board » model', function () {
  it('not detect', function () {
    ;[''].forEach(function (str) {
      const { data } = board(str)
      should(get(data, 'category')).be.equal('boards')
    })
  })

  it('detect', function () {
    ;['starboard futura'].forEach(function (str) {
      const { data, output } = board(str)
      should(get(data, 'category')).be.equal('boards')
      should(get(data, 'model')).be.equal('Futura')
      should(output.includes('futura')).be.false()
    })
  })
})
