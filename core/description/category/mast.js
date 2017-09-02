'use strict'

const firstSentence = ({ mastType, brand, year }) => {
  const beginning =
    mastType === 'SDM'
      ? 'This Standard Diameter Mast (SDM)'
      : mastType === 'RDM' ? `This Reduced Diameter Mast (RDM)` : 'This mast'

  const development = brand
    ? `has been designed by ${brand}`
    : 'has been manufactured'

  const end = year ? `in ${year}` : ''

  return `${beginning} ${development} ${end}.`
}

const secondSentence = ({
  category,
  condition,
  modality,
  mastCarbon,
  mastSize
}) => {
  const beginning =
    condition === 'New' ? `It's a completely new` : `It's an used`

  const development = modality
    ? `${modality.toLowerCase()} oriented ${category},`
    : `${category},`

  const middle = mastCarbon ? `with ${mastCarbon}% of carbon content` : ''
  const end = mastSize ? `a size of ${mastSize}cm in height` : ''
  const preend = middle !== '' ? 'and' : 'with'

  return `${beginning} ${development} ${middle} ${preend} ${end}.`
}

const create = category => doc => {
  const {
    year,
    brand,
    modality,
    condition,
    'mast type': mastType,
    'mast size': mastSize,
    'mast carbon': mastCarbon
  } = doc

  const description = []

  description.push(firstSentence({ mastType, brand, year }))
  description.push(
    secondSentence({ category, condition, modality, mastCarbon, mastSize })
  )
  return description.join(' ')
}

module.exports = create('mast')
