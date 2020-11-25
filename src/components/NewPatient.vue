<template>
  <div id="new-patient">
    <h3>New Patient</h3>
    <form @submit.prevent="savePatient">
      <div>
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
