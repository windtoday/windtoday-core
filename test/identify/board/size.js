'use strict'

const should = require('should')
const { get } = require('lodash')

const log = require('../../../core/log')('board_size_unidentify')
const board = require('../../../core/identify/board')(log)

describe('identify » board » size', function () {
  it('not detect', function () {
    ;[''].forEach(function (str) {
      const { data } = board(str)
      should(get(data, 'size')).be.undefined()
    })
  })

  it('two digits', function () {
    ;['84l', '84 l', '84 litros'].forEach(function (str) {
      const { data, output } = board(str)
      should(get(data, 'size')).be.equal(84)
      should(output).be.equal('')
    })
  })

  it('three digits', function () {
    ;['105l', '105 l', '105 litros'].forEach(function (str) {
      const { data, output } = board(str)
      should(get(data, 'size')).be.equal(105)
      should(output.includes('105')).be.false()
    })
  })

  it('detect in a string that include numbers', function () {
    ;[
      'Se vende Bic Techno 283 152l',
      'Se vende Bic Techno 283 152 l',
      'Se vende Bic Techno 283 152 litros'
    ].forEach(function (str) {
      const { data, output } = board(str)
      should(get(data, 'size')).be.equal(152)
      should(output.includes('152')).be.false()
    })
  })
})
