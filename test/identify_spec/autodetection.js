'use strict'

const createAutodetection = require('../../core/identify/autodetection')
const autodetection = createAutodetection('autodetection_unidentify')
const { get } = require('lodash')

describe('identify » autodetection', function () {
  describe('simple', function () {
    it('fin', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const {data, output} = autodetection(str)
      get(data, 'category').should.be.eql(['fins'])
      get(data, 'fin.type').should.be.equal('Trim Box')
      get(data, 'fin.size').should.be.equal(46)
      output.should.be.equal('Vendo  NUEVA    box')
    })

    it('mast', function () {
      const str = 'Mástil North Sdm Red 460 35c'
      const {data, output} = autodetection(str)
      get(data, 'category').should.be.eql(['masts'])
      get(data, 'mast.type').should.be.equal('sdm')
      get(data, 'mast.carbon').should.be.equal(35)
      get(data, 'mast.size').should.be.equal(460)
      output.should.be.equal('il North  Red  ')
    })

    it('others', function () {
      const str = 'Vendo Neopreno'
      const {data, output} = autodetection(str)
      get(data, 'category').should.be.eql(['others'])
      output.should.be.equal('Vendo Neopreno')
    })
  })

  describe('multiple', function () {
    it('sail, mast and boom', function () {
      const str = 'Vela Neilpryde Hellcat 6,7. Mastil Rdm 430 Y Botavara North'
      const {data, output} = autodetection(str)
      get(data, 'category').should.be.eql(['sails', 'masts', 'booms'])
      get(data, 'mast.type').should.be.equal('rdm')
      get(data, 'mast.size').should.be.equal(430)
      get(data, 'sail.size').should.be.equal(6.7)
      get(data, 'brand').should.be.equal('Neilpryde')
      get(data, 'model').should.be.equal('Hellcat')
      output.should.be.equal('   . il   Y  North')
    })
  })
})
