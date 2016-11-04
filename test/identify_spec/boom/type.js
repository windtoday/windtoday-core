'use strict'

const log = require('../../../core/log')('bom_unidentify')
const boom = require('../../../core/identify/boom')(log)
const { get } = require('lodash')

describe('identify » bom » type', function () {
  it('carbon', function () {
    const str = ('Botavara Aeron 200/250 carbono')
    const boomDetected = boom(str)
    get(boomDetected, 'type').should.be.equal('carbon')
    get(boomDetected, 'category').should.be.equal('booms')
  })
})
