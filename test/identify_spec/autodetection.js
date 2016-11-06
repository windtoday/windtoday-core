'use strict'

const createAutodetection = require('../../core/identify/create-autodetection')
const autodetection = createAutodetection('autodetection_unidentify')
const { get } = require('lodash')

describe('identify » autodetection', function () {
  describe('simple', function () {
    it('fin', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const detected = autodetection(str)
      get(detected, 'category').should.be.eql(['fins'])
      get(detected, 'fin.box').should.be.equal('Trim Box')
      get(detected, 'fin.size').should.be.equal(46)
    })

    it('mast', function () {
      const str = 'Mástil North Sdm Red 460 35c'
      const detected = autodetection(str)
      get(detected, 'category').should.be.eql(['masts'])
      get(detected, 'mast.type').should.be.equal('sdm')
      get(detected, 'mast.carbon').should.be.equal(35)
      get(detected, 'mast.size').should.be.equal(460)
    })

    it('others', function () {
      const str = 'Vendo Neopreno'
      const detected = autodetection(str)
      get(detected, 'category').should.be.eql(['others'])
    })
  })

  describe('multiple', function () {
    it('sail, mast and boom', function () {
      const str = 'Vela Neilpryde Hellcat 6,7. Mastil Rdm 430 Y Botavara North'
      const detected = autodetection(str)
      get(detected, 'category').should.be.eql(['sails', 'masts', 'booms'])
      get(detected, 'mast.type').should.be.equal('rdm')
      get(detected, 'mast.size').should.be.equal('430')
      get(detected, 'sail.size').should.be.equal(6.7)
      get(detected, 'brand').should.be.equal('Neilpryde')
      get(detected, 'model').should.be.equal('Hellcat')
    })
  })
})
