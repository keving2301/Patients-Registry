<template>
  <div id="app">
    <div>
      <div class="container-fluid">
        <div class="row bg-dark">
          <div class="col-lg-12">
            <p class="text-center text-light display-4 pt-2" style="font-size: 25px">CRUD Application Using Vue.js</p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row mt-3">
          <div class="col-lg-6 ">
            <h3 class="text-info mt-0 float-left">Registered Users</h3>
          </div>
          <div class="col-lg-6">
            <button class="btn btn-info float-right" @click="showAddModal=true ">
              <i class="fa fa-user"></i>&nbsp;&nbsp;Add New User
            </button>
          </div>
        </div>
        <hr class="bg-info">
        <div v-if="errorMsg" class="alert alert-danger">Error Message</div>
        <div v-if="successMsg" class="alert alert-success">Success Message</div>

        <!--Display Records-->
        <div class="row">
          <div class="col-lg-12">
            <table class="table table-bordered table-striped">
              <thead>
              <tr class="text-center bg-info text-light">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user, idx) in users" :key="idx" class="text-center">
                <td>{{ idx + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td><a class="text-success" href="#" @click="editUser(user)"><i class="fa fa-edit"></i></a></td>
                <td><a class="text-danger" href="#" @click="deleteUser(user)"><i class="fa fa-trash"></i></a></td>
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
        <div class="modal-dialog" role="document">
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
              <h4 class="text-danger">Are you sure you want to delete this user?</h4>
              <h5>You are Deleting 'Kevin'</h5>
              <hr>
              <button class="btn btn-danger btn-lg" @click="deleteUserFinal(); showDeleteModal=false">Yes</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-success btn-lg" @click="showDeleteModal=false">no</button>
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
      currentUser: null,
      user: {
        userID: null,
        name: null,
        email: null,
        phone: null
      }
    }
  },
  methods: {

    watcher(){
      db.collection("patients").onSnapshot((querySnapshot) => {
            this.users = [];
            querySnapshot.forEach((doc) => {
              this.users.push(doc);
            });
          });
    },

    // Displays all users stores in firebase
    displayAllUsers() {
      db.collection("patients").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {

          this.users.push(doc.data());
        });

      });
    },

    // Creates New User with an auto generated Document
    saveNewUser() {
      db.collection("patients").add(this.user)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.displayAllUsers();
            this.user.userID = docRef.id;
            this.updateUser();
            this.watcher();
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
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

    // Reset the data from the input field to null
    reset() {
      // Object.assign(this.$data, this.$options.data.apply((this)));
    }
  },

  created() {
    this.displayAllUsers();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
</style>
