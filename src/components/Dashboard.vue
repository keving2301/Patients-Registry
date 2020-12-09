<template>
  <div id="dashboard">
    <div>
      <div class="container" style="background: #F1F3F9; border-radius: 10px">
        <div class="mt-lg-5">
          <div class="row pt-4 d-flex align-items-center justify-content-between">
            <div class="col-lg-6 col-md-6 col-6">
              <h3 class="m-0 py-2 float-left">Patients Registry</h3>
            </div>
            <div class="btn-section col-lg-6 col-md-6 col-6 row d-flex justify-content-end m-0 p-0">
              <label for="search" class="fa fa-search border d-flex align-items-center bg-white pl-2 my-1 col-lg-4 col-4"
                     style="border-radius: 10px">
                <input id="search" class="search mx-2 h-100 w-100 border-0" placeholder="Search..."
                       style="text-indent: 5px"/>
              </label>
              <div class="new-patient-section p-0 py-1 col-lg-4 m-0 mx-lg-3 col-4">
                <router-link class="new" to="/new">
                  <button class="w-100 btn btn-info float-right">
                    <i class="fa fa-user p-0 m-0"></i>&nbsp;&nbsp;Add New Patient
                  </button>
                </router-link>
                <router-link class="new-sm" style="display: none" to="/new">
                  <button class="btn btn-info" style="width: 40px">
                    <i class="fa fa-user"></i>
                  </button>
                </router-link>
              </div>
              <button class="print text-dark bg-transparent border-0 col-lg-1 m-0 col-4 mr-lg-3" style="font-size: 25px;
                   padding: 0px 10px 0px 0px;">
                <i class="fa fa-print" @click="print"></i>
              </button>
            </div>
          </div>
        </div>
        <hr class="bg-info">
        <div v-if="errorMsg" class="alert alert-danger">Error Message</div>
        <div v-if="successMsg" class="alert alert-success">Success Message</div>

        <!--Display Records-->
        <div class="table-area border">
          <div>
            <table id="table" class="table table-bordered text-center">
              <thead>
              <tr class="bg-info text-dark">
                <th>ID</th>
                <th>Name</th>
                <th>Sex</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody class="rowhover">
              <tr v-for="(user, idx) in users" :key="user.userID"
                  class="text-center bg-white rowhover w-100 ">
                <td>{{ idx + 1 }}</td>
                <td>
                  <router-link :to="{name: 'view-patient', params: {userID: user.userID}}"
                               class="text-decoration-none link">{{ user.fName }}
                    {{ user.mName }} {{ user.lName }}
                  </router-link>
                </td>
                <td>{{ user.sex }}</td>
                <td>{{ user.dateOfBirth }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.cellNumber }}</td>
                <td>
                  <router-link :to="{name: 'edit-patient',params: {userID: user.userID}}" class="text-decoration-none">
                    <a class="text-dark"><i class="fa fa-edit" style="font-size: 20px"></i></a></router-link>
                </td>
                <td><a class="text-dark" href="#" @click="deleteUser(user)"><i class="fa fa-trash"
                                                                               style="font-size: 20px"></i></a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
              <h5>You are deleting patient {{ user.fName }}</h5>
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
import {db} from '../firebase'

export default {
  name: "Dashboard",
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
        fName: null,
        mName: null,
        lName: null,
        sex: null,
        dateOfBirth: null,
        email: null,
        cellNumber: null
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
            'fName': doc.data().fName,
            'mName': doc.data().mName,
            'lName': doc.data().lName,
            'sex': doc.data().sex,
            'dateOfBirth': doc.data().dateOfBirth,
            'email': doc.data().email,
            'cellNumber': doc.data().cellNumber
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
            'fName': doc.data().fName,
            'mName': doc.data().mName,
            'lName': doc.data().lName,
            'sex': doc.data().sex,
            'dateOfBirth': doc.data().dateOfBirth,
            'email': doc.data().email,
            'cellNumber': doc.data().cellNumber
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
      this.user.fName = user.fName;
      this.user.mName = user.mName;
      this.user.lName = user.lName;
      this.user.sex = user.sex;
      this.user.dateOfBirth = user.dateOfBirth;
      this.user.cellNumber = user.cellNumber;
      this.user.email = user.email;
      this.user.userID = user.userID;
      this.showEditModal = true;
    },

    // Delete User
    deleteUser(user) {
      this.user.fName = user.fName;
      this.user.mName = user.mName;
      this.user.lName = user.lName;
      this.user.sex = user.sex;
      this.user.dateOfBirth = user.dateOfBirth;
      this.user.cellNumber = user.cellNumber;
      this.user.email = user.email;
      this.user.userID = user.userID;
      this.showDeleteModal = true;
    },

    // Reset the data from the input field to null
    reset() {
      this.user.fName = '';
      this.user.mName = '';
      this.user.lName = '';
      this.user.sex = '';
      this.user.dateOfBirth = '';
      this.user.cellNumber = '';
      this.user.email = '';
      this.user.userID = '';
      this.showAddModal = true;
    },
    print() {
      // Pass the element id here
      this.$htmlToPaper('dashboard');
    }
  },

  // This function runs as soon as the page loads
  created() {
    this.displayAllUsers();
  }
}
</script>

<style scoped>

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

#table td {
  vertical-align: middle;
  width: max-content !important;
}

router-link {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

.rowhover:hover {
  background: #f2f9ff !important;
}

.link {
  color: #43D3E8 !important;
}

.link:hover {
  color: #1a8d9f !important;
}

.overlay {
  position: fixed !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: rgba(0, 0, 0, 0.6) !important;
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

/* Smartphones (portrait and landscape) ----------- */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 480px) {

  .container {
    margin-top: 1rem;
    font-size: 14px;
    width: auto !important;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .new {
    display: none;
  }

  .new-sm {
    display: initial !important;
  }

  .new-sm i {
    font-size: 20px !important;
  }

  h3 {
    font-size: 16px;
  }

  .table th {
    font-size: 12px;
  }

  .table-area {
    overflow-x: scroll;
    margin-right: 1px;
    margin-left: 1px;
  }

  .fa-search {
    /*background: transparent !important;*/
    /*font-size: 20px;*/
    /*border: none !important;*/
    display: none !important;
  }

}

/* Smartphones (landscape) ----------- */
@media only screen
and (min-width: 321px) {
  /* Styles */
}

/* Smartphones (portrait) ----------- */
@media only screen
and (max-width: 320px) {
  /* Styles */
}

/* iPads (portrait and landscape) ----------- */
@media only screen
and (min-device-width: 768px)
and (max-device-width: 1024px) {
  /* Styles */
}

/* iPads (landscape) ----------- */
@media only screen
and (min-device-width: 768px)
and (max-device-width: 1024px)
and (orientation: landscape) {
  /* Styles */
}

/* iPads (portrait) ----------- */
@media only screen
and (min-device-width: 768px)
and (max-device-width: 1024px)
and (orientation: portrait) {
  /* Styles */
}

/* Desktops and laptops ----------- */
@media only screen
and (min-width: 1224px) {
  /* Styles */
}

/* Large screens ----------- */
@media only screen
and (min-width: 1824px) {
  /* Styles */
}

/* iPhone 4 ----------- */
@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5) {
  /* Styles */
}
</style>
