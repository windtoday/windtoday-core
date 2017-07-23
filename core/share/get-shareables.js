'use strict'

const {includes, overEvery, chain} = require('lodash')
const {premium_providers: premiumProviders} = require('config')
const isToday = require('date-fns/is_today')

const {minPriceScore} = require('config').share

const isDeal = ({priceScore}) => priceScore >= minPriceScore

const isPremiumShop = ({provider}) => includes(premiumProviders, provider)

const isRecent = ({isForced, timestamp}) => !isForced && isToday(timestamp)

const conditions = overEvery([
  isRecent,
  isPremiumShop,
  isDeal
])

module.exports = items => chain(items)
  .filter(conditions)
  .sortBy('priceScore')
  .value()
