'use strict'

const log = require('../../../core/log')('bom_unidentify')
const boom = require('../../../core/identify/boom')(log)
const { get } = require('lodash')

describe('identify » bom » type', function () {
  it('carbon', function () {
    const str = ('Botavara Aeron 200/250 carbono')
    const {data, output} = boom(str)
    get(data, 'type').should.be.equal('carbon')
    get(data, 'category').should.be.equal('booms')
    output.includes('carbon').should.be.false()
  })

  it('aluminium (non carbon)', function () {
    const str = ('Botavara Aeron 200/250')
    const {data, output} = boom(str)
    get(data, 'type').should.be.equal('aluminium')
    get(data, 'category').should.be.equal('booms')
    output.includes('aluminium').should.be.false()
  })
})
