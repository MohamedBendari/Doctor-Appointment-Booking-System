<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
    <div class="container">
      <router-link class="navbar-brand fw-bold text-white" to="/">
        <i class="fas fa-heartbeat me-2"></i>
        DoctorApp
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-white-50" active-class="active fw-bold text-white" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white-50" active-class="active fw-bold text-white" to="/doctors">Doctors</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white-50" active-class="active fw-bold text-white" to="/my-appointments">My Appointments</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white-50" active-class="active fw-bold text-white" to="/contact">Contact Us</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link to="/doctor-login" class="btn btn-outline-light rounded-pill px-4">
            Doctor Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>

<style scoped>
/* No custom styles needed. Bootstrap handles everything. */
</style>