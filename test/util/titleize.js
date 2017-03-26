'use strict'

const should = require('should')

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
    should(titleize('http://foo.bar')).be.equal('http://foo.bar')
    should(titleize(123)).be.equal(123)
    should(titleize('foo bar')).be.equal('Foo Bar')
  })

  it('array', function () {
    should(titleize(['foo', 'bar'])).be.eql(['Foo', 'Bar'])
  })

  it('object', function () {
    const output = titleize(fixture)
    should(output).be.eql({
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
