'use strict'

const {includes, filter, overEvery} = require('lodash')
const {premium_providers: premiumProviders} = require('config')
const isToday = require('date-fns/is_today')

const MIN_PRICE_SCORE = 90

const isDeal = ({priceScore}) => priceScore >= MIN_PRICE_SCORE

const isPremiumShop = item => includes(premiumProviders, item.provider)

const isRecent = item => isToday(item.timestamp)

const conditions = overEvery([
  isRecent,
  isPremiumShop,
  isDeal
])

module.exports = items => filter(items, conditions)
