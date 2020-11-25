<template>
  <div id="new-patient" style="font-size: 13px; font-weight: bold">
    <div class="container" style="background: #F1F3F9; border-radius: 10px">
      <div class="mt-5">
        <form class="m-3" @submit.prevent="savePatient">
          <div class="form-row pt-3">
            <div class="col text-left d-inline-flex align-items-center">
              <label class="p-0 m-0">Today's Date: </label>
              <input class="form-control col-3 ml-3 bg-white text-center" disabled placeholder="[Date]" type="text">
            </div>
            <div class="col text-right d-inline-flex align-items-center">
              <label class="p-0 m-0">PCP: </label>
              <input class="form-control col-7 ml-3" placeholder="PCP" type="text">
            </div>
          </div>

          <!--Patient Information Section-->
          <h5 class="bg-dark my-4 py-2 text-light">Patient Information</h5>
          <div class="form-row align-items-center text-left">
            <div class="col-lg-3">
              <label class="w-100">Patient's last name: </label>
              <input class="form-control" placeholder="Last Name" type="text">
            </div>
            <div class="col-lg-2">
              <label class="w-100">First: </label>
              <input class="form-control" placeholder="First Name" type="text">
            </div>
            <div class="col-lg-2 mr-lg-5">
              <label class="w-100">Middle: </label>
              <input class="form-control" placeholder="Initial" type="text">
            </div>
            <div class="col-lg-4">
              <label class="ml-lg-5">Marital Status: </label>
              <select id="inputMaritalStatus" class="form-control w-75 ml-lg-5">
                <option selected>Choose an item</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
              </select>
            </div>
          </div>

          <div class="form-row mt-4">
            <div class="col-lg-2 align-items-center text-left">
              <label class="w-100">Is this your legal name? </label>
              <div class="form-check form-check-inline">
                <input id="yesLegalName" class="form-check-input" name="legalName" type="radio"
                       value="option1">
                <label class="form-check-label" for="yesLegalName">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input id="noLegalName" class="form-check-input" name="legalName" type="radio"
                       value="option2">
                <label class="form-check-label" for="noLegalName">No</label>
              </div>
            </div>
            <div class="col-lg-3 w-auto align-items-center text-left mr-lg-5">
              <label class="w-100">If not, what is your legal name?</label>
              <input class="form-control " placeholder="Legal Name" type="text">
            </div>
            <div class="col-lg-2 w-auto align-items-center mr-lg-4 "> <!-- Date input -->
              <label class="w-100" for="date">Birth date:</label>
              <input id="date" class="form-control" name="date" placeholder="MM/DD/YYY" type="text"/>
            </div>
            <div class="col-lg-1 align-items-center mr-lg-4">
              <label class="w-100" for="age">Age:</label>
              <input id="age" class="form-control" max="100" min="0" name="age" step="10" type="number"
                     value="30">
            </div>
            <div class="col-lg-2 align-items-center">
              <label class="w-100">Sex:</label>
              <div class="form-check form-check-inline">
                <input id="sexMale" class="form-check-input" name="sexRadioOption" type="radio" value="option1">
                <label class="form-check-label" for="sexMale">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input id="sexFemale" class="form-check-input" name="sexRadioOption" type="radio" value="option2">
                <label class="form-check-label" for="sexFemale">Female</label>
              </div>
            </div>
          </div>
          <form>
            <div class="form-row w-100 mt-4">
              <div class="form-group text-left w-100 align-items-center col-lg-5">
                <label for="inputAddress">Address:</label>
                <input id="inputAddress" class="form-control" placeholder="1234 Main St" type="text">
              </div>
              <div class="form-group text-left col-lg-3">
                <label for="inputAddress2">Address 2:</label>
                <input id="inputAddress2" class="form-control" placeholder="Apartment, studio, or floor" type="text">
              </div>
              <div class="form-row text-left">
                <div class="form-group col-md-6">
                  <label for="inputCity">City:</label>
                  <input id="inputCity" class="form-control" type="text">
                </div>
                <div class="form-group text-left col-md-4">
                  <label for="inputState">State:</label>
                  <select id="inputState" class="form-control">
                    <option selected>Select...</option>
                    <option>Florida</option>
                  </select>
                </div>
                <div class="form-group text-left col-md-2">
                  <label for="inputZip">Zip:</label>
                  <input id="inputZip" class="form-control" type="text">
                </div>
              </div>
            </div>


          </form>

          <div class="mt-5">
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
          </div>
          <button class="btn btn-outline-success" type="submit">Submit</button>
          <router-link class="btn btn-outline-danger" to="/"> Cancel</router-link>
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

</style>
