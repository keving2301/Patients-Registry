<template>

</template>

<script>
import {namesRef} from "./firebase";

export default {
  name: 'HelloWorld',
  data() {
    return {
      errorMsg: false,
      successMsg: false,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      users: [],
      newUser: {name: "", email: "", phone: ""}
    }
  },
  mounted: function(){
      this.getAllUsers();
    },
  methods: {
    getAllUsers(){},
    submitName(){
      namesRef.push({name: this.name, edit: false})
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>
