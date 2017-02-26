'use strict'

const titleize = require('../../core/util/titleize')

const fixture = {
  title: 'PROLIMIT CYBER BOOM 202 €129',
  price: 129,
  name: 'CYBER BOOM',
  image: 'http://foo.bar',
  link: 'http://foo.bar',
  size: 202,
  brand: ['north', 'sails']
}

describe('core » util » titleize', function () {
  it('string', function () {
    titleize('http://foo.bar').should.be.equal('http://foo.bar')
    titleize(123).should.be.equal(123)
    titleize('foo bar').should.be.equal('Foo Bar')
  })

  it('array', function () {
    titleize(['foo', 'bar']).should.be.eql(['Foo', 'Bar'])
  })

  it('object', function () {
    const output = titleize(fixture)
    output.should.be.eql({
      title: 'Prolimit Cyber Boom 202 €129',
      price: 129,
      name: 'Cyber Boom',
      image: 'http://foo.bar',
      link: 'http://foo.bar',
      size: 202,
      brand: ['North', 'Sails']
    })
  })
})
