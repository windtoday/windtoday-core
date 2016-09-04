'use strict'

const isBlacklisted = require('../../schema/is-blacklisted')
const extract = require('../../extract')
const { toLower, isEqual, assign, merge, omit } = require('lodash')

const CONST = {
  SOURCE_NAME: 'totalwind',
  IGNORE_LOG_PROPS: ['updatedAt', 'createdAt', 'link', 'title', 'provider']
}

function createExtractor (type, category) {
  function extractor (data) {
    if (isBlacklisted(data.title)) return

    data.type = type
    data.provider = CONST.SOURCE_NAME
    data.category = category

    const normalizeTitle = toLower(data.title)

    const dataExtract = {
      price: extract.price(normalizeTitle),
      year: extract.year(normalizeTitle)
    }

    if (isEqual(category, 'sails')) assign(dataExtract, extract.sail(normalizeTitle))
    merge(data, dataExtract)

    const self = this

    this.validate(data, function (validationError, instance) {
      ++self.stats.total
      if (!validationError) {
        self.log.debug(omit(instance, CONST.IGNORE_LOG_PROPS))
        ++self.stats.valid
        if (self.db[category]) {
          ++self.stats.add
          self.db[category].addObject(instance)
        }
      } else {
        self.log.error(validationError)
      }
    })
  }

  return extractor
}

module.exports = createExtractor
