<template>
  <div id="view-patient">
    <div class="container" style="background: #F1F3F9; border-radius: 10px">
      <div class="my-lg-3 pb-2 text-left">
        <div class="py-2 justify-content-end d-flex">
          <button class="text-dark btn-lg border-0 bg-transparent" @click="showDeleteModal=true"><i class="fa fa-trash"></i></button>
          <button class="text-dark btn-lg border-0 bg-transparent"><i @click="print" class="fa fa-print"></i></button>
          <router-link to="/">
            <button class="text-dark btn-lg border-0 bg-transparent"><i class="fa fa-home"></i></button>
          </router-link>
        </div>
        <h5 class="mb-lg-5 mb-4 py-2 text-dark w-100 text-center ml-0" style="background-color: #D5DCE4">Patient
          Information</h5>
        <div class="patient-info container row mx-0">
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Patient ID: </div><h6 class="border-bottom ml-lg-3"> {{ userID }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Registration Date: </div><h6 class="border-bottom ml-lg-3"> {{ registrationDate }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> PCP: </div><h6 class="border-bottom ml-lg-3"> {{ pcp }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Patient's name: </div><h6 class="border-bottom ml-lg-3"> {{ fName }} {{ mName }} {{ lName }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Date of Birth: </div><h6 class="border-bottom ml-lg-3"> {{ dateOfBirth }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Sex: </div><h6 class="border-bottom ml-lg-3"> {{ sex }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Is this the legal name?: </div><h6 class="border-bottom ml-lg-3"> {{ isLegalName }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Legal name: </div><h6 class="border-bottom ml-lg-3"> {{ legalName }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Social Security: </div><h6 class="border-bottom ml-lg-3"> {{ socialSecurity }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Marital Status: </div><h6 class="border-bottom ml-lg-3"> {{ maritalStatus }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Age: </div><h6 class="border-bottom ml-lg-3"> {{ age }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Occupation: </div><h6 class="border-bottom ml-lg-3"> {{ occupation }} </h6></div>
          <div class="col-lg-12 row mx-0 d-flex"><div class="h7"> Address: </div><h6 class="border-bottom ml-lg-3 address" style="min-width: 20rem"> {{ address }} {{ address2 }}, {{ city }}, {{ state }}, {{ zip }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Email: </div><h6 class="border-bottom ml-lg-3" style="min-width: 14rem"> {{ email }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Home number: </div><h6 class="border-bottom ml-lg-3"> {{ homeNumber }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Cell number: </div><h6 class="border-bottom ml-lg-3"> {{ cellNumber }} </h6></div>
          <div class="col-lg-8 row mx-0 d-flex"><div class="h7"> Employer: </div><h6 class="border-bottom ml-lg-3 address" style="min-width: 20rem"> {{ employer }} </h6></div>
          <div class="col-lg-4 row mx-0 d-flex"><div class="h7"> Employer phone: </div><h6 class="border-bottom ml-lg-3"> {{ employerPhone }} </h6></div>
        </div>
        <h5 class="mt-5 mb-4 py-2 text-dark w-100 text-center mx-0" style="background-color: #D5DCE4">Insurance
          Information</h5>
        <div class="patient-info container row mx-0">
          <div class="col-lg-4 d-flex row mx-0"><div class="h7"> Person responsible for bill: </div><h6 class="border-bottom ml-lg-3"> {{ responsibleBillPerson }}</h6></div>
          <div class="col-lg-4 d-flex row mx-0"><div class="h7"> Date of birth: </div><h6 class="border-bottom ml-lg-3"> {{ responsibleBillPersonDOB }}</h6></div>
          <div class="col-lg-4 d-flex row mx-0"><div class="h7"> Home number: </div><h6 class="border-bottom ml-lg-3"> {{ responsibleBillPersonHomePhone }}</h6></div>
          <div class="col-lg-12 d-flex row mx-0"><div class="h7"> Address: </div><h6 class="border-bottom ml-lg-3 address" style="min-width: 20rem"> {{ responsibleBillPersonAddress }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Is the person responsible for bill a patient here?: </div><h6 class="border-bottom ml-lg-3"> {{ patientHere }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Is patient covered by insurance?: </div><h6 class="border-bottom ml-lg-3"> {{ patientCovByInsurance }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Occupation: </div><h6 class="border-bottom ml-lg-3"> {{ insurPersOccupation }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Employer: </div><h6 class="border-bottom ml-lg-3"> {{ insurPersEmployer }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Employer address: </div><h6 class="border-bottom ml-lg-3"> {{ insurPersEmployerAddress }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Employer number: </div><h6 class="border-bottom ml-lg-3"> {{ insurPersEmployerPhone }}</h6></div>
          <div class="col-lg-12 d-flex row mx-0"><div class="h7"> Primary insurance: </div><h6 class="border-bottom ml-lg-3"> {{ primaryInsurance }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Subscriber’s name: </div><h6 class="border-bottom ml-lg-3"> {{ subscriberName }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Subscriber’s social security: </div><h6 class="border-bottom ml-lg-3"> {{ subscriberSS }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Subscriber’s DOB: </div><h6 class="border-bottom ml-lg-3"> {{ subscriberDOB }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Subscriber’s group number: </div><h6 class="border-bottom ml-lg-3"> {{ subscriberGroupNo }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Subscriber’s policy number: </div><h6 class="border-bottom ml-lg-3"> {{ subscriberPolicyNo }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Subscriber’s co-payment amount: </div><h6 class="border-bottom ml-lg-3"> {{ subscriberCoPayAmount }}</h6></div>
          <div class="col-lg-12 d-flex row mx-0"><div class="h7"> Patient's relation to subscriber: </div><h6 class="border-bottom ml-lg-3"> {{ relationToSubscriber }}</h6></div>
          <div class="col-lg-12 d-flex row mx-0"><div class="h7"> Name of secondary insurance (if applicable): </div><h6 class="border-bottom ml-lg-3"> {{ secondaryInsurance }}</h6></div>
          <div class="col-lg-12 d-flex row mx-0"><div class="h7"> Subscriber’s name: </div><h6 class="border-bottom ml-lg-3"> {{ secondaryInsuranceSubscName }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Subscriber’s group number: </div><h6 class="border-bottom ml-lg-3"> {{ secondaryInsuranceSubscGroupNo }}</h6></div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Subscriber’s policy number: </div><h6 class="border-bottom ml-lg-3"> {{ secondaryInsuranceSubscPolicyNo }}</h6></div>
          <div class="col-lg-12 d-flex row mx-0"><div class="h7"> Secondary insurance subscriber’s relationship with patient: </div><h6 class="border-bottom ml-lg-3">
            {{ secondaryInsuranceRelationToPatient }}</h6></div>
        </div>
        <h5 class="mt-5 mb-4 py-2 text-dark w-100 text-center mx-0" style="background-color: #D5DCE4">In Case Of
          Emergency</h5>
        <div class="patient-info container row mx-0">
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Name of local friend or relative: </div><h6 class="border-bottom ml-lg-3"></h6> {{ localRelativeName }}</div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Relationship to patient: </div><h6 class="border-bottom ml-lg-3"></h6> {{ localRelativeRelation }}</div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Relative's home phone: </div><h6 class="border-bottom ml-lg-3"></h6> {{ localRelativeHomePhone }}</div>
          <div class="col-lg-6 d-flex row mx-0"><div class="h7"> Relative's work phone: </div><h6 class="border-bottom ml-lg-3"></h6> {{ localRelativeWorkPhone }}</div>
        </div>
        <div class="patient-info container mx-0 row my-lg-5 mt-5">
          <small class="ml-3 mb-2">I verify that the above information is factual and true to the best of my I authorize the doctor to employ X-
            Rays, photographs, anesthetics, medicines, surgeries, and other equipment or aids as he/she deems necessary in order to
            provide the proper patient care. I understand that payment, proof of insurance, and/or copay is due at the time of service.
          </small>
          <small class="ml-3 mb-3">I authorize this office to apply benefits on my behalf for the covered services rendered. I certify that the insurance
            information I have provided is factual and correct.
          </small>
          <div class="col-lg-6 d-flex align-items-end row mx-0"><div class="h7"> Patient's signature: </div><h6 class="ml-lg-3 signature address" style="min-width: 20rem"> {{ signature }} </h6></div>
          <div class="col-lg-6 d-flex align-items-end row mx-0"><div class="h7">Patient's signature date: </div><h6 class="ml-lg-3" style="min-width: 15rem"> {{ signatureDate }} </h6></div>
        </div>
      </div>
    </div>

    <!--Delete User Model-->
    <div v-if="showDeleteModal" id="delete" class="overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete User</h5>
            <button class="close" type="button" @click="showDeleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <h4 style="color: #F78E8E">Are you sure you want to delete this user?</h4>
            <h5>You are deleting patient {{ fName }}</h5>
            <hr>
            <button class="btn btn-lg"
                    style="width: 100px; border-radius: 30px; background-color: #EAEAFA; color: #9195EE"
                    @click="deleteUserFinal(); showDeleteModal=false">Yes
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button class="btn btn-lg"
                    style="width: 100px; border-radius: 30px; background-color: #FBEAEA; color: #F78F8F"
                    @click="showDeleteModal=false">No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: "ViewPatient",
  data() {
    return {
      showDeleteModal: false,
      userID: null,
      name: null,
      email: null,
      phone: null,
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
  },

  // Fetch data before it enters to route '/view-patient'
  beforeRouteEnter(to, from, next) {
    db.collection('patients').where('userID', '==', to.params.userID).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            next(vm => {
              vm.userID = doc.data().userID
              vm.name = doc.data().name
              vm.sex = doc.data().sex
              vm.dateOfBirth = doc.data().dateOfBirth
              vm.email = doc.data().email
              vm.phone = doc.data().phone
              vm.registrationDate = doc.data().registrationDate  // MM/DD/YYYY
              vm.pcp = doc.data().pcp
              vm.lName = doc.data().lName
              vm.fName = doc.data().fName
              vm.mName = doc.data().mName
              vm.maritalStatus = doc.data().maritalStatus
              vm.legalName = doc.data().legalName
              vm.isLegalName = doc.data().isLegalName
              vm.dateOfBirth = doc.data().dateOfBirth
              vm.age = doc.data().age
              vm.sex = doc.data().sex
              vm.address = doc.data().address
              vm.address2 = doc.data().address2
              vm.city = doc.data().city
              vm.state = doc.data().state
              vm.zip = doc.data().zip
              vm.socialSecurity = doc.data().socialSecurity
              vm.homeNumber = doc.data().homeNumber
              vm.cellNumber = doc.data().cellNumber
              vm.occupation = doc.data().occupation
              vm.employer = doc.data().employer
              vm.employerPhone = doc.data().employerPhone
              vm.responsibleBillPerson = doc.data().responsibleBillPerson
              vm.responsibleBillPersonDOB = doc.data().responsibleBillPersonDOB
              vm.responsibleBillPersonAddress = doc.data().responsibleBillPersonAddress
              vm.responsibleBillPersonHomePhone = doc.data().responsibleBillPersonHomePhone
              vm.patientHere = doc.data().patientHere
              vm.patientCovByInsurance = doc.data().patientCovByInsurance
              vm.insurPersOccupation = doc.data().insurPersOccupation
              vm.insurPersEmployer = doc.data().insurPersEmployer
              vm.insurPersEmployerAddress = doc.data().insurPersEmployerAddress
              vm.insurPersEmployerPhone = doc.data().insurPersEmployerPhone
              vm.primaryInsurance = doc.data().primaryInsurance
              vm.subscriberName = doc.data().subscriberName
              vm.subscriberSS = doc.data().subscriberSS
              vm.subscriberDOB = doc.data().subscriberDOB
              vm.subscriberGroupNo = doc.data().subscriberGroupNo
              vm.subscriberPolicyNo = doc.data().subscriberPolicyNo
              vm.subscriberCoPayAmount = doc.data().subscriberCoPayAmount
              vm.relationToSubscriber = doc.data().relationToSubscriber
              vm.secondaryInsurance = doc.data().secondaryInsurance
              vm.secondaryInsuranceSubscName = doc.data().secondaryInsuranceSubscName
              vm.secondaryInsuranceSubscGroupNo = doc.data().secondaryInsuranceSubscGroupNo
              vm.secondaryInsuranceSubscPolicyNo = doc.data().secondaryInsuranceSubscPolicyNo
              vm.secondaryInsuranceRelationToPatient = doc.data().secondaryInsuranceRelationToPatient
              vm.localRelativeName = doc.data().localRelativeName
              vm.localRelativeRelation = doc.data().localRelativeRelation
              vm.localRelativeHomePhone = doc.data().localRelativeHomePhone
              vm.localRelativeWorkPhone = doc.data().localRelativeWorkPhone
              vm.signature = doc.data().signature
              vm.signatureDate = doc.data().signatureDate  // MM/DD/YYYY,
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
              this.userID = doc.data().userID
              this.name = doc.data().name
              this.sex = doc.data().sex
              this.dateOfBirth = doc.data().dateOfBirth
              this.email = doc.data().email
              this.phone = doc.data().phone
              this.registrationDate = doc.data().registrationDate  // MM/DD/YYYY
              this.pcp = doc.data().pcp
              this.lName = doc.data().lName
              this.fName = doc.data().fName
              this.mName = doc.data().mName
              this.maritalStatus = doc.data().maritalStatus
              this.legalName = doc.data().legalName
              this.isLegalName = doc.data().isLegalName
              this.dateOfBirth = doc.data().dateOfBirth
              this.age = doc.data().age
              this.sex = doc.data().sex
              this.address = doc.data().address
              this.address2 = doc.data().address2
              this.city = doc.data().city
              this.state = doc.data().state
              this.zip = doc.data().zip
              this.socialSecurity = doc.data().socialSecurity
              this.homeNumber = doc.data().homeNumber
              this.cellNumber = doc.data().cellNumber
              this.occupation = doc.data().occupation
              this.employer = doc.data().employer
              this.employerPhone = doc.data().employerPhone
              this.responsibleBillPerson = doc.data().responsibleBillPerson
              this.responsibleBillPersonDOB = doc.data().responsibleBillPersonDOB
              this.responsibleBillPersonAddress = doc.data().responsibleBillPersonAddress
              this.responsibleBillPersonHomePhone = doc.data().responsibleBillPersonHomePhone
              this.patientHere = doc.data().patientHere
              this.patientCovByInsurance = doc.data().patientCovByInsurance
              this.insurPersOccupation = doc.data().insurPersOccupation
              this.insurPersEmployer = doc.data().insurPersEmployer
              this.insurPersEmployerAddress = doc.data().insurPersEmployerAddress
              this.insurPersEmployerPhone = doc.data().insurPersEmployerPhone
              this.primaryInsurance = doc.data().primaryInsurance
              this.subscriberName = doc.data().subscriberName
              this.subscriberSS = doc.data().subscriberSS
              this.subscriberDOB = doc.data().subscriberDOB
              this.subscriberGroupNo = doc.data().subscriberGroupNo
              this.subscriberPolicyNo = doc.data().subscriberPolicyNo
              this.subscriberCoPayAmount = doc.data().subscriberCoPayAmount
              this.relationToSubscriber = doc.data().relationToSubscriber
              this.secondaryInsurance = doc.data().secondaryInsurance
              this.secondaryInsuranceSubscName = doc.data().secondaryInsuranceSubscName
              this.secondaryInsuranceSubscGroupNo = doc.data().secondaryInsuranceSubscGroupNo
              this.secondaryInsuranceSubscPolicyNo = doc.data().secondaryInsuranceSubscPolicyNo
              this.secondaryInsuranceRelationToPatient = doc.data().secondaryInsuranceRelationToPatient
              this.localRelativeName = doc.data().localRelativeName
              this.localRelativeRelation = doc.data().localRelativeRelation
              this.localRelativeHomePhone = doc.data().localRelativeHomePhone
              this.localRelativeWorkPhone = doc.data().localRelativeWorkPhone
              this.signature = doc.data().signature
              this.signatureDate = doc.data().signatureDate  // MM/DD/YYYY
            })
          })
    },
    // Delete User
    deleteUserFinal() {
      db.collection("patients").doc(this.userID).delete().then(() => {
        this.$router.push('/');
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    },
    print () {
      // Pass the element id here
      print();
    }
  }
}
</script>

<style scoped>
h6 {
  text-align: center;
  border-bottom: 1px solid !important;
  min-width: 7.3rem;
}

div .d-flex {
  margin-bottom: 5px !important;
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 480px) {
  #view-patient {
    margin: 0px 1rem;
  }
  .container {
    margin-top: 1rem;
  }
  h6 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%
  }
  .h7 {
    font-weight: bold;
    font-size: 13px;
    color: #6c757d !important;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 5px !important;
  }
  .patient-info div{
    margin-bottom: 20px !important;
  }
  .address {
    min-width: 0px !important;
  }

  .overlay {
    position: fixed !important;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    background: rgba(0, 0, 0, 0.6) !important;
  }

}
</style>
