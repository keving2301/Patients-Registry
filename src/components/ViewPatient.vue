<template>
  <div id="view-patient">
    <h3 class="mt-5 mb-5">View Patient</h3>
    <h5>{{ userID }}</h5>
    <h5>{{ name }}</h5>
    <h5>{{ sex }}</h5>
    <h5>{{ dateOfBirth }}</h5>
    <h5>{{ email }}</h5>
    <h5>{{ phone }}</h5>
    <button class="text-dark btn-lg" @click="showDeleteModal=true"><i class="fa fa-trash"></i></button>
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
      sex: null,
      dateOfBirth: null,
      email: null,
      phone: null
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
