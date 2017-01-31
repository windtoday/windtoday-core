'use strict'

const titleizeProps = require('../../core/util/titleize-props')

const fixture = {
  title: 'PROLIMIT CYBER BOOM 202 €129',
  price: 129,
  name: 'CYBER BOOM',
  brand: 'PROLIMIT',
  image: 'http://www.telstarsurf.com/cache/img/577070440a1c/500/500/max/max/cyber-boom.jpeg',
  link: 'http://www.telstarsurf.com/windsurf/windsurf-booms/aluminum-booms/9669/prolimit-cyber-boom/',
  size: 202
}

describe('util » titleize props', function () {
  it('titleize string and avoid links', function () {
    const output = titleizeProps(fixture)
    output.should.be.eql({
      title: 'Prolimit Cyber Boom 202 €129',
      price: 129,
      name: 'Cyber Boom',
      brand: 'Prolimit',
      image: 'http://www.telstarsurf.com/cache/img/577070440a1c/500/500/max/max/cyber-boom.jpeg',
      link: 'http://www.telstarsurf.com/windsurf/windsurf-booms/aluminum-booms/9669/prolimit-cyber-boom/',
      size: 202
    })
  })
})
