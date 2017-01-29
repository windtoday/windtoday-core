'use strict'

const {assign} = require('lodash')
const should = require('should')

const schema = require('../../core/schema')

const fixture = {
  title: 'Vendo Mistral Syncro 92l 2007 - 280€',
  price: 280,
  category: 'particular',
  seller: 'particular',
  provider: 'totalwind',
  link: 'http://totalwind.net/foro/viewtopic.php?f=48&t=102239',
  createdAt: '1466590680000',
  updatedAt: '1467970920000'
}

describe('schema » validation', function () {
  it("optional fields dont't throw validation errors", function (done) {
    schema(fixture, done)
  })

  it('required fields need to be present', function (done) {
    schema({}, function (err) {
      should.exist(err)
      done()
    })
  })

  describe('normalize', function () {
    describe('condition', function () {
      it('new', function (done) {
        const input = assign({}, fixture, {seller: 'outlet'})
        schema(input, function (err, doc) {
          doc.condition.should.be.equal('new')
          done(err)
        })
      })
      it('used', function (done) {
        const input = assign({}, fixture, {seller: 'particular'})
        schema(input, function (err, doc) {
          doc.condition.should.be.equal('used')
          done(err)
        })
      })
    })
  })
})
