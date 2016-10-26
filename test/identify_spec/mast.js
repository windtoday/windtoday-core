'use strict'

const log = require('../../core/log')('mast_unidentify')
const mast = require('../../core/identify/mast')(log)
const { get } = require('lodash')

describe('identify » mast', function () {
  it('category', function () {
    const str = 'Mástil Neilpryde X9 4m SDM'
    const mastDetected = mast(str)
    get(mastDetected, 'category').should.be.equal('masts')
  })

  describe('type', function () {
    it('sdm', function () {
      const str = 'Mástil Neilpryde X9 4m SDM'
      const mastDetected = mast(str)
      get(mastDetected, 'type').should.be.equal('sdm')
    })

    it('rdm', function () {
      const str = 'Mástil Neilpryde X9 4m RDM'
      const mastDetected = mast(str)
      get(mastDetected, 'type').should.be.equal('rdm')
    })
  })

  xdescribe('carbon', function () {
    it('75c', function () {
      const str = 'Mástil Neilpryde X9 4m RDM 75c'
      const mastDetected = mast(str)
      get(mastDetected, 'carbon').should.be.equal(75)
    })

    it('75%', function () {
      const str = 'Mástil Neilpryde X9 4m RDM 75%'
      const mastDetected = mast(str)
      get(mastDetected, 'carbon').should.be.equal(75)
    })
  })

  xdescribe('size', function () {
    it('4m', function () {
      const str = 'Mástil Neilpryde X9 4m RDM'
      const mastDetected = mast(str)
      get(mastDetected, 'size').should.be.equal(400)
    })

    it('400', function () {
      const str = 'Mástil Neilpryde X9 4m RDM'
      const mastDetected = mast(str)
      get(mastDetected, 'size').should.be.equal(400)
    })
  })
})
