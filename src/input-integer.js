const bel = require('bel')
const csjs = require('csjs-inject')
const validator = require('solidity-validator')
const bigNumber = require('bignumber.js')

module.exports = displayIntegerInput

function displayIntegerInput ({ theme: { classes: css }, type, cb }) {
  const min = validator.getRange(type).MIN
  const max = validator.getRange(type).MAX
  const title = `Valid values for type ${type} are from ${min} to ${max}`
  const num = bel`<input data-type=${type} type="text" class=${css.integerValue} value="0" oninput=${(e)=>sliderUpdate(e, type)} onkeydown=${(e)=>keysUpdating(e, type)}>`
  const slider = bel`<input data-type=${type} class=${css.integerSlider} type="range" title=${title} min=${min} max=${max} value="0" step=1 oninput=${(e)=>numUpdate(e, type)}>`
  return bel`<div class=${css.integerField}>
    ${slider}
    ${num}
  </div>`
  function numUpdate (e, type) {
    num.value = num.title = bigNumber(e.target.value).toFixed(0)
    validate(e, type)
  }
  function validate (e, type) {
    const value = e.target.value
    cb(validator.getMessage(type, value), value)
  }
  function keysUpdating (e, type) {
    const key = e.which
    const val = parseInt(e.target.value)
    if (key === 38 && val != slider.max) {
      slider.value = num.value = val + 1
    }
    else if (key === 40 && val != slider.min) {
      slider.value = num.value = val - 1
    }
    validate(e, type)
  }
  function sliderUpdate (e, type) {
    if (e.target.value === '') {
      slider.value = num.value = 0
    } else {
      slider.value = e.target.value
    }
    validate(e, type)
  }
}
