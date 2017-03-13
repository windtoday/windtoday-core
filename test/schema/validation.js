'use strict'

const should = require('should')
const {assign, repeat} = require('lodash')

const schema = require('../../core/schema')

const baseFixture = {
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
  describe('calculated properties', function () {
    describe('condition', function () {
      describe('based on seller', function () {
        it('particular → used', function (done) {
          const fixture = assign({}, baseFixture, {seller: 'particular'})
          schema(fixture, function (err, doc) {
            should(doc.condition).be.equal('used')
            done(err)
          })
        })

        it('used → used', function (done) {
          const fixture = assign({}, baseFixture, {seller: 'used'})
          schema(fixture, function (err, doc) {
            should(doc.condition).be.equal('used')
            done(err)
          })
        })

        it('otherwise, new', function (done) {
          const fixture = assign({}, baseFixture, {seller: 'offer'})
          schema(fixture, function (err, doc) {
            should(doc.condition).be.equal('new')
            done(err)
          })
        })
      })
    })

    describe('referral link', function () {
      it('referral keyword is present', function (done) {
        const fixture = assign({}, baseFixture, {
          link: 'http://totalwind.net/foro/viewtopic.php?f=48&t=102239'
        })
        const expected = 'http://totalwind.net/foro/viewtopic.php?f=48&t=102239&ref=windtodayco'

        schema(fixture, function (err, doc) {
          should(doc.link).be.equal(expected)
          done(err)
        })
      })
    })
  })

  describe('static properties', function () {
    describe('behavior', function () {
      it("optional fields don't throw validation errors", function (done) {
        schema(baseFixture, done)
      })
      it('required fields need to be present', function (done) {
        schema({}, function (err) {
          should.exist(err)
          done()
        })
      })
    })

    describe('title', function () {
      it('throw error if not reached mininum length', function (done) {
        const fixture = assign({}, baseFixture, {title: 'Vendo velas windsurf'})
        schema(fixture, function (err, doc) {
          should(err).be.an.Error()
          done()
        })
      })

      it('throw error if reached maximum length', function (done) {
        const title = repeat('n', 141)
        const fixture = assign({}, baseFixture, {title})
        schema(fixture, function (err, doc) {
          should(err).be.an.Error()
          done()
        })
      })
    })
  })
})
