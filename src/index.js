var bel = require('bel')
var csjs = require('csjs-inject')
var validator = require('solidity-validator')

module.exports = displayIntegerInput

/* ---------------------

----------------------- */

function displayIntegerInput({theme: {classes: css}, type, cb}) {
  var num = bel`<input class=${css.integerValue} min=${validator.getRange(type).MIN} max=${validator.getRange(type).MAX} value="0" oninput=${(e)=>sliderUpdate(e, type)} onkeydown=${(e)=>keysUpdating(e, type)}>`
  var slider = bel`<input class=${css.integerSlider} type="range" min=${validator.getRange(type).MIN} max=${validator.getRange(type).MAX} value="0" step="1" oninput=${(e)=>numUpdate(e, type)}>`
  console.log('MESSAGE')
  console.log(validator.getMessage('uint256', '33'))
  return bel`
    <div class=${css.integerField}>
      ${slider}
      ${num}
    </div>
  `
  function numUpdate (e, type) {
    num.value = e.target.value
    validate(e, type)
  }

  function validate (e, type) {
    var msg = validator.getMessage(type, e.target.value)
    if (msg) cb(msg)
    else cb(null)
  }

  function keysUpdating (e, type) {
    var key = e.which
    var val = parseInt(e.target.value)
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
