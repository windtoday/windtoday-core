'use strict'

const urlRegex = require('url-regex')
const isUrl = (str) => urlRegex().test(str)

module.exports = isUrl
