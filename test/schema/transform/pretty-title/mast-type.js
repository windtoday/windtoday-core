'use strict'

const should = require('should')
const prettyPrice = require('../../../../core/schema/transform/pretty-title/mast-type')

describe('schema » transform » pretty title » mast type', function () {
  it('nothing to replace', function () {
    const item = {
      'isForced': true,
      'title': 'Neilpryde Combat 4.7m 2014',
      'category': [
        'sails'
      ],
      'seller': 'particular',
      'condition': 'used',
      'provider': 'totalwind',
      'path': 'sails',
      'link': 'https://totalwind.net/foro/viewtopic.php?f=49&t=106340&ref=windtodayco',
      'updatedAt': 1496440800000,
      'timestamp': 1496496924539,
      'brand': 'Neilpryde',
      'model': 'Combat',
      'price': 200,
      'year': 2014,
      'sail size': 4.7,
      'objectID': '4397356031'
    }
    const output = prettyPrice(item)
    should(output).be.equal('Neilpryde Combat 4.7m 2014')
  })
  it('SDM', function () {
    const item = {
      'isForced': true,
      'title': 'North Silver Sdm 490 2014',
      'category': [
        'masts'
      ],
      'seller': 'rdm',
      'condition': 'new',
      'provider': 'telstarsurf',
      'path': 'masts',
      'link': 'http://www.telstarsurf.com/windsurf/windsurfmasts/sdm-windsurfmasts/40752/northsails-silver-sdm-2014/?ref=windtodayco',
      'image': 'http://www.telstarsurf.com/cache/img/71ef781f0e35/500/500/max/max/silver-sdm-55-2014.jpeg',
      'updatedAt': 1496440800000,
      'timestamp': 1496496786976,
      'brand': 'North',
      'price': 239,
      'year': 2014,
      'mast size': 490,
      'mast type': 'sdm',
      'objectID': '3925173200'
    }
    const output = prettyPrice(item)
    should(output).be.equal('North Silver SDM 490 2014')
  })

  it('RDM', function () {
    const item = {
      'isForced': true,
      'title': 'North Silver Rdm 490 2014',
      'category': [
        'masts'
      ],
      'seller': 'rdm',
      'condition': 'new',
      'provider': 'telstarsurf',
      'path': 'masts',
      'link': 'http://www.telstarsurf.com/windsurf/windsurfmasts/sdm-windsurfmasts/40752/northsails-silver-sdm-2014/?ref=windtodayco',
      'image': 'http://www.telstarsurf.com/cache/img/71ef781f0e35/500/500/max/max/silver-sdm-55-2014.jpeg',
      'updatedAt': 1496440800000,
      'timestamp': 1496496786976,
      'brand': 'North',
      'price': 239,
      'year': 2014,
      'mast size': 490,
      'mast type': 'rdm',
      'objectID': '3925173200'
    }
    const output = prettyPrice(item)
    should(output).be.equal('North Silver RDM 490 2014')
  })
})
