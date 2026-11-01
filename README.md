# Clinical Registry

A patient intake and records app for a clinic front desk: register a patient with the full intake form
(patient, contact, employment, insurance, responsible party, emergency contact, consent), find patients by name,
patient ID, email, phone or date of birth, view and print a record, edit it and delete it.

Live demo: https://patients-registry.netlify.app

## Demo data

Every visitor signs in anonymously (Firebase Auth) and works in a private sandbox,
`sandboxes/{uid}/patients/{patientId}` in Cloud Firestore. An empty sandbox is filled with ten fictional patients
(`src/seed.js`). `firestore.rules` lets a signed-in user read and write only their own sandbox and nothing else.

## Stack

- Vue 2.6, Vue Router 3 (hash mode), Vue CLI 4 (webpack 4), yarn 1
- Firebase JS SDK 8: `firebase/app`, `firebase/auth` (anonymous sign-in) and `firebase/firestore`
- Public Sans, self-hosted from `@fontsource-variable/public-sans`
- Hosted on Netlify (`netlify.toml`)

`src/patient.js` describes every field once (label, type, layout, validation, how it reads back); the new and edit
pages share `PatientForm.vue`, and the record page and search read the same schema.

## Commands

Node 22. Webpack 4 needs the legacy OpenSSL provider on Node 17 and later:

```
yarn install
NODE_OPTIONS=--openssl-legacy-provider yarn serve   # dev server
NODE_OPTIONS=--openssl-legacy-provider yarn build   # production build in dist/
yarn lint
```

Netlify sets `NODE_OPTIONS` itself (see `netlify.toml`).

Deploy the security rules with the Firebase CLI: `firebase deploy --only firestore:rules`.
