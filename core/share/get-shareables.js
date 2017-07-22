'use strict'

const {includes, filter, overEvery} = require('lodash')
const {premium_providers: premiumProviders} = require('config')

const MIN_PRICE_SCORE = 90

const isDeal = ({priceScore}) => priceScore >= MIN_PRICE_SCORE

const isPremiumShop = item => includes(premiumProviders, item.provider)

const conditions = overEvery([isPremiumShop, isDeal])

module.exports = items => filter(items, conditions)
