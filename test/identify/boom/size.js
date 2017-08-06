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
      {str: 'North Epx Grom 120-180', size: 120, range: '100cm to 150cm'},
      {str: 'Aeron Mct 29 175 2017', size: 175, range: '150cm to 200cm'},
      {str: 'Neilpryde X3 140-190', size: 140, range: '100cm to 150cm'},
      {str: 'Aeron Mct 29 175 2017', size: 175, range: '150cm to 200cm'}
    ].forEach(({str, size, range}) => {
      it(`${str} → ${size}`, function () {
        const { data } = boom(str)
        should(get(data, 'size')).be.equal(size)
        should(get(data, 'category')).be.equal('booms')
        should(get(data, 'size range')).be.equal(range)
      })
    })
  })
})
