'use strict'

const createAutodetection = require('../../core/identify/create-autodetection')
const autodetection = createAutodetection('autodetection_unidentify')
const { get } = require('lodash')

describe('identify » autodetection', function () {
  it('fin', function () {
    const str = 'Vendo aleta NUEVA Select 46 trim box'
    const detected = autodetection(str)
    get(detected, 'category').should.be.equal('fins')
    get(detected, 'box').should.be.equal('Trim Box')
  })

  it('mast', function () {
    const str = 'Mástil North Sails Sdm Red 460 35c'
    const detected = autodetection(str)
    get(detected, 'category').should.be.equal('masts')
    get(detected, 'type').should.be.equal('sdm')
    get(detected, 'carbon').should.be.equal(35)
    get(detected, 'size').should.be.equal(460)
  })

  it('others', function () {
    const str = 'Vendo Neopreno'
    const detected = autodetection(str)
    get(detected, 'category').should.be.equal('others')
  })
})
