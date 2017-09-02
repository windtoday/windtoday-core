'use strict'

const boomConsonant = {
  carbon: 'a',
  aluminium: 'an'
}

const firstSentence = ({ brand, year }) => {
  const beginning = brand
    ? `This boom has been designed by ${brand}`
    : 'This boom has been manufactured'

  const end = year ? ` in ${year} ` : ''

  return `${beginning}${end}.`
}

const secondSentence = ({
  category,
  condition,
  modality,
  boomType,
  boomSize
}) => {
  const beginning =
    condition === 'New' ? `It's a completely new` : `It's an used`

  const development = modality
    ? ` ${modality.toLowerCase()} oriented ${category}`
    : ` ${category}`

  const middle = (() => {
    if (!boomType) return ''
    const type = boomType.toLowerCase()
    const consonant = boomConsonant[type]
    return `, with ${consonant} ${type} body`
  })()

  const end = boomSize ? ` aperture range starting at ${boomSize}cm` : ''

  const preend = end !== '' ? ' and' : ' with'

  return `${beginning}${development}${middle}${preend}${end}.`
}

const create = category => doc => {
  const {
    year,
    brand,
    modality,
    condition,
    'boom type': boomType,
    'boom size': boomSize
  } = doc

  const description = []

  description.push(firstSentence({ brand, year }))
  description.push(
    secondSentence({ category, condition, modality, boomType, boomSize })
  )
  return description.join(' ')
}

module.exports = create('mast')
