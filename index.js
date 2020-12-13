const sideBarDivEl = document.querySelector('#side-bar')
const addNoteButtonEl = document.querySelector('#add-note-button')
const inputAreaDivEl = document.querySelector('#input-area')
const sideBarHeaderEl = document.querySelector('#side-bar-header')
const noteListEl = document.querySelector('#note-list')

const menuButtonEl = document.querySelector('#menu-button')

const addNoteBar = document.querySelector('#add-note-bar')
const addNoteDailyFilter = document.querySelector('#add-note-daily-filter')
const addNoteRandomFilter = document.querySelector('#add-note-random-filter')
const finalAddNoteButtonEl = document.querySelector('#final-add-note-button')

const dailyFilterEl = document.querySelector('#daily-filter')
const randomFilterEl = document.querySelector('#random-filter')
const noneFilterEl = document.querySelector('#none-filter')

const landingMenuButtonEl = document.querySelector('#landing-menu-button')
const randomNoteContentEl = document.querySelector('#random-note-content')

let notesArr = []
let dailyNotesArr = []
let randomNotesArr = []

// Used in firebase.js
function getNote(id) {
  const noteIndex = notesArr.findIndex((note) => note.id === id)
  return notesArr[noteIndex]
}
function getNoteIndex(id) {
  return (noteIndex = notesArr.findIndex((note) => note.id === id))
}

function removeAllElFromInputArea() {
  inputAreaDivEl.classList.add('invisible')
  removeTextAreaHeader()
  removeTextArea()
}

function removeTextAreaHeader() {
  const textAreaHeaderEl = document.querySelector('#input-area-header')
  if (textAreaHeaderEl) {
    textAreaHeaderEl.remove()
  }
}

function removeTextArea() {
  const textAreaEl = document.querySelector('#input')
  if (textAreaEl) {
    textAreaEl.remove()
  }
}

function saveNoteToDBAfterTimeout(noteId) {
  let timeoutId = setTimeout(() => {
    timer = true
    if (timer) {
      saveNoteInDB(noteId)
    }
  }, 5000)
  return timeoutId
}

function clearStartedTimeout(timeoutId) {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
}

function autoSaveDocument(noteId, textAreaEl) {
  let timeoutId
  textAreaEl.addEventListener('keyup', () => {
    clearStartedTimeout(timeoutId)
    const noteIndex = getNoteIndex(noteId)
    notesArr[noteIndex].entry = textAreaEl.value
    timeoutId = saveNoteToDBAfterTimeout(noteId)
  })
}

function toggleSidebar() {
  if (sideBarDivEl.classList.contains('invisible')) {
    menuButtonEl.classList.remove('collapse')
    sideBarDivEl.classList.remove('invisible')
  } else {
    menuButtonEl.classList.add('collapse')
    sideBarDivEl.classList.add('invisible')
  }
}

function toggleDisplayNone(el) {
  if (el.classList.contains('invisible')) {
    el.classList.remove('invisible')
  } else {
    el.classList.add('invisible')
    el.classList.remove('visible')
  }
}

function toggleDisplayNoneAndDisplayFlex(el) {
  if (el.style.display === 'none') {
    el.style.display = 'flex'
  } else {
    el.style.display = 'none'
  }
}

function rotateExpandElement(el) {
  if (!el.classList.contains('rotate')) {
    el.classList.add('rotate')
  } else {
    el.classList.remove('rotate')
  }
}

function renderEditModal(note) {
  // creating shadow screen
  const modalDivEl = document.createElement('div')
  modalDivEl.classList.add('modal')

  // creating form body
  const modalFormEl = document.createElement('div')
  modalFormEl.classList.add('modal-form')

  //creating inputs
  const titleInputEl = document.createElement('input')
  const dateInputEl = document.createElement('input')

  // creating buttons
  const saveButtonEl = document.createElement('button')
  const cancelButtonEl = document.createElement('button')

  cancelButtonEl.textContent = 'C'
  saveButtonEl.textContent = 'Save'

  titleInputEl.setAttribute('placeholder', `Title - ${note.title}`)
  dateInputEl.setAttribute('placeholder', `Date - ${note.date}`)

  titleInputEl.addEventListener('keyup', () => {
    if (titleInputEl.value.length > 0) {
      // Display a label above input with the current value
    } else {
      // Hide label
    }
  })

  function removeModal() {
    document.body.removeChild(modalDivEl)
    document.body.removeChild(modalFormEl)
  }

  cancelButtonEl.addEventListener('click', removeModal)
  modalDivEl.addEventListener('click', removeModal)
  saveButtonEl.addEventListener('click', () => {
    if (!titleInputEl.value && !dateInputEl.value) {
      alert('Fill out at least one field')
      return
    }
    if (titleInputEl.value && titleInputEl.value !== note.title) {
      note.title = titleInputEl.value
    }
    if (dateInputEl.value && dateInputEl.value !== note.date) {
      note.date = dateInputEl.value
    }

    const noteIndex = getNoteIndex(note.id)
    notesArr[noteIndex] = note

    saveNoteInDB(note.id)

    removeModal()

  })

  modalFormEl.appendChild(cancelButtonEl)
  modalFormEl.appendChild(titleInputEl)
  modalFormEl.appendChild(dateInputEl)
  modalFormEl.appendChild(saveButtonEl)

  // modalFormEl.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quibusdam error consequatur. Earum aliquam repudiandae magni doloribus nobis error sequi accusamus porro fugit iusto? Iste natus alias a sit dolores?'
  document.body.appendChild(modalDivEl)
  document.body.appendChild(modalFormEl)
  // console.log('hej')
}

function renderTextAreaHeader(note) {
  const headerEl = document.createElement('div')
  const h2El = document.createElement('h2')
  const expandButtonContainerEl = document.createElement('div')
  const expandButtonEl = document.createElement('img')
  const iconsContainerEl = document.createElement('div')
  const deleteButtonEl = document.createElement('img')
  const editButtonEl = document.createElement('img')
  const backButtonEl = document.createElement('img')
  const questionsButtonEl = document.createElement('img')

  expandButtonContainerEl.setAttribute(
    'id',
    'input-area-header-expand-button-container'
  )

  iconsContainerEl.classList.add('input-area-header-icons-container')
  iconsContainerEl.style.display = 'none'

  headerEl.setAttribute('id', 'input-area-header')
  h2El.textContent = note.title

  expandButtonEl.setAttribute('id', 'expand-button')
  expandButtonEl.setAttribute('src', './src/images/expand-false.svg')
  expandButtonEl.setAttribute('alt', 'options')

  deleteButtonEl.setAttribute('src', './src/images/trash.svg')
  deleteButtonEl.setAttribute('alt', 'delete')
  deleteButtonEl.setAttribute('id', 'delete-button')

  editButtonEl.setAttribute('src', './src/images/edit.svg')
  editButtonEl.setAttribute('alt', 'edit')
  editButtonEl.setAttribute('id', 'edit-button')

  questionsButtonEl.setAttribute('src', './src/images/question.svg')
  questionsButtonEl.setAttribute('alt', 'Questions')

  backButtonEl.setAttribute('src', './src/images/show.svg')
  backButtonEl.setAttribute('id', 'menu-button')
  backButtonEl.setAttribute('alt', 'back')

  backButtonEl.addEventListener('click', () => {
    toggleSidebar()
  })

  expandButtonEl.addEventListener('click', () => {
    toggleDisplayNoneAndDisplayFlex(iconsContainerEl)
    toggleDisplayNone(h2El)
    rotateExpandElement(expandButtonEl)
  })

  deleteButtonEl.addEventListener('click', () => {
    deleteNote(note.id, note.option)
    removeAllElFromInputArea()
  })

  editButtonEl.addEventListener('click', () => {
    renderEditModal(note)
  })

  expandButtonContainerEl.appendChild(expandButtonEl)

  iconsContainerEl.appendChild(questionsButtonEl)
  iconsContainerEl.appendChild(editButtonEl)
  iconsContainerEl.appendChild(deleteButtonEl)

  headerEl.appendChild(backButtonEl)
  headerEl.appendChild(h2El)
  headerEl.appendChild(iconsContainerEl)
  headerEl.appendChild(expandButtonContainerEl)
  inputAreaDivEl.appendChild(headerEl)
}

function renderTextArea(entry, noteId) {
  inputAreaDivEl.classList.remove('invisible')
  const textAreaEl = document.createElement('textarea')
  textAreaEl.setAttribute('id', 'input')
  textAreaEl.value = entry
  inputAreaDivEl.appendChild(textAreaEl)
  autoSaveDocument(noteId, textAreaEl)
}

function getCurrentDate() {
  let now = new Date()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let year = now.getFullYear()
  let dateO = year.toString() + '-' + month.toString() + '-' + date.toString()
  return dateO
}

function updateNotesArr() {
  notesArr = dailyNotesArr.concat(randomNotesArr)
}

function getNoteObject(noteTitle, option) {
  let date = getCurrentDate()
  let noteObject = {
    option: option,
    title: noteTitle,
    entry: null,
    date: date
  }
  return noteObject
}

async function addNote(noteTitle) {
  let noteObject = getNoteObject(noteTitle, 'random')
  let id = await addNoteToRandomAndReturnId(noteObject)
  noteObject.id = id
  randomNotesArr.push(noteObject)
  updateNotesArr()
  renderAllNotes()
}

async function addDailyNote(noteTitle) {
  let noteObject = getNoteObject(noteTitle, 'daily')
  let id = await addNoteToDailyAndReturnId(noteObject)
  noteObject.id = id
  dailyNotesArr.push(noteObject)
  updateNotesArr()
  renderAllNotes()
}

function deleteNote(id, option) {
  let noteIndex
  if (option === 'daily') {
    noteIndex = dailyNotesArr.findIndex((note) => note.id === id)
    dailyNotesArr.splice(noteIndex, 1)
    removeNoteFromDailyDB(id)
  } else {
    noteIndex = randomNotesArr.findIndex((note) => note.id === id)
    randomNotesArr.splice(noteIndex, 1)
    removeNoteFromRandomDB(id)
  }
  updateNotesArr()
  renderAllNotes()
}

function findAllNoteListItemEl() {
  const allDivInSidebar = Array.from(sideBarDivEl.querySelectorAll('div'))
  let notesElArr = []
  allDivInSidebar.forEach((div) => {
    if (div.classList.contains('note')) {
      notesElArr.push(div)
    }
  })
  return notesElArr
}

function removeAllNoteListElFromSidebar() {
  const noteElArr = findAllNoteListItemEl()
  noteElArr.forEach((noteEl) => {
    noteListEl.removeChild(noteEl)
  })
}

function renderDailyNotes() {
  sortDailyNotes()
  dailyNotesArr.forEach((note) => {
    noteListEl.appendChild(createNoteListItem(note))
  })
}

function renderRandomNotes() {
  randomNotesArr.forEach((note) => {
    noteListEl.appendChild(createNoteListItem(note))
  })
}

function compare(a, b) {
  a = new Date(a.date)
  b = new Date(b.date)
  if (a > b) {
    return -1
  }
  if (a < b) {
    return 1
  }
  return 0
}

function sortDailyNotes() {
  dailyNotesArr = dailyNotesArr.sort(compare)
}

function sortRandomNotes() {
  randomNotesArr = randomNotesArr.sort(compare)
}

function sortAllNotes() {
  sortDailyNotes()
  sortRandomNotes()
  notesArr = notesArr.sort(compare)
}

function renderAllNotes() {
  removeAllNoteListElFromSidebar()
  sortAllNotes()
  renderDailyNotes()
  renderRandomNotes()
}

function createNoteListItem(note) {
  const newNoteEl = document.createElement('div')
  newNoteEl.classList.add('note')
  newNoteEl.classList.add('center')
  if (note.option === 'daily') {
    newNoteEl.classList.add('note-daily')
  } else if (note.option === 'random') {
    newNoteEl.classList.add('note-random')
  }
  const pEl = document.createElement('p')
  pEl.textContent = note.title
  newNoteEl.appendChild(pEl)
  newNoteEl.addEventListener('click', () => {
    removeAllElFromInputArea()
    renderTextAreaHeader(note)
    renderTextArea(note.entry, note.id)
    toggleSidebar()
  })
  return newNoteEl
}

function startAddNoteProcess() {
  addNoteBar.style.display = 'grid'
  const addNoteNameInputEl = addNoteBar.querySelector('input')
  addNoteNameInputEl.focus()
  addNoteDailyFilter.addEventListener('click', toggleAddNoteFilterButtons)
  addNoteRandomFilter.addEventListener('click', toggleAddNoteFilterButtons)
  finalAddNoteButtonEl.addEventListener('click', checkInputAndAddNote)
  addNoteNameInputEl.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      checkInputAndAddNote()
    } else if (event.key === 'Escape') {
      addNoteBar.style.display = 'none'
    }
  })

  function checkInputAndAddNote() {
    const addNoteBarPEl = addNoteBar.querySelector('p')
    // TODO: Add validation
    let title = addNoteNameInputEl.value
    if (addNoteBarPEl.textContent === 'Random') {
      addNoteNameInputEl.value = ''
      addNote(title)
      addNoteBar.style.display = 'none'
    } else if (addNoteBarPEl.textContent === 'Daily') {
      addNoteNameInputEl.value = ''
      addDailyNote(title)
      addNoteBar.style.display = 'none'
    }
  }
}

function displayNoneFilterButton() {
  noneFilterEl.classList.remove('invisible')
}

function hideNoneFilterButton() {
  noneFilterEl.classList.add('invisible')
}

function hideRandomAndDailyFilterButtons() {
  dailyFilterEl.classList.add('invisible')
  randomFilterEl.classList.add('invisible')
}

function toggleFilterButtons() {
  if (randomFilterEl.classList.contains('invisible')) {
    dailyFilterEl.classList.add('invisible')
    randomFilterEl.classList.remove('invisible')
  } else {
    dailyFilterEl.classList.remove('invisible')
    randomFilterEl.classList.add('invisible')
  }
}

function toggleAddNoteFilterButtons() {
  const addNoteBarPEl = addNoteBar.querySelector('p')
  if (addNoteRandomFilter.style.display === 'none') {
    addNoteDailyFilter.style.display = 'none'
    addNoteRandomFilter.style.display = 'unset'
    addNoteBarPEl.textContent = 'Random'
  } else {
    addNoteDailyFilter.style.display = 'unset'
    addNoteRandomFilter.style.display = 'none'
    addNoteBarPEl.textContent = 'Daily'
  }
}

function createRandomNoteDiv(entry) {
  const newContentEl = document.createElement('div')
  const paragraphEl = document.createElement('p')

  newContentEl.classList.add('invisible')

  randomNoteContentEl.addEventListener('click', () => {
    toggleDisplayNone(newContentEl)
  })

  paragraphEl.textContent = entry
  newContentEl.appendChild(paragraphEl)
  return newContentEl
}

function filterNoteList(option) {
  if (option === 'daily') {
    removeAllNoteListElFromSidebar()
    renderDailyNotes()
    toggleFilterButtons()
  } else if (option === 'random') {
    removeAllNoteListElFromSidebar()
    renderRandomNotes()
    toggleFilterButtons()
  }
}

function addFakeNotes() {
  for (let i = 0; i < 20; i++) {
    let date = getCurrentDate()
    let option = i < 10 ? 'random' : 'daily'
    let noteObject = {
      id: 'fake' + i,
      option: option,
      title: `Test ${option} ${i}`,
      entry:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, ducimus eaque. Doloremque recusandae maiores tempora, blanditiis quidem eum suscipit vero debitis, vel dignissimos, rem reprehenderit nulla quo sequi accusantium ex.',
      date: date
    }
    if (option === 'random') {
      randomNotesArr.push(noteObject)
    } else if (option === 'daily') {
      dailyNotesArr.push(noteObject)
    }
  }
}

function initRandomNote() {
  const randomTitleEl = document.querySelector('#random-title')
  const randomDateEl = document.querySelector('#random-date')
  let i = Math.floor(Math.random() * notesArr.length)
  let note = notesArr[i]
  randomTitleEl.textContent = note.title
  randomDateEl.textContent = note.date ? note.date : 'N/A'
  randomNoteContentEl.appendChild(createRandomNoteDiv(note.entry))
}

async function init() {
  await fetchAllNotes()
  // addFakeNotes()
  updateNotesArr()
  renderDailyNotes()
  initRandomNote()
  console.log('window.innerWidth', window.innerWidth)
}

init()

sideBarHeaderEl.addEventListener('click', () => {
  removeAllElFromInputArea()
  hideRandomAndDailyFilterButtons()
  displayNoneFilterButton()
  inputAreaDivEl.classList.add('invisible')
  renderAllNotes()
})
addNoteButtonEl.addEventListener('click', startAddNoteProcess)

dailyFilterEl.addEventListener('click', () => {
  filterNoteList('random')
})
randomFilterEl.addEventListener('click', () => {
  filterNoteList('daily')
})
noneFilterEl.addEventListener('click', () => {
  filterNoteList('random')
  hideNoneFilterButton()
})
menuButtonEl.addEventListener('click', toggleSidebar)
landingMenuButtonEl.addEventListener('click', toggleSidebar)
