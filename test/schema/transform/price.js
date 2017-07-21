'use strict'

const should = require('should')
const schema = require('../../../core/schema')

describe('schema » transform » price', function () {
  it('round from min', function (done) {
    const item = {
      isForced: false,
      title: 'North Silver SDM 2017',
      category: ['masts'],
      seller: 'new',
      condition: 'new',
      provider: 'easysurfshop',
      path: 'masts',
      link:
        'https://easy-surfshop.com/do/item/N-NORTH-SAILS-2017-WINDSURF-MAST-SILVER-SDM/NORTH-SAILS-Windsurf-Mast-SILVER-SDM-2017?ref=windtodayco',
      image:
        'https://images.easy-surfshop.com/images/_small/N-NORTH-SAILS-2017-WINDSURF-MAST-SILVER-SDM.jpg',
      updatedAt: 1498176000000,
      timestamp: 1498190462613,
      brand: 'North',
      price: 249.1,
      year: 2017,
      'mast type': 'sdm',
      priceScore: 5,
      objectID: '4618015091'
    }

    schema(item, function (err, doc) {
      should(doc.price).be.equal(249)
      done(err)
    })
  })

  it('round from max', function (done) {
    const item = {
      isForced: false,
      title: 'North Silver SDM 2017',
      category: ['masts'],
      seller: 'new',
      condition: 'new',
      provider: 'easysurfshop',
      path: 'masts',
      link:
        'https://easy-surfshop.com/do/item/N-NORTH-SAILS-2017-WINDSURF-MAST-SILVER-SDM/NORTH-SAILS-Windsurf-Mast-SILVER-SDM-2017?ref=windtodayco',
      image:
        'https://images.easy-surfshop.com/images/_small/N-NORTH-SAILS-2017-WINDSURF-MAST-SILVER-SDM.jpg',
      updatedAt: 1498176000000,
      timestamp: 1498190462613,
      brand: 'North',
      price: 249.6,
      year: 2017,
      'mast type': 'sdm',
      priceScore: 5,
      objectID: '4618015091'
    }

    schema(item, function (err, doc) {
      should(doc.price).be.equal(250)
      done(err)
    })
  })
})
