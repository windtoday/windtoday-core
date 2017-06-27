'use strict'

const should = require('should')
const data = require('./data.json')

const createInsights = require('../../core/insights')

describe('core » insights', function () {
  describe('leaderboard', function () {
    it('list all providers', function () {
      const {providers} = createInsights(data)

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
      const {category} = createInsights(data)

      should(category).be.eql({
        sails: { count: 842, percent: '33%' },
        boards: { count: 722, percent: '29%' },
        masts: { count: 514, percent: '20%' },
        fins: { count: 280, percent: '11%' },
        booms: { count: 163, percent: '6%' }
      })
    })

    it('by provider', function () {
      const {provider} = createInsights(data)

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
      const {condition} = createInsights(data)

      should(condition).be.eql({
        new: {count: 2135, percent: '85%'},
        used: {count: 386, percent: '15%'}
      })
    })
  })
})
