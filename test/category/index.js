'use strict'

const category = require('../../core/category')
require('should')

describe('categories', function () {
  it('plural', function () {
    category('sails').should.be.equal('sails')
  })

  it('singular', function () {
    category.singular('sails').should.be.equal('sail')
  })
})
