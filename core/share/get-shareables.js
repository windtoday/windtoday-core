'use strict'

const {includes, filter, overEvery} = require('lodash')
const {premium_providers: premiumProviders} = require('config')

const MAX_PRICE_BASELINE = 500

const isOffer = (item) => item.price < MAX_PRICE_BASELINE
const isPremium = (item) => includes(premiumProviders, item.provider)

const conditions = overEvery([isOffer, isPremium])

module.exports = (items) => filter(items, conditions)
