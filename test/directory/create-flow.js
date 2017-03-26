'use strict'

const should = require('should')

const createFlow = require('../../core/directory/create-flow')
const directory = require('../../core/directory')
const {sails, fins, accesories} = directory

describe('directory » create flow', function () {
  describe('fins & accesories', function () {
    it('get a brand present in the first directory', function () {
      const dir = createFlow([fins, accesories])
      const str = 'Vendo MFC Freewave 28cm Usbox - 45€'
      const output = dir(str)

      should(output).be.eql({
        data: { brand: 'MFC', type: 'US Box' },
        output: 'Vendo  Freewave 28cm box - 45€'
      })
    })

    it('get a brand present in the second directory', function () {
      const dir = createFlow([fins, accesories])
      const str = 'Vendo B3 Freewave 28cm Usbox - 45€'
      const output = dir(str)

      should(output).be.eql({
        data: { brand: 'B3', type: 'US Box' },
        output: 'Vendo  Freewave 28cm box - 45€'
      })
    })

    it('try to get a brand missing in both directories', function () {
      const dir = createFlow([fins, accesories])
      const output = dir('foo bar')

      should(output).be.eql({
        data: {},
        output: 'foo bar'
      })
    })
  })

  describe('sails & accesories', function () {
    it('get a brand present in the first directory', function () {
      const dir = createFlow([sails, accesories])
      const str = 'Northsails Red Boom 2014 150'
      const output = dir(str)

      should(output).be.eql({
        data: { brand: 'North' },
        output: 'sails Red Boom 2014 150'
      })
    })

    it('get a brand present in the second directory', function () {
      const dir = createFlow([sails, accesories])
      const str = 'Chinook Red Boom 2014 150'
      const output = dir(str)

      should(output).be.eql({
        data: { brand: 'Chinook' },
        output: ' Red Boom 2014 150'
      })
    })

    it('try to get a brand missing in both directories', function () {
      const dir = createFlow([sails, accesories])
      const str = 'foo bar'
      const output = dir(str)

      should(output).be.eql({
        data: {},
        output: str
      })
    })
  })
})
