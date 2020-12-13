const journal = db.collection('mental').doc('journal')
const daily = journal.collection('daily')
const random = journal.collection('random')

async function fetchDailyNotes() {
  await daily
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let note = doc.data()
        let noteObject = {
          id: doc.id,
          title: note.title,
          entry: note.entry,
          date: note.date,
          option: note.option
        }
        dailyNotesArr.push(noteObject)
      })
    })
    .catch((e) => {
      console.log('Error getting daily document: ', e)
    })
}

async function fetchRandomNotes() {
  await random
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let note = doc.data()
        let noteObject = {
          id: doc.id,
          title: note.title,
          entry: note.entry,
          date: note.date,
          option: note.option
        }
        randomNotesArr.push(noteObject)
      })
    })
    .catch((e) => {
      console.log('Error getting daily document: ', e)
    })
}

async function fetchAllNotes() {
  await fetchDailyNotes()
  await fetchRandomNotes()
}

async function addNoteToDailyAndReturnId(note) {
  let id = await daily
    .add(note)
    .then((docRef) => {
      return docRef.id
    })
    .catch((e) => {
      console.log('Error adding document to collection', e)
    })
  return id
}

async function addNoteToRandomAndReturnId(note) {
  let id = await random
    .add(note)
    .then((docRef) => {
      return docRef.id
    })
    .catch((e) => {
      console.log('Error adding document to collection', e)
    })
  return id
}

async function saveDocumentInDaily(note) {
  daily
    .doc(note.id)
    .set(note)
    .then(() => {
      console.log('Collection saved in daily!')
    })
    .catch((e) => {
      console.log('Error saving document in daily', e)
    })
}

async function editNote() {
  
}

async function saveDocumentInRandom(note) {
  random
    .doc(note.id)
    .set(note)
    .then(() => { 
      console.log('Collection saved in random!')
    })
    .catch((e) => {
      console.log('Error saving document in daily', e)
    })
}

async function saveNoteInDB(id) {
  console.log('saveNoteInDB()')
  let note = getNote(id)
  if (note.option === 'daily') {
    saveDocumentInDaily(note)
  } else if (note.option === 'random') {
    saveDocumentInRandom(note)
  }
}

async function removeNoteFromDailyDB(id) {
  daily
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted from daily!')
    })
    .catch((e) => {
      console.log('Error deleting document from daily:', e)
    })
}

async function removeNoteFromRandomDB(id) {
  random
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted from random!')
    })
    .catch((e) => {
      console.log('Error deleting document from random:', e)
    })
}

async function removeNoteFromDB(id) {
  let response = await journal.update({
    [id]: firebase.firestore.FieldValue.delete()
  })
  console.log('remove note from db - response', response)
}
