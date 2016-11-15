'use strict'

const cleanWhiteSpaces = require('condense-whitespace')
const { chain, replace } = require('lodash')
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
        title: replace(cleanWhiteSpaces(item.message), /\n/g, ' '),
        updatedAt: Date.parse(item.updated_time),
        url: permalink(item.id)
      }
    })
    .filter(item => !urlRegex().test(item.title))
    .value()
}

module.exports = parse
