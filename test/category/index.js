'use strict'

const category = require('../../core/category')
const should = require('should')

describe('categories', function () {
  it('plural', function () {
    const categoryDetected = category('sails')
    should(categoryDetected).be.equal('sails')
  })

  it('singular', function () {
    const categoryDetected = category.singular('sails')
    should(categoryDetected).be.equal('sail')
  })
})
