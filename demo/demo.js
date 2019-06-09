const csjs = require('csjs-inject')
const inputinteger = require('../')

var colors = {
  transparent: "transparent",
  white: "#ffffff", // borders, font on input background
  dark: "#2c323c", //background dark
  darkSmoke: '#21252b',  // separators
  whiteSmoke: "#dcd7d7", // background light
  slateGrey: "#8a929b", // text
  lightGrey: "#F1F2EB",
  violetRed: "#fd547d",  // used as red in types (bool etc.)
  aquaMarine: "#90FCF9",  // used as green in types (bool etc.)
  turquoise: "#14b9d5",
  yellow: "#F2CD5D",
  lavender: "#db94ff",
  androidGreen: "#9BC53D"
}

document.body.innerHTML = `<style>
.inputField {
  ${inputStyle()}
  font-size: 0.8rem;
  color: ${colors.whiteSmoke};
  border-color: ${colors.whiteSmoke};
  background-color: ${colors.darkSmoke};
  text-align: center;
  display: flex;
  width: 100%;
}
.inputField::placeholder {
  color: ${colors.whiteSmoke};
  text-align: center;
  opacity: 0.5;
}
.integerValue {
  ${inputStyle()}
  font-size: 1rem;
  color: ${colors.whiteSmoke};
  background-color: ${colors.darkSmoke};
  display: flex;
  text-align: center;
  width: 25%;
}
.integerValue::placeholder {
  color: ${colors.whiteSmoke};
  text-align: center;
  opacity: 0.5;
}
.integerSlider {
  width: 75%;
  border: 1px solid ${colors.whiteSmoke};
  -webkit-appearance: none;
  height: 0.2px;
}
.integerSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid ${colors.whiteSmoke};
  height: 22px;
  width: 10px;
  background: ${colors.darkSmoke};
  cursor: pointer;
}
.integerField {
  display: flex;
  width: 300px;
  align-items: center;
}
</style>`

function inputStyle() {
  return `
    border: 1px solid ${colors.whiteSmoke};
    background-color: ${colors.dark};
    padding: 5px;
  `
}

const classes = {
  inputField: 'inputField',
  integerValue: 'integerValue',
  integerSlider: 'integerSlider',
  integerField: 'integerField'
}
const log = document.createElement('pre')
const el = inputinteger({ theme: { classes }, type: 'uint8', cb: (err, val) => {
  if (err) log.appendChild(document.createTextNode(`${err}\n`))
  else log.appendChild(document.createTextNode(`ok: ${val}\n`))
} })
document.body.appendChild(el)
document.body.appendChild(log)
