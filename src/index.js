var bel = require('bel')
var csjs = require('csjs-inject')
var validateInput = require('validate-input')

module.exports = displayIntegerInput

/* ---------------------

----------------------- */

function displayIntegerInput({theme: {classes: css}, type}) {
  var type = intOrUint(type)
  var input = bel`<input class=${css.inputField} onchange=${e=>validateInput({ type, e})} placeholder='123'>`
  return bel`
    <div class=${css.integerField}>
      <div class=${css.minus} onclick=${()=>decrement()}>
        <i class="${css.icon} fa fa-minus"></i>
      </div>
      ${input}
      <div class=${css.plus} onclick=${()=>increment()}>
        <i class="${css.icon} fa fa-plus"></i>
      </div>
    </div>
  `
  function increment (e) {
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

  function intOrUint (type) {
    return type.search(/\bint/) != -1 ? 'int' : 'uint'
  }

}
