<template>
  <div id="edit-patient">
    <h3>Edit Patient</h3>
    <form @submit.prevent="updateUser()">
      <div class="input">
        <input disabled v-model="user.userID" required type="text">
      </div>
      <div class="input">
        <input v-model="user.name" required type="text">
      </div>
      <div class="input">
        <input v-model="user.sex" required type="text">
      </div>
      <div class="input">
        <input v-model="user.dateOfBirth" required type="text">
      </div>
      <div class="input">
        <input v-model="user.email" required type="text">
      </div>
      <div class="input">
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
  name: "edit-patient",
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
    // Fetch data before it enters to route '/view-patient'
    beforeRouteEnter(to, from, next) {
      db.collection('patients').where('userID', '==', to.params.userID).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              next(vm => {
                vm.user.userID = doc.data().userID
                vm.user.name = doc.data().name
                vm.user.sex = doc.data().sex
                vm.user.dateOfBirth = doc.data().dateOfBirth
                vm.user.email = doc.data().email
                vm.user.phone = doc.data().phone
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
                this.user.name = doc.data().name
                this.user.sex = doc.data().sex
                this.user.dateOfBirth = doc.data().dateOfBirth
                this.user.email = doc.data().email
                this.user.phone = doc.data().phone
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
input{
  width: 300px;
  margin: 1rem;
  text-indent: 8px;
}
</style>
