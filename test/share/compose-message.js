'use strict'

const should = require('should')

const compose = require('../../core/share/compose-message')

const doc = {
  title: 'Ezzy Taka 4,9 2015',
  category: ['sails'],
  provider: 'totalwind',
  seller: 'particular',
  link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
  brand: 'Ezzy',
  model: 'Taka',
  price: 260,
  year: 2015,
  'sail.size': 4.9,
  objectID: '910980951'
}

describe('share » compose message', function () {
  it('create the social text from the doc', function () {
    const message = compose(doc)
    const expected = `💨 Ezzy Taka 4,9 2015 €260 👉 https://windtoday.co/item?id=910980951`
    should(message).be.equal(expected)
  })
})
