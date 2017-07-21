'use strict'

const { get, template } = require('lodash')
const should = require('should')

const log = require('../../core/log')('mast_unidentify')
const mast = require('../../core/identify/mast')(log)

describe('identify » mast', function () {
  it('category', function () {
    const str = 'Mástil Neilpryde X9 75c 4m SDM'
    const { data } = mast(str)
    should(get(data, 'category')).be.equal('masts')
  })

  describe('brand', function () {
    it('Mástil Neilpryde X9 75c 4m SDM → Neilpryde', function () {
      const str = 'Mástil Neilpryde X9 75c 4m SDM'
      const { data, output } = mast(str)
      should(get(data, 'brand')).be.equal('Neilpryde')
      should(output.includes('Neilpryde')).be.false()
    })

    it('LOFTSAILS Mast SDM Vision C75% 2017 → Loft', function () {
      const str = 'LOFTSAILS Mast SDM Vision C75% 2017'
      const { data, output } = mast(str)
      should(get(data, 'brand')).be.equal('Loft')
      should(output.includes('Loft')).be.false()
    })
  })

  describe('type', function () {
    const tpl = template('Mástil Neilpryde X9 4m 75c <%= type %>')

    describe('sdm', function () {
      ;['sdm', 'SDM'].forEach(function (type) {
        it(type, function () {
          const str = tpl({ type })
          const { data, output } = mast(str)
          should(get(data, 'type')).be.equal('sdm')
          should(output.includes('sdm')).be.false()
        })
      })
    })

    describe('rdm', function () {
      ;['rdm', 'RDM'].forEach(function (type) {
        it(type, function () {
          const str = tpl({ type })
          const { data, output } = mast(str)
          should(get(data, 'type')).be.equal('rdm')
          should(output.includes('rdm')).be.false()
        })
      })
    })
  })

  describe('carbon', function () {
    const tpl = template('Mástil Neilpryde 4m <%= carbon %> SDM')

    describe('two units', function () {
      ;['75c', '75C', 'c75', 'C75', 'X75', 'C75%', '75%'].forEach(function (carbon) {
        it(carbon, function () {
          const str = tpl({ carbon })
          const { data, output } = mast(str)
          should(get(data, 'carbon')).be.equal(75)
          should(output.includes('75')).be.false()
        })
      })
    })

    describe('three units', function () {
      ;['100c', '100C', 'c100', 'C100', 'C100%', '100%'].forEach(function (carbon) {
        it(carbon, function () {
          const str = tpl({ carbon })
          const { data, output } = mast(str)
          should(get(data, 'carbon')).be.equal(100)
          should(output.includes('100')).be.false()
        })
      })
    })

    describe('custom vendors', function () {
      ;['Spx65', 'Spx 65', 'flx65', 'flx 65'].forEach(function (carbon) {
        it.only(carbon, function () {
          const str = tpl({ carbon })
          const { data, output } = mast(str)
          should(get(data, 'carbon')).be.equal(65)
        })
      })
    })
  })

  describe('size', function () {
    const tpl = template('Mástil Neilpryde X9 <%= size %> 75c SDM')

    describe('letter', function () {
      describe('one', function () {
        ;['400cm', '4m', '4.0'].forEach(function (size) {
          it(size, function () {
            const str = tpl({ size })
            const { data, output } = mast(str)
            should(get(data, 'size')).be.equal(400)
            should(output.includes('4')).be.false()
          })
        })
      })

      describe('more than one', function () {
        ;['3.7', '3,7', '3.70', '3.70m', '3.7m'].forEach(function (size) {
          it(size, function () {
            const str = tpl({ size })
            const { data, output } = mast(str)
            should(get(data, 'size')).be.equal(370)
            should(output.includes('3')).be.false()
          })
        })
      })
    })
  })
})
