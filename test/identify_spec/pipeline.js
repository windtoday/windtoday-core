'use strict'

const createPipeline = require('../../core/identify/create-pipeline')
const log = require('../../core/log')('fin_unidentify')
const mast = require('../../core/identify/mast')(log)
const fin = require('../../core/identify/fin')(log)
const { get } = require('lodash')

describe('identify » pipeline', function () {
  it('one identifier', function () {
    const pipeline = createPipeline([fin])
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const detected = pipeline(str)
    get(detected, 'category').should.be.equal('fins')
    get(detected, 'type').should.be.equal('Trim Box')
  })

  it('two identifier', function () {
    const pipeline = createPipeline([mast, fin])
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const detected = pipeline(str)
    get(detected, 'category').should.be.equal('fins')
    get(detected, 'type').should.be.equal('Trim Box')
  })

  it('best effort', function () {
    const pipeline = createPipeline([mast, fin])
    const str = 'Vendo Neopreno'
    const detected = pipeline(str)
    get(detected, 'category').should.be.equal('others')
  })
})
