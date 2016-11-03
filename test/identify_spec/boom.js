'use strict'

const log = require('../../core/log')('bom_unidentify')
const boom = require('../../core/identify/boom')(log)
const { get, template } = require('lodash')

describe('identify » bom', function () {
  describe('size', function () {
    const tpl = template('VENDIDA Botavara Aeron 200<%= separator %>250 carbon')

    ;[
      '-',
      '/',
      ' ',
      ' - '
    ].forEach(function (separator) {
      it(separator, function () {
        const str = tpl({separator})
        const boomDetected = boom(str)
        get(boomDetected, 'size').should.be.equal('200/250')
        get(boomDetected, 'category').should.be.equal('booms')
      })
    })
  })
})
