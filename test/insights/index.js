'use strict'

const should = require('should')
const data = require('./data.json')
const {reduce} = require('lodash')

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

    describe('size by category', function () {
      ;[
        ['all', { count: 2521, percent: '100%' }],
        ['sails', { count: 842, percent: '33%' }],
        ['boards', { count: 722, percent: '29%' }],
        ['masts', { count: 514, percent: '20%' }],
        ['fins', { count: 280, percent: '11%' }],
        ['booms', { count: 163, percent: '6%' }]
      ].forEach(function (category) {
        const categoryName = category[0]
        const categorySize = category[1]

        it(categoryName, function () {
          const {size} = createInsights(data)
          should(size[categoryName]).be.eql(categorySize)
        })
      })
    })

    describe('items by category', function () {
      it('all', function () {
        const {items, size} = createInsights(data)
        const {all} = items

        should(all).be.eql({
          easysurfshop: {count: 198, percent: '8%'},
          telstarsurf: {count: 1070, percent: '42%'},
          lpwind: {count: 166, percent: '7%'},
          surfkeppler: {count: 410, percent: '16%'},
          ozutarifa: {count: 213, percent: '8%'},
          wewind: {count: 303, percent: '12%'},
          bellini: {count: 97, percent: '4%'},
          bigsurfshop: {count: 64, percent: '3%'}
        })

        const sum = reduce(all, (acc, item) => acc + item.count, 0)
        should(sum).be.equal(size.all.count)
      })

      it('sails', function () {
        const {items, size} = createInsights(data)
        const {sails} = items

        should(sails).be.eql({
          easysurfshop: { count: 72, percent: '9%' },
          lpwind: { count: 60, percent: '7%' },
          telstarsurf: { count: 354, percent: '42%' },
          ozutarifa: { count: 71, percent: '8%' },
          wewind: { count: 112, percent: '13%' },
          surfkeppler: { count: 133, percent: '16%' },
          bellini: { count: 23, percent: '3%' },
          bigsurfshop: { count: 17, percent: '2%' }
        })

        const sum = reduce(sails, (acc, item) => acc + item.count, 0)
        should(sum).be.equal(size.sails.count)
      })

      it('boards', function () {
        const {items, size} = createInsights(data)
        const {boards} = items

        should(boards).be.eql({
          lpwind: { count: 64, percent: '9%' },
          surfkeppler: { count: 191, percent: '26%' },
          telstarsurf: { count: 177, percent: '25%' },
          ozutarifa: { count: 102, percent: '14%' },
          wewind: { count: 88, percent: '12%' },
          easysurfshop: { count: 65, percent: '9%' },
          bellini: { count: 24, percent: '3%' },
          bigsurfshop: { count: 11, percent: '2%' }
        })

        const sum = reduce(boards, (acc, item) => acc + item.count, 0)
        should(sum).be.equal(size.boards.count)
      })

      it('masts', function () {
        const {items, size} = createInsights(data)
        const {masts} = items

        should(masts).be.eql({
          easysurfshop: { count: 43, percent: '8%' },
          telstarsurf: { count: 228, percent: '44%' },
          surfkeppler: { count: 82, percent: '16%' },
          lpwind: { count: 17, percent: '3%' },
          ozutarifa: { count: 22, percent: '4%' },
          bellini: { count: 24, percent: '5%' },
          bigsurfshop: { count: 19, percent: '4%' },
          wewind: { count: 79, percent: '15%' }
        })

        const sum = reduce(masts, (acc, item) => acc + item.count, 0)
        should(sum).be.equal(size.masts.count)
      })

      it('fins', function () {
        const {items, size} = createInsights(data)
        const {fins} = items

        should(fins).be.eql({
          telstarsurf: { count: 235, percent: '84%' },
          lpwind: { count: 8, percent: '3%' },
          bellini: { count: 16, percent: '6%' },
          ozutarifa: { count: 8, percent: '3%' },
          bigsurfshop: { count: 13, percent: '5%' }
        })

        const sum = reduce(fins, (acc, item) => acc + item.count, 0)
        should(sum).be.equal(size.fins.count)
      })

      it('booms', function () {
        const {items, size} = createInsights(data)
        const {booms} = items

        should(booms).be.eql({
          easysurfshop: { count: 18, percent: '11%' },
          surfkeppler: { count: 4, percent: '2%' },
          telstarsurf: { count: 76, percent: '47%' },
          lpwind: { count: 17, percent: '10%' },
          ozutarifa: { count: 10, percent: '6%' },
          bellini: { count: 10, percent: '6%' },
          bigsurfshop: { count: 4, percent: '2%' },
          wewind: { count: 24, percent: '15%' }
        })

        const sum = reduce(booms, (acc, item) => acc + item.count, 0)
        should(sum).be.equal(size.booms.count)
      })
    })
  })
})
