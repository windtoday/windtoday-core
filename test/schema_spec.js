'use strict'

var schema = require('../core/schema')
var should = require('should')

var fixture = {
  title: 'Vendo Mistral Syncro 92l 2007 - 280€',
  category: 'particular',
  type: 'particular',
  provider: 'totalwind',
  link: 'http:/totalwind.net/foro/viewtopic.php?f=48&t=102239',
  createdAt: '1466590680000',
  updatedAt: '1467970920000'
}

describe('schema', function () {
  it("optional fields dont't throw validation errors", function (done) {
    schema(fixture, done)
  })

  it('required fields need to be present', function (done) {
    schema({}, function (err) {
      should.exist(err)
      done()
    })
  })
})
