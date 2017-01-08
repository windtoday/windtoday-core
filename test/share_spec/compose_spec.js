'use strict'

const compose = require('../../core/share/compose')
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

describe('share » compose', function () {
  it('create the social text from the doc', function () {
    const {title, price, url} = doc
    const message = compose(doc)
    const expected = `${title} ${price}€: ${url}`
    message.should.be.equal(expected)
  })
})
