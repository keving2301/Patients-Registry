<template>
  <div id="view-patient">
    <div class="container-fluid">
      <h3 class="mt-5 mb-5">View Patient</h3>
      <h6>{{ userID }}</h6>
      <h6>{{ email }}</h6>
      <h6>{{ registrationDate }}</h6>
      <h6>{{ pcp }}</h6>
      <h6>{{ lName }}</h6>
      <h6>{{ fName }}</h6>
      <h6>{{ mName }}</h6>
      <h6>{{ maritalStatus }}</h6>
      <h6>{{ legalName }}</h6>
      <h6>{{ isLegalName }}</h6>
      <h6>{{ dateOfBirth }}</h6>
      <h6>{{ age }}</h6>
      <h6>{{ sex }}</h6>
      <h6>{{ address }}</h6>
      <h6>{{ address2 }}</h6>
      <h6>{{ city }}</h6>
      <h6>{{ state }}</h6>
      <h6>{{ zip }}</h6>
      <h6>{{ socialSecurity }}</h6>
      <h6>{{ homeNumber }}</h6>
      <h6>{{ cellNumber }}</h6>
      <h6>{{ occupation }}</h6>
      <h6>{{ employer }}</h6>
      <h6>{{ employerPhone }}</h6>
      <h6>{{ responsibleBillPerson }}</h6>
      <h6>{{ responsibleBillPersonDOB }}</h6>
      <h6>{{ responsibleBillPersonAddress }}</h6>
      <h6>{{ responsibleBillPersonHomePhone }}</h6>
      <h6>{{ patientHere }}</h6>
      <h6>{{ patientCovByInsurance }}</h6>
      <h6>{{ insurPersOccupation }}</h6>
      <h6>{{ insurPersEmployer }}</h6>
      <h6>{{ insurPersEmployerAddress }}</h6>
      <h6>{{ insurPersEmployerPhone }}</h6>
      <h6>{{ primaryInsurance }}</h6>
      <h6>{{ subscriberName }}</h6>
      <h6>{{ subscriberSS }}</h6>
      <h6>{{ subscriberDOB }}</h6>
      <h6>{{ subscriberGroupNo }}</h6>
      <h6>{{ subscriberPolicyNo }}</h6>
      <h6>{{ subscriberCoPayAmount }}</h6>
      <h6>{{ relationToSubscriber }}</h6>
      <h6>{{ secondaryInsurance }}</h6>
      <h6>{{ secondaryInsuranceSubscName }}</h6>
      <h6>{{ secondaryInsuranceSubscGroupNo }}</h6>
      <h6>{{ secondaryInsuranceSubscPolicyNo }}</h6>
      <h6>{{ secondaryInsuranceRelationToPatient }}</h6>
      <h6>{{ localRelativeName }}</h6>
      <h6>{{ localRelativeRelation }}</h6>
      <h6>{{ localRelativeHomePhone }}</h6>
      <h6>{{ calRelativeWorkPhone }}</h6>
      <h6 class=" signature ">{{ signature }}</h6>
      <h6>{{ signatureDate }}</h6>
      <button class="text-dark btn-lg" @click="showDeleteModal=true"><i class="fa fa-trash"></i></button>
      <router-link to="/">
        <button class="text-dark btn-lg"><i class="fa fa-home"></i></button>
      </router-link>
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
            <h5>You are deleting patient Kevin</h5>
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
    }
  }
}
</script>

<style scoped>
h5 {
  margin: 1.5rem;
}
</style>
