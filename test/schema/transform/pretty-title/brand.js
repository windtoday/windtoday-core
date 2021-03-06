'use strict'

const should = require('should')
const prettyBrand = require('../../../../core/schema/transform/pretty-title/brand')

describe('schema » transform » pretty title » brand', function () {
  it('nothing', function () {
    const item = { title: 'Hello World' }
    const output = prettyBrand(item)
    should(output).be.equal('Hello World')
  })
  it('sail', function () {
    const item = {
      isForced: false,
      title: 'gun Sails Top Wave 4m 2000',
      category: ['sails'],
      seller: 'particular',
      condition: 'used',
      provider: 'ozutarifa',
      path: 'sails',
      link:
        'http://www.ozu-tarifa.com/gun-sails-top-wave-4-2000.html?ref=windtodayco',
      image:
        'http://www.ozu-tarifa.com/images/thumbnails/325/325/detailed/9/IMG_9274.JPG?t=1472662910',
      updatedAt: 1496361600000,
      timestamp: 1496379629285,
      brand: 'Gun',
      price: 80,
      year: 2000,
      'sail size': 4,
      priceScore: 1,
      objectID: '3915331220'
    }

    const output = prettyBrand(item)
    should(output).be.equal('Gun Top Wave 4m 2000')
  })
  it('boom', function () {
    const item = {
      isForced: true,
      title: 'North Sails Red Series 180-230 Classic',
      category: ['booms'],
      seller: 'new',
      condition: 'new',
      provider: 'wewind',
      path: 'booms',
      link:
        'http://we-wind.com/botavaras-de-windsurf/botavara-windsurf-north-sails-red-series-es.html?ref=windtodayco',
      image:
        'http://we-wind.com/images/thumbnails/1/230/230/14500-1400-BOTAVARA-RED-SERIES.jpg',
      updatedAt: 1496268000000,
      timestamp: 1496318470917,
      brand: 'North',
      price: 195,
      'boom size': '180/230',
      'boom type': 'aluminium',
      objectID: '4377049091'
    }

    const output = prettyBrand(item)
    should(output).be.equal('North Red Series 180-230 Classic')
  })
  it('board', function () {
    const item = {
      isForced: true,
      title: 'Jp Australia Supersport Pro 137 2017',
      category: ['boards'],
      seller: 'freerace',
      condition: 'new',
      provider: 'telstarsurf',
      path: 'boards',
      link:
        'http://www.telstarsurf.com/windsurf/windsurfboards/freerace-boards/53039/jp-australia-supersport-pro-2017/?ref=windtodayco',
      image:
        'http://www.telstarsurf.com/cache/img/b0b078e3bfb3/500/500/max/max/supersport-pro-2017.png',
      updatedAt: 1496268000000,
      timestamp: 1496314912311,
      brand: 'JP Australia',
      model: 'Super Sport',
      price: 2299,
      year: 2017,
      'board size': 137,
      objectID: '4377030791'
    }

    const output = prettyBrand(item)
    should(output).be.equal('JP Australia Supersport Pro 137 2017')
  })
  it('mast', function () {
    const item = {
      title: 'Loftsails Rdm Spark C50% 2017',
      category: ['masts'],
      seller: 'new',
      condition: 'new',
      provider: 'easysurfshop',
      path: 'masts',
      link:
        'https://easy-surfshop.com/do/item/N-LOFTSAILS-MAST-RDM-SPARK-C50-2017/LOFTSAILS-Mast-RDM-Spark-C50-2017?ref=windtodayco',
      image:
        'https://images.easy-surfshop.com/images/_small/N-LOFTSAILS-MAST-RDM-SPARK-C50-2017.jpg',
      updatedAt: 1496268000000,
      timestamp: 1496308681313,
      isForced: true,
      brand: 'Loft',
      price: 159,
      year: 2017,
      'mast carbon': 50,
      'mast type': 'rdm',
      priceScore: 1,
      objectID: '2672178012'
    }
    const output = prettyBrand(item)
    should(output).be.equal('Loft Rdm Spark C50% 2017')
  })
  it('fin', function () {
    const item = {
      title: 'Pro Limit R-Cr 38cm Slalom',
      category: ['fins'],
      seller: 'used',
      condition: 'used',
      provider: 'bigsurfshop',
      path: 'fins',
      link:
        'http://www.bigsurfshop.com/product/pro-limit-windsurfing-fin-38cm-tuttle/?ref=windtodayco',
      image:
        'http://www.bigsurfshop.com/wp-content/uploads/2016/08/bigsurfshop-Pro-Limit-R-CR-Tuttle-Fin-02-247x300.jpg',
      updatedAt: 1496268000000,
      timestamp: 1496308237872,
      isForced: true,
      brand: 'Prolimit',
      price: 59,
      'fin size': 38,
      priceScore: 0,
      objectID: '4376588671'
    }
    const output = prettyBrand(item)
    should(output).be.equal('Prolimit R-Cr 38cm Slalom')
  })
})
