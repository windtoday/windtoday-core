'use strict'

const should = require('should')

const createFlow = require('../../core/directory/create-flow')
const directory = require('../../core/directory')
const {sails, accesories} = directory

describe('directory » create flow', function () {
  describe('sail & accesories', function () {
    const dir = createFlow([sails, accesories])

    it('get a brand present in the first directory', function () {
      const str = 'Northsails Red Boom 2014 150'
      const output = dir(str)
      should(output).be.eql({
        data: { brand: 'North' },
        output: 'sails Red Boom 2014 150'
      })
    })

    it('get a brand present in the second directory', function () {
      const str = 'Chinook Red Boom 2014 150'
      const output = dir(str)
      should(output).be.eql({
        data: { brand: 'Chinook' },
        output: ' Red Boom 2014 150'
      })
    })

    it('try to get a brand missing in both directories', function () {
      const output = dir('foo bar')
      should(output).be.eql({
        data: {},
        output: 'foo bar'
      })
    })
  })
})
