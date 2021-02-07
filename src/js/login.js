const originalInputEl = loginDivEl.querySelector('input')

let tabIndex = 2

let inputArr = []
let username
let password

function createInputEl() {
  let divEl = document.createElement('input')
  divEl.classList.add('input')
  divEl.setAttribute('tabindex', tabIndex)
  tabIndex++
  divEl.addEventListener('keypress', listenForKey.bind(event))
  return divEl
}

function removeAllInputs() {
  loginDivEl.innerHTML = ''
}

function arrToString(arr) {
  let string = ''
  arr.forEach(c => {
    string += c
  })
  return string
}

function saveInputArr() {
  removeAllInputs()
  if (!username) {
    username = arrToString(inputArr)
    appendNewInput()
  } else {
    password = arrToString(inputArr)
    login(username, password)
  }
  inputArr = []
}

function appendNewInput() {
  let inputEl = createInputEl()
  loginDivEl.append(inputEl)
  inputEl.focus()
}

function listenForKey(event) {
  if (event.key.length > 1) {
    // check for enter, backspace, esc, arrows?
    if (event.key === 'Enter') {
      saveInputArr()
    } else if (event.key === 'Backspace') {
      event.preventDefault()
    }
  } else if (event.key !== ' ') {
    inputArr.push(event.key)
    appendNewInput()
  }
}

originalInputEl.addEventListener('keypress', (event) => {
  listenForKey(event)
})
originalInputEl.focus()
