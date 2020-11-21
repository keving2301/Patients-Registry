<template>
  <div id="app">
    <div>
      <div class="container-fluid">
        <div class="row align-items-center " style="background-color: #E2FBFF; height: 100px">
          <div class="col-lg-12">
            <img alt="Logo" class="logo" src="./assets/clinical-logo.png">
            <!--            <p class="text-dark" style="font-size: 25px">CRUD Application Using Vue.js and Firebase</p>-->
          </div>
        </div>
      </div>
      <div class="container" style="background: #F1F3F9; border-radius: 10px">
        <div class="mt-5">
          <div class="row pt-4">
            <div class="col-lg-6 col-md-6 col-6">
              <h3 class="mt-0 float-left">Patients Registry</h3>
            </div>
            <div class="col-lg-6 col-md-6 col-6">
              <button class="btn btn-info float-right" @click="reset()">
                <i class="fa fa-user mr-2"></i>&nbsp;&nbsp;Add New Patient
              </button>
            </div>
          </div>
        </div>
        <hr class="bg-info">
        <div v-if="errorMsg" class="alert alert-danger">Error Message</div>
        <div v-if="successMsg" class="alert alert-success">Success Message</div>

        <!--Display Records-->
        <div class="row">
          <div class="col-lg-12">
            <table class="table table-bordered">
              <thead class="border">
              <tr class="text-center bg-info text-dark">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user, idx) in users" :key="user.userID" class="text-center bg-white">
                <td>{{ idx + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td><a class="text-dark" href="#" @click="editUser(user)"><i class="fa fa-edit"></i></a></td>
                <td><a class="text-dark" href="#" @click="deleteUser(user)"><i class="fa fa-trash"></i></a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!--Add New User Model-->
      <div v-if="showAddModal" id="add" class="overlay">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New User</h5>
              <button class="close" type="button" @click="showAddModal=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-4">
              <form action="#" method="post">
                <div class="form-group">
                  <input v-model="user.name" class="form-control form-control-lg" name="name" placeholder="Name"
                         type="text">
                </div>
                <div class="form-group">
                  <input v-model="user.email" class="form-control form-control-lg" name="email" placeholder="Email"
                         type="email">
                </div>
                <div class="form-group">
                  <input v-model="user.phone" class="form-control form-control-lg" name="phone" placeholder="Phone"
                         type="tel">
                </div>
                <div class="form-group">
                  <button class="btn btn-info btn-block btn-lg"
                          @click="showAddModal=false; saveNewUser(); successMsg=true">Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--Edit User Model-->
      <div v-if="showEditModal" id="edit" class="overlay" tabindex="-1">
        <div class="modal-dialog" role="button">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Update User</h5>
              <button aria-label="Close" class="close" data-dismiss="modal" type="button" @click="showEditModal=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-4">
              <form action="#" method="post">
                <div class="form-group">
                  <input v-model="user.name" class="form-control form-control-lg" name="name" placeholder="Name"
                         type="text">
                </div>
                <div class="form-group">
                  <input v-model="user.email" class="form-control form-control-lg" name="email" placeholder="Email"
                         type="email">
                </div>
                <div class="form-group">
                  <input v-model="user.phone" class="form-control form-control-lg" name="phone" placeholder="Phone"
                         type="tel">
                </div>
                <div class="form-group">
                  <button class="btn btn-info btn-block btn-lg" @click="updateUser(); showAddModal=false ">Update User
                  </button>
                </div>
              </form>
            </div>
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
              <h5>You are deleting patient 'Kevin'</h5>
              <hr>
              <button class="btn btn-lg"
                      style="width: 100px; border-radius: 30px; background-color: #EAEAFA; color: #9195EE"
                      @click="deleteUserFinal(); showDeleteModal=false; successMsg=true">Yes
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
  </div>
</template>

<script>
import {db} from './firebase'

export default {
  name: 'App',
  data() {
    return {
      errorMsg: false,
      successMsg: false,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      users: [],
      user: {
        userID: null,
        name: null,
        email: null,
        phone: null
      }
    }
  },
  methods: {

    // Fetch Data and updates application with realtime data from firebase
    watcher() {
      this.users = [];
      db.collection("patients").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {

          const data = {
            'userID': doc.id,
            'name': doc.data().name,
            'email': doc.data().email,
            'phone': doc.data().phone
          }

          this.users.push(data);
        });
      });
    },

    // Displays all users stored in firebase
    displayAllUsers() {
      db.collection("patients").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {

          const data = {
            'userID': doc.id,
            'name': doc.data().name,
            'email': doc.data().email,
            'phone': doc.data().phone
          }

          this.users.push(data);
        });
      });
    },

    // Creates New User with an auto generated Document ID
    saveNewUser() {
      db.collection("patients").add(this.user).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.user.userID = docRef.id; //Saves document ID as data field for user
        this.updateUser();
      }).catch(function (error) {
        console.error("Error adding document: ", error);
        this.errorMsg = true;
      });
    },

    // Update User
    updateUser() {
      db.collection("patients").doc(this.user.userID).update(this.user)
          .then(() => {
            this.showEditModal = false;
            this.watcher();

            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            this.errorMsg = true;
          });
    },

    // Delete User
    deleteUserFinal() {
      db.collection("patients").doc(this.user.userID).delete().then(() => {
        this.watcher();
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    },

    // Edit User
    editUser(user) {
      this.user.name = user.name;
      this.user.phone = user.phone;
      this.user.email = user.email;
      this.user.userID = user.userID;
      this.showEditModal = true;
    },

    // Delete User
    deleteUser(user) {
      this.user.name = user.name;
      this.user.phone = user.phone;
      this.user.email = user.email;
      this.user.userID = user.userID;
      this.showDeleteModal = true;
    },

    // Reset the data from the input field to null
    reset() {
      this.user.name = '';
      this.user.phone = '';
      this.user.email = '';
      this.user.userID = '';
      this.showAddModal = true;
    },
  },

  created() {
    this.displayAllUsers();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');

#app {
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.btn-info {
  background-color: #43D3E8 !important;
  border-color: #43D3E8;
  border-radius: 10px;
}

.btn-info:hover {
  background-color: #67ECFF !important;
  border-color: #67ECFF;
}

.bg-info {
  background-color: #D7DDE7 !important;
}

.text-dark {
  color: #575D76 !important;
}

.fa-edit:hover {
  color: #9195EE
}

.fa-trash:hover {
  color: #F78F8F;
}

.logo {
  height: auto;
  width: 200px;
  top: -8.5vh;
  left: 11.5vw !important;
}
</style>
