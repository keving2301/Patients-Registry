// Data access. Each visitor signs in anonymously and works in a private sandbox:
// sandboxes/{uid}/patients/{patientId}. firestore.rules lets a user reach only their own sandbox.
import Vue from 'vue'
import { auth, db, serverTimestamp } from './firebase'
import { fromDocument, newPatientId, sortName, toDocument } from './patient'
import { seedPatients } from './seed'

export const session = Vue.observable({ status: 'idle', uid: null })

let sandboxPromise = null

function currentUser() {
  return new Promise((resolve, reject) => {
    const stop = auth.onAuthStateChanged(
      user => { stop(); resolve(user) },
      error => { stop(); reject(error) }
    )
  })
}

function seedIfEmpty(patients) {
  return patients.limit(1).get().then(snapshot => {
    if (!snapshot.empty) return
    const batch = db.batch()
    seedPatients().forEach(({ id, data }) => {
      batch.set(patients.doc(id), Object.assign(data, { createdAt: serverTimestamp(), updatedAt: serverTimestamp() }))
    })
    return batch.commit()
  })
}

// Signs in (once per browser, Auth keeps the session), seeds an empty sandbox and resolves to the patients collection.
export function openSandbox() {
  if (!sandboxPromise) {
    session.status = 'loading'
    sandboxPromise = currentUser()
      .then(user => user || auth.signInAnonymously().then(credential => credential.user))
      .then(user => {
        const patients = db.collection('sandboxes').doc(user.uid).collection('patients')
        return seedIfEmpty(patients).then(() => {
          session.uid = user.uid
          session.status = 'ready'
          return patients
        })
      })
      .catch(error => {
        sandboxPromise = null
        session.status = 'error'
        throw error
      })
  }
  return sandboxPromise
}

export function listPatients() {
  return openSandbox()
    .then(patients => patients.get())
    .then(snapshot => snapshot.docs
      .map(doc => fromDocument(doc.id, doc.data()))
      .sort((a, b) => sortName(a).localeCompare(sortName(b))))
}

export function getPatient(id) {
  return openSandbox()
    .then(patients => patients.doc(id).get())
    .then(doc => (doc.exists ? fromDocument(doc.id, doc.data()) : null))
}

// New records get a short random ID. The transaction makes sure it is not already taken in this sandbox.
export async function createPatient(patient) {
  const patients = await openSandbox()
  const data = Object.assign(toDocument(patient), { createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const ref = patients.doc(newPatientId())
    const created = await db.runTransaction(transaction => transaction.get(ref).then(existing => {
      if (existing.exists) return false
      transaction.set(ref, data)
      return true
    }))
    if (created) return ref.id
  }
  throw new Error('Could not find a free patient ID. Try again.')
}

export function updatePatient(id, patient) {
  return openSandbox().then(patients => patients.doc(id).update(
    Object.assign(toDocument(patient), { updatedAt: serverTimestamp() })
  ))
}

export function deletePatient(id) {
  return openSandbox().then(patients => patients.doc(id).delete())
}

// Plain-language messages for the errors a visitor can actually run into.
export function describeError(error) {
  const code = (error && error.code) || ''
  if (code === 'unavailable' || code === 'auth/network-request-failed') {
    return 'The registry can\'t be reached. Check your connection and try again.'
  }
  if (code === 'permission-denied') return 'This sandbox doesn\'t allow that action.'
  if (code === 'auth/operation-not-allowed' || code === 'auth/admin-restricted-operation') {
    return 'Demo sign-in is turned off for this project.'
  }
  if (code === 'not-found') return 'This patient no longer exists. It may have been deleted.'
  return (error && error.message) || 'Something went wrong. Try again.'
}
