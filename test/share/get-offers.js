'use strict'

const should = require('should')
const {map} = require('lodash')

const getOffers = require('../../core/share/get-offers')

const docs = [
  {
    title: 'Ezzy Taka 4,9 2015',
    category: ['sails'],
    provider: 'totalwind',
    seller: 'particular',
    link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
    brand: 'Ezzy',
    model: 'Taka',
    price: 550,
    year: 2015,
    'sail.size': 4.9
  },
  {
    title: 'Ezzy Taka 4,9 2015',
    category: ['sails'],
    provider: 'totalwind',
    seller: 'particular',
    link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
    brand: 'Ezzy',
    model: 'Taka',
    price: 260,
    year: 2015,
    'sail.size': 4.9
  }
]

describe('share » get offers', function () {
  it('just items with pricess less than 500', function () {
    const offers = getOffers(docs)
    const offersPrice = map(offers, offer => offer.price)
    should(offersPrice).be.eql([260])
  })
})
