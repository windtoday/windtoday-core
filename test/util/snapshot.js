'use strict'

const should = require('should')
const createSnapshot = require('../../core/util/create-snapshot')

describe('core » util » snapshot', function () {
  it('Remove duplicate elements by uniqId', function () {
    const snapshot = createSnapshot({
      sortId: 'title',
      uniqId: ['url', 'title', 'price']
    })

    const fixtures = [
      {
        title: 'Gaastra Cosmic 6.5 2015',
        link:
          'http://www.telstarsurf.com/windsurf/windsurf-sails/freerace-sails/46091/gaastra-cosmic-2015/'
      },
      {
        title: 'Gaastra Cosmic 6.5 2015',
        link:
          'http://www.telstarsurf.com/windsurf/windsurf-sails/freerace-sails/46091/gaastra-cosmic-2015/'
      },
      {
        title: 'Gaastra Cosmic 7.5 2015',
        link:
          'http://www.telstarsurf.com/windsurf/windsurf-sails/freerace-sails/46091/gaastra-cosmic-2015/'
      }
    ]

    const output = snapshot(fixtures)
    should(output).be.eql([
      {
        title: 'Gaastra Cosmic 6.5 2015',
        link:
          'http://www.telstarsurf.com/windsurf/windsurf-sails/freerace-sails/46091/gaastra-cosmic-2015/'
      },
      {
        title: 'Gaastra Cosmic 7.5 2015',
        link:
          'http://www.telstarsurf.com/windsurf/windsurf-sails/freerace-sails/46091/gaastra-cosmic-2015/'
      }
    ])
  })

  it('Keeps different elements', function () {
    const fixtures = [
      {
        title: 'Np Combat 3.7',
        link: 'http://www.ozu-tarifa.com/np-combat-3.7-es.html',
        price: 200
      },
      {
        title: 'Np Combat 3.7',
        link: 'http://www.ozu-tarifa.com/np-combat-3.7.html',
        price: 180
      }
    ]

    const snapshot = createSnapshot({
      sortId: 'title',
      uniqId: ['url', 'title', 'price']
    })

    const output = snapshot(fixtures)
    should(output).be.eql([
      {
        title: 'Np Combat 3.7',
        link: 'http://www.ozu-tarifa.com/np-combat-3.7-es.html',
        price: 200
      },
      {
        title: 'Np Combat 3.7',
        link: 'http://www.ozu-tarifa.com/np-combat-3.7.html',
        price: 180
      }
    ])
  })
})
