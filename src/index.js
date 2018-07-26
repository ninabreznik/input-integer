var bel = require('bel')
var csjs = require('csjs-inject')

module.exports = displayIntegerInput

/* ---------------------

----------------------- */

function displayIntegerInput{name, theme: {classes: css}}) {

  var input = bel`<input class=${css.inputField} placeholder='123'>`

  return bel`
    <div class=${css.inputContainer}>
      <div class=${css.inputTitle}>${name}</div>
      <div class=${css.inputFields}>
        <div class=${css.minus} onclick=${()=>decrement()}>
          <i class="${css.icon} fa fa-minus"></i>
        </div>
        ${input}
        <div class=${css.plus} onclick=${()=>increment()}>
          <i class="${css.icon} fa fa-plus"></i>
        </div>
      </div>
    </div>
  `
  function increment (e) {
    console.log(input.value)
    var value = input.value
    value ++
    input.value = value
  }

  function decrement (e) {
    console.log(input.value)
    var value = input.value
    value --
    input.value = value
  }

}
