'use strict'

const should = require('should')
const prettyBrand = require('../../../../core/schema/transform/pretty-title/brand')

describe('schema » transform » pretty title » brand', function () {
  it('sail', function () {
    const item = {
      'isForced': true,
      'title': 'North Sails Red Series 180-230 Classic',
      'category': [
        'booms'
      ],
      'seller': 'new',
      'condition': 'new',
      'provider': 'wewind',
      'path': 'booms',
      'link': 'http://we-wind.com/botavaras-de-windsurf/botavara-windsurf-north-sails-red-series-es.html?ref=windtodayco',
      'image': 'http://we-wind.com/images/thumbnails/1/230/230/14500-1400-BOTAVARA-RED-SERIES.jpg',
      'updatedAt': 1496268000000,
      'timestamp': 1496318470917,
      'brand': 'North',
      'price': 195,
      'boom size': '180/230',
      'boom type': 'aluminium',
      'objectID': '4377049091'
    }

    const output = prettyBrand(item)
    should(output).be.equal('North Red Series 180-230 Classic')
  })
})
