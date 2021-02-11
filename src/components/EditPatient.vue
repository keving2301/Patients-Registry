<template>
  <div id="new-patient" style="font-size: 13px; font-weight: bold">
    <div class="container" style="background: #F1F3F9; border-radius: 10px">
      <div class="mt-lg-5">
        <form class="m-3" @submit.prevent="savePatient">
          <div class="todaysdate form-row container pt-5">
            <div class="row text-left align-items-center text-center col-lg-5">
              <label class="p-0 m-0 mr-3">Registration Date: </label>
              <input v-model="user.registrationDate" class="form-control bg-white col-lg-7 ml-lg-3" disabled type="date"
                     style="text-align: center; text-indent: 25px">
            </div>
            <div class="row text-right align-items-center col-lg-4 ml-lg-5">
              <label class="p-0 m-0">PCP: </label>
              <input v-model="user.pcp" class="form-control col-lg-7 ml-lg-3" placeholder="PCP" type="text">
            </div>
          </div>

          <!--Patient Information Section-->
          <h5 class="my-lg-5 my-3 mt-5 py-2 text-dark" style="background-color: #D5DCE4">Patient Information</h5>
          <div class="patient-info form-row align-items-center text-left">
            <div class="col-lg-3">
              <label class="w-100">* Patient's first name: </label>
              <input v-model="user.fName" class="form-control" placeholder="First Name" required type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Middle: </label>
              <input v-model="user.mName" class="form-control" placeholder="Initial" type="text">
            </div>
            <div class="col-lg-2 mr-lg-5">
              <label class="w-100">* Last: </label>
              <input v-model="user.lName" class="form-control" placeholder="Last Name" required type="text">
            </div>
            <div class="col-lg-4">
              <label class="ml-lg-5">Marital Status: </label>
              <select id="inputMaritalStatus" v-model="user.maritalStatus" class="form-control w-75 ml-lg-5">
                <option selected>Choose an item...</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
              </select>
            </div>
          </div>

          <div class="patient-info form-row mt-lg-5">
            <div class="col-lg-2 align-items-center text-left">
              <label class="w-100">Is this your legal name? </label>
              <div class="form-check form-check-inline">
                <input id="yesLegalName" v-model="user.isLegalName" class="form-check-input" name="legalName"
                       type="radio"
                       value="Yes">
                <label class="form-check-label" for="yesLegalName">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input id="noLegalName" v-model="user.isLegalName" class="form-check-input" name="legalName"
                       type="radio"
                       value="No">
                <label class="form-check-label" for="noLegalName">No</label>
              </div>
            </div>
            <div class="col-lg-3 col-12 w-auto align-items-center text-left mr-lg-5">
              <label class="w-100">If not, what is your legal name?</label>
              <input v-model="user.legalName" class="form-control " placeholder="Legal Name" type="text">
            </div>
            <div class="col-lg-2 w-auto align-items-center mr-lg-4 text-left text-lg-center"> <!-- Date input -->
              <label class="w-100" for="date">* Birth date:</label>
              <input id="date" v-model="user.dateOfBirth" class="form-control" name="date" placeholder="MM/DD/YYYY"
                     required type="text"/>
            </div>
            <div class="col-lg-1 align-items-center mr-lg-4 text-left text-lg-center">
              <label class="w-100" for="age">Age:</label>
              <input id="age" v-model="user.age" class="form-control" max="100" min="0" name="age" step="10"
                     type="number"
                     value="30">
            </div>
            <div class="col-lg-2 align-items-center text-left text-lg-center">
              <label class="w-100">* Sex:</label>
              <div class="form-check form-check-inline">
                <input id="sexMale" v-model="user.sex" class="form-check-input" name="sexRadioOption" type="radio"
                       value="M">
                <label class="form-check-label" for="sexMale">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input id="sexFemale" v-model="user.sex" class="form-check-input" name="sexRadioOption" type="radio"
                       value="F">
                <label class="form-check-label" for="sexFemale">Female</label>
              </div>
            </div>
          </div>

          <div class="form-row w-100 mt-lg-5">
            <div class="form-group text-left w-100 align-items-center col-lg-5">
              <label for="inputAddress">Address:</label>
              <input id="inputAddress" v-model="user.address" class="form-control" placeholder="1234 Main St"
                     type="text">
            </div>
            <div class="form-group text-left col-lg-3">
              <label for="inputAddress2">Address 2:</label>
              <input id="inputAddress2" v-model="user.address2" class="form-control"
                     placeholder="Apartment, studio, or floor" type="text">
            </div>
            <div class="form-row text-left ml-0  w-100">
              <div class="form-group col-lg-3">
                <label for="inputCity">City:</label>
                <input id="inputCity" v-model="user.city" class="form-control" placeholder="City" type="text">
              </div>
              <div class="form-group text-left col-lg-3">
                <label for="inputState">State:</label>
                <select id="inputState" v-model="user.state" class="form-control">
                  <option selected>Select...</option>
                  <option>Florida</option>
                </select>
              </div>
              <div class="form-group text-left col-lg-1 mr-lg-5">
                <label for="inputZip">Zip:</label>
                <input id="inputZip" v-model="user.zip" class="form-control" placeholder="Zip" type="text">
              </div>
              <div class="form-group text-left col-lg-4 ml-lg-4">
                <label for="inputZip">* Email:</label>
                <input id="email" v-model="user.email" class="form-control" placeholder="email@example.com" required
                       type="text" style="text-transform: lowercase">
              </div>
            </div>
          </div>

          <div class="patient-info form-row text-left mt-lg-5 justify-content-lg-between">
            <div class="col-lg-3">
              <label class="w-100">* Social Security: </label>
              <input v-model="user.socialSecurity" class="form-control" placeholder="SS#" required type="text">
            </div>
            <div class="col-lg-3">
              <label class="w-100">Home phone: </label>
              <input v-model="user.homeNumber" class="form-control" placeholder="Phone" type="text">
            </div>
            <div class="col-lg-3">
              <label class="w-100">* Cell phone: </label>
              <input v-model="user.cellNumber" class="form-control" placeholder="Phone" type="text">
            </div>
          </div>
          <div class="patient-info form-row text-left my-lg-5 justify-content-lg-between">
            <div class="col-lg-4">
              <label class="w-100">Occupation: </label>
              <input v-model="user.occupation" class="form-control" placeholder="Occupation" type="text">
            </div>
            <div class="col-lg-4">
              <label class="w-100">Employer: </label>
              <input v-model="user.employer" class="form-control" placeholder="Employer" type="text">
            </div>
            <div class="col-lg-3">
              <label class="w-100">Employer phone: </label>
              <input v-model="user.employerPhone" class="form-control" placeholder="Phone" type="text">
            </div>
          </div>

          <!--Insurance Information Section-->
          <h5 class="mb-2 mt-5 py-2  text-dark" style="background-color: #D5DCE4">Insurance Information</h5>
          <small id="emailHelp" class="form-text text-muted" style="font-size: 12px">(Please give your insurance card to
            the receptionist.)</small>

          <div class="patient-info form-row text-left mt-lg-5 mt-3 justify-content-lg-between">
            <div class="col-lg-3">
              <label class="w-100">Person responsible for bill: </label>
              <input v-model="user.responsibleBillPerson" class="form-control" placeholder="Responsible party"
                     type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Birth date: </label>
              <input v-model="user.responsibleBillPersonDOB" class="form-control" placeholder="MM/DD/YYYY" type="text">
            </div>
            <div class="col-lg-4">
              <label class="w-100">Address (if different):</label>
              <input v-model="user.responsibleBillPersonAddress" class="form-control" placeholder="Address" type="text">
            </div>
            <div class="col-lg-3">
              <label class="w-100">Home phone:</label>
              <input v-model="user.responsibleBillPersonHomePhone" class="form-control" placeholder="Phone" type="text">
            </div>
          </div>

          <div class="patient-info form-row text-left mt-lg-5">
            <label class="col-lg-3">Is this person a patient here?</label>
            <div class="form-check form-check-inline">
              <input id="yesPatientHere" v-model="user.patientHere" class="form-check-input" name="patientHere"
                     type="radio"
                     value="Yes">
              <label class="form-check-label" for="yesLegalName">Yes</label>
            </div>
            <div class="form-check form-check-inline mr-lg-5">
              <input id="noPatientHere" v-model="user.patientHere" class="form-check-input" name="patientHere"
                     type="radio"
                     value="No">
              <label class="form-check-label" for="noLegalName">No</label>
            </div>
            <label class="col-lg-3 ml-lg-5">Is this patient covered by insurance?</label>
            <div class="form-check form-check-inline">
              <input id="yesPatientCovered" v-model="user.patientCovByInsurance" class="form-check-input"
                     name="patientCovered" type="radio"
                     value="Yes">
              <label class="form-check-label" for="yesLegalName">Yes</label>
            </div>
            <div class="form-check form-check-inline">
              <input id="noPatientCovered" v-model="user.patientCovByInsurance" class="form-check-input"
                     name="patientCovered" type="radio"
                     value="No">
              <label class="form-check-label" for="noLegalName">No</label>
            </div>
          </div>

          <div class="patient-info form-row text-left mt-lg-5 justify-content-lg-between">
            <div class="col-lg-3">
              <label class="w-100">Occupation: </label>
              <input v-model="user.insurPersOccupation" class="form-control" placeholder="Occupation" type="text">
            </div>
            <div class="col-lg-3">
              <label class="w-100">Employer: </label>
              <input v-model="user.insurPersEmployer" class="form-control" placeholder="Employer" type="text">
            </div>
            <div class="col-lg-4">
              <label class="w-100">Employer address: </label>
              <input v-model="user.insurPersEmployerAddress" class="form-control" placeholder="Address" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Employer phone: </label>
              <input v-model="user.insurPersEmployerPhone" class="form-control" placeholder="Phone" type="text">
            </div>
          </div>

          <div class="patient-info form-row text-left mt-lg-5">
            <div class="col-lg-5">
              <label for="inputInsurance">Please indicate primary insurance:</label>
              <select id="inputInsurance" v-model="user.primaryInsurance" class="form-control">
                <option selected>Choose an item...</option>
                <option>Cross Blue Shield</option>
                <option>Humana Health Care</option>
              </select>
            </div>
            <div class="col-lg-5 ml-lg-5">
              <label class="w-100">Other: </label>
              <input v-model="user.primaryInsurance" class="form-control" placeholder="Other insurance" type="text">
            </div>
          </div>

          <div class="patient-info form-row text-left mt-lg-5">
            <div class="col-lg-2">
              <label class="w-100">Subscriber’s name:</label>
              <input v-model="user.subscriberName" class="form-control" placeholder="Name" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Subscriber’s SS:</label>
              <input v-model="user.subscriberSS" class="form-control" placeholder="SS#" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Birth date: </label>
              <input v-model="user.subscriberDOB" class="form-control" placeholder="MM/DD/YYYY" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Group no: </label>
              <input v-model="user.subscriberGroupNo" class="form-control" placeholder="Group #" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Policy no: </label>
              <input v-model="user.subscriberPolicyNo" class="form-control" placeholder="Policy #" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Co-payment: </label>
              <input v-model="user.subscriberCoPayAmount" class="form-control" placeholder="$ Co-pay" type="text">
            </div>
          </div>

          <div class="patient-info form-row text-left mt-lg-5">
            <div class="col-lg-5">
              <label for="inputRelationship">Patient’s relationship to subscriber: </label>
              <select id="inputRelationship" v-model="user.relationToSubscriber" class="form-control">
                <option selected>Choose an item...</option>
                <option>Parent</option>
                <option>Children</option>
              </select>
            </div>
            <div class="col-lg-5 ml-lg-5">
              <label class="w-100">Other: </label>
              <input v-model="user.relationToSubscriber" class="form-control" placeholder="Relationship to subscriber"
                     type="text">
            </div>
          </div>

          <div class="patient-info form-row text-left my-lg-5">
            <div class="col-lg-4">
              <label class="w-100">Name of secondary insurance (if applicable):</label>
              <input v-model="user.secondaryInsurance" class="form-control" placeholder="Secondary Insurance"
                     type="text">
            </div>
            <div class="col-lg-4">
              <label class="w-100">Subscriber’s name:</label>
              <input v-model="user.secondaryInsuranceSubscName" class="form-control" placeholder="Name" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Group no: </label>
              <input v-model="user.secondaryInsuranceSubscGroupNo" class="form-control" placeholder="Group #"
                     type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Policy no: </label>
              <input v-model="user.secondaryInsuranceSubscPolicyNo" class="form-control" placeholder="Policy #"
                     type="text">
            </div>
          </div>

          <div class="patient-info form-row text-left my-lg-5">
            <div class="col-lg-5">
              <label for="inputRelationship2">Patient’s relationship to subscriber: </label>
              <select id="inputRelationship2" v-model="user.secondaryInsuranceRelationToPatient" class="form-control">
                <option selected>Choose an item...</option>
                <option>Parent</option>
                <option>Children</option>
              </select>
            </div>
            <div class="col-lg-5 ml-lg-5">
              <label class="w-100">Other: </label>
              <input v-model="user.secondaryInsuranceRelationToPatient" class="form-control"
                     placeholder="Relationship to subscriber" type="text">
            </div>
          </div>

          <!--In Case Of Emergency Information Section-->
          <h5 class="mb-lg-5 mb-3 mt-5 py-2 text-dark" style="background-color: #D5DCE4">In Case Of Emergency</h5>
          <div class="patient-info form-row text-left mt-lg-4">
            <div class="col-lg-4">
              <label class="w-100">Name of local friend or relative:</label>
              <input v-model="user.localRelativeName" class="form-control" placeholder="Friend or relative name"
                     type="text">
              <small class="form-text text-muted">(not living at same address)</small>
            </div>
            <div class="col-lg-4">
              <label class="w-100">Relationship to patient: </label>
              <input v-model="user.localRelativeRelation" class="form-control" placeholder="Relationship" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Home phone: </label>
              <input v-model="user.localRelativeHomePhone" class="form-control" placeholder="Phone" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Work phone: </label>
              <input v-model="user.localRelativeWorkPhone" class="form-control" placeholder="Phone" type="text">
            </div>
          </div>

          <!--Signature Section-->
          <h6 class="mt-5 text-left" style="font-size: 14px">I verify that the above information is factual and true
            to the best of my I authorize the doctor to employ X-
            Rays, photographs, anesthetics, medicines, surgeries, and other equipment or aids as he/she deems necessary
            in order to
            provide the proper patient care. I understand that payment, proof of insurance, and/or copay is due at the
            time of service.</h6>
          <h6 class="mt-lg-3 text-left" style="font-size: 14px">I authorize this office to apply benefits on my behalf
            for the covered services rendered. I certify that the insurance
            information I have provided is factual and correct.</h6>

          <div class="form-row text-left mt-lg-4 justify-content-lg-between">
            <div class="col-lg-6">
              <input v-model="user.signature" class="form-control signature-bg signature text-center" required
                     type="text">
              <small class="form-text" style="font-size: 14px">Patient/Guardian signature</small>
            </div>
            <div class="col-lg-5">
              <input v-model="user.signatureDate" class="form-control signature-bg signature-date text-center" disabled
                     required style="padding-top: 30px; padding-bottom: 27px;" type="date">
              <small class="form-text" style="font-size: 14px">Signature Date</small>
            </div>
          </div>
          <button class="btn mx-1 btn-outline-success my-5" type="submit">Submit</button>
          <router-link class="btn mx-1 btn-outline-danger" to="/"> Cancel</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: "edit-patient",
  data() {
    return {
      user: {
        userID: null,
        email: null,
        registrationDate: null,  // MM/DD/YYYY
        pcp: null,
        lName: null,
        fName: null,
        mName: null,
        maritalStatus: null,
        legalName: null,
        isLegalName: null,
        dateOfBirth: null,
        age: null,
        sex: null,
        address: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
        socialSecurity: null,
        homeNumber: null,
        cellNumber: null,
        occupation: null,
        employer: null,
        employerPhone: null,
        responsibleBillPerson: null,
        responsibleBillPersonDOB: null,
        responsibleBillPersonAddress: null,
        responsibleBillPersonHomePhone: null,
        patientHere: null,
        patientCovByInsurance: null,
        insurPersOccupation: null,
        insurPersEmployer: null,
        insurPersEmployerAddress: null,
        insurPersEmployerPhone: null,
        primaryInsurance: null,
        subscriberName: null,
        subscriberSS: null,
        subscriberDOB: null,
        subscriberGroupNo: null,
        subscriberPolicyNo: null,
        subscriberCoPayAmount: null,
        relationToSubscriber: null,
        secondaryInsurance: null,
        secondaryInsuranceSubscName: null,
        secondaryInsuranceSubscGroupNo: null,
        secondaryInsuranceSubscPolicyNo: null,
        secondaryInsuranceRelationToPatient: null,
        localRelativeName: null,
        localRelativeRelation: null,
        localRelativeHomePhone: null,
        localRelativeWorkPhone: null,
        signature: null,
        signatureDate: null,  // MM/DD/YYYY
      }
    }
  },
  // Fetch data before it enters to route '/edit-patient'
  beforeRouteEnter(to, from, next) {
    db.collection('patients').where('userID', '==', to.params.userID).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            next(vm => {
              vm.user.userID = doc.data().userID
              vm.user.sex = doc.data().sex
              vm.user.dateOfBirth = doc.data().dateOfBirth
              vm.user.email = doc.data().email
              vm.user.registrationDate = doc.data().registrationDate  // MM/DD/YYYY
              vm.user.pcp = doc.data().pcp
              vm.user.lName = doc.data().lName
              vm.user.fName = doc.data().fName
              vm.user.mName = doc.data().mName
              vm.user.maritalStatus = doc.data().maritalStatus
              vm.user.legalName = doc.data().legalName
              vm.user.isLegalName = doc.data().isLegalName
              vm.user.dateOfBirth = doc.data().dateOfBirth
              vm.user.age = doc.data().age
              vm.user.sex = doc.data().sex
              vm.user.address = doc.data().address
              vm.user.address2 = doc.data().address2
              vm.user.city = doc.data().city
              vm.user.state = doc.data().state
              vm.user.zip = doc.data().zip
              vm.user.socialSecurity = doc.data().socialSecurity
              vm.user.homeNumber = doc.data().homeNumber
              vm.user.cellNumber = doc.data().cellNumber
              vm.user.occupation = doc.data().occupation
              vm.user.employer = doc.data().employer
              vm.user.employerPhone = doc.data().employerPhone
              vm.user.responsibleBillPerson = doc.data().responsibleBillPerson
              vm.user.responsibleBillPersonDOB = doc.data().responsibleBillPersonDOB
              vm.user.responsibleBillPersonAddress = doc.data().responsibleBillPersonAddress
              vm.user.responsibleBillPersonHomePhone = doc.data().responsibleBillPersonHomePhone
              vm.user.patientHere = doc.data().patientHere
              vm.user.patientCovByInsurance = doc.data().patientCovByInsurance
              vm.user.insurPersOccupation = doc.data().insurPersOccupation
              vm.user.insurPersEmployer = doc.data().insurPersEmployer
              vm.user.insurPersEmployerAddress = doc.data().insurPersEmployerAddress
              vm.user.insurPersEmployerPhone = doc.data().insurPersEmployerPhone
              vm.user.primaryInsurance = doc.data().primaryInsurance
              vm.user.subscriberName = doc.data().subscriberName
              vm.user.subscriberSS = doc.data().subscriberSS
              vm.user.subscriberDOB = doc.data().subscriberDOB
              vm.user.subscriberGroupNo = doc.data().subscriberGroupNo
              vm.user.subscriberPolicyNo = doc.data().subscriberPolicyNo
              vm.user.subscriberCoPayAmount = doc.data().subscriberCoPayAmount
              vm.user.relationToSubscriber = doc.data().relationToSubscriber
              vm.user.secondaryInsurance = doc.data().secondaryInsurance
              vm.user.secondaryInsuranceSubscName = doc.data().secondaryInsuranceSubscName
              vm.user.secondaryInsuranceSubscGroupNo = doc.data().secondaryInsuranceSubscGroupNo
              vm.user.secondaryInsuranceSubscPolicyNo = doc.data().secondaryInsuranceSubscPolicyNo
              vm.user.secondaryInsuranceRelationToPatient = doc.data().secondaryInsuranceRelationToPatient
              vm.user.localRelativeName = doc.data().localRelativeName
              vm.user.localRelativeRelation = doc.data().localRelativeRelation
              vm.user.localRelativeHomePhone = doc.data().localRelativeHomePhone
              vm.user.localRelativeWorkPhone = doc.data().localRelativeWorkPhone
              vm.user.signature = doc.data().signature
              vm.user.signatureDate = doc.data().signatureDate  // MM/DD/YYYY
            })
          })
        })
  },

  watcher: {
    '$route': 'fetchData'
  },

  methods: {

    // Fetches data from Firebase
    fetchData() {
      db.collection('patients').where('userID', '==', this.$route.params.userID).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.user.userID = doc.data().userID
              this.user.sex = doc.data().sex
              this.user.dateOfBirth = doc.data().dateOfBirth
              this.user.email = doc.data().email
              this.user.registrationDate = doc.data().registrationDate  // MM/DD/YYYY
              this.user.pcp = doc.data().pcp
              this.user.lName = doc.data().lName
              this.user.fName = doc.data().fName
              this.user.mName = doc.data().mName
              this.user.maritalStatus = doc.data().maritalStatus
              this.user.legalName = doc.data().legalName
              this.user.isLegalName = doc.data().isLegalName
              this.user.dateOfBirth = doc.data().dateOfBirth
              this.user.age = doc.data().age
              this.user.sex = doc.data().sex
              this.user.address = doc.data().address
              this.user.address2 = doc.data().address2
              this.user.city = doc.data().city
              this.user.state = doc.data().state
              this.user.zip = doc.data().zip
              this.user.socialSecurity = doc.data().socialSecurity
              this.user.homeNumber = doc.data().homeNumber
              this.user.cellNumber = doc.data().cellNumber
              this.user.occupation = doc.data().occupation
              this.user.employer = doc.data().employer
              this.user.employerPhone = doc.data().employerPhone
              this.user.responsibleBillPerson = doc.data().responsibleBillPerson
              this.user.responsibleBillPersonDOB = doc.data().responsibleBillPersonDOB
              this.user.responsibleBillPersonAddress = doc.data().responsibleBillPersonAddress
              this.user.responsibleBillPersonHomePhone = doc.data().responsibleBillPersonHomePhone
              this.user.patientHere = doc.data().patientHere
              this.user.patientCovByInsurance = doc.data().patientCovByInsurance
              this.user.insurPersOccupation = doc.data().insurPersOccupation
              this.user.insurPersEmployer = doc.data().insurPersEmployer
              this.user.insurPersEmployerAddress = doc.data().insurPersEmployerAddress
              this.user.insurPersEmployerPhone = doc.data().insurPersEmployerPhone
              this.user.primaryInsurance = doc.data().primaryInsurance
              this.user.subscriberName = doc.data().subscriberName
              this.user.subscriberSS = doc.data().subscriberSS
              this.user.subscriberDOB = doc.data().subscriberDOB
              this.user.subscriberGroupNo = doc.data().subscriberGroupNo
              this.user.subscriberPolicyNo = doc.data().subscriberPolicyNo
              this.user.subscriberCoPayAmount = doc.data().subscriberCoPayAmount
              this.user.relationToSubscriber = doc.data().relationToSubscriber
              this.user.secondaryInsurance = doc.data().secondaryInsurance
              this.user.secondaryInsuranceSubscName = doc.data().secondaryInsuranceSubscName
              this.user.secondaryInsuranceSubscGroupNo = doc.data().secondaryInsuranceSubscGroupNo
              this.user.secondaryInsuranceSubscPolicyNo = doc.data().secondaryInsuranceSubscPolicyNo
              this.user.secondaryInsuranceRelationToPatient = doc.data().secondaryInsuranceRelationToPatient
              this.user.localRelativeName = doc.data().localRelativeName
              this.user.localRelativeRelation = doc.data().localRelativeRelation
              this.user.localRelativeHomePhone = doc.data().localRelativeHomePhone
              this.user.localRelativeWorkPhone = doc.data().localRelativeWorkPhone
              this.user.signature = doc.data().signature
              this.user.signatureDate = doc.data().signatureDate  // MM/DD/YYYY
            })
          })
    },

    // Update User
    updateUser() {
      db.collection("patients").doc(this.user.userID).update(this.user)
          .then(() => {
            console.log("Document successfully updated!");
            this.$router.push({name: 'view-patient', params: {userID: this.user.userID}})
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            this.errorMsg = true;
          });
    },
  }
}
</script>

<style scoped>

.signature-bg {
  background: transparent;
  border: 0;
  border-bottom: 2px solid;
  border-radius: 0;
}

.signature-date {
  text-indent: 20px;
}

.btn {
  border-radius: 10px;
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 480px) {
  #new-patient {
    margin: 0px 1rem;
  }

  .todaysdate, .todaysdate label {
    display: inherit;
    margin-bottom: 5px !important;
    margin-left: 0px !important;
  }

  .todaysdate div {
    margin-bottom: 20px !important;
  }

  .patient-info div{
    margin-bottom: 20px !important;
  }

}
</style>
