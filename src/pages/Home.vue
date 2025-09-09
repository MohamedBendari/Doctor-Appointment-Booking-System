<template>
  <div class="home-page">
    <section class="bg-primary text-white py-5 position-relative overflow-hidden" style="min-height: 80vh;">
      <div class="container h-100 d-flex align-items-center">
        <div class="row g-5 align-items-center w-100">
          <div class="col-lg-7">
            <h1 class="display-4 fw-bold mb-3">
              Book Your Appointment with the Best Doctors
              <span class="d-block text-warning">Easily and Quickly</span>
            </h1>
            <p class="lead mb-4">
              We provide you with the ability to book appointments with the best doctors in various specialties
              in an easy and secure way through our advanced online platform.
            </p>

            <div class="search-container mb-4">
              <div class="input-group shadow-lg rounded-pill">
                <span class="input-group-text bg-white border-0 rounded-start-pill">
                  <i class="fas fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search for a doctor or specialty..."
                  class="form-control border-0 py-3"
                  @keyup.enter="searchDoctors"
                />
                <button @click="searchDoctors" class="btn btn-primary rounded-end-pill px-4">
                  <i class="fas fa-search"></i>
                </button>
              </div>

              <div class="d-flex flex-wrap gap-2 mt-3 align-items-center">
                <span class="text-white-50">Popular Specialties:</span>
                <button
                  v-for="specialty in popularSpecialties"
                  :key="specialty"
                  @click="quickSearch(specialty)"
                  class="btn btn-outline-light rounded-pill"
                >
                  {{ specialty }}
                </button>
              </div>
            </div>

            <div class="d-flex gap-3">
              <router-link to="/doctors" class="btn btn-warning btn-lg rounded-pill shadow-sm">
                <i class="fas fa-user-md me-2"></i>
                Browse Doctors
              </router-link>
              <router-link to="/my-appointments" class="btn btn-outline-light btn-lg rounded-pill shadow-sm">
                <i class="fas fa-calendar-check me-2"></i>
                My Appointments
              </router-link>
            </div>
          </div>

          <div class="col-lg-5 d-none d-lg-block text-center position-relative">
            <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" alt="Doctor" class="img-fluid rounded-4 shadow-lg" />

            <div class="floating-card card-1 bg-white shadow-sm rounded-3 p-3 text-dark">
              <i class="fas fa-heartbeat text-primary fs-5 me-2"></i>
              <span>+500 Doctors</span>
            </div>
            <div class="floating-card card-2 bg-white shadow-sm rounded-3 p-3 text-dark">
              <i class="fas fa-users text-primary fs-5 me-2"></i>
              <span>+10,000 Patients</span>
            </div>
            <div class="floating-card card-3 bg-white shadow-sm rounded-3 p-3 text-dark">
              <i class="fas fa-star text-warning fs-5 me-2"></i>
              <span>4.9 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Why Choose My Clinic?</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="feature in features" :key="feature.title">
            <div class="card h-100 shadow-sm border-0 rounded-4 text-center p-4">
              <div class="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3">
                <i :class="feature.icon"></i>
              </div>
              <h5 class="card-title fw-bold mb-2">{{ feature.title }}</h5>
              <p class="card-text text-muted">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    ---
    <section class="py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Available Specialties</h2>
        <div class="row g-4">
          <div class="col-sm-6 col-md-4 col-lg-3" v-for="specialty in specialtiesWithIcons" :key="specialty.name">
            <div class="card h-100 shadow-sm border-0 rounded-4 text-center p-4" style="cursor: pointer;" @click="searchBySpecialty(specialty.name)">
              <div class="specialty-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3">
                <i :class="specialty.icon"></i>
              </div>
              <h6 class="card-title fw-bold mb-1">{{ specialty.name }}</h6>
              <p class="card-text text-muted mb-0">{{ specialty.count }} doctors available</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    ---
    <section class="py-5 bg-primary text-white">
      <div class="container">
        <div class="row text-center g-4">
          <div class="col-6 col-md-3">
            <h3 class="display-4 fw-bold">{{ animatedStats.doctors }}</h3>
            <p class="lead mb-0">Certified Doctors</p>
          </div>
          <div class="col-6 col-md-3">
            <h3 class="display-4 fw-bold">{{ animatedStats.patients }}</h3>
            <p class="lead mb-0">Satisfied Patients</p>
          </div>
          <div class="col-6 col-md-3">
            <h3 class="display-4 fw-bold">{{ animatedStats.appointments }}</h3>
            <p class="lead mb-0">Appointments Booked</p>
          </div>
          <div class="col-6 col-md-3">
            <h3 class="display-4 fw-bold">{{ animatedStats.rating }}</h3>
            <p class="lead mb-0">Platform Rating</p>
          </div>
        </div>
      </div>
    </section>

    ---
    <section class="py-5 bg-light">
      <div class="container text-center">
        <h2 class="fw-bold mb-3">Start Your Health Journey Today</h2>
        <p class="lead text-muted mb-4">
          Join thousands of patients who trust our platform to book their medical appointments.
        </p>
        <router-link to="/doctors" class="btn btn-primary btn-lg rounded-pill shadow-sm">
          Book Your Appointment Now
          <i class="fas fa-arrow-left ms-2"></i>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
      popularSpecialties: ['Cardiology', 'Pediatrics', 'Dentistry', 'Dermatology'],
      specialtiesWithIcons: [
        { name: 'Cardiology', icon: 'fas fa-heartbeat', count: 2 },
        { name: 'Pediatrics', icon: 'fas fa-baby', count: 1 },
        { name: 'Dentistry', icon: 'fas fa-tooth', count: 1 },
        { name: 'Dermatology', icon: 'fas fa-hand-paper', count: 1 },
        { name: 'Ophthalmology', icon: 'fas fa-eye', count: 1 },
        { name: 'Obstetrics and Gynecology', icon: 'fas fa-female', count: 1 },
        { name: 'Orthopedics', icon: 'fas fa-bone', count: 1 },
        { name: 'Neurology', icon: 'fas fa-brain', count: 1 }
      ],
      features: [
        { title: 'Quick Booking', icon: 'fas fa-clock', description: 'Book your appointment in less than two minutes with the best doctors in your city.' },
        { title: 'Secure and Reliable', icon: 'fas fa-shield-alt', description: 'We protect your data privacy and ensure the highest levels of security.' },
        { title: 'Easy to Use', icon: 'fas fa-mobile-alt', description: 'A simple and user-friendly interface that works on all devices.' },
        { title: 'Appointment Reminders', icon: 'fas fa-bell', description: 'We send you reminders before your appointment to make sure you don\'t forget.' }
      ],
      animatedStats: {
        doctors: 0,
        patients: 0,
        appointments: 0,
        rating: 0
      },
      finalStats: {
        doctors: 500,
        patients: 10000,
        appointments: 25000,
        rating: 4.9
      }
    }
  },
  mounted() {
    this.animateStats();
  },
  methods: {
    searchDoctors() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/doctors',
          query: { search: this.searchQuery }
        });
      } else {
        this.$router.push('/doctors');
      }
    },
    quickSearch(specialty) {
      this.$router.push({
        path: '/doctors',
        query: { specialty: specialty }
      });
    },
    searchBySpecialty(specialty) {
      this.$router.push({
        path: '/doctors',
        query: { specialty: specialty }
      });
    },
    animateStats() {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepTime = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        this.animatedStats.doctors = Math.floor(this.finalStats.doctors * progress);
        this.animatedStats.patients = Math.floor(this.finalStats.patients * progress);
        this.animatedStats.appointments = Math.floor(this.finalStats.appointments * progress);
        this.animatedStats.rating = (this.finalStats.rating * progress).toFixed(1);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          this.animatedStats = { ...this.finalStats };
          this.animatedStats.rating = this.finalStats.rating.toFixed(1);
        }
      }, stepTime);
    }
  }
}
</script>

<style scoped>
/* Custom styles for animations that are not in Bootstrap */
.floating-card {
  position: absolute;
  animation: float 3s ease-in-out infinite;
}

.card-1 {
  top: 20%;
  right: -20px;
  animation-delay: 0s;
}

.card-2 {
  bottom: 30%;
  left: -30px;
  animation-delay: 1s;
}

.card-3 {
  top: 60%;
  right: -10px;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.feature-icon, .specialty-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.feature-icon {
  width: 80px;
  height: 80px;
  font-size: 2rem;
}
</style>