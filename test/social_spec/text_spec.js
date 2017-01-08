'use strict'

const text = require('../../core/social/text')
const should = require('should')

const doc = {
  title: 'Ezzy Taka 4,9 2015',
  category: ['sails'],
  provider: 'totalwind',
  seller: 'particular',
  url: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
  brand: 'Ezzy',
  model: 'Taka',
  price: 260,
  year: 2015,
  'sail.size': 4.9
}

describe('social » text', function () {
  it('create the social text from the doc', function () {
    const {title, price, url} = doc
    const message = text(doc)
    const expected = `${title} ${price}€: ${url}`
    message.should.be.equal(expected)
  })
})
