const usernameInputEl = loginDivEl.querySelector('#username')
const passwordInputEl = loginDivEl.querySelector('#password')
const loginButtonEl = loginDivEl.querySelector('#login-button')

usernameInputEl.addEventListener('keypress', (event) => {
  // listenForKey(event)
  if (event.key === 'Enter') {
    login(usernameInputEl.value, passwordInputEl.value)
  }
})
passwordInputEl.addEventListener('keypress', event => {
  // listenForKey(event)
  if (event.key === 'Enter') {
    login(usernameInputEl.value, passwordInputEl.value)
  }
})
loginButtonEl.addEventListener('click', () => {
  login(usernameInputEl.value, passwordInputEl.value)
})
usernameInputEl.focus()
