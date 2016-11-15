'use strict'

const schema = require('../../core/schema')
const should = require('should')

const shortenUrl = 'http://sh.st/3duGp'

const fixture = {
  title: 'Vendo Mistral Syncro 92l 2007 - 280€',
  price: 280,
  category: 'particular',
  seller: 'particular',
  provider: 'totalwind',
  url: 'http://totalwind.net/foro/viewtopic.php?f=48&t=102239',
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

  it('add shortenUrl field based on url', function (done) {
    schema(fixture, function (err, instance) {
      instance.shortenUrl.should.be.equal(shortenUrl)
      done(err)
    })
  })
})
