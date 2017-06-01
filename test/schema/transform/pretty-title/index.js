'use strict'

const should = require('should')
const prettyTitle = require('../../../../core/schema/transform/pretty-title')

describe('schema » transform » pretty title', function () {
  [
    {
      item: {
        title: '    Vendo Mistral  Syncro 2016 250€   ',
        price: 250,
        year: 2016
      },
      expected: 'Mistral Syncro 2016'
    },
    {
      item: {
        title: 'Starboard Futura 120 litros 2016 250€',
        price: 250,
        year: 2016,
        'board size': 120
      },
      expected: 'Starboard Futura 120L 2016'
    },
    {
      item: {
        title: 'Gun Sails GSR 8,7 2017',
        year: 2017,
        'sail size': 8.7
      },
      expected: 'Gun Sails GSR 8.7m 2017'
    },
    {
      item: {
        title: 'Jp Australia Slalom 2016 Demo 82 €1399',
        category: [ 'boards' ],
        seller: 'used',
        condition: 'used',
        provider: 'telstarsurf',
        path: 'boards',
        link: 'http://www.telstarsurf.com/windsurf/windsurfboards/used-windsurfboards/59088/jp-australia-slalom-2016-demo/?ref=windtodayco',
        image: 'http://www.telstarsurf.com/cache/img/eb994521e413/500/500/max/max/slalom-2016-demo.jpeg',
        updatedAt: 1496268000000,
        timestamp: 1496312391830,
        isForced: true,
        brand: 'JP Australia',
        model: 'Slalom',
        price: 1399,
        year: 2016,
        'board size': 82
      },
      expected: 'Jp Australia Slalom Demo 82 2016'
    }
  ].forEach(function ({item, expected}) {
    const {title} = item
    it(`${title} → ${expected}`, function () {
      const output = prettyTitle(item)
      should(output).be.equal(expected)
    })
  })
})
