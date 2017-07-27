'use strict'

const { get } = require('lodash')
const should = require('should')

const log = {
  warn: () => {}
}

const boom = require('../../../core/identify/boom')(log)

describe('identify » boom » size', function () {
  describe('detect minimum size', function () {
    ;[
      {str: 'North Epx Grom 120-180', expected: 120},
      {str: 'Aeron Mct 29 175 2017', expected: 175}
    ].forEach(({str, expected}) => {
      it(`${str} → ${expected}`, function () {
        const { data } = boom(str)
        should(get(data, 'size')).be.equal(expected)
        should(get(data, 'category')).be.equal('booms')
      })
    })
  })
})
