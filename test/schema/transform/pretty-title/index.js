'use strict'

const should = require('should')
const prettyTitle = require('../../../../core/schema/transform/pretty-title')

describe('schema » transform » pretty title', function () {
  ;[
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
      expected: 'Gun GSR 8.7m 2017'
    },
    {
      item: {
        title: 'Jp Australia Slalom 2016 Demo 82 €1399',
        category: ['boards'],
        seller: 'used',
        condition: 'used',
        provider: 'telstarsurf',
        path: 'boards',
        link:
          'http://www.telstarsurf.com/windsurf/windsurfboards/used-windsurfboards/59088/jp-australia-slalom-2016-demo/?ref=windtodayco',
        image:
          'http://www.telstarsurf.com/cache/img/eb994521e413/500/500/max/max/slalom-2016-demo.jpeg',
        updatedAt: 1496268000000,
        timestamp: 1496312391830,
        isForced: true,
        brand: 'JP Australia',
        model: 'Slalom',
        price: 1399,
        year: 2016,
        'board size': 82
      },
      expected: 'JP Australia Slalom Demo 82 2016'
    },
    {
      item: {
        title: 'Northsails Drive Grom 2017 - Kids 3 €286',
        link:
          'http://we-wind.com/velas-de-windsurf-es-2/north-sails-drive-grom-2017-kids.html?ref=windtodayco',
        image:
          'http://we-wind.com/images/thumbnails/2/230/230/North-Sails-DRIVE-GROM-2016.jpg',
        brand: 'North',
        price: 286,
        year: 2017,
        'sail size': 3,
        priceScore: 1,
        objectID: '2670729852'
      },
      expected: 'Northsails Drive Grom Kids 3m 2017'
    },
    {
      item: {
        title: 'Vendo Gancho Arnés Dakine 30cm - 20€',
        category: ['others'],
        seller: 'particular',
        condition: 'used',
        provider: 'totalwind',
        path: 'accesories',
        link:
          'https://totalwind.net/foro/viewtopic.php?f=65&t=104694&ref=windtodayco',
        updatedAt: 1496440800000,
        timestamp: 1496488144704,
        brand: 'Dakine',
        price: 20
      },
      expected: 'Gancho Arnés Dakine 30cm'
    },
    {
      item: {
        isForced: true,
        title: 'Northsails Drive Grom Kids 3m 2017',
        category: ['sails'],
        seller: 'new',
        condition: 'new',
        provider: 'wewind',
        path: 'sails',
        link:
          'http://we-wind.com/velas-de-windsurf-es-2/north-sails-drive-grom-2017-kids.html?ref=windtodayco',
        image:
          'http://we-wind.com/images/thumbnails/2/230/230/North-Sails-DRIVE-GROM-2016.jpg',
        updatedAt: 1496268000000,
        timestamp: 1496318367225,
        brand: 'North',
        price: 286,
        year: 2017,
        'sail size': 3,
        priceScore: 1,
        objectID: '3908327910'
      },
      expected: 'North Drive Grom Kids 3m 2017'
    },
    {
      item: {
        isForced: true,
        title: 'VENDO ALETA TEKKNOSPORT FREEWEED G10 TUTTLE 27CM - 40€',
        category: ['fins'],
        seller: 'particular',
        condition: 'used',
        provider: 'totalwind',
        path: 'fins',
        link:
          'https://totalwind.net/foro/viewtopic.php?f=67&t=103190&ref=windtodayco',
        updatedAt: 1496440800000,
        timestamp: 1496487848932,
        brand: 'Tekknosport',
        price: 40,
        'fin size': 10,
        'fin type': 'Tuttle Box',
        objectID: '4397219781'
      },
      expected: 'Tekknosport FREEWEED G10 TUTTLE 27CM'
    },
    {
      item: {
        isForced: true,
        title: 'North Silver Sdm 490 2014',
        category: ['masts'],
        seller: 'rdm',
        condition: 'new',
        provider: 'telstarsurf',
        path: 'masts',
        link:
          'http://www.telstarsurf.com/windsurf/windsurfmasts/sdm-windsurfmasts/40752/northsails-silver-sdm-2014/?ref=windtodayco',
        image:
          'http://www.telstarsurf.com/cache/img/71ef781f0e35/500/500/max/max/silver-sdm-55-2014.jpeg',
        updatedAt: 1496440800000,
        timestamp: 1496496786976,
        brand: 'North',
        price: 239,
        year: 2014,
        'mast size': 490,
        'mast type': 'sdm',
        objectID: '3925173200'
      },
      expected: 'North Silver SDM 490 2014'
    },
    {
      item: {
        isForced: false,
        title: 'Carbono Rrd Slim 150-200 2016',
        category: ['booms'],
        seller: 'particular',
        condition: 'used',
        provider: 'totalwind',
        path: 'booms',
        link:
          'https://totalwind.net/foro/viewtopic.php?f=64&t=105801&ref=windtodayco',
        updatedAt: 1496534400000,
        timestamp: 1496557875426,
        brand: 'RRD',
        price: 300,
        year: 2016,
        'boom size': '150/200',
        'boom type': 'carbon',
        priceScore: 1,
        objectID: '4400901281'
      },
      expected: 'Carbono RRD Slim 150-200 2016'
    }
  ].forEach(function ({ item, expected }) {
    const { title } = item
    it(`${title} → ${expected}`, function () {
      const output = prettyTitle(item)
      should(output).be.equal(expected)
    })
  })
})
