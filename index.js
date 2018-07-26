var bel = require('bel')
var csjs = require('csjs-inject')

module.exports = displayIntegerInput

var fonts = [
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://fonts.googleapis.com/css?family=Overpass+Mono" rel="stylesheet'
]
var fontAwesome = bel`<link href=${fonts[0]} rel='stylesheet' type='text/css'>`
var overpassMono = bel`<link href=${fonts[1]} rel='stylesheet' type='text/css'>`
document.head.appendChild(fontAwesome)
document.head.appendChild(overpassMono)

var colors = {
  white        : '#ffffff',   // borders, font on input background
  whiteSmoke   : '#f1f4f9',  // background
  lavenderGrey : '#e3e8ee',  // inputs background
  slateGrey    : '#8a929b',  // text
  violetRed    : '#e76685',
  aquaMarine   : '#59c4bc',
  turquoise    : '#14b9d5'
}

/* ---------------------

----------------------- */

function displayIntegerInput() {

var input = bel`<input class=${css.inputField} placeholder='123'>`

return bel`
  <div class=${css.inputContainer}>
    <div class=${css.inputTitle}>integer</div>
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

var css = csjs`
  body {
    background-color: ${colors.whiteSmoke};
    font-size: 16px;
  }
  .inputContainer {
    font-family: 'Overpass Mono', monospace;
    margin: 2%;
    display: flex;
    align-items: center;
    font-size: 1em;
    color: ${colors.slateGrey};
    width: 400px;
  }
  .inputFields {
    margin-left: 5%;
    display: flex;
    flex-direction: row;
  }
  .inputTitle {
    font-size: 1.2em;
    font-weight: bold;
    width: 100px;
  }
  .minus {
    ${inputStyle()}
    border-right: none;
    background-color: ${colors.violetRed}
  }
  .plus {
    ${inputStyle()}
    border-left: none;
    background-color: ${colors.aquaMarine}
  }
  .icon {
    color: ${colors.white};
  }
  .inputField {
    ${inputStyle()}
    font-size: 1em;
    color: ${colors.slateGrey};
    display: flex;
    align-items: stretch;
    text-align: center;
  }
  .inputField::placeholder {
    color: ${colors.white};
    text-align: center;
  }
`

function inputStyle () {
  return `
    border: 3px solid ${colors.white};
    background-color: ${colors.lavenderGrey};
    padding: 5px 10px;
  `
}
