<template>
  <div id="navbar" class="container-fluid">
    <div class="row align-items-center " style="background-color: #E2FBFF; height: 100px">
      <div class="col-lg-12">
        <router-link to="/">
          <img alt="Logo" class="logo" src="../assets/clinical-logo.png">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.logo {
  height: auto;
  width: 200px;
  top: -8.5vh;
  left: 11.5vw !important;
}
</style>
