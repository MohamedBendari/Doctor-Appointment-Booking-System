<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- Appointment Reminder -->
    <AppointmentReminder />

    <!-- Navigation Bar -->
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
          <div class="d-flex align-items-center">
            <router-link to="/doctor-login" class="btn btn-outline-light rounded-pill px-4 me-2">Doctor Login</router-link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5 mt-auto">
      <div class="container">
        <div class="row g-4 justify-content-between">
          <div class="col-md-4">
            <h3 class="text-primary fw-bold">My Clinic</h3>
            <p class="text-white-50 mt-3">The most advanced medical appointment booking system in the region.</p>
          </div>
          <div class="col-md-3">
            <h4 class="text-white fw-bold">Quick Links</h4>
            <ul class="list-unstyled">
              <li>
                <router-link to="/" class="footer-link text-white-50">Home</router-link>
              </li>
              <li>
                <router-link to="/doctors" class="footer-link text-white-50">Doctors</router-link>
              </li>
              <li>
                <router-link to="/contact" class="footer-link text-white-50">Contact Us</router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <h4 class="text-white fw-bold">Contact Us</h4>
            <ul class="list-unstyled text-white-50">
              <li class="d-flex align-items-center mb-2">
                <i class="fas fa-phone text-primary me-3"></i>
                01016140481
              </li>
              <li class="d-flex align-items-center">
                <i class="fas fa-envelope text-primary me-3"></i>
                mohamedsharkawy078@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="text-center text-white-50 mt-4 pt-4 border-top border-secondary-subtle">
        <p class="mb-0">&copy; My Clinic . All rights reserved. 2025</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ThemeToggle from './components/ThemeToggle.vue';
import AppointmentReminder from './components/AppointmentReminder.vue';

export default {
  name: 'App',
  components: {
    ThemeToggle,
    AppointmentReminder
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  }
}
</script>
<style>
/* Global Styles */
body {
  direction: rtl;
  color: #212529; /* لون افتراضي للنصوص في الوضع الفاتح */
}

/* Base colors for the Light Theme */
:root {
  --bs-body-bg: #f8f9fa;
  --bs-body-color: #212529;
  --bs-card-bg: #ffffff;
  --bs-text-muted: #6c757d;
  --bs-table-striped-bg: #e9ecef;
  --bs-table-hover-bg: #dee2e6;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
}

/* Overrides for the Dark Theme */
:root.dark-theme {
  --bs-body-bg: #212529;
  --bs-body-color: #f8f9fa;
  --bs-card-bg: #2d3748;
  --bs-text-muted: #99aab5;
  --bs-table-striped-bg: #343a40;
  --bs-table-hover-bg: #495057;
  --bs-primary: #667eea;
  --bs-secondary: #f093fb;
}

/* Apply Dark Theme classes globally */
.dark-theme {
  background-color: var(--bs-body-bg) !important;
  color: var(--bs-body-color) !important;
}

.dark-theme .bg-light {
  background-color: var(--bs-body-bg) !important;
}

.dark-theme .bg-white {
  background-color: var(--bs-card-bg) !important;
}

.dark-theme .card {
  background-color: var(--bs-card-bg) !important;
  border-color: var(--bs-border-color) !important;
  color: var(--bs-body-color) !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4) !important;
}

.dark-theme .text-muted {
  color: var(--bs-text-muted) !important;
}

.dark-theme .text-dark {
  color: var(--bs-body-color) !important;
}

.dark-theme h1,
.dark-theme h2,
.dark-theme h3,
.dark-theme h4,
.dark-theme h5 {
  color: var(--bs-body-color) !important;
}

/* Table overrides for Dark Theme */
.dark-theme .table {
  color: var(--bs-body-color);
  --bs-table-bg: var(--bs-card-bg);
  --bs-table-striped-bg: var(--bs-table-striped-bg);
  --bs-table-hover-bg: var(--bs-table-hover-bg);
}

.dark-theme .list-group-item {
  background-color: var(--bs-card-bg) !important;
}

.dark-theme .list-group-item:hover {
  background-color: var(--bs-table-hover-bg) !important;
}

/* Button & Nav overrides */
.dark-theme .btn-outline-secondary {
  border-color: #f8f9fa;
  color: #f8f9fa;
}

.dark-theme .btn-outline-secondary.active,
.dark-theme .btn-outline-secondary:hover {
  background-color: #f8f9fa;
  color: #212529;
}
</style>