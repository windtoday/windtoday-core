'use strict'

const { includes, chain, map } = require('lodash')
const { premium_providers: premiumProviders } = require('config')
const percentile = require('stats-percentile')
const isToday = require('date-fns/is_today')

const { minPercentile } = require('config').share

const hasHighPriceScore = baseScore => ({ priceScore }) =>
  priceScore >= baseScore

const isPremiumShop = ({ provider }) => includes(premiumProviders, provider)

const isRecent = ({ isForced, timestamp }) => !isForced && isToday(timestamp)

module.exports = items => {
  const scores = map(items, 'priceScore')
  const baseScore = percentile(scores, minPercentile)

  return chain(items)
    .filter(isRecent)
    .filter(isPremiumShop)
    .filter(hasHighPriceScore(baseScore))
    .sortBy('priceScore')
    .value()
}
