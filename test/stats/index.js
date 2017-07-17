'use strict'

const should = require('should')
const data = require('../data.json')

const createStats = require('../../core/stats')

describe('core » stats', function () {
  describe('leaderboard', function () {
    it('list all providers', function () {
      const { providers } = createStats(data)

      should(providers).be.eql([
        'easysurfshop',
        'telstarsurf',
        'lpwind',
        'surfkeppler',
        'ozutarifa',
        'wewind',
        'bellini',
        'bigsurfshop'
      ])
    })

    it('by category', function () {
      const { category } = createStats(data)

      should(category).be.eql({
        sails: { count: 842, percent: '33%' },
        boards: { count: 722, percent: '29%' },
        masts: { count: 514, percent: '20%' },
        fins: { count: 280, percent: '11%' },
        booms: { count: 163, percent: '6%' }
      })
    })

    it('by provider', function () {
      const { provider } = createStats(data)

      should(provider).be.eql({
        easysurfshop: { count: 198, percent: '8%' },
        telstarsurf: { count: 1070, percent: '42%' },
        lpwind: { count: 166, percent: '7%' },
        surfkeppler: { count: 410, percent: '16%' },
        ozutarifa: { count: 213, percent: '8%' },
        wewind: { count: 303, percent: '12%' },
        bellini: { count: 97, percent: '4%' },
        bigsurfshop: { count: 64, percent: '3%' }
      })
    })

    it('by condition', function () {
      const { condition } = createStats(data)

      should(condition).be.eql({
        new: { count: 2135, percent: '85%' },
        used: { count: 386, percent: '15%' }
      })
    })

    it('by brand', function () {
      const { brand } = createStats(data)

      should(brand).be.eql({
        North: { count: 448, percent: '18%' },
        Loft: { count: 120, percent: '5%' },
        Gaastra: { count: 209, percent: '8%' },
        Severne: { count: 159, percent: '6%' },
        Starboard: { count: 164, percent: '7%' },
        undefined: { count: 36, percent: '1%' },
        RRD: { count: 50, percent: '2%' },
        'JP Australia': { count: 82, percent: '3%' },
        Naish: { count: 98, percent: '4%' },
        Prolimit: { count: 25, percent: '1%' },
        Neilpryde: { count: 166, percent: '7%' },
        Tabou: { count: 127, percent: '5%' },
        Fanatic: { count: 178, percent: '7%' },
        Gun: { count: 8, percent: '0%' },
        Aeron: { count: 16, percent: '1%' },
        Goya: { count: 49, percent: '2%' },
        'Point-7': { count: 3, percent: '0%' },
        Simmer: { count: 13, percent: '1%' },
        Secret: { count: 1, percent: '0%' },
        'Hot Maui': { count: 2, percent: '0%' },
        Challenger: { count: 1, percent: '0%' },
        Vandal: { count: 9, percent: '0%' },
        Unifiber: { count: 209, percent: '8%' },
        Ezzy: { count: 11, percent: '0%' },
        Exocet: { count: 20, percent: '1%' },
        Ka: { count: 5, percent: '0%' },
        Quatro: { count: 17, percent: '1%' },
        Mistral: { count: 8, percent: '0%' },
        F2: { count: 4, percent: '0%' },
        'Severne Sails': { count: 2, percent: '0%' },
        AHD: { count: 2, percent: '0%' },
        Arrows: { count: 3, percent: '0%' },
        Tribal: { count: 18, percent: '1%' },
        '': { count: 11, percent: '0%' },
        Chinook: { count: 10, percent: '0%' },
        Select: { count: 88, percent: '3%' },
        Technospar: { count: 4, percent: '0%' },
        Tushingham: { count: 7, percent: '0%' },
        XO: { count: 7, percent: '0%' },
        mXr: { count: 6, percent: '0%' },
        Angulo: { count: 1, percent: '0%' },
        Avanti: { count: 1, percent: '0%' },
        Maui: { count: 5, percent: '0%' },
        Bic: { count: 1, percent: '0%' },
        'Maui Ultra': { count: 5, percent: '0%' },
        B3: { count: 6, percent: '0%' },
        MFC: { count: 83, percent: '3%' },
        C3: { count: 2, percent: '0%' },
        MaverX: { count: 15, percent: '1%' },
        Drake: { count: 2, percent: '0%' },
        Sinergy: { count: 1, percent: '0%' },
        Choco: { count: 2, percent: '0%' },
        Radz: { count: 1, percent: '0%' }
      })
    })
  })
})
