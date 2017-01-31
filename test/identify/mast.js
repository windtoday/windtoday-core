'use strict'

const log = require('../../core/log')('mast_unidentify')
const mast = require('../../core/identify/mast')(log)
const { get, template } = require('lodash')

describe('identify » mast', function () {
  it('category', function () {
    const str = 'Mástil Neilpryde X9 75c 4m SDM'
    const {data} = mast(str)
    get(data, 'category').should.be.equal('masts')
  })

  it('brand', function () {
    const str = 'Mástil Neilpryde X9 75c 4m SDM'
    const {data, output} = mast(str)
    get(data, 'brand').should.be.equal('Neilpryde')
    output.includes('Neilpryde').should.be.false()
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
          const {data, output} = mast(str)
          get(data, 'type').should.be.equal('sdm')
          output.includes('sdm').should.be.false()
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
          const {data, output} = mast(str)
          get(data, 'type').should.be.equal('rdm')
          output.includes('rdm').should.be.false()
        })
      })
    })
  })

  describe('carbon', function () {
    const tpl = template('Mástil Neilpryde X9 4m <%= carbon %> SDM')

    describe('two units', function () {
      [
        '75c',
        '75C',
        'c75',
        'C75',
        'X75',
        '75%'
      ].forEach(function (carbon) {
        it(carbon, function () {
          const str = tpl({carbon})
          const {data, output} = mast(str)
          get(data, 'carbon').should.be.equal(75)
          output.includes('75').should.be.false()
        })
      })
    })

    describe('three units', function () {
      [
        '100c',
        '100C',
        'c100',
        'C100',
        '100%'
      ].forEach(function (carbon) {
        it(carbon, function () {
          const str = tpl({carbon})
          const {data, output} = mast(str)
          get(data, 'carbon').should.be.equal(100)
          output.includes('100').should.be.false()
        })
      })
    })
  })

  describe('size', function () {
    const tpl = template('Mástil Neilpryde X9 <%= size %> 75c SDM')

    describe('letter', function () {
      describe('one', function () {
        [
          '4m',
          '4.0'
        ].forEach(function (size) {
          it(size, function () {
            const str = tpl({size})
            const {data, output} = mast(str)
            get(data, 'size').should.be.equal(400)
            output.includes('4').should.be.false()
          })
        })
      })

      describe('more than one', function () {
        [
          '3.7',
          '3,7',
          '3.70',
          '3.70m',
          '3.7m'
        ].forEach(function (size) {
          it(size, function () {
            const str = tpl({size})
            const {data, output} = mast(str)
            get(data, 'size').should.be.equal(370)
            output.includes('3').should.be.false()
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
          const {data, output} = mast(str)
          get(data, 'size').should.be.equal(430)
          output.includes('430').should.be.false()
        })
      })
    })
  })
})
