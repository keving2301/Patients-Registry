// The patient record: its fields, how the form lays them out, how they are checked and how they read back.
// One schema drives the new and edit forms, the record page and the search, so a field is described once.

export const US_STATES = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'], ['FL', 'Florida'],
  ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'],
  ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'],
  ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'], ['MO', 'Missouri'],
  ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'],
  ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'],
  ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'],
  ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming']
].map(([value, label]) => ({ value, label }))

const YES_NO = ['Yes', 'No']
const SEX = [{ value: 'F', label: 'Female' }, { value: 'M', label: 'Male' }]
const RELATIONSHIPS = ['Self', 'Spouse', 'Child', 'Parent', 'Other']
export const INSURERS = ['Aetna', 'Blue Cross Blue Shield', 'Cigna', 'Humana', 'Medicaid', 'Medicare', 'UnitedHealthcare']

const insured = p => p.patientCovByInsurance !== 'No'

// span: columns out of 6 on wide screens (2 = a third, 3 = a half, 6 = the full row). Every field is full width on phones.
export const SECTIONS = [
  {
    id: 'patient',
    title: 'Patient',
    fields: [
      { key: 'fName', label: 'First name', span: 2, required: true, view: false },
      { key: 'mName', label: 'Middle name', span: 2, view: false },
      { key: 'lName', label: 'Last name', span: 2, required: true, view: false },
      { key: 'dateOfBirth', label: 'Date of birth', type: 'date', span: 2, required: true, rule: 'pastDate', view: false },
      { key: 'sex', label: 'Sex', type: 'radio', options: SEX, span: 2, required: true, view: false },
      { key: 'maritalStatus', label: 'Marital status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'], span: 2 },
      { key: 'isLegalName', label: 'Is this the patient\'s legal name?', type: 'radio', options: YES_NO, span: 3, view: false },
      { key: 'legalName', label: 'Legal name', span: 3, showIf: p => p.isLegalName === 'No' },
      { key: 'pcp', label: 'Primary care physician', span: 3, hint: 'Leave blank if the patient has none.' }
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    fields: [
      { key: 'email', label: 'Email', type: 'email', span: 6, required: true, rule: 'email' },
      { key: 'cellNumber', label: 'Cell phone', type: 'tel', span: 3, required: true, rule: 'phone' },
      { key: 'homeNumber', label: 'Home phone', type: 'tel', span: 3, rule: 'phone' },
      { key: 'address', label: 'Street address', span: 4, group: 'address' },
      { key: 'address2', label: 'Apartment, suite or unit', span: 2, group: 'address' },
      { key: 'city', label: 'City', span: 2, group: 'address' },
      { key: 'state', label: 'State', type: 'select', options: US_STATES, span: 2, group: 'address' },
      { key: 'zip', label: 'ZIP code', span: 2, rule: 'zip', inputmode: 'numeric', group: 'address' }
    ]
  },
  {
    id: 'employment',
    title: 'Employment',
    fields: [
      { key: 'occupation', label: 'Occupation', span: 3 },
      { key: 'employer', label: 'Employer', span: 3 },
      { key: 'employerPhone', label: 'Employer phone', type: 'tel', span: 3, rule: 'phone' }
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance',
    note: 'Ask the patient for their insurance card.',
    fields: [
      { key: 'patientCovByInsurance', label: 'Is the patient covered by insurance?', viewLabel: 'Covered by insurance', type: 'radio', options: YES_NO, span: 6 },
      { key: 'primaryInsurance', label: 'Primary insurance', type: 'suggest', options: INSURERS, span: 3, showIf: insured },
      { key: 'relationToSubscriber', label: 'Patient\'s relationship to subscriber', viewLabel: 'Relationship to subscriber', type: 'select', options: RELATIONSHIPS, span: 3, showIf: insured },
      { key: 'subscriberName', label: 'Subscriber name', span: 3, showIf: insured },
      { key: 'subscriberDOB', label: 'Subscriber date of birth', type: 'date', span: 3, rule: 'pastDate', showIf: insured },
      { key: 'subscriberGroupNo', label: 'Group number', span: 2, showIf: insured },
      { key: 'subscriberPolicyNo', label: 'Policy number', span: 2, showIf: insured },
      { key: 'subscriberCoPayAmount', label: 'Copay', type: 'money', span: 2, rule: 'money', showIf: insured },
      { heading: 'Secondary insurance', note: 'If the patient has a second plan.', showIf: insured },
      { key: 'secondaryInsurance', label: 'Secondary insurance', type: 'suggest', options: INSURERS, span: 3, showIf: insured },
      { key: 'secondaryInsuranceRelationToPatient', label: 'Patient\'s relationship to subscriber', viewLabel: 'Relationship to subscriber (secondary)', type: 'select', options: RELATIONSHIPS, span: 3, showIf: insured },
      { key: 'secondaryInsuranceSubscName', label: 'Subscriber name', viewLabel: 'Subscriber name (secondary)', span: 2, showIf: insured },
      { key: 'secondaryInsuranceSubscGroupNo', label: 'Group number', viewLabel: 'Group number (secondary)', span: 2, showIf: insured },
      { key: 'secondaryInsuranceSubscPolicyNo', label: 'Policy number', viewLabel: 'Policy number (secondary)', span: 2, showIf: insured }
    ]
  },
  {
    id: 'responsible',
    title: 'Responsible party',
    note: 'The person responsible for the bill, if it is not the patient.',
    fields: [
      { key: 'responsibleBillPerson', label: 'Name', span: 3 },
      { key: 'responsibleBillPersonDOB', label: 'Date of birth', type: 'date', span: 3, rule: 'pastDate' },
      { key: 'responsibleBillPersonHomePhone', label: 'Phone', type: 'tel', span: 3, rule: 'phone' },
      { key: 'patientHere', label: 'Is this person also a patient here?', viewLabel: 'Also a patient here', type: 'radio', options: YES_NO, span: 3 },
      { key: 'responsibleBillPersonAddress', label: 'Address, if different from the patient\'s', viewLabel: 'Address', span: 6 },
      { key: 'insurPersOccupation', label: 'Occupation', span: 3 },
      { key: 'insurPersEmployer', label: 'Employer', span: 3 },
      { key: 'insurPersEmployerAddress', label: 'Employer address', span: 3 },
      { key: 'insurPersEmployerPhone', label: 'Employer phone', type: 'tel', span: 3, rule: 'phone' }
    ]
  },
  {
    id: 'emergency',
    title: 'Emergency contact',
    note: 'A local friend or relative who does not live with the patient.',
    fields: [
      { key: 'localRelativeName', label: 'Name', span: 3 },
      { key: 'localRelativeRelation', label: 'Relationship to the patient', viewLabel: 'Relationship', span: 3 },
      { key: 'localRelativeHomePhone', label: 'Home phone', type: 'tel', span: 3, rule: 'phone' },
      { key: 'localRelativeWorkPhone', label: 'Work phone', type: 'tel', span: 3, rule: 'phone' }
    ]
  },
  {
    id: 'consent',
    title: 'Consent',
    fields: [
      { key: 'signature', label: 'Signature', viewLabel: 'Signed by', type: 'signature', span: 4, required: true, hint: 'Type the full name of the patient or guardian.' },
      { key: 'signatureDate', label: 'Date signed', type: 'date', span: 2, readonly: true }
    ]
  }
]

export const CONSENT_TEXT = [
  'I verify that the information above is true to the best of my knowledge. I authorize the doctor to use X-rays, photographs, anesthetics, medicines, surgery and other equipment or aids as they find necessary to provide proper patient care. I understand that payment, proof of insurance or the copay is due at the time of service.',
  'I authorize this office to apply for benefits on my behalf for the covered services rendered. I certify that the insurance information I have provided is correct.'
]

const ALL_FIELDS = SECTIONS.reduce((list, section) => list.concat(section.fields.filter(f => f.key)), [])
export const FIELD_KEYS = ALL_FIELDS.map(f => f.key).concat(['registrationDate'])

export function todayIso() {
  const now = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function emptyPatient() {
  const patient = {}
  FIELD_KEYS.forEach(key => { patient[key] = '' })
  patient.registrationDate = todayIso()
  patient.signatureDate = todayIso()
  return patient
}

// The stored document: only the schema's fields, trimmed, with hidden conditional fields cleared.
export function toDocument(patient) {
  const doc = {}
  FIELD_KEYS.forEach(key => {
    const value = patient[key]
    doc[key] = typeof value === 'string' ? value.trim() : (value == null ? '' : value)
  })
  ALL_FIELDS.forEach(field => {
    if (field.showIf && !field.showIf(patient)) doc[field.key] = ''
  })
  return doc
}

export function fromDocument(id, data) {
  return Object.assign(emptyPatient(), data, { id })
}

// IDs people can read out loud: six characters with no 0, O, 1 or I.
const ID_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
export function newPatientId() {
  const bytes = new Uint8Array(6)
  window.crypto.getRandomValues(bytes)
  return Array.from(bytes, b => ID_ALPHABET[b % ID_ALPHABET.length]).join('')
}

// Display helpers.

export function fullName(p) {
  return [p.fName, p.mName, p.lName].filter(Boolean).join(' ')
}

export function sortName(p) {
  return `${p.lName || ''} ${p.fName || ''}`.toLowerCase()
}

export function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '')
  return m ? `${m[2]}/${m[3]}/${m[1]}` : (iso || '')
}

export function ageFrom(iso, today = new Date()) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '')
  if (!m) return null
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
  let age = today.getFullYear() - y
  if (today.getMonth() + 1 < mo || (today.getMonth() + 1 === mo && today.getDate() < d)) age -= 1
  return age >= 0 ? age : null
}

export function sexLabel(value) {
  const option = SEX.find(o => o.value === value)
  return option ? option.label : (value || '')
}

export function formatPhone(value) {
  let digits = String(value || '').replace(/\D/g, '')
  if (digits.length === 11 && digits[0] === '1') digits = digits.slice(1)
  return digits.length === 10 ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}` : String(value || '').trim()
}

export function formatMoney(value) {
  const n = Number(String(value || '').replace(/[$,\s]/g, ''))
  return value === '' || value == null || Number.isNaN(n) ? (value || '') : `$${n.toFixed(2).replace(/\.00$/, '')}`
}

function optionLabel(field, value) {
  const option = (field.options || []).find(o => (typeof o === 'string' ? o : o.value) === value)
  return option && typeof option !== 'string' ? option.label : value
}

function displayValue(field, value) {
  if (field.type === 'date') return formatDate(value)
  if (field.type === 'tel') return formatPhone(value)
  if (field.type === 'money') return formatMoney(value)
  if (field.type === 'select' || field.type === 'radio') return optionLabel(field, value)
  return value
}

export function formatAddress(p) {
  const line1 = [p.address, p.address2].filter(Boolean).join(', ')
  const line2 = [p.city, [p.state, p.zip].filter(Boolean).join(' ')].filter(Boolean).join(', ')
  return [line1, line2].filter(Boolean).join('\n')
}

// The rows the record page shows for a section: label and value pairs, empty ones left out.
export function viewRows(section, p) {
  const rows = []
  let addressDone = false
  section.fields.forEach(field => {
    if (!field.key || field.view === false) return
    if (field.showIf && !field.showIf(p)) return
    if (field.group === 'address') {
      if (!addressDone) {
        addressDone = true
        const address = formatAddress(p)
        if (address) rows.push({ key: 'address', label: 'Address', value: address, wide: true })
      }
      return
    }
    const raw = p[field.key]
    if (raw === '' || raw == null) return
    rows.push({ key: field.key, label: field.viewLabel || field.label, value: displayValue(field, raw), wide: field.span === 6 })
  })
  return rows
}

// Validation. Returns a message for the first problem, or '' when the value is fine.

const RULES = {
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter an email address like name@example.com.',
  phone: v => {
    const digits = v.replace(/\D/g, '')
    return digits.length === 10 || (digits.length === 11 && digits[0] === '1') ? '' : 'Enter a 10-digit phone number.'
  },
  zip: v => /^\d{5}(-\d{4})?$/.test(v) ? '' : 'Enter a 5-digit ZIP code.',
  money: v => /^\$?\d{1,5}(\.\d{1,2})?$/.test(v.replace(/,/g, '')) ? '' : 'Enter an amount like 25 or 25.50.',
  pastDate: v => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v)
    if (!m) return 'Enter a date.'
    if (Number(m[1]) < 1900) return 'Enter a year after 1900.'
    return v > todayIso() ? 'The date can\'t be in the future.' : ''
  }
}

const REQUIRED_MESSAGES = {
  sex: 'Choose the patient\'s sex.',
  signature: 'Type the full name to sign.',
  dateOfBirth: 'Enter the date of birth.'
}

export function validateField(field, patient) {
  if (!field.key || (field.showIf && !field.showIf(patient))) return ''
  const value = String(patient[field.key] == null ? '' : patient[field.key]).trim()
  if (!value) return field.required ? (REQUIRED_MESSAGES[field.key] || `Enter the ${field.label.toLowerCase()}.`) : ''
  if (value.length > 200) return 'Keep this under 200 characters.'
  return field.rule ? RULES[field.rule](value) : ''
}

export function validatePatient(patient) {
  const errors = {}
  ALL_FIELDS.forEach(field => {
    const message = validateField(field, patient)
    if (message) errors[field.key] = message
  })
  return errors
}

// Search: every word of the query must appear in the name, or the query must match the ID, email, a phone or the birth date.
export function matchesQuery(p, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const name = fullName(p).toLowerCase()
  if (q.split(/\s+/).every(word => name.includes(word))) return true
  if (p.id.toLowerCase().includes(q)) return true
  if ((p.email || '').toLowerCase().includes(q)) return true
  const digits = q.replace(/\D/g, '')
  if (digits.length >= 3) {
    const numbers = [p.cellNumber, p.homeNumber, formatDate(p.dateOfBirth)]
    if (numbers.some(n => String(n || '').replace(/\D/g, '').includes(digits))) return true
  }
  return false
}
