'use strict'

const { includes, chain } = require('lodash')
const { premium_providers: premiumProviders } = require('config')
const isToday = require('date-fns/is_today')

const { minPriceScore } = require('config').share

const hasHighPriceScore = ({ priceScore }) => priceScore >= minPriceScore

const isPremiumShop = ({ provider }) => includes(premiumProviders, provider)

const isRecent = ({ isForced, timestamp }) => !isForced && isToday(timestamp)

module.exports = items =>
  chain(items)
    .filter(isRecent)
    .filter(isPremiumShop)
    .filter(hasHighPriceScore)
    .sortBy('priceScore')
    .value()
