'use strict'

const category = require('../core/category')
const should = require('should')

describe('categories', function () {
  it('access raw category', function () {
    category.sails.should.be.equal('sails')
  })

  it('determinate the category', function () {
    [
      'sails',
      'SAILS'
    ].forEach(function (key) {
      category(key).should.be.equal('sails')
    })
  })
})
