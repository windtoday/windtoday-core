'use strict'

const { get } = require('lodash')
const should = require('should')

const log = require('../../core/log')('others_unidentify')
const others = require('../../core/identify/other')(log)

describe('identify » others', function () {
  it('category', function () {
    const str = 'Vendo Neopreno Mystic 5/3 talla S - 110€'
    const { data } = others(str)
    should(get(data, 'category')).be.equal('others')
  })

  it('brand', function () {
    const str = 'Vendo Neopreno Mystic 5/3 talla S - 110€'
    const { data, output } = others(str)
    should(get(data, 'brand')).be.equal('Mystic')
    should(output.includes('Mystic')).be.false()
  })
})
