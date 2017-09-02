'use strict'

const should = require('should')
const getDescription = require('../../core/description')

describe('description', function () {
  it('board', function () {
    const doc = {
      'isForced': false,
      'title': 'Fanatic Gecko Hrs 98l 2017',
      'category': [
        'boards'
      ],
      'seller': 'new',
      'condition': 'New',
      'provider': 'wewind',
      'path': 'boards',
      'link': 'http://we-wind.com/tablas-de-windsurf/tabla-de-windsurf-fanatic-windsurf-gecko-hrs-2017.html?ref=windtodayco',
      'image': 'http://we-wind.com/images/thumbnails/2/230/230/FANATIC-GECKO-HRS-2017.jpg',
      'updatedAt': 1503878400000,
      'timestamp': 1503903652347,
      'brand': 'Fanatic',
      'model': 'Gecko',
      'price': 979,
      'year': 2017,
      'modality': 'Freeride',
      'board size': 98,
      'board size range': '90l to 100l',
      'priceScore': 100,
      'priceScoreDetail': {
        'byCategory': 100,
        'byYear': 100,
        'byBrand': 100,
        'byModel': 100
      },
      'objectID': '977337751'
    }

    const description = getDescription(doc)
    should(description).be.equal("This Gecko is a windsurfing board designed by Fanatic and created in 2017. It's a completely new freeride oriented board, with a total of 98 litres of shape.")
  })

  it('sail', function () {
    const doc = {
      'isForced': true,
      'title': 'North Warp 8.6m 2014',
      'category': [
        'sails'
      ],
      'seller': 'used',
      'condition': 'Used',
      'provider': 'telstarsurf',
      'path': 'sails',
      'link': 'http://www.telstarsurf.com/windsurf/windsurf-sails/used-sails/57644/northsails-warp-2014/?ref=windtodayco',
      'image': 'https://www.telstarsurf.com/cache/img/d939b30cc116/500/500/max/max/warp-2014.jpeg',
      'updatedAt': 1503784800000,
      'timestamp': 1503864612695,
      'brand': 'North',
      'model': 'Warp',
      'price': 359,
      'year': 2014,
      'sail size': 8.6,
      'modality': 'Race',
      'sail size range': '8m to 9m',
      'priceScore': 100,
      'priceScoreDetail': {
        'byCategory': 100,
        'byYear': 100,
        'byBrand': 100,
        'byModel': 100
      },
      'objectID': '920952040'
    }

    const description = getDescription(doc)
    should(description).be.equal("This Warp is a windsurfing sail designed by North and created in 2014. It's an used race oriented sail, with a total of 8.6 metres of surface.")
  })

  it('mast', function () {
    const doc = {
      'isForced': true,
      'title': 'Gaastra 400 C55 SDM 2014',
      'category': [
        'masts'
      ],
      'seller': 'outlet',
      'condition': 'New',
      'provider': 'surfkeppler',
      'path': 'masts',
      'link': 'http://surfkeppler.de/Gaastra-400-55-SDM-2014_1?ref=windtodayco',
      'image': 'http://surfkeppler.de/media/image/product/27272/md/gaastra-400-55-sdm-2014_1.jpg',
      'updatedAt': 1502661600000,
      'timestamp': 1502744816645,
      'brand': 'Gaastra',
      'price': 99,
      'year': 2014,
      'mast carbon': 55,
      'mast type': 'SDM',
      'mast size': 400,
      'mast carbon range': 'C50 to C60',
      'mast size range': '400cm to 430cm',
      'priceScore': 100,
      'priceScoreDetail': {
        'byCategory': 100,
        'byYear': 100,
        'byBrand': 100,
        'byModel': 100
      },
      'objectID': '813658641'
    }

    const description = getDescription(doc)
    should(description).be.equal("This Standard Diameter Mast (SDM) has been designed by Gaastra in 2014. It's a completely new mast, with 55% of carbon content and a size of 400cm in height.")
  })

  it('boom', function () {
    const doc = {
      'isForced': true,
      'title': 'North Epx Grom 90-120',
      'category': [
        'booms'
      ],
      'seller': 'new',
      'condition': 'New',
      'provider': 'wewind',
      'path': 'booms',
      'link': 'http://we-wind.com/botavaras-de-windsurf/botavara-windsurf-north-sails-epx-grom-2016-es.html?ref=windtodayco',
      'image': 'http://we-wind.com/images/thumbnails/2/230/230/NORTH-SAILS-BOOM-EPX-GROM-2016.14500-1410.jpg',
      'updatedAt': 1502661600000,
      'timestamp': 1502745112073,
      'brand': 'North',
      'price': 85,
      'boom size': 120,
      'boom type': 'aluminium',
      'boom size range': '100cm to 150cm',
      'priceScore': 100,
      'priceScoreDetail': {
        'byCategory': 100,
        'byYear': 100,
        'byBrand': 100,
        'byModel': 100
      },
      'objectID': '813771491'
    }

    const description = getDescription(doc)
    should(description).be.equal("This boom has been designed by North. It's a completely new mast, with an aluminium body and aperture range starting at 120cm.")
  })

  it('fin', function () {
    const doc = {
      'isForced': false,
      'title': 'F-Hot 56cm Slalom Powerbox',
      'category': [
        'fins'
      ],
      'seller': 'used',
      'condition': 'Used',
      'provider': 'bigsurfshop',
      'path': 'fins',
      'link': 'http://www.bigsurfshop.com/product/f-hot-56cm-slalom-powerbox-fin/?ref=windtodayco',
      'image': 'http://www.bigsurfshop.com/wp-content/uploads/2017/08/MG_9466-247x300.jpg',
      'updatedAt': 1503446400000,
      'timestamp': 1503459078451,
      'brand': 'F-Hot',
      'price': 49,
      'fin size': 56,
      'fin type': 'Power Box',
      'priceScore': 100,
      'priceScoreDetail': {
        'byCategory': 100,
        'byYear': 100,
        'byBrand': 100,
        'byModel': 100
      },
      'objectID': '910980951'
    }

    const description = getDescription(doc)
    should(description).be.equal("This fin has been designed by F-Hot. It's an used Power Box oriented fin, with a 56cm profile.")
  })
})
