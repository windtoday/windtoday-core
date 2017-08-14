'use strict'

const should = require('should')
const { assign, repeat } = require('lodash')

const schema = require('../../core/schema')

const baseFixture = {
  title: 'Vendo Mistral Syncro 92l 2007 - 280€',
  price: 280,
  category: ['boards'],
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
        it('particular → Used', function (done) {
          const fixture = assign({}, baseFixture, { seller: 'particular' })
          schema(fixture, function (err, doc) {
            should(doc.condition).be.equal('Used')
            done(err)
          })
        })

        it('used → Used', function (done) {
          const fixture = assign({}, baseFixture, { seller: 'used' })
          schema(fixture, function (err, doc) {
            should(doc.condition).be.equal('Used')
            done(err)
          })
        })

        it('otherwise, new', function (done) {
          const fixture = assign({}, baseFixture, { seller: 'offer' })
          schema(fixture, function (err, doc) {
            should(doc.condition).be.equal('New')
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
        const expected =
          'http://totalwind.net/foro/viewtopic.php?f=48&t=102239&ref=windtodayco'

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

      it('not present fields should not be included', function (done) {
        const item = {
          title: 'NORTHSAILS S TYPE SL 2017 8.8 €599',
          seller: 'freerace',
          provider: 'telstarsurf',
          category: ['sails'],
          price: 599,
          name: 'S TYPE SL 2017',
          brand: 'NORTHSAILS',
          image:
            'https://www.telstarsurf.com/cache/img/cbf32f939668/500/500/max/max/s-type-sl-2017.png',
          link:
            'http://www.telstarsurf.com/windsurf/windsurf-sails/54070/northsails-s-type-sl-2017/',
          size: '8.8'
        }

        schema(item, function (err, doc) {
          should(doc['sail type']).be.undefined()
          should(doc['mast type']).be.undefined()
          done(err)
        })
      })
    })

    describe('title', function () {
      describe('invalid', function () {
        it('throw error if not reached mininum words', function (done) {
          const fixture = assign({}, baseFixture, {
            title: 'Vendo velas windsurf'
          })
          schema(fixture, function (err, doc) {
            should(err).be.an.Error()
            done()
          })
        })

        it('throw error if reached maximum length', function (done) {
          const title = repeat('n', 141)
          const fixture = assign({}, baseFixture, { title })
          schema(fixture, function (err, doc) {
            should(err).be.an.Error()
            done()
          })
        })
      })

      describe('valid', function () {
        it('is correct if title has minimum words and is under max length', function (
          done
        ) {
          const fixture = assign({}, baseFixture, { title: 'Tabou Rocket 115' })
          schema(fixture, function (err, doc) {
            done(err)
          })
        })
      })
    })
  })
})
