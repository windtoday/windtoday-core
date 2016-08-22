'use strict'

var isBlacklisted = require('../../schema/is-blacklisted')
var extract = require('../../extract')
var lodash = require('lodash')

var CONST = {
  SOURCE_NAME: 'totalwind',
  IGNORE_LOG_PROPS: ['updatedAt', 'createdAt', 'link', 'title', 'provider']
}

function createExtractor (type, category) {
  function extractor (data) {
    if (isBlacklisted(data.title)) return

    data.type = type
    data.provider = CONST.SOURCE_NAME
    data.category = category

    var normalizeTitle = lodash.toLower(data.title)

    var dataExtract = {
      price: extract.price(normalizeTitle),
      year: extract.year(normalizeTitle)
    }

    if (lodash.isEqual(category, 'sails'))
      lodash.assign(dataExtract, extract.sail(normalizeTitle))

    lodash.merge(data, dataExtract)

    var self = this

    this.validate(data, function (validationError, instance) {
      ++self.stats.total
      if (!validationError) {
        self.log.debug(lodash.omit(instance, CONST.IGNORE_LOG_PROPS))
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
