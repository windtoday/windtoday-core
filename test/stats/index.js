'use strict'

const should = require('should')
const data = require('../data.json')

const createStats = require('../../core/stats')

describe('core » stats', function () {
  describe('leaderboard', function () {
    it('list all providers', function () {
      const { providers } = createStats(data)

      should(providers.sort()).be.eql(
        [
          'ozutarifa',
          'wewind',
          'telstarsurf',
          'lpwind',
          'surfkeppler',
          'easysurfshop',
          'bellini',
          'bigsurfshop'
        ].sort()
      )
    })

    it('by category', function () {
      const { category } = createStats(data)

      should(category).be.eql({
        sails: { count: 768, percent: '31%' },
        boards: { count: 719, percent: '29%' },
        masts: { count: 523, percent: '21%' },
        booms: { count: 160, percent: '7%' },
        fins: { count: 278, percent: '11%' }
      })
    })

    it('by provider', function () {
      const { provider } = createStats(data)

      should(provider).be.eql({
        surfkeppler: { count: 387, percent: '16%' },
        ozutarifa: { count: 274, percent: '11%' },
        wewind: { count: 316, percent: '13%' },
        telstarsurf: { count: 955, percent: '39%' },
        lpwind: { count: 158, percent: '6%' },
        easysurfshop: { count: 195, percent: '8%' },
        bellini: { count: 97, percent: '4%' },
        bigsurfshop: { count: 66, percent: '3%' }
      })
    })

    it('by condition', function () {
      const { condition } = createStats(data)

      should(condition).be.eql({
        new: { count: 2084, percent: '85%' },
        used: { count: 364, percent: '15%' }
      })
    })

    it('by brand', function () {
      const { brand } = createStats(data)

      should(brand).be.eql({
        Starboard: { count: 161, percent: '7%' },
        Fanatic: { count: 185, percent: '8%' },
        Tabou: { count: 118, percent: '5%' },
        Gaastra: { count: 193, percent: '8%' },
        Loft: { count: 94, percent: '4%' },
        North: { count: 403, percent: '16%' },
        Severne: { count: 171, percent: '7%' },
        'JP Australia': { count: 76, percent: '3%' },
        F2: { count: 6, percent: '0%' },
        Challenger: { count: 1, percent: '0%' },
        Naish: { count: 88, percent: '4%' },
        Exocet: { count: 18, percent: '1%' },
        Neilpryde: { count: 170, percent: '7%' },
        Secret: { count: 1, percent: '0%' },
        Goya: { count: 72, percent: '3%' },
        RRD: { count: 53, percent: '2%' },
        'Hot Maui': { count: 4, percent: '0%' },
        Vandal: { count: 9, percent: '0%' },
        Simmer: { count: 8, percent: '0%' },
        Gun: { count: 7, percent: '0%' },
        'Point-7': { count: 1, percent: '0%' },
        Mistral: { count: 8, percent: '0%' },
        Ezzy: { count: 8, percent: '0%' },
        Quatro: { count: 21, percent: '1%' },
        Ka: { count: 5, percent: '0%' },
        Prolimit: { count: 25, percent: '1%' },
        Unifiber: { count: 211, percent: '9%' },
        Aeron: { count: 13, percent: '1%' },
        AHD: { count: 2, percent: '0%' },
        'Severne Sails': { count: 2, percent: '0%' },
        undefined: { count: 35, percent: '1%' },
        Bic: { count: 1, percent: '0%' },
        'Maui Ultra': { count: 5, percent: '0%' },
        MaverX: { count: 15, percent: '1%' },
        Arrows: { count: 4, percent: '0%' },
        B3: { count: 7, percent: '0%' },
        Drake: { count: 2, percent: '0%' },
        Select: { count: 90, percent: '4%' },
        '': { count: 10, percent: '0%' },
        Chinook: { count: 11, percent: '0%' },
        XO: { count: 7, percent: '0%' },
        Technospar: { count: 7, percent: '0%' },
        Tushingham: { count: 6, percent: '0%' },
        MFC: { count: 76, percent: '3%' },
        Radz: { count: 1, percent: '0%' },
        Sinergy: { count: 1, percent: '0%' },
        mXr: { count: 6, percent: '0%' },
        Maui: { count: 4, percent: '0%' },
        'Black Project': { count: 2, percent: '0%' },
        Tribal: { count: 18, percent: '1%' },
        Angulo: { count: 1, percent: '0%' },
        Avanti: { count: 1, percent: '0%' },
        C3: { count: 2, percent: '0%' },
        Choco: { count: 2, percent: '0%' }
      })
    })
  })
})
