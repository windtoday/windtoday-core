'use strict'

const appendQuery = require('append-query')

function getReferralLink (item) {
  const { link } = item
  if (!link) return
  return appendQuery(link, { ref: 'windtodayco' })
}

module.exports = getReferralLink
