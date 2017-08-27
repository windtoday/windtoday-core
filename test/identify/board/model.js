'use strict'

const { get } = require('lodash')
const should = require('should')

const log = {
  warn: () => {}
}
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
      should(get(data, 'modality')).be.equal('Freerace')
      should(output.includes('futura')).be.false()
    })
  })
})
