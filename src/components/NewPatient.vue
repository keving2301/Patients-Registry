<template>
  <div id="new-patient" style="font-size: 13px; font-weight: bold">
    <div class="container" style="background: #F1F3F9; border-radius: 10px">
      <div class="mt-5">
        <form class="m-3" @submit.prevent="savePatient">
          <div class="form-row pt-5">
            <div class="col text-left d-inline-flex align-items-center">
              <label class="p-0 m-0">Today's Date: </label>
              <input class="form-control col-3 ml-3 bg-white text-center" disabled placeholder="{ Date }" type="text">
            </div>
            <div class="col text-right d-inline-flex align-items-center">
              <label class="p-0 m-0">PCP: </label>
              <input v-model="user.pcp" class="form-control col-7 ml-3" placeholder="PCP" type="text">
            </div>
          </div>

          <!--Patient Information Section-->
          <h5 class="my-5 py-2 text-dark" style="background-color: #D5DCE4">Patient Information</h5>
          <div class="form-row align-items-center text-left">
            <div class="col-lg-3">
              <label class="w-100">Patient's last name: </label>
              <input v-model="user.name" class="form-control" placeholder="Last Name" required type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">First: </label>
              <input v-model="user.fName" class="form-control" placeholder="First Name" required type="text">
            </div>
            <div class="col-lg-2 mr-lg-5">
              <label class="w-100">Middle: </label>
              <input v-model="user.mName" class="form-control" placeholder="Initial" required type="text">
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

          <div class="form-row mt-5">
            <div class="col-lg-2 align-items-center text-left">
              <label class="w-100">Is this your legal name? </label>
              <div class="form-check form-check-inline">
                <input id="yesLegalName" v-model="user.legalName" class="form-check-input" name="legalName" required
                       type="radio"
                       value="option1">
                <label class="form-check-label" for="yesLegalName">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input id="noLegalName" v-model="user.legalName" class="form-check-input" name="legalName" type="radio"
                       value="option2">
                <label class="form-check-label" for="noLegalName">No</label>
              </div>
            </div>
            <div class="col-lg-3 w-auto align-items-center text-left mr-lg-5">
              <label class="w-100">If not, what is your legal name?</label>
              <input v-model="user.legalName" class="form-control " placeholder="Legal Name" type="text">
            </div>
            <div class="col-lg-2 w-auto align-items-center mr-lg-4 "> <!-- Date input -->
              <label class="w-100" for="date">Birth date:</label>
              <input id="date" v-model="user.dateOfBirth" class="form-control" name="date" placeholder="MM/DD/YYYY"
                     required type="text"/>
            </div>
            <div class="col-lg-1 align-items-center mr-lg-4">
              <label class="w-100" for="age">Age:</label>
              <input id="age" v-model="user.age" class="form-control" max="100" min="0" name="age" required step="10"
                     type="number"
                     value="30">
            </div>
            <div class="col-lg-2 align-items-center">
              <label class="w-100">Sex:</label>
              <div class="form-check form-check-inline">
                <input id="sexMale" v-model="user.sex" class="form-check-input" name="sexRadioOption" type="radio"
                       value="option1">
                <label class="form-check-label" for="sexMale">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input id="sexFemale" v-model="user.sex" class="form-check-input" name="sexRadioOption" type="radio"
                       value="option2">
                <label class="form-check-label" for="sexFemale">Female</label>
              </div>
            </div>
          </div>

          <div class="form-row w-100 mt-5 ">
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
            <div class="form-row text-left ml-0">
              <div class="form-group col-md-6">
                <label for="inputCity">City:</label>
                <input id="inputCity" v-model="user.city" class="form-control" placeholder="City" type="text">
              </div>
              <div class="form-group text-left col-md-4">
                <label for="inputState">State:</label>
                <select id="inputState" v-model="user.state" class="form-control">
                  <option selected>Select...</option>
                  <option>Florida</option>
                </select>
              </div>
              <div class="form-group text-left col-md-2">
                <label for="inputZip">Zip:</label>
                <input id="inputZip" v-model="user.zip" class="form-control" placeholder="Zip Code" type="text">
              </div>
            </div>
          </div>

          <div class="form-row text-left mt-5 justify-content-lg-between">
            <div class="col-lg-3">
              <label class="w-100">Social Security: </label>
              <input v-model="user.socialSecurity" class="form-control" placeholder="SS#" required type="text">
            </div>
            <div class="col-lg-3">
              <label class="w-100">Home phone: </label>
              <input v-model="user.homeNumber" class="form-control" placeholder="Phone" type="text">
            </div>
            <div class="col-lg-3">
              <label class="w-100">Cell phone: </label>
              <input v-model="user.cellNumber" class="form-control" placeholder="Phone" type="text">
            </div>
          </div>
          <div class="form-row text-left my-5 justify-content-lg-between">
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
          <h5 class="mb-2 mt-5 py-2 text-dark" style="background-color: #D5DCE4">Insurance Information</h5>
          <small id="emailHelp" class="form-text text-muted" style="font-size: 12px">(Please give your insurance card to
            the receptionist.)</small>

          <div class="form-row text-left mt-5 justify-content-lg-between">
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

          <div class="form-row text-left mt-5">
            <label class="col-lg-3">Is this person a patient here?</label>
            <div class="form-check form-check-inline">
              <input id="yesPatientHere" v-model="user.patientHere" class="form-check-input" name="patientHere"
                     type="radio"
                     value="option1">
              <label class="form-check-label" for="yesLegalName">Yes</label>
            </div>
            <div class="form-check form-check-inline mr-lg-5">
              <input id="noPatientHere" v-model="user.patientHere" class="form-check-input" name="patientHere"
                     type="radio"
                     value="option2">
              <label class="form-check-label" for="noLegalName">No</label>
            </div>
            <label class="col-lg-3 ml-lg-5">Is this patient covered by insurance?</label>
            <div class="form-check form-check-inline">
              <input id="yesPatientCovered" v-model="user.patientCovByInsurance" class="form-check-input"
                     name="patientCovered" type="radio"
                     value="option1">
              <label class="form-check-label" for="yesLegalName">Yes</label>
            </div>
            <div class="form-check form-check-inline">
              <input id="noPatientCovered" v-model="user.patientCovByInsurance" class="form-check-input"
                     name="patientCovered" type="radio"
                     value="option2">
              <label class="form-check-label" for="noLegalName">No</label>
            </div>
          </div>

          <div class="form-row text-left mt-5 justify-content-lg-between">
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

          <div class="form-row text-left mt-lg-5">
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

          <div class="form-row text-left mt-lg-5">
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

          <div class="form-row text-left mt-lg-5">
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

          <div class="form-row text-left my-lg-5">
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

          <div class="form-row text-left my-lg-5">
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
          <h5 class="mb-5 mt-5 py-2 text-dark" style="background-color: #D5DCE4">In Case Of Emergency</h5>
          <div class="form-row text-left mt-lg-4">
            <div class="col-lg-4">
              <label class="w-100">Name of local friend or relative:</label>
              <input class="form-control" placeholder="Friend or relative name" v-model="user.localRelativeName" type="text">
              <small class="form-text text-muted">(not living at same address)</small>
            </div>
            <div class="col-lg-4">
              <label class="w-100">Relationship to patient: </label>
              <input class="form-control" placeholder="Relationship" v-model="user.localRelativeRelation" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Home phone: </label>
              <input class="form-control" placeholder="Phone" v-model="user.localRelativeHomePhone" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">Work phone: </label>
              <input class="form-control" placeholder="Phone" v-model="user.localRelativeWorkPhone" type="text">
            </div>
          </div>

          <!--Signature Section-->
          <h6 class="mt-lg-5 text-left" style="font-size: 14px">The above information is true to the best of my
            knowledge. I authorize my insurance benefits be paid
            directly to the physician. I understand that I am financially responsible for any balance. I also authorize
            [Name of Practice] or insurance company to release any information required to process my claims.</h6>

          <div class="form-row text-left mt-lg-4 justify-content-lg-between">
            <div class="col-lg-6">
              <input class="form-control signature text-center" v-model="user.signature" required type="text">
              <small class="form-text" style="font-size: 14px">Patient/Guardian signature</small>
            </div>
            <div class="col-lg-5">
              <input class="form-control signature text-center" disabled v-model="user.signatureDate" required  placeholder="{ Date }" type="text">
              <small class="form-text" style="font-size: 14px">Date</small>
            </div>
          </div>

          <!--<div class="mt-5">
            <label>Patient Name </label>
            <input v-model="user.name" required type="text">
          </div>
          <div>
            <label>Sex :</label>
            <input v-model="user.sex" required type="text">
          </div>
          <div>
            <label>Date of Birth: </label>
            <input v-model="user.dateOfBirth" required type="text">
          </div>
          <div>
            <label>Email: </label>
            <input v-model="user.email" required type="text">
          </div>
          <div>
            <label>Phone: </label>
            <input v-model="user.phone" required type="text">
          </div>-->
          <button class="btn mx-lg-1 btn-outline-success my-5" type="submit">Submit</button>
          <router-link class="btn mx-lg-1 btn-outline-danger" to="/"> Cancel</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: "new-patient",
  data() {
    return {
      user: {
        userID: null,
        name: null,
        sex: null,
        dateOfBirth: null,
        email: null,
        phone: null
      }
    }
  },

  methods: {

    // Creates New User with an auto generated Document ID
    savePatient() {
      db.collection("patients").add(this.user).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.user.userID = docRef.id; //Saves document ID as data field for user
        this.updateUser();
        this.$router.push('/')
      }).catch(function (error) {
        console.error("Error adding document: ", error);
        this.errorMsg = true;
      });
    },
    // Update User Information
    updateUser() {
      db.collection("patients").doc(this.user.userID).update(this.user)
          .then(() => {
            console.log("Document successfully updated!");
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

.signature {
  background: transparent;
  border: 0;
  border-bottom: 2px solid;
  border-radius: 0;
}


.btn {
  border-radius: 10px;
}
</style>
