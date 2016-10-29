'use strict'

const createAutodetection = require('../../core/identify/create-autodetection')
const log = require('../../core/log')('autodetection_unidentify')

const autodetection = createAutodetection(log)
const { get } = require('lodash')

describe('identify » autodetection', function () {
  it('one identifier', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const detected = autodetection(str)

    get(detected, 'category').should.be.equal('fins')
    get(detected, 'box').should.be.equal('Trim Box')
  })

  it('two identifier', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const detected = autodetection(str)
    get(detected, 'category').should.be.equal('fins')
    get(detected, 'box').should.be.equal('Trim Box')
  })

  it('best effort', function () {
    const str = 'Vendo Neopreno'
    const detected = autodetection(str)
    get(detected, 'category').should.be.equal('others')
  })
})
