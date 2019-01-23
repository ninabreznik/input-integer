var bel = require('bel')
var csjs = require('csjs-inject')
var validator = require('solidity-validator')

module.exports = displayIntegerInput

/* ---------------------

----------------------- */

function displayIntegerInput({theme: {classes: css}, type, cb}) {
  var range = getRange(type)
  var min = validator.getRange(type).MIN
  var max = validator.getRange(type).MAX
  var title = `Valid values for type ${type} are from ${min} to ${max}`
  var num = bel`<input class=${css.integerValue} title=${title} min=${min} max=${max} value="0" oninput=${(e)=>sliderUpdate(e, type)} onkeydown=${(e)=>keysUpdating(e, type)}>`
  var slider = bel`<input class=${css.integerSlider} type="range" title=${title} min=${min} max=${max} value="0" step=${range} oninput=${(e)=>numUpdate(e, type)}>`
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

  function getRange (type) {
    var size = type.split('int')[1] // get integer size (8, 16, 256 etc.)
    if (size < 16) return "1"
    if (size < 24) return "1000"
    if (size < 32) return "100000"
    if (size < 256) return "100000000000"
    if (size <= 256) return "500000000000000000000000000000000000000000000000000000000000000000000000000"
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
