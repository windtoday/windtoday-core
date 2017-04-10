'use strict'

const should = require('should')
const { get } = require('lodash')

const createAutodetection = require('../../core/identify/autodetection')
const log = require('../../core/log')('autodetection')
const autodetection = createAutodetection(log)

describe('identify » autodetection', function () {
  describe('simple', function () {
    it('fin', function () {
      const str = 'Vendo aleta NUEVA Select 46 trim box'
      const {data, output} = autodetection(str)
      should(get(data, 'category')).be.eql(['fins'])
      should(get(data, 'fin type')).be.equal('Trim Box')
      should(get(data, 'fin size')).be.equal(46)
      should(output).be.equal('Vendo  NUEVA    box')
    })

    it('mast', function () {
      const str = 'Mástil North Sdm Red 460 35c'
      const {data, output} = autodetection(str)

      should(get(data, 'category')).be.eql(['masts'])
      should(get(data, 'mast type')).be.equal('sdm')
      should(get(data, 'mast carbon')).be.equal(35)
      should(get(data, 'mast size')).be.equal(460)
      should(output).be.equal('   Red  ')
    })

    it('others', function () {
      const str = 'Vendo Neopreno'
      const {data, output} = autodetection(str)
      should(get(data, 'category')).be.eql(['others'])
      should(output).be.equal('Vendo Neopreno')
    })
  })

  describe('multiple', function () {
    it('sail, mast and boom', function () {
      const str = 'Vela Neilpryde Hellcat 6,7. Mastil Rdm 430 Y Botavara North'
      const {data, output} = autodetection(str)
      should(get(data, 'category')).be.eql(['sails', 'masts', 'booms'])
      should(get(data, 'mast type')).be.equal('rdm')
      should(get(data, 'mast size')).be.equal(430)
      should(get(data, 'sail size')).be.equal(6.7)
      should(get(data, 'brand')).be.eql(['Neilpryde', 'North'])
      should(get(data, 'model')).be.equal('Hellcat')
      should(output).be.equal('   .    Y  ')
    })
  })
})
