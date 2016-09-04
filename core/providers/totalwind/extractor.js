'use strict'

const { price, year, sail } = require('../../identify')
const { toLower, assign, merge, omit } = require('lodash')
const isBlacklisted = require('../../schema/is-blacklisted')

const CONST = {
  SOURCE_NAME: 'totalwind',
  IGNORE_LOG_PROPS: ['updatedAt', 'createdAt', 'link', 'title', 'provider']
}

const getExtractor = {
  sails: sail
}

function log (data) {
  this.log.debug(omit(data, CONST.IGNORE_LOG_PROPS))
}

function createExtractor (type, category) {
  function extractor (data) {
    if (isBlacklisted(data.title)) return

    data.type = type
    data.provider = CONST.SOURCE_NAME
    data.category = category

    const normalizeTitle = toLower(data.title)

    const dataExtract = {
      price: price(normalizeTitle),
      year: year(normalizeTitle)
    }

    var extractor = getExtractor[category]
    if (extractor) assign(dataExtract, sail(normalizeTitle))

    merge(data, dataExtract)

    this.validate(data, (validationError, instance) => {
      ++this.stats.total

      if (validationError) {
        this.log.error(validationError)
        return
      }

      log.call(this, instance)

      ++this.stats.valid
      if (this.db[category]) {
        ++this.stats.add
        this.db[category].addObject(instance)
      }
    })
  }

  return extractor
}

module.exports = createExtractor
