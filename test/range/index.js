'use strict'

const should = require('should')

const getRangeProps = require('../../core/range')

const TESTS = [
  {
    propName: 'board size',
    doc: { 'board size': 128 },
    expected: { 'board size range': '120l to 130l' }
  },
  {
    propName: 'boom size',
    doc: { 'boom size': 175 },
    expected: { 'boom size range': '150cm to 200cm' }
  },
  {
    propName: 'mast carbon',
    doc: { 'mast carbon': 75 },
    expected: { 'mast carbon range': 'C70 to C80' }
  },
  {
    propName: 'mast size',
    doc: { 'mast size': 400 },
    expected: { 'mast size range': '400cm to 430cm' }
  },
  {
    propName: 'sail size',
    doc: { 'sail size': 4.9 },
    expected: { 'sail size range': '4m to 5m' }
  }
]

describe('core » range', function () {
  TESTS.forEach(({ propName, doc, expected }) => {
    it(propName, () => {
      const rangeProps = getRangeProps(doc)
      should(rangeProps).be.eql(expected)
    })
  })
})
