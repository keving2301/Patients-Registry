// Fictional demo patients, written into a visitor's sandbox when it is empty.
// Names, addresses and plan numbers are invented; emails use example.com and phones the 555-0100 to 555-0199 range.
// The IDs are fixed so that two tabs seeding at the same moment write the same ten records instead of twenty.
import { emptyPatient } from './patient'

const PATIENTS = [
  {
    id: 'K7M2QX', registrationDate: '2026-02-09',
    fName: 'Maria', mName: 'Elena', lName: 'Castillo', dateOfBirth: '1987-03-14', sex: 'F', maritalStatus: 'Married', isLegalName: 'Yes',
    pcp: 'Dr. Anne Whitfield',
    email: 'maria.castillo@example.com', cellNumber: '305-555-0142', homeNumber: '305-555-0118',
    address: '2318 Palmetto Grove Ln', city: 'Miami', state: 'FL', zip: '33133',
    occupation: 'Dental hygienist', employer: 'Brightside Dental Group', employerPhone: '305-555-0160',
    patientCovByInsurance: 'Yes', primaryInsurance: 'Blue Cross Blue Shield', relationToSubscriber: 'Self',
    subscriberName: 'Maria E. Castillo', subscriberDOB: '1987-03-14', subscriberGroupNo: 'BCF-40218', subscriberPolicyNo: 'XJH448120933', subscriberCoPayAmount: '25',
    localRelativeName: 'Daniel Castillo', localRelativeRelation: 'Brother', localRelativeHomePhone: '305-555-0171',
    signature: 'Maria E. Castillo'
  },
  {
    id: '4HRT9C', registrationDate: '2025-11-18',
    fName: 'James', lName: 'Okafor', dateOfBirth: '1958-11-02', sex: 'M', maritalStatus: 'Widowed', isLegalName: 'Yes',
    pcp: 'Dr. Ruth Albright',
    email: 'j.okafor@example.com', cellNumber: '407-555-0127',
    address: '915 Lake Ivanhoe Ter', city: 'Orlando', state: 'FL', zip: '32803',
    occupation: 'Retired civil engineer',
    patientCovByInsurance: 'Yes', primaryInsurance: 'Medicare', relationToSubscriber: 'Self',
    subscriberName: 'James Okafor', subscriberDOB: '1958-11-02', subscriberPolicyNo: '4TQ8HN2KW61', subscriberCoPayAmount: '20',
    secondaryInsurance: 'Humana', secondaryInsuranceRelationToPatient: 'Self', secondaryInsuranceSubscName: 'James Okafor',
    secondaryInsuranceSubscGroupNo: 'HUM-77301', secondaryInsuranceSubscPolicyNo: 'H90233187',
    localRelativeName: 'Grace Okafor', localRelativeRelation: 'Daughter', localRelativeHomePhone: '407-555-0193', localRelativeWorkPhone: '407-555-0108',
    signature: 'James Okafor'
  },
  {
    id: 'P3WD8N', registrationDate: '2026-08-27',
    fName: 'Sofia', lName: 'Nguyen', dateOfBirth: '2016-06-21', sex: 'F', maritalStatus: 'Single', isLegalName: 'Yes',
    pcp: 'Dr. Ellen Marsh',
    email: 'linh.nguyen@example.com', cellNumber: '813-555-0155',
    address: '4402 Bayshore Hollow Dr', city: 'Tampa', state: 'FL', zip: '33611',
    occupation: 'Student',
    patientCovByInsurance: 'Yes', primaryInsurance: 'Aetna', relationToSubscriber: 'Child',
    subscriberName: 'Linh Nguyen', subscriberDOB: '1984-09-30', subscriberGroupNo: 'AET-21904', subscriberPolicyNo: 'W229145870', subscriberCoPayAmount: '15',
    responsibleBillPerson: 'Linh Nguyen', responsibleBillPersonDOB: '1984-09-30', responsibleBillPersonHomePhone: '813-555-0155', patientHere: 'Yes',
    insurPersOccupation: 'Pharmacist', insurPersEmployer: 'Westshore Community Pharmacy',
    insurPersEmployerAddress: '1800 Harbor Point Blvd, Tampa, FL 33609', insurPersEmployerPhone: '813-555-0132',
    localRelativeName: 'Thu Tran', localRelativeRelation: 'Grandmother', localRelativeHomePhone: '813-555-0186',
    signature: 'Linh Nguyen'
  },
  {
    id: 'B6YJ2F', registrationDate: '2026-05-03',
    fName: 'Robert', lName: 'Hale', dateOfBirth: '1979-01-30', sex: 'M', maritalStatus: 'Divorced', isLegalName: 'Yes',
    email: 'rhale@example.com', cellNumber: '352-555-0119',
    address: '77 Cypress Bend Rd', city: 'Gainesville', state: 'FL', zip: '32605',
    occupation: 'Electrician', employer: 'North Central Electric Co.', employerPhone: '352-555-0144',
    patientCovByInsurance: 'No',
    localRelativeName: 'Karen Hale', localRelativeRelation: 'Sister', localRelativeHomePhone: '352-555-0177',
    signature: 'Robert Hale'
  },
  {
    id: 'T9KC4R', registrationDate: '2026-09-15',
    fName: 'Aisha', lName: 'Rahman', dateOfBirth: '1995-08-09', sex: 'F', maritalStatus: 'Single', isLegalName: 'Yes',
    pcp: 'Dr. Victor Lindqvist',
    email: 'aisha.rahman@example.com', cellNumber: '305-555-0163',
    address: '1209 Coral Mist Ave', address2: 'Apt 5C', city: 'Miami', state: 'FL', zip: '33145',
    occupation: 'Graduate student',
    patientCovByInsurance: 'Yes', primaryInsurance: 'UnitedHealthcare', relationToSubscriber: 'Self',
    subscriberName: 'Aisha Rahman', subscriberDOB: '1995-08-09', subscriberGroupNo: 'UHC-55120', subscriberPolicyNo: '907341228', subscriberCoPayAmount: '30',
    localRelativeName: 'Omar Rahman', localRelativeRelation: 'Father', localRelativeHomePhone: '305-555-0102',
    signature: 'Aisha Rahman'
  },
  {
    id: 'M2XH7V', registrationDate: '2025-12-02',
    fName: 'Henry', mName: 'Allen', lName: 'Whitaker', dateOfBirth: '1941-04-18', sex: 'M', maritalStatus: 'Married', isLegalName: 'Yes',
    pcp: 'Dr. Ruth Albright',
    email: 'henry.whitaker@example.com', cellNumber: '850-555-0138', homeNumber: '850-555-0124',
    address: '3301 Live Oak Landing', city: 'Tallahassee', state: 'FL', zip: '32308',
    occupation: 'Retired teacher',
    patientCovByInsurance: 'Yes', primaryInsurance: 'Medicare', relationToSubscriber: 'Self',
    subscriberName: 'Henry A. Whitaker', subscriberDOB: '1941-04-18', subscriberPolicyNo: '7KD2PW9RT34',
    secondaryInsurance: 'Blue Cross Blue Shield', secondaryInsuranceRelationToPatient: 'Spouse', secondaryInsuranceSubscName: 'Margaret Whitaker',
    secondaryInsuranceSubscGroupNo: 'BCF-10377', secondaryInsuranceSubscPolicyNo: 'XJH229004871',
    responsibleBillPerson: 'Margaret Whitaker', responsibleBillPersonDOB: '1944-12-03', responsibleBillPersonHomePhone: '850-555-0124', patientHere: 'Yes',
    insurPersOccupation: 'Retired librarian',
    localRelativeName: 'Paul Whitaker', localRelativeRelation: 'Son', localRelativeHomePhone: '850-555-0149', localRelativeWorkPhone: '850-555-0181',
    signature: 'Henry A. Whitaker'
  },
  {
    id: 'E8NQ3D', registrationDate: '2026-10-06',
    fName: 'Daniela', lName: 'Ruiz', dateOfBirth: '2001-12-05', sex: 'F', maritalStatus: 'Single', isLegalName: 'No', legalName: 'Daniela Ruiz Morales',
    email: 'd.ruiz@example.com', cellNumber: '239-555-0176',
    address: '58 Sandpiper Cove', city: 'Fort Myers', state: 'FL', zip: '33908',
    occupation: 'Barista', employer: 'Gulfside Coffee Roasters', employerPhone: '239-555-0151',
    patientCovByInsurance: 'Yes', primaryInsurance: 'Cigna', relationToSubscriber: 'Child',
    subscriberName: 'Carlos Ruiz', subscriberDOB: '1972-03-22', subscriberGroupNo: 'CIG-30482', subscriberPolicyNo: 'U44190276', subscriberCoPayAmount: '40',
    signature: 'Daniela Ruiz Morales'
  },
  {
    id: 'R5GL6W', registrationDate: '2026-04-21',
    fName: 'Marcus', lName: 'Bell', dateOfBirth: '1990-07-27', sex: 'M', maritalStatus: 'Married', isLegalName: 'Yes',
    pcp: 'Dr. Priya Raman',
    email: 'marcus.bell@example.com', cellNumber: '407-555-0185',
    address: '2140 Heron Crossing Blvd', city: 'Kissimmee', state: 'FL', zip: '34746',
    occupation: 'Logistics coordinator', employer: 'Sunrail Freight Partners', employerPhone: '407-555-0110',
    patientCovByInsurance: 'Yes', primaryInsurance: 'Humana', relationToSubscriber: 'Self',
    subscriberName: 'Marcus Bell', subscriberDOB: '1990-07-27', subscriberGroupNo: 'HUM-61027', subscriberPolicyNo: 'H55803219', subscriberCoPayAmount: '35',
    localRelativeName: 'Leon Bell', localRelativeRelation: 'Brother', localRelativeHomePhone: '407-555-0199',
    signature: 'Marcus Bell'
  },
  {
    id: 'H4ZP9K', registrationDate: '2026-01-12',
    fName: 'Elena', lName: 'Petrova', dateOfBirth: '1968-02-11', sex: 'F', maritalStatus: 'Married', isLegalName: 'Yes',
    pcp: 'Dr. Victor Lindqvist',
    email: 'elena.petrova@example.com', cellNumber: '813-555-0129',
    address: '6015 Mangrove Point Dr', city: 'Clearwater', state: 'FL', zip: '33760',
    occupation: 'Accountant', employer: 'Pinellas Bookkeeping Services', employerPhone: '727-555-0157',
    patientCovByInsurance: 'Yes', primaryInsurance: 'Blue Cross Blue Shield', relationToSubscriber: 'Spouse',
    subscriberName: 'Ivan Petrov', subscriberDOB: '1965-10-08', subscriberGroupNo: 'BCF-88214', subscriberPolicyNo: 'XJH771240556', subscriberCoPayAmount: '25',
    responsibleBillPerson: 'Ivan Petrov', responsibleBillPersonDOB: '1965-10-08', responsibleBillPersonHomePhone: '813-555-0130', patientHere: 'No',
    insurPersOccupation: 'Marine engineer', insurPersEmployer: 'Tampa Bay Ship Repair', insurPersEmployerPhone: '813-555-0168',
    localRelativeName: 'Nadia Volkova', localRelativeRelation: 'Friend', localRelativeHomePhone: '813-555-0103',
    signature: 'Elena Petrova'
  },
  {
    id: 'W7CB2T', registrationDate: '2026-07-08',
    fName: 'Liam', lName: 'Carter', dateOfBirth: '2009-09-15', sex: 'M', maritalStatus: 'Single', isLegalName: 'Yes',
    pcp: 'Dr. Ellen Marsh',
    email: 'carter.family@example.com', cellNumber: '352-555-0112',
    address: '410 Magnolia Ridge Ct', city: 'Ocala', state: 'FL', zip: '34471',
    occupation: 'Student',
    patientCovByInsurance: 'Yes', primaryInsurance: 'Medicaid', relationToSubscriber: 'Self',
    subscriberName: 'Liam Carter', subscriberDOB: '2009-09-15', subscriberPolicyNo: 'FL2093318475',
    responsibleBillPerson: 'Rachel Carter', responsibleBillPersonDOB: '1983-05-19', responsibleBillPersonHomePhone: '352-555-0112', patientHere: 'Yes',
    insurPersOccupation: 'Nurse', insurPersEmployer: 'Marion Valley Clinic', insurPersEmployerPhone: '352-555-0190',
    localRelativeName: 'Owen Carter', localRelativeRelation: 'Uncle', localRelativeHomePhone: '352-555-0153',
    signature: 'Rachel Carter'
  }
]

export function seedPatients() {
  return PATIENTS.map(({ id, ...fields }) => ({
    id,
    data: Object.assign(emptyPatient(), fields, { signatureDate: fields.registrationDate })
  }))
}
