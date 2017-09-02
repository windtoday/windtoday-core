'use strict'

const firstSentence = ({ brand, year }) => {
  const beginning = brand
    ? `This fin has been designed by ${brand}`
    : 'This fin has been manufactured'

  const end = year ? ` in ${year} ` : ''

  return `${beginning}${end}.`
}

const secondSentence = ({ category, condition, finType, finSize }) => {
  const beginning =
    condition === 'New' ? `It's a completely new` : `It's an used`

  const development = finType
    ? ` ${finType} oriented ${category}`
    : ` ${category}`

  const end = finSize ? `, with a ${finSize}cm profile` : ''

  return `${beginning}${development}${end}.`
}

const create = category => doc => {
  const {
    year,
    brand,
    modality,
    condition,
    'fin type': finType,
    'fin size': finSize
  } = doc

  const description = []

  description.push(firstSentence({ brand, year }))
  description.push(
    secondSentence({ category, condition, modality, finType, finSize })
  )
  return description.join(' ')
}

module.exports = create('fin')
