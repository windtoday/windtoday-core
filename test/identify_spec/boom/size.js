'use strict'

const log = require('../../../core/log')('bom_unidentify')
const boom = require('../../../core/identify/boom')(log)
const { get, template } = require('lodash')

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
      get(data, 'size').should.be.equal('200/250')
      get(data, 'category').should.be.equal('booms')
      output.includes('200').should.be.false()
      output.includes('250').should.be.false()
    })
  })
})
