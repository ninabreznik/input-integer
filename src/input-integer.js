const bel = require('bel')
const csjs = require('csjs-inject')
const validator = require('solidity-validator')
const bigNumber = require('bignumber.js')

module.exports = displayIntegerInput

function displayIntegerInput ({ theme: { classes: css }, type, cb }) {
  const splitType = type.split('[')[0] // split to get basic type (bool, uint8)
  const min = validator.getRange(splitType).MIN
  const max = validator.getRange(splitType).MAX
  const title = `Valid values for type ${splitType} are from ${min} to ${max}`
  const num = bel`<input data-type=${splitType} type="text" class=${css.integerValue} value="0" onclick="${(e)=>e.target.select()}" onchange=${(e)=>validate(e)} oninput=${(e)=>sliderUpdate(e, splitType)} onkeydown=${(e)=>keysUpdating(e, splitType)}>`
  const slider = bel`<input data-type=${splitType} class=${css.integerSlider} type="range" title=${title} min=${min} max=${max} value="0" step=1 onchange=${(e)=>validate(e)} oninput=${(e)=>numUpdate(e, splitType)}>`
  return bel`<div class=${css.integerField}>
    ${slider}
    ${num}
  </div>`
  function numUpdate (e, splitType) {
    num.value = num.title = bigNumber(e.target.value).toFixed(0)
    validate(e, splitType)
  }
  function validate (e) {
    const value = e.target.value
    cb(validator.getMessage(splitType, value), e.target, value)
  }
  function keysUpdating (e, splitType) {
    const key = e.which
    const val = parseInt(e.target.value)
    if (key === 38 && val != slider.max) {
      slider.value = num.value = val + 1
    }
    else if (key === 40 && val != slider.min) {
      slider.value = num.value = val - 1
    }
    validate(e)
  }
  function sliderUpdate (e, splitType) {
    if (e.target.value === '') {
      slider.value = num.value = 0
    } else {
      slider.value = e.target.value
    }
    validate(e, splitType)
  }
}
