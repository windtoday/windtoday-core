'use strict'

const isBlacklisted = require('../../../schema/is-blacklisted')
const createSpecificExtractor = require('./specific')
const { price, year } = require('../../../identify')
const { toLower, merge } = require('lodash')
const COMMON = require('../common')

function createExtractor (opts) {
  const { type } = opts
  const specificExtractor = createSpecificExtractor(opts)

  function _extractor (data) {
    const title = data.title = toLower(data.title)
    if (isBlacklisted(title)) return

    data.type = type
    data.provider = COMMON.PROVIDER_NAME

    const basicExtractor = {
      price: price(title),
      year: year(title)
    }

    merge(data, basicExtractor, specificExtractor(data))

    this.validate(data, (validationError, instance) => {
      ++this.stats.total

      if (validationError) {
        this.log.error(validationError)
        return
      }

      ++this.stats.add
      this.db.addObject(instance)
    })
  }

  return _extractor
}

module.exports = createExtractor
