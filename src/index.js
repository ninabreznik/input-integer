var bel = require('bel')
var csjs = require('csjs-inject')
var validateInput = require('validate-input')

module.exports = displayIntegerInput

/* ---------------------

----------------------- */

function displayIntegerInput({theme: {classes: css}, type}) {
  var num = bel`<input class=${css.integerValue} min="" max="" value="50" oninput=${(e)=>sliderUpdate(e)} onkeydown=${(e)=>keysUpdating(e)}>`
  var slider = bel`<input class=${css.integerSlider} type="range" min="" max="" value="50" step="1" oninput=${(e)=>numUpdate(e)}>`
  var type = intOrUint(type)

  return bel`
    <div class=${css.integerField}>
      ${slider}
      ${num}
    </div>
  `
  function numUpdate (e) {
    num.value = e.target.value;
  }

  function keysUpdating (e) {
    var key = e.which
    var val = parseInt(e.target.value)
    if (key === 38 && val != slider.max) {
      slider.value = num.value = val + 1
    }
    else if (key === 40 && val != slider.min) {
      slider.value = num.value = val - 1
    }
  }

  function sliderUpdate (e) {
    if (e.target.value === '') {
      slider.value = num.value = 0
    } else {
      slider.value = e.target.value
    }
  }

  function intOrUint (t) {
    var type = t.search(/\bint/) != -1 ? 'int' : 'uint'
    if (type === 'int') {
      slider.min = num.min = -100
      slider.max = num.max = 100
    }
    else if (type === 'uint') {
      slider.min = num.min = 0
      slider.max = num.max = 100
    }
  }

}
