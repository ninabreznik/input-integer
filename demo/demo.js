const csjs = require('csjs-inject')
const inputinteger = require('../')

document.body.innerHTML = `<style>
.inputField {
  color: #cccccc;
  background-color: #666;
}
.integerValue {
  color: #cccccc;
  background-color: #666666;
  width: 25%;
}
.integerSlider {
  background: #333333;
}
.integerField {
  width: 300px;
}
</style>`

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
