'use strict'

const { price, year } = require('../../identify')
const { toLower, assign, merge } = require('lodash')
const isBlacklisted = require('../../schema/is-blacklisted')

const CONST = {
  SOURCE_NAME: 'totalwind', // TODO: Inject it!
  IGNORE_LOG_PROPS: ['updatedAt', 'createdAt', 'link', 'title', 'provider']
}

function createExtractor (opts) {
  const { type, category, extractor } = opts

  function _extractor (data) {
    if (isBlacklisted(data.title)) return

    data.type = type
    data.provider = CONST.SOURCE_NAME
    data.category = category

    const str = toLower(data.title)

    const dataExtracted = {
      price: price(str),
      year: year(str)
    }

    if (extractor) assign(dataExtracted, extractor(str))

    merge(data, dataExtracted)

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
