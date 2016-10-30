'use strict'

const cleanWhiteSpaces = require('condense-whitespace')
const { chain } = require('lodash')
const titly = require('titly')
const urlRegex = require('url-regex')

function permalink (str) {
  var [ groupId, docId ] = str.split('_')
  var base = 'https://www.facebook.com/groups'
  return [base, groupId, 'permalink', docId].join('/')
}

function parse (res) {
  return chain(res)
    .map(res => JSON.parse(res.body).data)
    .flatten()
    .filter('message')
    .uniqBy('message')
    .map(function (item) {
      return {
        // TODO: cleanWhiteSpaces will be executed before call specific extractor.
        title: titly(cleanWhiteSpaces(item.message)),
        updatedAt: Date.parse(item.updated_time),
        url: permalink(item.id)
      }
    })
    .filter(item => !urlRegex().test(item.title))
    .value()
}

module.exports = parse
