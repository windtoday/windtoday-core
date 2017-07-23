'use strict'

const should = require('should')
const data = require('../data.json')

const createStats = require('../../core/stats')

describe('core » stats', function () {
  describe('leaderboard', function () {
    it('list all providers', function () {
      const { providers } = createStats(data)

      should(providers).be.eql([
        'ozutarifa',
        'wewind',
        'telstarsurf',
        'lpwind',
        'surfkeppler',
        'easysurfshop',
        'bellini',
        'bigsurfshop'
      ])
    })

    it('by category', function () {
      const { category } = createStats(data)

      should(category).be.eql({
        sails: { count: 771, percent: '32%' },
        boards: { count: 697, percent: '29%' },
        masts: { count: 527, percent: '22%' },
        booms: { count: 162, percent: '7%' },
        fins: { count: 284, percent: '12%' }
      })
    })

    it('by provider', function () {
      const { provider } = createStats(data)

      should(provider).be.eql({
        ozutarifa: { count: 258, percent: '11%' },
        wewind: { count: 303, percent: '12%' },
        telstarsurf: { count: 970, percent: '40%' },
        lpwind: { count: 159, percent: '7%' },
        surfkeppler: { count: 388, percent: '16%' },
        easysurfshop: { count: 207, percent: '8%' },
        bellini: { count: 97, percent: '4%' },
        bigsurfshop: { count: 59, percent: '2%' }
      })
    })

    it('by condition', function () {
      const { condition } = createStats(data)

      should(condition).be.eql({
        new: { count: 2086, percent: '85%' },
        used: { count: 355, percent: '15%' }
      })
    })

    it('by brand', function () {
      const { brand } = createStats(data)

      should(brand).be.eql({
        Severne: { count: 173, percent: '7%' },
        Starboard: { count: 161, percent: '7%' },
        Fanatic: { count: 168, percent: '7%' },
        Tabou: { count: 117, percent: '5%' },
        'JP Australia': { count: 75, percent: '3%' },
        F2: { count: 5, percent: '0%' },
        Gaastra: { count: 195, percent: '8%' },
        Loft: { count: 99, percent: '4%' },
        North: { count: 417, percent: '17%' },
        Challenger: { count: 1, percent: '0%' },
        Secret: { count: 1, percent: '0%' },
        Goya: { count: 60, percent: '2%' },
        Exocet: { count: 18, percent: '1%' },
        Neilpryde: { count: 167, percent: '7%' },
        Naish: { count: 90, percent: '4%' },
        'Hot Maui': { count: 4, percent: '0%' },
        Simmer: { count: 8, percent: '0%' },
        Gun: { count: 7, percent: '0%' },
        RRD: { count: 50, percent: '2%' },
        Vandal: { count: 9, percent: '0%' },
        'Point-7': { count: 1, percent: '0%' },
        Mistral: { count: 8, percent: '0%' },
        Ezzy: { count: 8, percent: '0%' },
        Quatro: { count: 21, percent: '1%' },
        Ka: { count: 5, percent: '0%' },
        Unifiber: { count: 211, percent: '9%' },
        Prolimit: { count: 26, percent: '1%' },
        Aeron: { count: 13, percent: '1%' },
        AHD: { count: 2, percent: '0%' },
        'Severne Sails': { count: 2, percent: '0%' },
        undefined: { count: 36, percent: '1%' },
        Bic: { count: 1, percent: '0%' },
        'Maui Ultra': { count: 5, percent: '0%' },
        B3: { count: 7, percent: '0%' },
        MaverX: { count: 15, percent: '1%' },
        Arrows: { count: 3, percent: '0%' },
        Drake: { count: 2, percent: '0%' },
        '': { count: 11, percent: '0%' },
        Select: { count: 94, percent: '4%' },
        Tushingham: { count: 6, percent: '0%' },
        Chinook: { count: 11, percent: '0%' },
        XO: { count: 7, percent: '0%' },
        Technospar: { count: 7, percent: '0%' },
        MFC: { count: 78, percent: '3%' },
        Radz: { count: 1, percent: '0%' },
        Sinergy: { count: 1, percent: '0%' },
        mXr: { count: 6, percent: '0%' },
        Maui: { count: 4, percent: '0%' },
        Tribal: { count: 18, percent: '1%' },
        Angulo: { count: 1, percent: '0%' },
        Avanti: { count: 1, percent: '0%' },
        C3: { count: 2, percent: '0%' },
        Choco: { count: 2, percent: '0%' }
      })
    })
  })
})
