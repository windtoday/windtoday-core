'use strict'

const should = require('should')

const getShareables = require('../../core/share/get-shareables')

describe('share » get shareables', function () {
  it('filter non premium shops', function () {
    const items = [
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
    const shareables = getShareables(items)
    should(shareables).be.eql([])
  })

  it('filter items lower than price score baseline', function () {
    const items = [
      {
        title: 'Ezzy Taka 4,9 2015',
        category: ['sails'],
        provider: 'bellini',
        seller: 'particular',
        link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
        brand: 'Ezzy',
        model: 'Taka',
        price: 550,
        year: 2015,
        priceScore: 89,
        'sail.size': 4.9
      },
      {
        title: 'Ezzy Taka 4,9 2015',
        category: ['sails'],
        provider: 'lpwind',
        seller: 'particular',
        link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
        brand: 'Ezzy',
        model: 'Taka',
        price: 550,
        year: 2015,
        priceScore: 90,
        'sail.size': 4.9
      },
      {
        title: 'Ezzy Taka 4,9 2015',
        category: ['sails'],
        provider: 'easysurfshop',
        seller: 'particular',
        link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
        brand: 'Ezzy',
        model: 'Taka',
        price: 260,
        year: 2015,
        priceScore: 95,
        'sail.size': 4.9
      }
    ]

    const shareables = getShareables(items)
    should(shareables).be.eql([
      {
        title: 'Ezzy Taka 4,9 2015',
        category: ['sails'],
        provider: 'lpwind',
        seller: 'particular',
        link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
        brand: 'Ezzy',
        model: 'Taka',
        price: 550,
        year: 2015,
        priceScore: 90,
        'sail.size': 4.9
      },
      {
        title: 'Ezzy Taka 4,9 2015',
        category: ['sails'],
        provider: 'easysurfshop',
        seller: 'particular',
        link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
        brand: 'Ezzy',
        model: 'Taka',
        price: 260,
        year: 2015,
        priceScore: 95,
        'sail.size': 4.9
      }
    ])
  })
})
