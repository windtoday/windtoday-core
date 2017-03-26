'use strict'

const { get, template } = require('lodash')
const should = require('should')

const log = require('../../../core/log')('bom_unidentify')
const boom = require('../../../core/identify/boom')(log)

describe('identify » bom » size', function () {
  const tpl = template('VENDIDA Botavara Aeron 200<%= separator %>250 carbon')
  ;[
    '-',
    '/',
    ' ',
    ' - '
  ].forEach(function (separator) {
    it(separator, function () {
      const str = tpl({separator})
      const {data, output} = boom(str)
      should(get(data, 'size')).be.equal('200/250')
      should(get(data, 'category')).be.equal('booms')
      should(output.includes('200')).be.false()
      should(output.includes('250')).be.false()
    })
  })
})
