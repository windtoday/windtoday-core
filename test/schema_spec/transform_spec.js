'use strict'

const schema = require('../../core/schema')
require('should')

const fixture = {
  title: 'Vendo Mistral Syncro 92l 2007 - 280€',
  category: 'particular',
  seller: 'particular',
  provider: 'totalwind',
  url: 'http://totalwind.net/foro/viewtopic.php?f=48&t=102239',
  createdAt: '1466590680000',
  updatedAt: '1467970920000'
}

describe('schema » transform', function () {
  describe('clean title', function (done) {
    it('price', function (done) {
      const title = 'Mistral Syncro 280€'
      schema(Object.assign({}, fixture, {title}), function (err, instance) {
        instance.title.should.be.equal('Mistral Syncro')
        done(err)
      })
    })

    it('blacklisted words', function (done) {
      const title = 'Vendo Mistral Syncro - 280€'
      schema(Object.assign({}, fixture, {title}), function (err, instance) {
        instance.title.should.be.equal('Mistral Syncro')
        done(err)
      })
    })

    it('titleize', function (done) {
      const title = 'Vendo mistral Syncro - 280€'
      schema(Object.assign({}, fixture, {title}), function (err, instance) {
        instance.title.should.be.equal('Mistral Syncro')
        done(err)
      })
    })

    it('whitespaces', function (done) {
      const title = '  Vendo  mistral  Syncro - 280€   '
      schema(Object.assign({}, fixture, {title}), function (err, instance) {
        instance.title.should.be.equal('Mistral Syncro')
        done(err)
      })
    })
  })
})
