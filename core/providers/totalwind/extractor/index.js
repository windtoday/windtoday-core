'use strict'

const isBlacklisted = require('../../../schema/is-blacklisted')
const createSpecificExtractor = require('./specific')
const { price, year } = require('../../../identify')
const { toLower, merge } = require('lodash')
const COMMON = require('../common')

function createExtractor (opts) {
  const { type, category } = opts
  const specificExtractor = createSpecificExtractor(opts)

  function _extractor (data) {
    if (isBlacklisted(data.title)) return

    data.type = type
    data.provider = COMMON.PROVIDER_NAME

    const str = toLower(data.title)

    const basicExtractor = {
      price: price(str),
      year: year(str)
    }

    merge(data, basicExtractor, specificExtractor(str, data))

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
