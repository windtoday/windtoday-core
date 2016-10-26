'use strict'

const log = require('../../core/log')('mast_unidentify')
const mast = require('../../core/identify/mast')(log)
const { get, template } = require('lodash')

describe('identify » mast', function () {
  it('category', function () {
    const str = 'Mástil Neilpryde X9 75c 4m SDM'
    const mastDetected = mast(str)
    get(mastDetected, 'category').should.be.equal('masts')
  })

  describe('type', function () {
    const tpl = template('Mástil Neilpryde X9 4m 75c <%= type %>')

    describe('sdm', function () {
      [
        'sdm',
        'SDM'
      ].forEach(function (type) {
        it(type, function () {
          const str = tpl({type})
          const mastDetected = mast(str)
          get(mastDetected, 'type').should.be.equal('sdm')
        })
      })
    })

    describe('rdm', function () {
      [
        'rdm',
        'RDM'
      ].forEach(function (type) {
        it(type, function () {
          const str = tpl({type})
          const mastDetected = mast(str)
          get(mastDetected, 'type').should.be.equal('rdm')
        })
      })
    })
  })

  describe('carbon', function () {
    const tpl = template('Mástil Neilpryde X9 4m <%= carbon %> SDM')

    describe('two units', function () {
      [
        '75c',
        '75%'
      ].forEach(function (carbon) {
        it(carbon, function () {
          const str = tpl({carbon})
          const mastDetected = mast(str)
          get(mastDetected, 'carbon').should.be.equal(75)
        })
      })
    })

    describe('three units', function () {
      [
        '100c',
        '100%'
      ].forEach(function (carbon) {
        it(carbon, function () {
          const str = tpl({carbon})
          const mastDetected = mast(str)
          get(mastDetected, 'carbon').should.be.equal(100)
        })
      })
    })
  })

  describe('size', function () {
    const tpl = template('Mástil Neilpryde X9 <%= size %> 75c SDM')

    describe('letter', function () {
      describe('one', function () {
        [
          '4m'
        ].forEach(function (size) {
          it(size, function () {
            const str = tpl({size})
            const mastDetected = mast(str)
            get(mastDetected, 'size').should.be.equal(400)
          })
        })
      })

      xdescribe('more than one', function () {
        [
          '4.30m'
        ].forEach(function (size) {
          it(size, function () {
            const str = tpl({size})
            const mastDetected = mast(str)
            get(mastDetected, 'size').should.be.equal(430)
          })
        })
      })
    })

    describe('number', function () {
      [
        '430'
      ].forEach(function (size) {
        it(size, function () {
          const str = tpl({size})
          const mastDetected = mast(str)
          get(mastDetected, 'size').should.be.equal(430)
        })
      })
    })
  })
})
